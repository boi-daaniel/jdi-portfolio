import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import "./StartupIntro.css";

type StartupIntroProps = {
  active: boolean;
  onComplete: () => void;
};

const INTRO_DURATION_MS = 3200;

export default function StartupIntro({ active, onComplete }: StartupIntroProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 400 : INTRO_DURATION_MS;
    const start = performance.now();
    let frameId = 0;

    const tick = (timestamp: number) => {
      const elapsed = timestamp - start;
      const nextProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(nextProgress);

      if (elapsed < duration) {
        frameId = window.requestAnimationFrame(tick);
        return;
      }

      onComplete();
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [active, onComplete]);

  const progressLabel = useMemo(() => `${Math.round(progress).toString().padStart(2, "0")}`, [progress]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="startup-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="startup-intro__backdrop" />
          <motion.div
            className="startup-intro__grid"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 0.8 }}
          />

          <div className="startup-intro__content">
            <motion.div
              className="startup-intro__eyebrow"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.12 }}
            >
              Portfolio Initialization
            </motion.div>

            <motion.div
              className="startup-intro__mark"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
            >
              <span>JDI</span>
              <span className="startup-intro__dot" />
            </motion.div>

            <motion.div
              className="startup-intro__caption"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.3 }}
            >
              Loading interface and motion systems
            </motion.div>

            <motion.div
              className="startup-intro__meter"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.42 }}
            >
              <div className="startup-intro__track">
                <motion.div
                  className="startup-intro__fill"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.08 }}
                />
              </div>
              <div className="startup-intro__meta">
                <span>Boot Sequence</span>
                <span>{progressLabel}%</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="startup-intro__panel startup-intro__panel--top"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1], delay: 0.18 }}
          />
          <motion.div
            className="startup-intro__panel startup-intro__panel--bottom"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1], delay: 0.18 }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
