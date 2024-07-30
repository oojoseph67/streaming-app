"use client";

import { Maximize, Minimize } from "lucide-react";
import { HintComponent } from "../hint";

type FullscreenControlProps = {
  isFullscreen: boolean;
  onToggle: () => void;
};

export function FullscreenControl({
  isFullscreen,
  onToggle,
}: FullscreenControlProps) {
  const Icon = isFullscreen ? Minimize : Maximize;
  const label = isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen";

  return (
    <div className="flex items-center justify-center gap-4">
      <HintComponent label={label} asChild>
        <button
          onClick={onToggle}
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
        >
          <Icon className="h-6 w-6" />
        </button>
      </HintComponent>
    </div>
  );
}
