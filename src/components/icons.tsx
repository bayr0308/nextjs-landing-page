import type { SVGProps } from "react";

export function ArrowIcon({
  diagonal = false,
  ...props
}: SVGProps<SVGSVGElement> & { diagonal?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function PinIcon() {
  return (
    <svg width="15" height="18" viewBox="0 0 18 20" fill="none" aria-hidden="true">
      <path
        d="M15 8c0 4.5-6 10-6 10S3 12.5 3 8a6 6 0 1 1 12 0Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="9" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="#top"
      className={`brand ${footer ? "brand-footer" : ""}`}
      aria-label="ГРАНЬ Девелопмент — в начало страницы"
    >
      <span className="brand-name">
        ГРАНЬ
        <span className="brand-mark" aria-hidden="true" />
      </span>
      <span className="brand-description">девелопмент</span>
    </a>
  );
}
