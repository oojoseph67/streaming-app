"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";
import { HintComponent } from "../hint";
import { Slider } from "../ui/slider";

type VolumeControlProps = {
  volume: number;
  onVolumeChange: (volume: number) => void;
  onToggleVolume: () => void;
};

export function VolumeControl({
  volume,
  onToggleVolume,
  onVolumeChange,
}: VolumeControlProps) {
  const isMuted = volume === 0;
  const isAboveHalf = volume > 50;

  let Icon = Volume1;

  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }

  const label = !isMuted ? "Mute" : "Unmute";

  const handleChange = (value: number[]) => {
    onVolumeChange(value[0]);
  };

  return (
    <div className="flex items-center gap-2">
      <HintComponent asChild label={label}>
        <button
          onClick={onToggleVolume}
          className="text-white hover:bg-white/10 p-1.5 rounded-lg"
        >
          <Icon className="h-6 w-6" />
        </button>
      </HintComponent>

      <Slider
        value={[volume]}
        onValueChange={handleChange}
        className="w-[8rem] cursor-pointer"
        min={0}
        max={100}
        step={1}
      />
    </div>
  );
}
