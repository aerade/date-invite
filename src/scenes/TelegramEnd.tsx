import { motion } from "framer-motion";

interface Props {
  selectedDate: string;
  selectedTime: string;
}

export default function TelegramEnd({ selectedDate, selectedTime }: Props) {
  const dateInfo = selectedDate && selectedTime
    ? `${selectedDate} в ${selectedTime}`
    : (localStorage.getItem("dateInvite_date") && localStorage.getItem("dateInvite_time")
      ? `${localStorage.getItem("dateInvite_date")} в ${localStorage.getItem("dateInvite_time")}`
      : "скоро");

  const message = encodeURIComponent(
    `ОЙ, привет мой самый любимый парень, это что.. ты мне приготовил???!!! Мне так понравилось!!! спасибо тебе мой самый лучший парень!!!! я не могу от такого отказаться 😮😮 это очень хорошо!!! я свободна ${dateInfo}`
  );

  const tgUrl = `https://t.me/aerade?text=${message}`;

  function handleTelegram() {
    window.open(tgUrl, "_blank");
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(160deg, #8b0000 0%, #c62a20 40%, #8b0000 100%)" }}
    >
      {/* Curtain backdrop with folds */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, transparent 40px, rgba(0,0,0,0.08) 80px)",
        }}
      />
      {/* Gold header bar */}
      <div className="absolute top-0 left-0 right-0"
        style={{
          height: "44px",
          background: "linear-gradient(180deg, #5a0000, #8b0000)",
          borderBottom: "3px solid rgba(255,200,80,0.5)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-8 text-center max-w-sm w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 180, delay: 0.2 }}
        >
          <div className="text-5xl mb-3">🎭</div>
          <h2
            className="text-3xl font-bold text-white mb-2"
            style={{ fontFamily: "Georgia, serif", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            Это ещё не конец!
          </h2>
          <p className="text-red-200 text-lg mb-8">
            Напиши мне — я жду! 🥰
          </p>
        </motion.div>

        {/* Pointing finger */}
        <motion.div
          className="text-5xl mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: [0, 12, 0] }}
          transition={{
            opacity: { delay: 0.8, duration: 0.5 },
            y: { delay: 1.2, duration: 1, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          👇
        </motion.div>

        {/* Telegram button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTelegram}
          className="w-full py-5 rounded-3xl text-xl font-bold flex items-center justify-center gap-3 shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #2aabee, #229ed9)",
            color: "white",
            boxShadow: "0 8px 32px rgba(42,171,238,0.5), 0 2px 8px rgba(0,0,0,0.3)",
            border: "2px solid rgba(255,255,255,0.25)",
          }}
        >
          {/* Telegram icon */}
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/>
          </svg>
          Написать в Telegram
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-red-200/70 text-sm mt-5 leading-relaxed"
        >
          Твой выбор: <span className="text-white font-semibold">{dateInfo}</span><br/>
          будет отправлен вместе с сообщением 💌
        </motion.p>
      </div>

      {/* Decorative gold stars */}
      {["✨","⭐","✨","🌟","✨"].map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-xl pointer-events-none"
          style={{ left: `${8 + i * 21}%`, bottom: `${12 + (i % 3) * 10}%` }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -8, 0] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
        >
          {s}
        </motion.span>
      ))}
    </div>
  );
}
