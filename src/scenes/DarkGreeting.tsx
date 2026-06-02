import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playJoy } from "../lib/audio";

interface Props {
  onNext: () => void;
}

export default function DarkGreeting({ onNext }: Props) {
  const [phase, setPhase] = useState<"text" | "choice" | "emoji" | "done">("text");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("choice"), 2500);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase === "emoji") {
      playJoy();
      const t = setTimeout(() => {
        setPhase("done");
        setTimeout(onNext, 800);
      }, 2800);
      return () => clearTimeout(t);
    }
  }, [phase, onNext]);

  function handleAnswer() {
    setPhase("emoji");
  }

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black"
      style={{ background: "radial-gradient(ellipse at 50% 50%, #120008 0%, #000000 100%)" }}
    >
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center px-8 text-center max-w-sm w-full">
        <AnimatePresence>
          {(phase === "text" || phase === "choice") && (
            <motion.div
              key="greeting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-4xl font-bold mb-3"
                style={{
                  fontFamily: "Georgia, serif",
                  color: "white",
                  textShadow: "0 0 30px rgba(255,100,130,0.6)",
                }}
              >
                Привет, любимая! 💝
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="text-pink-200 text-2xl mb-10"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Как у тебя дела?
              </motion.p>

              {phase === "choice" && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  onClick={handleAnswer}
                  className="w-full py-4 rounded-2xl text-xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, #ff4d79, #c62a47)",
                    color: "white",
                    boxShadow: "0 0 30px rgba(255,77,121,0.5), 0 6px 24px rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255,150,170,0.3)",
                  }}
                >
                  🔥 Заебись!
                </motion.button>
              )}
            </motion.div>
          )}

          {(phase === "emoji" || phase === "done") && (
            <motion.div
              key="emoji"
              className="flex items-center justify-center"
              style={{ minHeight: "200px" }}
            >
              <motion.span
                style={{ fontSize: "80px", display: "block" }}
                initial={{ scale: 0, rotate: 0, opacity: 0 }}
                animate={
                  phase === "emoji"
                    ? { scale: [0, 2.5, 2.5, 0.5, 0], rotate: [0, 720], opacity: [0, 1, 1, 1, 0] }
                    : { scale: 0, opacity: 0 }
                }
                transition={{
                  duration: 2.8,
                  times: [0, 0.2, 0.6, 0.85, 1],
                  ease: "easeInOut",
                }}
              >
                🥳
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
