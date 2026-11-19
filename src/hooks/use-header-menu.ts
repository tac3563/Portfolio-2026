import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type RefObject,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock-upgrade";
import type { HeaderFold } from "@/hooks/use-header-fold";
import { findFragmentTarget } from "@/lib/find-fragment-target";
import { matchesMedia, mobileQuery, reducedMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const linkGap = 24;

type HeaderMenu = {
  isExpanded: boolean;
  toggleMenu: () => void;
  handleKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  handleBlur: (event: FocusEvent<HTMLElement>) => void;
  handleLinkClick: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
};

export function useHeaderMenu(
  root: RefObject<HTMLElement | null>,
  { holdFold, releaseFold }: HeaderFold,
): HeaderMenu {
  const menuAnimation = useRef<gsap.core.Animation>(null);
  const isExpandedRef = useRef(false);
  const hasToggled = useRef(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useGSAP(
    () => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: () => {
          if (isExpandedRef.current) setIsExpanded(false);
        },
      });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      isExpandedRef.current = isExpanded;
      if (!hasToggled.current) return;

      const isMobile = matchesMedia(mobileQuery);
      const duration = matchesMedia(reducedMotionQuery) ? 0 : 0.4;
      const items = gsap.utils.toArray<HTMLElement>(".layout-header__item");

      menuAnimation.current?.kill();

      if (!isExpanded) {
        gsap.set(".layout-header__links", { clearProps: "opacity,visibility" });
        menuAnimation.current = gsap.to(items, {
          y: 0,
          autoAlpha: 0,
          duration: isMobile ? 0 : duration / 2,
          onComplete: () => releaseFold(duration),
        });
        return;
      }

      holdFold();

      const focusFirstLink = () => items[0]?.querySelector("a")?.focus();

      if (isMobile) {
        menuAnimation.current = gsap
          .timeline({ onComplete: focusFirstLink })
          .fromTo(".layout-header__links", { autoAlpha: 0 }, { autoAlpha: 1, duration }, 0)
          .fromTo(
            items,
            { x: 0, y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration, stagger: 0.05, ease: "power2.out" },
            0,
          );
        return;
      }

      const toggle = root.current?.querySelector<HTMLElement>(".layout-header-toggle");
      const shift = -((toggle?.offsetWidth ?? 0) + linkGap);
      menuAnimation.current = gsap.to(items, {
        x: shift,
        autoAlpha: 1,
        duration,
        stagger: 0.05,
        ease: "power2.out",
        onComplete: focusFirstLink,
      });
    },
    { dependencies: [isExpanded], scope: root },
  );

  useEffect(() => {
    const list = root.current?.querySelector<HTMLElement>(".layout-header__links");
    if (!isExpanded || !list || !matchesMedia(mobileQuery)) return;

    disableBodyScroll(list);
    return () => enableBodyScroll(list);
  }, [isExpanded, root]);

  const closeMenu = (onClosed?: () => void) => {
    if (!isExpandedRef.current) return;

    if (!matchesMedia(mobileQuery) || matchesMedia(reducedMotionQuery)) {
      setIsExpanded(false);
      onClosed?.();
      return;
    }

    menuAnimation.current?.kill();
    menuAnimation.current = gsap
      .timeline({
        onComplete: () => {
          setIsExpanded(false);
          onClosed?.();
        },
      })
      .to(".layout-header__item", {
        y: -16,
        autoAlpha: 0,
        duration: 0.3,
        stagger: 0.04,
        ease: "power2.in",
      })
      .to(".layout-header__links", { autoAlpha: 0, duration: 0.35, ease: "power2.inOut" }, 0.15);
  };

  const toggleMenu = () => {
    if (isExpanded) {
      closeMenu();
      return;
    }

    hasToggled.current = true;
    setIsExpanded(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape" || !isExpanded) return;

    closeMenu();
    root.current?.querySelector<HTMLElement>(".layout-header-toggle")?.focus();
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;

    closeMenu();
  };

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isExpanded) return;

    const list = root.current?.querySelector<HTMLElement>(".layout-header__links");
    if (!list || !matchesMedia(mobileQuery)) {
      closeMenu();
      return;
    }

    event.preventDefault();
    closeMenu(() => {
      enableBodyScroll(list);
      requestAnimationFrame(() => {
        findFragmentTarget(href)?.scrollIntoView();
        history.pushState(null, "", href);
      });
    });
  };

  return { isExpanded, toggleMenu, handleKeyDown, handleBlur, handleLinkClick };
}
