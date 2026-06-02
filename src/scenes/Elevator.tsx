import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  onNext: () => void;
}

export default function Elevator({ onNext }: Props) {
  const doneRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        onNext();
      }
    }, 4200);
    return () => clearTimeout(timer);
  }, [onNext]);

  // Generate floor stripes that scroll down
  const floors = Array.from({ length: 30 }, (_, i) => i);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Elevator shaft - floors scrolling by */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #1a0a0e 0%, #2d1b1b 50%, #1a0a0e 100%)" }}
        animate={{ y: [0, -2000] }}
        transition={{ duration: 3.5, ease: [0.1, 0.1, 0.8, 1.0] }}
      >
        {floors.map(i => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${i * 140}px`,
              left: 0,
              right: 0,
              height: "2px",
              background: "rgba(255,100,130,0.25)",
            }}
          />
        ))}
        {floors.map(i => (
          <div
            key={`n-${i}`}
            style={{
              position: "absolute",
              top: `${i * 140 + 20}px`,
              right: "24px",
              color: "rgba(255,100,130,0.4)",
              fontSize: "14px",
              fontFamily: "monospace",
            }}
          >
            {50 - i}
          </div>
        ))}
      </motion.div>

      {/* Blur + speed lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.3, 0.7, 1] }}
        transition={{ duration: 3.5, times: [0, 0.4, 0.6, 0.8, 1] }}
        style={{ backdropFilter: "blur(0px)" }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.5, 1] }}
        transition={{ duration: 3.5, times: [0, 0.5, 0.75, 1] }}
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,1) 100%)" }}
      />

      {/* Speed lines overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 0.6] }}
        transition={{ duration: 3.5, times: [0, 0.5, 0.7, 1] }}
        style={{
          backgroundImage: "repeating-linear-gradient(180deg, transparent, transparent 8px, rgba(255,100,130,0.08) 8px, rgba(255,100,130,0.08) 9px)",
          backgroundSize: "100% 18px",
        }}
      />

      {/* Elevator cage sides */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: "inset 0 0 80px rgba(0,0,0,0.8), inset 4px 0 20px rgba(0,0,0,0.5), inset -4px 0 20px rgba(0,0,0,0.5)"
      }} />

      {/* Center text */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0.5, 0] }}
        transition={{ duration: 3.5, times: [0, 0.4, 0.7, 1] }}
      >
        <motion.div
          className="text-6xl"
          animate={{ y: [0, -30, -80], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3.5, ease: "easeIn" }}
        >
          🛗
        </motion.div>
        <motion.p
          className="text-white/60 text-lg mt-4"
          style={{ fontFamily: "Georgia, serif" }}
          animate={{ opacity: [1, 0.5, 0] }}
          transition={{ duration: 2 }}
        >
          Опускаемся вниз...
        </motion.p>
      </motion.div>

      {/* Final black fade */}
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0, 1] }}
        transition={{ duration: 4.2, times: [0, 0.7, 0.85, 1] }}
      />
    </div>
  );
}
