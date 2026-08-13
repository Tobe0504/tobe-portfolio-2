import Image from "next/image";

import { buildCoverArt } from "@/lib/content/cover-art";
import type { CoverArtSpec } from "@/lib/content/types";
import { cn } from "@/lib/utils";

interface CoverArtProps extends CoverArtSpec {
  /** Falls back to `seed` on the spec; one of the two must be given. */
  fallbackSeed?: string;
  className?: string;
  /** Real screenshots only render sharp if the `sizes` hint matches how
   * wide this instance actually renders — a generous default that
   * undersells the true render width makes Next serve a smaller srcset
   * candidate than needed, which the browser then has to upscale.
   * Callers whose layout isn't close to the default should pass their own. */
  sizes?: string;
}

/**
 * Cover imagery for a project — a real screenshot when `image` is set,
 * otherwise the generated placeholder (a soft gradient plane with a few
 * blurred accent blobs, deterministically derived from a seed string so the
 * server-rendered and hydrated markup always match exactly). Projects with
 * no public deployment just never get an `image`, which is the point: the
 * generated art is a permanent fallback, not a temporary stand-in to clear
 * out later.
 */
export function CoverArt({
  seed,
  fallbackSeed,
  accent,
  image,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: CoverArtProps) {
  const resolvedSeed = seed ?? fallbackSeed ?? String(accent);

  if (image) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden", className)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="object-cover object-center"
        />
      </div>
    );
  }

  const { id, angle, blobs } = buildCoverArt(resolvedSeed);
  const color = `var(--cover-${accent})`;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${id}-grad`}
          gradientTransform={`rotate(${angle} 0.5 0.5)`}
        >
          <stop offset="0%" stopColor={color} stopOpacity={1} />
          <stop offset="100%" stopColor={color} stopOpacity={0.5} />
        </linearGradient>
        <filter id={`${id}-blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>
      <rect width="100" height="100" fill={`url(#${id}-grad)`} />
      <g filter={`url(#${id}-blur)`}>
        {blobs.map((b, i) => (
          <circle
            key={i}
            cx={b.cx}
            cy={b.cy}
            r={b.r}
            fill="black"
            opacity={b.opacity * 0.35}
          />
        ))}
      </g>
    </svg>
  );
}

export default CoverArt;
