/* NUVEL — logo (three bars). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} width="40" height="24" viewBox="0 0 44 26" fill="none" aria-hidden="true">
      <rect x="0" y="3" width="14" height="20" rx="3" fill="#fff" />
      <rect x="16" y="3" width="12" height="20" rx="3" fill="#fff" />
      <rect x="30" y="3" width="14" height="20" rx="3" fill="#fff" />
    </svg>
  );
}
