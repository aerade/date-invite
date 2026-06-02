import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playAww } from "../lib/audio";

interface Props {
  onNext: () => void;
}

export default function CatPhoto({ onNext }: Props) {
  const [showOops, setShowOops] = useState(false);

  useEffect(() => {
    playAww();
    const t1 = setTimeout(() => setShowOops(true), 2800);
    const t2 = setTimeout(() => onNext(), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onNext]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fff0f5, #ffe4ef)" }}
    >
      {/* Sparkles */}
      {["✨", "💖", "🌸", "💕", "⭐"].map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl pointer-events-none"
          style={{ left: `${10 + i * 18}%`, top: `${5 + (i % 3) * 8}%` }}
          animate={{
            y: [0, -15, 0],
            rotate: [-10, 10, -10],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
        >
          {s}
        </motion.span>
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 12 }}
        className="relative"
      >
        <img
          src="cat.png"
          alt="cute cat"
          className="rounded-3xl shadow-2xl"
          style={{
            maxWidth: "85vw",
            maxHeight: "60vh",
            objectFit: "cover",
            border: "4px solid rgba(198,42,71,0.2)",
          }}
        />

        {/* Adoration particles */}
        {["💕","❤️","💗","💖"].map((h, i) => (
          <motion.span
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${-10 + i * 30}%`,
              top: `${-5 + (i % 2) * 5}%`,
            }}
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], y: -60, scale: [0, 1.3, 0.8, 0] }}
            transition={{ duration: 2, delay: 0.3 + i * 0.3, repeat: Infinity, repeatDelay: 1.5 }}
          >
            {h}
          </motion.span>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-2xl font-bold mt-5 text-center"
        style={{ color: "#c62a47", fontFamily: "Georgia, serif" }}
      >
        Какой милый котик! 😻
      </motion.p>

      <AnimatePresence>
        {showOops && (
          <motion.div
            key="oops"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 15 }}
            className="mt-4 px-6 py-3 rounded-2xl shadow-lg"
            style={{
              background: "linear-gradient(135deg, #ff4d79, #c62a47)",
              color: "white",
            }}
          >
            <p className="text-xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
              Ой, случайно.. 😅
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
