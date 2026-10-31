import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 18, ...props }: IconProps, children: ReactNode) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const EnvelopeIcon = (props: IconProps) =>
  base(
    props,
    <>
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.5" />
      <path d="m3.6 6.3 8.4 6.2 8.4-6.2" />
      <path d="M3.4 18l5.9-6.1M20.6 18l-5.9-6.1" opacity=".45" />
    </>,
  );

export const HeartIcon = (props: IconProps) =>
  base(props, <path d="M12 20.4s-7.9-4.6-7.9-10.1A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.9 2.7c0 5.5-7.9 10.1-7.9 10.1Z" />);

export const FilledHeartIcon = ({ size = 18, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 21s-8.5-5-8.5-11A4.9 4.9 0 0 1 12 6.4 4.9 4.9 0 0 1 20.5 10c0 6-8.5 11-8.5 11Z" />
  </svg>
);

export const MusicIcon = (props: IconProps) =>
  base(
    props,
    <>
      <path d="M9 17.5V6.4l10-2.1v11" />
      <circle cx="6.3" cy="18" r="2.8" />
      <circle cx="16.3" cy="15.8" r="2.8" />
      <path d="M9 10.4 19 8.3" opacity=".5" />
    </>,
  );

export const MusicOffIcon = (props: IconProps) =>
  base(
    props,
    <>
      <path d="M9 17.5V6.4l10-2.1v11" />
      <circle cx="6.3" cy="18" r="2.8" />
      <circle cx="16.3" cy="15.8" r="2.8" />
      <path d="m3.5 3.5 17 17" />
    </>,
  );

export const PlayIcon = ({ size = 18, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M8.6 5.2c0-.9 1-1.4 1.7-.9l8.2 5.6c.7.5.7 1.5 0 2l-8.2 5.8c-.8.5-1.7 0-1.7-.9V5.2Z" />
  </svg>
);

export const PauseIcon = ({ size = 18, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <rect x="6.5" y="4.5" width="4" height="15" rx="1.4" />
    <rect x="13.5" y="4.5" width="4" height="15" rx="1.4" />
  </svg>
);

export const RestartIcon = (props: IconProps) =>
  base(
    props,
    <>
      <path d="M4.2 9.6A8 8 0 1 1 4 14" />
      <path d="M4 4.5v5.2h5.2" />
    </>,
  );

export const MapPinIcon = (props: IconProps) =>
  base(
    props,
    <>
      <path d="M20 10.2c0 5.4-8 12-8 12s-8-6.6-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.9" />
    </>,
  );

export const CalendarIcon = (props: IconProps) =>
  base(
    props,
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="3" />
      <path d="M3.5 9.7h17M8 2.8v4.3M16 2.8v4.3" />
      <path d="M7.5 13.5h3M13.5 13.5h3M7.5 17.5h3M13.5 17.5h3" opacity=".6" />
    </>,
  );

export const ClockIcon = (props: IconProps) =>
  base(
    props,
    <>
      <circle cx="12" cy="12.4" r="8.8" />
      <path d="M12 7.4v5.2l3.4 2" />
      <path d="M9.6 2.5h4.8" />
    </>,
  );

export const GlobeIcon = (props: IconProps) =>
  base(
    props,
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.3 9.6h17.4M3.3 14.4h17.4" opacity=".65" />
      <path d="M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3Z" />
    </>,
  );

export const ArrowDownIcon = (props: IconProps) =>
  base(
    props,
    <>
      <path d="M12 4v15" />
      <path d="m6.5 13.5 5.5 5.5 5.5-5.5" />
    </>,
  );

export const ChevronDownIcon = (props: IconProps) =>
  base(props, <path d="m5.5 9 6.5 6.5L18.5 9" />);

export const ExternalLinkIcon = (props: IconProps) =>
  base(
    props,
    <>
      <path d="M14 4.5h5.5V10" />
      <path d="M19.5 4.5 11 13" />
      <path d="M19 14.5v3a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 17.5v-9A2.5 2.5 0 0 1 7.5 6h3" />
    </>,
  );

export const CompassIcon = (props: IconProps) =>
  base(
    props,
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.6 8.4-2 5.2-5.2 2 2-5.2 5.2-2Z" />
    </>,
  );

export const ArrowUpIcon = (props: IconProps) =>
  base(
    props,
    <>
      <path d="M12 20V5" />
      <path d="M6.5 10.5 12 5l5.5 5.5" />
    </>,
  );

export const SparkleIcon = (props: IconProps) =>
  base(
    props,
    <>
      <path d="M12 3.5c.6 4.6 3 7 7.5 7.6-4.5.6-6.9 3-7.5 7.6-.6-4.6-3-7-7.5-7.6 4.5-.6 6.9-3 7.5-7.6Z" />
      <path d="M18.5 16.5c.3 1.7 1 2.5 2.7 2.8-1.7.3-2.4 1-2.7 2.7-.3-1.7-1-2.4-2.7-2.7 1.7-.3 2.4-1.1 2.7-2.8Z" opacity=".6" />
    </>,
  );

export const CheckIcon = (props: IconProps) => base(props, <path d="m5 12.5 4.5 4.5L19 6.5" />);
