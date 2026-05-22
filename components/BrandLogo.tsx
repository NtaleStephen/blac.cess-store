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
      height={Math.round((size * 70) / 100)}
      viewBox="0 0 100 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Center peak — outlined isosceles triangle */}
      <path
        d="M50,4 L63,47 L37,47 Z"
        stroke={color}
        strokeWidth="2.8"
        strokeLinejoin="miter"
      />
      {/* Center peak inner diamond */}
      <path d="M50,12 L53.5,15.5 L50,19 L46.5,15.5 Z" fill={color} />

      {/* Left outer peak — outlined triangle, leaning outward */}
      <path
        d="M13,18 L32,47 L4,47 Z"
        stroke={color}
        strokeWidth="2.8"
        strokeLinejoin="miter"
      />
      {/* Left outer peak diamond accent */}
      <path d="M13,25 L15.5,28 L13,31 L10.5,28 Z" fill={color} />

      {/* Right outer peak — mirror of left */}
      <path
        d="M87,18 L96,47 L68,47 Z"
        stroke={color}
        strokeWidth="2.8"
        strokeLinejoin="miter"
      />
      {/* Right outer peak diamond accent */}
      <path d="M87,25 L89.5,28 L87,31 L84.5,28 Z" fill={color} />

      {/* Base band — outlined rectangle */}
      <rect
        x="2"
        y="47"
        width="96"
        height="17"
        stroke={color}
        strokeWidth="2.8"
        fill="none"
      />

      {/* 4 filled diamond motifs inside the base band */}
      <path d="M19,51 L23,55.5 L19,60 L15,55.5 Z" fill={color} />
      <path d="M40,51 L44,55.5 L40,60 L36,55.5 Z" fill={color} />
      <path d="M60,51 L64,55.5 L60,60 L56,55.5 Z" fill={color} />
      <path d="M81,51 L85,55.5 L81,60 L77,55.5 Z" fill={color} />
    </svg>
  );
}
