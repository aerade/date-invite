import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { stopBackgroundMusic } from "../lib/audio";

interface Props {
  onNext: () => void;
}

export default function Curtains({ onNext }: Props) {
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    // Stop bg music and play the curtain track
    stopBackgroundMusic();
    const curtainAudio = new Audio("curtain-music.mp3");
    curtainAudio.volume = 0.9;
    curtainAudio.play().catch(() => {});

    const t1 = setTimeout(() => setClosed(true), 500);
    const t2 = setTimeout(() => onNext(), 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onNext]);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "#0a0005" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% -20%, rgba(255,150,100,0.15) 0%, transparent 60%)",
        }}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ opacity: closed ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-white/40 text-2xl" style={{ fontFamily: "Georgia, serif" }}>
          Конец?.. 🎭
        </p>
      </motion.div>

      {/* Left curtain */}
      <motion.div
        className="absolute inset-y-0 left-0"
        style={{
          width: "55%",
          background: "linear-gradient(180deg, #8b0000 0%, #c62a20 30%, #8b0000 70%, #5a0000 100%)",
          transformOrigin: "left center",
          boxShadow: "inset -20px 0 40px rgba(0,0,0,0.5), 4px 0 20px rgba(0,0,0,0.6)",
        }}
        initial={{ x: "-100%" }}
        animate={{ x: closed ? 0 : "-100%" }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
      >
        {[12, 25, 38, 51, 64, 77, 90].map(pct => (
          <div key={pct} className="absolute inset-y-0"
            style={{ left: `${pct}%`, width: "8%", background: "rgba(0,0,0,0.2)", borderRadius: "50%" }}
          />
        ))}
        <div className="absolute top-0 left-0 right-0"
          style={{ height: "40px", background: "linear-gradient(180deg, #6b0000, #8b0000)", borderBottom: "3px solid rgba(255,200,100,0.4)" }}
        />
        <div className="absolute top-[37px] left-0 right-0 flex justify-around">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ width: "3px", height: "20px", background: "rgba(255,200,100,0.5)", borderRadius: "2px" }} />
          ))}
        </div>
      </motion.div>

      {/* Right curtain */}
      <motion.div
        className="absolute inset-y-0 right-0"
        style={{
          width: "55%",
          background: "linear-gradient(180deg, #8b0000 0%, #c62a20 30%, #8b0000 70%, #5a0000 100%)",
          transformOrigin: "right center",
          boxShadow: "inset 20px 0 40px rgba(0,0,0,0.5), -4px 0 20px rgba(0,0,0,0.6)",
        }}
        initial={{ x: "100%" }}
        animate={{ x: closed ? 0 : "100%" }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
      >
        {[12, 25, 38, 51, 64, 77, 90].map(pct => (
          <div key={pct} className="absolute inset-y-0"
            style={{ left: `${pct}%`, width: "8%", background: "rgba(0,0,0,0.2)", borderRadius: "50%" }}
          />
        ))}
        <div className="absolute top-0 left-0 right-0"
          style={{ height: "40px", background: "linear-gradient(180deg, #6b0000, #8b0000)", borderBottom: "3px solid rgba(255,200,100,0.4)" }}
        />
        <div className="absolute top-[37px] left-0 right-0 flex justify-around">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ width: "3px", height: "20px", background: "rgba(255,200,100,0.5)", borderRadius: "2px" }} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
