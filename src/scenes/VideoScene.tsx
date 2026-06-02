import { useEffect, useRef } from "react";
import { stopBackgroundMusic } from "../lib/audio";

interface Props {
  onNext: () => void;
}

export default function VideoScene({ onNext }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Stop any background music while video plays
    stopBackgroundMusic();

    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {});

    const handleEnded = () => onNext();
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [onNext]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src="/video.mp4"
        className="w-full h-full object-cover"
        playsInline
        autoPlay
        controls={false}
        style={{ display: "block" }}
      />
    </div>
  );
}
