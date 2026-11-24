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
import { scrollToFragment } from "@/lib/scroll-to-fragment";
import { pauseSmoothScroll, resumeSmoothScroll } from "@/lib/smooth-scroll";
import { matchesMedia, mobileQuery, reducedMotionQuery } from "@/lib/media";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const linkGap = 24;
const backdropInset = 20;

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
  const isClosing = useRef(false);
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
      isClosing.current = false;

      const toggle = root.current?.querySelector<HTMLElement>(".layout-header-toggle");
      const toggleWidth = toggle?.offsetWidth ?? 0;

      if (!isExpanded) {
        gsap.set(".layout-header__links", { clearProps: "transform,opacity,visibility" });
        menuAnimation.current = gsap
          .timeline({ onComplete: () => releaseFold(duration) })
          .to(items, { y: 0, autoAlpha: 0, duration: isMobile ? 0 : duration / 2 }, 0)
          .to(
            ".layout-header__backdrop",
            { width: toggleWidth, duration: isMobile ? 0 : duration, ease: "power2.inOut" },
            0,
          )
          .set(".layout-header__backdrop", { autoAlpha: 0 });
        return;
      }

      holdFold();

      const focusFirstLink = () => items[0]?.querySelector("a")?.focus();

      if (isMobile) {
        menuAnimation.current = gsap
          .timeline({ onComplete: focusFirstLink })
          .fromTo(
            ".layout-header__links",
            { xPercent: 100, autoAlpha: 1 },
            { xPercent: 0, duration: duration && 0.6, ease: "expo.out" },
            0,
          )
          .fromTo(
            items,
            { x: 48, y: 0, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration, stagger: 0.05, ease: "power3.out" },
            duration && 0.15,
          );
        return;
      }

      const list = root.current?.querySelector<HTMLElement>(".layout-header__links");
      const shift = -(toggleWidth + linkGap);
      menuAnimation.current = gsap
        .timeline({ onComplete: focusFirstLink })
        .fromTo(
          ".layout-header__backdrop",
          { width: toggleWidth, height: toggle?.offsetHeight ?? 0, autoAlpha: 1 },
          { width: (list?.offsetWidth ?? 0) - shift + backdropInset, duration, ease: "power2.out" },
          0,
        )
        .to(items, { x: shift, autoAlpha: 1, duration, stagger: 0.05, ease: "power2.out" }, 0);
    },
    { dependencies: [isExpanded], scope: root },
  );

  useEffect(() => {
    const list = root.current?.querySelector<HTMLElement>(".layout-header__links");
    if (!isExpanded || !list || !matchesMedia(mobileQuery)) return;

    disableBodyScroll(list);
    pauseSmoothScroll();
    return () => {
      enableBodyScroll(list);
      resumeSmoothScroll();
    };
  }, [isExpanded, root]);

  const closeMenu = (onClosed?: () => void) => {
    if (!isExpandedRef.current || isClosing.current) return;

    if (!matchesMedia(mobileQuery) || matchesMedia(reducedMotionQuery)) {
      setIsExpanded(false);
      onClosed?.();
      return;
    }

    isClosing.current = true;
    menuAnimation.current?.kill();
    menuAnimation.current = gsap
      .timeline({
        onComplete: () => {
          isClosing.current = false;
          setIsExpanded(false);
          onClosed?.();
        },
      })
      .to(".layout-header__item", {
        x: 32,
        autoAlpha: 0,
        duration: 0.25,
        stagger: 0.03,
        ease: "power2.in",
      })
      .to(".layout-header__links", { xPercent: 100, duration: 0.45, ease: "expo.in" }, 0.1);
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
      resumeSmoothScroll();
      requestAnimationFrame(() => scrollToFragment(href));
    });
  };

  return { isExpanded, toggleMenu, handleKeyDown, handleBlur, handleLinkClick };
}
