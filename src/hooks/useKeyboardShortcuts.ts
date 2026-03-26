import { useEffect } from "react";

export function useKeyboardShortcuts(handlers: {
  onNewProject?: () => void;
  onEscape?: () => void;
}) {
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable;

      if (e.key === "Escape" && handlers.onEscape) {
        handlers.onEscape();
      }
      if (e.key === "n" && !isInput && !e.metaKey && !e.ctrlKey && handlers.onNewProject) {
        e.preventDefault();
        handlers.onNewProject();
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [handlers]);
}
