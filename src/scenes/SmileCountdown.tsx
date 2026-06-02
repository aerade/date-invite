import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onNext: () => void;
}

export default function SmileCountdown({ onNext }: Props) {
  const [step, setStep] = useState(0);
  // steps: 0=text, 1=3, 2=2, 3=1, 4=done

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 2000),
      setTimeout(() => setStep(2), 3200),
      setTimeout(() => setStep(3), 4400),
      setTimeout(() => { setStep(4); setTimeout(onNext, 400); }, 5600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onNext]);

  const numbers = ["3", "2", "1"];

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: "radial-gradient(ellipse at 50% 50%, #ff6b8a 0%, #c62a47 40%, #7b0a2d 100%)" }}
    >
      {/* Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 4 + Math.random() * 6,
            height: 4 + Math.random() * 6,
            background: "rgba(255,255,255,0.6)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="text"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="text-6xl">📸</div>
              <h2
                className="text-3xl font-bold text-white leading-snug"
                style={{ fontFamily: "Georgia, serif", textShadow: "0 2px 16px rgba(0,0,0,0.4)" }}
              >
                Отлично, а теперь<br/>улыбнись на счёт:
              </h2>
              <p className="text-pink-200 text-lg">Готова? 😊</p>
            </motion.div>
          )}

          {step >= 1 && step <= 3 && (
            <motion.div
              key={`num-${step}`}
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 250, damping: 15 }}
              className="flex flex-col items-center"
            >
              <span
                style={{
                  fontSize: "160px",
                  fontWeight: "900",
                  color: "white",
                  textShadow: "0 0 60px rgba(255,150,180,0.8), 0 4px 20px rgba(0,0,0,0.4)",
                  lineHeight: 1,
                  fontFamily: "Georgia, serif",
                }}
              >
                {numbers[step - 1]}
              </span>
              <motion.p
                className="text-pink-200 text-xl mt-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                {step === 3 ? "СНИМАЮ! 📸" : "..."}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
