/**
 * Deterministic pseudo-random helpers for generated cover art.
 *
 * No Math.random(), no Date.now() — SSR and hydrated client output must be
 * byte-identical, so every value here is a pure function of the seed string.
 */

function hashString(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return hash >>> 0;
}

/** mulberry32 — small, fast, deterministic PRNG seeded by a 32-bit int. */
function mulberry32(seed: number) {
  let a = seed;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface CoverArtBlueprint {
  id: string;
  angle: number;
  blobs: { cx: number; cy: number; r: number; opacity: number }[];
}

/** Pure — same seed always produces the same blueprint. */
export function buildCoverArt(seed: string): CoverArtBlueprint {
  const hash = hashString(seed);
  const rand = mulberry32(hash);
  const angle = Math.round(rand() * 360);
  const blobs = Array.from({ length: 3 }, () => ({
    cx: 12 + rand() * 76,
    cy: 12 + rand() * 76,
    r: 22 + rand() * 30,
    opacity: 0.28 + rand() * 0.22,
  }));
  return { id: `cover-${hash}`, angle, blobs };
}
