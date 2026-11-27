"use client";

import { useRef } from "react";
import { useInViewPlayback } from "@/hooks/use-in-view-playback";
import type { ProjectVideo } from "@/types/content";

type ProjectsVideoProps = {
  video?: ProjectVideo;
  title: string;
  label: string;
  award?: string;
};

export function ProjectsVideo({ video, title, label, award }: ProjectsVideoProps) {
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
        {award && (
          <p className="sections-projects-video__award absolute bottom-3 left-3 z-10 inline-flex items-center gap-2 rounded-full bg-ember-600 py-2 pr-4 pl-3 heading-3xs text-paper-50 uppercase shadow-[0_12px_32px_-8px_rgb(11_10_9/0.6)] ring-1 ring-paper-50/25 md:bottom-5 md:left-5 md:gap-2.5 md:py-2.5 md:pr-5 md:pl-3.5">
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 fill-current">
              <path d="M8 1l1.9 4.1 4.5.5-3.4 3 1 4.4L8 10.8 4 13l1-4.4-3.4-3 4.5-.5z" />
            </svg>
            {award}
          </p>
        )}
      </div>
    </div>
  );
}
