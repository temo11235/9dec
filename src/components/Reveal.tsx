import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
  reducedMotion?: boolean;
};

/** Fades content in once as it enters the viewport. */
export function Reveal({ children, className = "", delay = 0, reducedMotion = false }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={`reveal ${delay ? `reveal-delay-${delay}` : ""} ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
