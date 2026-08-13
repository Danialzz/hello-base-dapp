type Handler = () => void;

const handlers = new Map<string, Handler[]>();

export function on(event: string, fn: Handler): () => void {
  const list = handlers.get(event) ?? [];
  list.push(fn);
  handlers.set(event, list);
  return () => {
    const current = handlers.get(event) ?? [];
    handlers.set(
      event,
      current.filter((h) => h !== fn),
    );
  };
}

export function emit(event: string) {
  (handlers.get(event) ?? []).forEach((fn) => fn());
}