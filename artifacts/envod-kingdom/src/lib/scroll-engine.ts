import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function initScrollEngine() {
  if (lenis) return lenis;

  lenis = new Lenis({
    lerp: 0.08,
    wheelMultiplier: 0.9,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis!.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroyScrollEngine() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

export function scrollToTop(immediate = true) {
  if (lenis) {
    lenis.scrollTo(0, { immediate, force: true });
    return;
  }
  if (typeof window !== "undefined") {
    window.scrollTo(0, 0);
  }
}

export { gsap, ScrollTrigger };
