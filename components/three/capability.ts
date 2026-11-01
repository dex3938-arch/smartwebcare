/** WebGL only where it's cheap: desktop, fine pointer, enough cores/memory, motion allowed. */
export function canUse3D() {
  try {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (nav.connection?.saveData) return false;
    if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency < 4) return false;
    if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) return false;
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
