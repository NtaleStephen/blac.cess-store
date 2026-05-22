import Image from 'next/image';

interface BrandCrownProps {
  /** width in px — height is derived from the logo's aspect ratio */
  size?: number;
  className?: string;
  priority?: boolean;
}

const ASPECT = 571 / 386; // intrinsic width / height of /brand/crown.png

export function BrandCrown({ size = 24, className, priority = false }: BrandCrownProps) {
  const width = size;
  const height = Math.round(size / ASPECT);
  return (
    <Image
      src="/brand/crown.png"
      alt=""
      width={width}
      height={height}
      priority={priority}
      aria-hidden="true"
      className={className}
      style={{ width, height }}
    />
  );
}
