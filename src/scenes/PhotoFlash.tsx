import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCameraShutter } from "../lib/audio";

interface Props {
  onNext: () => void;
}

export default function PhotoFlash({ onNext }: Props) {
  const [phase, setPhase] = useState<"show" | "flash" | "done">("show");

  useEffect(() => {
    // Step 1: show photographer for 1.8s so she sees it clearly
    const t1 = setTimeout(() => {
      playCameraShutter();
      setPhase("flash");
    }, 1800);
    // Step 2: flash fades after 500ms, stay a bit then go
    const t2 = setTimeout(() => {
      setPhase("done");
      onNext();
    }, 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onNext]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden flex items-center justify-center">
      {/* Photographer image — always visible */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, type: "spring", stiffness: 180 }}
      >
        <img
          src="/photographer.png"
          alt="photographer"
          className="max-w-full max-h-full object-contain"
          style={{ maxHeight: "80vh", maxWidth: "90vw" }}
        />

        {/* "Taking photo" label */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div
            className="px-5 py-2 rounded-full text-white font-semibold text-lg"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            📸 Снимаю!
          </div>
        </motion.div>
      </motion.div>

      {/* Camera flash overlay — appears AFTER photographer is shown */}
      <AnimatePresence>
        {phase === "flash" && (
          <motion.div
            key="flash"
            className="absolute inset-0 bg-white pointer-events-none z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* Viewfinder corners */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
        <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/40" />
        <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/40" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/40" />
        <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/40" />
      </div>
    </div>
  );
}
