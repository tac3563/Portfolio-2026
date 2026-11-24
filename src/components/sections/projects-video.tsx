"use client";

import { useRef } from "react";
import { useInViewPlayback } from "@/hooks/use-in-view-playback";
import type { ProjectVideo } from "@/types/content";

type ProjectsVideoProps = {
  video?: ProjectVideo;
  title: string;
  label: string;
};

export function ProjectsVideo({ video, title, label }: ProjectsVideoProps) {
  const element = useRef<HTMLVideoElement>(null);
  useInViewPlayback(element);

  return (
    <div className="sections-projects-video overflow-hidden rounded-2xl border border-ink-800 bg-ink-950">
      <div aria-hidden="true" className="flex gap-1.5 border-b border-ink-800 px-4 py-3">
        <span className="size-2.5 rounded-full bg-taupe-700" />
        <span className="size-2.5 rounded-full bg-taupe-700" />
        <span className="size-2.5 rounded-full bg-ember-600" />
      </div>
      <div className="relative aspect-video overflow-hidden">
        <div className="sections-projects-video__media absolute inset-0">
          {video ? (
            <video
              ref={element}
              aria-label={label}
              poster={video.poster}
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 size-full object-cover object-top"
            >
              {video.webm && <source src={video.webm} type="video/webm" />}
              <source src={video.mp4} type="video/mp4" />
            </video>
          ) : (
            <p
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center heading-xs text-taupe-600"
            >
              {title}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
