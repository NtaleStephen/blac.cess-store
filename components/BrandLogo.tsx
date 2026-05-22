interface BrandCrownProps {
  size?: number;
  color?: string;
  className?: string;
}

export function BrandCrown({
  size = 24,
  color = 'var(--color-accent)',
  className,
}: BrandCrownProps) {
  return (
    <svg
      width={size}
      height={Math.round((size * 52) / 60)}
      viewBox="0 0 60 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* W-shape crown outline */}
      <path
        d="M3,43 L12,8 L21,28 L30,1 L39,28 L48,8 L57,43"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="miter"
      />
      {/* Base band */}
      <rect x="3" y="43" width="54" height="8" stroke={color} strokeWidth="2.5" />
      {/* Diamond at center peak */}
      <polygon points="30,-1 33,2 30,5 27,2" fill={color} />
      {/* Diamond at left outer peak */}
      <polygon points="12,5.5 14.5,8 12,10.5 9.5,8" fill={color} />
      {/* Diamond at right outer peak */}
      <polygon points="48,5.5 50.5,8 48,10.5 45.5,8" fill={color} />
      {/* 4 diamond accents on base band */}
      <polygon points="14,44.5 15.5,47 14,49.5 12.5,47" fill={color} />
      <polygon points="25,44.5 26.5,47 25,49.5 23.5,47" fill={color} />
      <polygon points="35,44.5 36.5,47 35,49.5 33.5,47" fill={color} />
      <polygon points="46,44.5 47.5,47 46,49.5 44.5,47" fill={color} />
    </svg>
  );
}
