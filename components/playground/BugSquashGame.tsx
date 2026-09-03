"use client";

import { Bug as BugIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

const GAME_DURATION = 30;
const BUG_LIFESPAN = 1400;
const BUG_SIZE = 56;
const SPAWN_INTERVAL_START = 900;
const SPAWN_INTERVAL_MIN = 450;
const BEST_KEY = "bug-squash-best";

interface LiveBug {
  id: number;
  left: number;
  top: number;
}

type GameState = "idle" | "playing" | "ended";

/**
 * A 30-second reflex game — click the bugs before they escape. Spawn rate
 * ramps up over the round for a light difficulty curve. Score persists a
 * personal best via localStorage; nothing server-side, matching how the
 * rest of the site's small client-only state (cookie notice, language
 * choice) is kept.
 */
export function BugSquashGame() {
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState<GameState>("idle");
  const [bugs, setBugs] = useState<LiveBug[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [best, setBest] = useState<number | null>(null);

  const nextId = useRef(0);
  const spawnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bugTimeoutsRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
  const startTimeRef = useRef(0);

  useEffect(() => {
    const stored = localStorage.getItem(BEST_KEY);
    if (stored) setBest(Number(stored));
  }, []);

  const removeBug = useCallback((id: number) => {
    setBugs((prev) => prev.filter((b) => b.id !== id));
    const t = bugTimeoutsRef.current.get(id);
    if (t) {
      clearTimeout(t);
      bugTimeoutsRef.current.delete(id);
    }
  }, []);

  const spawnBug = useCallback(() => {
    const id = nextId.current++;
    const left = 10 + Math.random() * 80;
    const top = 14 + Math.random() * 70;
    setBugs((prev) => [...prev, { id, left, top }]);
    bugTimeoutsRef.current.set(
      id,
      setTimeout(() => removeBug(id), BUG_LIFESPAN),
    );
  }, [removeBug]);

  const scheduleNextSpawn = useCallback(() => {
    const elapsed = (performance.now() - startTimeRef.current) / 1000;
    const progress = Math.min(elapsed / GAME_DURATION, 1);
    const interval =
      SPAWN_INTERVAL_START - (SPAWN_INTERVAL_START - SPAWN_INTERVAL_MIN) * progress;
    spawnTimeoutRef.current = setTimeout(() => {
      spawnBug();
      scheduleNextSpawn();
    }, interval);
  }, [spawnBug]);

  const endGame = useCallback(() => {
    setState("ended");
    if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
    bugTimeoutsRef.current.forEach((t) => clearTimeout(t));
    bugTimeoutsRef.current.clear();
    setBugs([]);
    setScore((current) => {
      setBest((prevBest) => {
        if (prevBest === null || current > prevBest) {
          localStorage.setItem(BEST_KEY, String(current));
          return current;
        }
        return prevBest;
      });
      return current;
    });
  }, []);

  function startGame() {
    setScore(0);
    setBugs([]);
    setTimeLeft(GAME_DURATION);
    setState("playing");
    startTimeRef.current = performance.now();
    scheduleNextSpawn();
  }

  useEffect(() => {
    if (state !== "playing") return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [state, endGame]);

  useEffect(() => {
    return () => {
      if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current);
      bugTimeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  function squash(id: number) {
    setScore((s) => s + 1);
    removeBug(id);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between text-xs tracking-normal text-muted-foreground lowercase">
        <span>score: {score}</span>
        {best !== null ? <span>best: {best}</span> : null}
        <span>{state === "playing" ? `${timeLeft}s` : `${GAME_DURATION}s`}</span>
      </div>

      <div className="relative mt-4 h-105 w-full overflow-hidden rounded-lg border border-border bg-muted">
        {state !== "playing" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            {state === "ended" ? (
              <>
                <p className="font-heading text-3xl">{score} squashed.</p>
                <p className="text-sm text-muted-foreground">
                  {best !== null && score >= best
                    ? "New best."
                    : "Try to beat your best."}
                </p>
              </>
            ) : (
              <>
                <p className="font-heading text-3xl">Bug Squash</p>
                <p className="max-w-xs text-sm text-muted-foreground">
                  Click the bugs before they get away. {GAME_DURATION} seconds. Go.
                </p>
              </>
            )}
            <button
              type="button"
              onClick={startGame}
              className="mt-2 inline-flex items-center rounded-full bg-cta px-6 py-2.5 text-xs text-cta-foreground lowercase transition-transform duration-150 hover:scale-105 active:scale-95"
            >
              {state === "ended" ? "play again" : "start"}
            </button>
          </div>
        ) : (
          bugs.map((bug) => (
            <button
              key={bug.id}
              type="button"
              onClick={() => squash(bug.id)}
              aria-label="Squash bug"
              className={cn(
                "absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-100 active:scale-90",
                !reducedMotion && "animate-in fade-in zoom-in-75 duration-150",
              )}
              style={{
                left: `${bug.left}%`,
                top: `${bug.top}%`,
                width: BUG_SIZE,
                height: BUG_SIZE,
              }}
            >
              <BugIcon className="size-6" />
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default BugSquashGame;
