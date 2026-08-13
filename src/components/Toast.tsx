import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ToastType = "success" | "error" | "info";

interface ToastState {
  key: number;
  msg: string;
  type: ToastType;
}

interface ToastApi {
  show: (msg: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastApi>({ show: () => {} });

export const useToast = () => useContext(ToastContext);

function ToastIcon({ type }: { type: ToastType }) {
  if (type === "success") {
    return (
      <svg {...{ xmlns: "http://www.w3.org/2000/svg", width: 17, height: 17, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" }}>
        <circle cx="12" cy="12" r="10" style={{ opacity: 0.25 }} />
        <path d="m8.5 12.5 2.5 2.5 5-6" />
      </svg>
    );
  }
  if (type === "error") {
    return (
      <svg {...{ xmlns: "http://www.w3.org/2000/svg", width: 17, height: 17, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" }}>
        <circle cx="12" cy="12" r="10" style={{ opacity: 0.25 }} />
        <path d="M15 9l-6 6M9 9l6 6" />
      </svg>
    );
  }
  return (
    <svg {...{ xmlns: "http://www.w3.org/2000/svg", width: 17, height: 17, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" }}>
      <circle cx="12" cy="12" r="10" style={{ opacity: 0.25 }} />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

function ToastView({ toast }: { toast: ToastState }) {
  return (
    <div id="toast" className={"show " + toast.type} role="status" aria-live="polite">
      <ToastIcon type={toast.type} />
      <span>{toast.msg}</span>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const show = useCallback((msg: string, type: ToastType = "info") => {
    setToast({ key: Date.now(), msg, type });
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 4200);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toast && <ToastView key={toast.key} toast={toast} />}
    </ToastContext.Provider>
  );
}