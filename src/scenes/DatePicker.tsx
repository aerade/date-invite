import { useState } from "react";
import { motion } from "framer-motion";
import { DayPicker } from "react-day-picker";
import { ru } from "date-fns/locale";
import "react-day-picker/dist/style.css";

interface Props {
  onNext: (date: string, time: string) => void;
}

const TIMES = [
  "11:00", "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00",
];

export default function DatePicker({ onNext }: Props) {
  const [selected, setSelected] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!selected) { setError("Выбери дату 📅"); return; }
    if (!time) { setError("Выбери время ⏰"); return; }
    const dateStr = selected.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
    localStorage.setItem("dateInvite_date", dateStr);
    localStorage.setItem("dateInvite_time", time);
    onNext(dateStr, time);
  }

  const disabledDays = { before: new Date() };

  return (
    <div
      className="min-h-screen w-full overflow-auto"
      style={{ background: "linear-gradient(160deg, #fff0f5 0%, #ffe0eb 50%, #ffd0e4 100%)" }}
    >
      {/* Floating hearts bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {["❤️","💕","🌸","✨","💖","🌹","💗"].map((emoji, i) => (
          <motion.span
            key={i}
            className="absolute text-xl"
            style={{ left: `${10 + i * 13}%`, top: "-10%" }}
            animate={{ y: "110vh", opacity: [0, 0.6, 0] }}
            transition={{ duration: 8 + i * 1.5, repeat: Infinity, delay: i * 1.2, ease: "linear" }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 py-8 max-w-sm mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="text-5xl mb-2"
        >
          📅
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center mb-1"
          style={{ fontFamily: "Georgia, serif", color: "#c62a47" }}
        >
          Когда ты свободна?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-pink-500 text-base text-center mb-5"
        >
          Выбери удобную дату и время 🌹
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full rounded-3xl overflow-hidden shadow-xl mb-4"
          style={{
            background: "white",
            border: "2px solid rgba(198,42,71,0.15)",
          }}
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            disabled={disabledDays}
            locale={ru}
            modifiersClassNames={{ selected: "rdp-day_selected_custom" }}
            style={{ width: "100%", margin: "0 auto" }}
          />
        </motion.div>

        {/* Time grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full mb-5"
        >
          <p className="text-pink-700 font-semibold mb-3 text-center text-lg">Выбери время:</p>
          <div className="grid grid-cols-4 gap-2">
            {TIMES.map(t => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className="py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: time === t
                    ? "linear-gradient(135deg, #ff4d79, #c62a47)"
                    : "rgba(198,42,71,0.08)",
                  color: time === t ? "white" : "#c62a47",
                  border: time === t ? "none" : "1.5px solid rgba(198,42,71,0.2)",
                  transform: time === t ? "scale(1.05)" : "scale(1)",
                  boxShadow: time === t ? "0 4px 14px rgba(198,42,71,0.35)" : "none",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mb-3 text-center"
          >
            {error}
          </motion.p>
        )}

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleSubmit}
          className="w-full py-4 rounded-2xl text-xl font-bold shadow-lg"
          style={{
            background: "linear-gradient(135deg, #ff4d79, #c62a47)",
            color: "white",
            boxShadow: "0 6px 24px rgba(198,42,71,0.4)",
          }}
        >
          Готово! ✨
        </motion.button>
      </div>

      <style>{`
        .rdp-day_selected_custom {
          background: linear-gradient(135deg, #ff4d79, #c62a47) !important;
          color: white !important;
          border-radius: 50% !important;
        }
        .rdp {
          --rdp-accent-color: #c62a47;
          --rdp-background-color: rgba(198,42,71,0.1);
          margin: 8px auto !important;
        }
        .rdp-day:hover:not(.rdp-day_selected) {
          background-color: rgba(198,42,71,0.1) !important;
        }
      `}</style>
    </div>
  );
}
