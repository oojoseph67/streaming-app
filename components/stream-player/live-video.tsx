"use client";

import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { FullscreenControl } from "./fullscreen-control";
import { VolumeControl } from "./volume-control";

export function LiveVideo({ participant }: { participant: Participant }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);

  const toggleFullScreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      //   videoRef.current.volume = +value * 0.01;
      // videoRef.current.volume = value / 100;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;
    setVolume(isMuted ? 10 : 0);
    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  useTracks()
    .filter((track) => {
      return track.participant.identity === participant.identity;
    })
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  return (
    <div className="relative h-full flex" ref={wrapperRef}>
      <video ref={videoRef} width="100%" autoPlay playsInline />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl
            onVolumeChange={onVolumeChange}
            volume={volume}
            onToggleVolume={toggleMute}
          />
          <FullscreenControl
            isFullscreen={isFullscreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
}
