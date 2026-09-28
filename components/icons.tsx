import type { SVGProps } from "react";

// Thin-line icons that Lucide doesn't provide, drawn to match its 24px grid.
type IconProps = SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number };

function Svg({ size = 24, strokeWidth = 1.25, children, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function DressForm(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 1.75v2" />
      <path d="M8.25 3.75h7.5" />
      <path d="M8.25 3.75c-.5 2.4-.35 4.2 1 5.9-1.2 1.6-1.75 3.4-1.4 5.6h8.3c.35-2.2-.2-4-1.4-5.6 1.35-1.7 1.5-3.5 1-5.9" />
      <path d="M9.25 9.65c1.7.6 3.8.6 5.5 0" />
      <path d="M12 15.25v5.5" />
      <path d="M8.75 22.25 12 20.75l3.25 1.5" />
    </Svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function Facebook(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M17.5 2.75h-2.75a4.25 4.25 0 0 0-4.25 4.25v3H7.75v3.5h2.75v7.75h3.5V13.5h2.9l.6-3.5h-3.5V7.25c0-.7.55-1 1.1-1h2.4z" />
    </Svg>
  );
}

export function TikTok(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M13.75 2.75v12.1a3.6 3.6 0 1 1-3.6-3.6" />
      <path d="M13.75 2.75c.3 2.9 2.35 4.95 5.25 5.25" />
    </Svg>
  );
}
