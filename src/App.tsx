import { useState } from "react";
import { stopBackgroundMusic, stopJoy } from "./lib/audio";
import Welcome from "./scenes/Welcome";
import Elevator from "./scenes/Elevator";
import DarkGreeting from "./scenes/DarkGreeting";
import DatePicker from "./scenes/DatePicker";
import SmileCountdown from "./scenes/SmileCountdown";
import PhotoFlash from "./scenes/PhotoFlash";
import CatPhoto from "./scenes/CatPhoto";
import VideoScene from "./scenes/VideoScene";
import Curtains from "./scenes/Curtains";
import TelegramEnd from "./scenes/TelegramEnd";

type Scene =
  | "welcome"
  | "elevator"
  | "dark_greeting"
  | "date_picker"
  | "smile_countdown"
  | "photo_flash"
  | "cat_photo"
  | "video"
  | "curtains"
  | "telegram";

export default function App() {
  const [scene, setScene] = useState<Scene>("welcome");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  function go(next: Scene) {
    setScene(next);
  }

  return (
    <div style={{ width: "100vw", height: "100dvh", overflow: "hidden", position: "relative" }}>
      {scene === "welcome" && <Welcome onNext={() => go("elevator")} />}
      {scene === "elevator" && <Elevator onNext={() => go("dark_greeting")} />}
      {scene === "dark_greeting" && <DarkGreeting onNext={() => { stopJoy(); go("date_picker"); }} />}
      {scene === "date_picker" && (
        <DatePicker
          onNext={(date, time) => {
            setSelectedDate(date);
            setSelectedTime(time);
            stopBackgroundMusic();
            go("smile_countdown");
          }}
        />
      )}
      {scene === "smile_countdown" && <SmileCountdown onNext={() => go("photo_flash")} />}
      {scene === "photo_flash" && <PhotoFlash onNext={() => go("cat_photo")} />}
      {scene === "cat_photo" && <CatPhoto onNext={() => go("video")} />}
      {scene === "video" && <VideoScene onNext={() => go("curtains")} />}
      {scene === "curtains" && <Curtains onNext={() => go("telegram")} />}
      {scene === "telegram" && (
        <TelegramEnd selectedDate={selectedDate} selectedTime={selectedTime} />
      )}
    </div>
  );
}
