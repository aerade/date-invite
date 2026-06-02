import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { startBackgroundMusic, unlockAudio } from "../lib/audio";

interface Props {
  onNext: () => void;
}

const HEARTS = ["❤️","💕","💗","💖","💓","🌹","✨","💝","🌸","💞"];

function FloatingHeart({ delay, x, emoji }: { delay: number; x: number; emoji: string }) {
  return (
    <motion.span
      className="absolute text-2xl select-none pointer-events-none"
      style={{ left: `${x}%`, bottom: "-5%" }}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 1, 1, 0], y: "-110vh" }}
      transition={{ duration: 6 + Math.random() * 4, delay, repeat: Infinity, repeatDelay: Math.random() * 4, ease: "linear" }}
    >
      {emoji}
    </motion.span>
  );
}

export default function Welcome({ onNext }: Props) {
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const laughRef = useRef<HTMLAudioElement | null>(null);
  const laughPlayingRef = useRef(false);
  const laughCutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function evadeNo(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();

    // Play laugh only if previous sound has fully finished
    if (!laughPlayingRef.current) {
      const audio = new Audio("laugh.mp3");
      audio.volume = 0.85;
      laughRef.current = audio;
      laughPlayingRef.current = true;

      audio.onended = () => {
        laughPlayingRef.current = false;
        if (laughCutTimerRef.current) clearTimeout(laughCutTimerRef.current);
      };
      audio.onerror = () => { laughPlayingRef.current = false; };
      audio.play().catch(() => { laughPlayingRef.current = false; });

      // Cut the laugh sound after 2 seconds
      laughCutTimerRef.current = setTimeout(() => {
        if (laughRef.current) {
          laughRef.current.pause();
          laughRef.current.currentTime = 0;
        }
        laughPlayingRef.current = false;
      }, 2000);
    }

    // Bigger spread on click: 90–160px in a random direction
    const angle = Math.random() * Math.PI * 2;
    const dist = 90 + Math.random() * 70;
    setNoOffset({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist });
    setTimeout(() => setNoOffset({ x: 0, y: 0 }), 750);
  }

  function handleYes() {
    // Stop laugh sound immediately
    if (laughCutTimerRef.current) clearTimeout(laughCutTimerRef.current);
    if (laughRef.current) {
      laughRef.current.pause();
      laughRef.current.currentTime = 0;
      laughPlayingRef.current = false;
    }
    unlockAudio();
    startBackgroundMusic();
    onNext();
  }

  const hearts = Array.from({ length: 18 }, (_, i) => ({
    delay: i * 0.6,
    x: 5 + (i * 5.5) % 92,
    emoji: HEARTS[i % HEARTS.length],
  }));

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden select-none"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, #ff6b8a 0%, #c62a47 40%, #7b0a2d 100%)",
      }}
    >
      {hearts.map((h, i) => <FloatingHeart key={i} {...h} />)}

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(255,105,135,0.18) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="text-7xl mb-2"
        >
          💌
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-white text-4xl font-bold mt-3 leading-tight"
          style={{ fontFamily: "'Georgia', serif", textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
        >
          У меня есть к тебе<br />очень важный вопрос ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-pink-100 text-xl mt-4 mb-10"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
        >
          Только отвечай честно 😏
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, type: "spring", stiffness: 180 }}
          className="bg-white/15 backdrop-blur-sm rounded-3xl px-8 py-8 w-full max-w-sm shadow-2xl border border-white/30"
        >
          <p className="text-white text-2xl font-semibold mb-8" style={{ fontFamily: "'Georgia', serif" }}>
            Ты готова к небольшому сюрпризу? 🎁
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYes}
            className="w-full py-4 rounded-2xl text-xl font-bold mb-4 shadow-lg"
            style={{
              background: "linear-gradient(135deg, #ff4d79, #c62a47)",
              color: "white",
              textShadow: "0 1px 4px rgba(0,0,0,0.3)",
              boxShadow: "0 6px 24px rgba(198,42,71,0.5)",
            }}
          >
            Да, конечно! 💕
          </motion.button>

          {/* NO button — moves only on click/tap, no hover reaction */}
          <div style={{ position: "relative", height: "52px" }}>
            <motion.button
              animate={{ x: noOffset.x, y: noOffset.y }}
              transition={{ type: "spring", stiffness: 450, damping: 16 }}
              onTouchStart={evadeNo}
              onClick={evadeNo}
              className="py-3 rounded-2xl text-lg font-semibold"
              style={{
                background: "rgba(255,255,255,0.18)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.35)",
                cursor: "pointer",
                width: "100%",
                position: "absolute",
                left: 0,
                top: 0,
              }}
            >
              Нет
            </motion.button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2 }}
          className="text-pink-100 text-sm mt-6"
        >
          Подсказка: кнопка «Нет» не работает 😈
        </motion.p>
      </div>
    </div>
  );
}
