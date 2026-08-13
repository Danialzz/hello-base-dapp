import { useState, type MouseEvent } from "react";
import { copyText } from "../lib/utils";
import { useToast } from "./Toast";

interface CopyChipProps {
  label: string;
  full?: string;
  title?: string;
}

const COPY_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export default function CopyChip({ label, full, title = "Copy address" }: CopyChipProps) {
  const { show } = useToast();
  const [copied, setCopied] = useState(false);

  const onCopy = async (e: MouseEvent) => {
    e.stopPropagation();
    if (!full) return;
    const ok = await copyText(full);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
      show("Address copied", "success");
    } else {
      show("Couldn’t copy address", "error");
    }
  };

  return (
    <button
      className={"addr-chip" + (copied ? " copied" : "")}
      type="button"
      title={title}
      onClick={onCopy}
    >
      <span className="chip-dot"></span>
      {label}
      {COPY_ICON}
    </button>
  );
}