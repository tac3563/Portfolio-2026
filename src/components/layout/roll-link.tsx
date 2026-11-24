"use client";

import { useRef, type ComponentProps, type ReactNode } from "react";
import { useTextRoll } from "@/hooks/use-text-roll";

type RollLinkProps = Omit<ComponentProps<"a">, "children"> & {
  label: string;
  children?: ReactNode;
};

export function RollLink({ label, children, className, ...props }: RollLinkProps) {
  const root = useRef<HTMLAnchorElement>(null);
  useTextRoll(root, ".layout-roll-link__label");

  return (
    <a ref={root} className={`layout-roll-link block ${className ?? ""}`} {...props}>
      <span className="block overflow-hidden">
        <span className="layout-roll-link__label block text-roll">{label}</span>
      </span>
      {children}
    </a>
  );
}
