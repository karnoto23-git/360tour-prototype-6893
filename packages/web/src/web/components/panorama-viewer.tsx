import "aframe";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import type { Hotspot, Scene } from "../data/tour";

const COLORS: Record<Hotspot["kind"], string> = {
  nav: "#F2B705",
  info: "#7FD1AE",
  image: "#8ECAE6",
  video: "#F28482",
};

const RADIUS = 6;
const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

/** Posisi hotspot pada bola berjari-jari RADIUS dari titik kamera (0, 0, 0). */
function toPosition(yaw: number, pitch: number) {
  const h = RADIUS * Math.cos(rad(pitch));
  return {
    x: h * Math.sin(rad(yaw)),
    y: RADIUS * Math.sin(rad(pitch)),
    z: -h * Math.cos(rad(yaw)),
  };
}

type Props = {
  scene: Scene;
  fov: number;
  onFovChange: (fov: number) => void;
  onHotspot: (hotspot: Hotspot) => void;
};

/**
 * Viewer panorama 360° berbasis A-Frame. Dibuat secara imperatif agar
 * siklus hidup scene A-Frame tidak bentrok dengan React.
 */
export function PanoramaViewer({ scene, fov, onFovChange, onHotspot }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLElement | null>(null);
  const hotspotRef = useRef(onHotspot);
  const fovRef = useRef(onFovChange);
  const fovValueRef = useRef(fov);
  const [loading, setLoading] = useState(true);

  hotspotRef.current = onHotspot;
  fovRef.current = onFovChange;
  fovValueRef.current = fov;

  // Bangun scene A-Frame setiap kali panorama berganti.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    setLoading(true);

    const scene3d = document.createElement("a-scene");
    scene3d.setAttribute("embedded", "");
    scene3d.setAttribute("vr-mode-ui", "enabled: false");
    scene3d.setAttribute("loading-screen", "enabled: false");
    scene3d.style.width = "100%";
    scene3d.style.height = "100%";

    const sky = document.createElement("a-sky");
    sky.setAttribute("src", scene.image);
    sky.setAttribute("material", "shader: flat");
    sky.addEventListener("materialtextureloaded", () => setLoading(false));
    scene3d.appendChild(sky);

    const camera = document.createElement("a-entity");
    camera.setAttribute("camera", `fov: ${fov}; near: 0.1; far: 1000`);
    camera.setAttribute("look-controls", "reverseMouseDrag: false");
    camera.setAttribute("wasd-controls", "enabled: false");
    camera.setAttribute("cursor", "rayOrigin: mouse");
    camera.setAttribute("raycaster", "objects: .clickable");
    camera.setAttribute("position", "0 0 0");
    scene3d.appendChild(camera);
    cameraRef.current = camera;

    scene.hotspots.forEach((h) => {
      const p = toPosition(h.yaw, h.pitch);
      // Menghadap ke pusat (kamera) agar teks tetap terbaca.
      const facingYaw = deg(Math.atan2(-p.x, -p.z));

      const holder = document.createElement("a-entity");
      holder.setAttribute("position", `${p.x} ${p.y} ${p.z}`);
      holder.setAttribute("rotation", `0 ${facingYaw} 0`);

      const disc = document.createElement("a-entity");
      disc.setAttribute("class", "clickable");
      disc.setAttribute("geometry", "primitive: circle; radius: 0.42");
      disc.setAttribute(
        "material",
        `color: ${COLORS[h.kind]}; shader: flat; side: double; opacity: 0.92`,
      );
      disc.setAttribute("animation__scale", "property: scale; dur: 150; startEvents: mouseenter; to: 1.25 1.25 1.25; loop: false");
      disc.setAttribute("animation__reset", "property: scale; dur: 150; startEvents: mouseleave; to: 1 1 1; loop: false");
      disc.addEventListener("click", () => hotspotRef.current(h));
      holder.appendChild(disc);

      const label = document.createElement("a-text");
      label.setAttribute("value", h.label);
      label.setAttribute("align", "center");
      label.setAttribute("color", "#FFFFFF");
      label.setAttribute("width", "7");
      label.setAttribute("position", "0 -0.75 0.01");
      label.setAttribute("shader", "msdf");
      holder.appendChild(label);

      scene3d.appendChild(holder);
    });

    container.appendChild(scene3d);
    // Fallback jika event tekstur tidak terpancar.
    const timer = window.setTimeout(() => setLoading(false), 6000);

    return () => {
      window.clearTimeout(timer);
      cameraRef.current = null;
      scene3d.remove();
    };
    // fov sengaja tidak masuk dependensi: diterapkan lewat efek terpisah.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene.id]);

  // Terapkan zoom (fov) ke kamera.
  useEffect(() => {
    const cam = cameraRef.current;
    if (cam) cam.setAttribute("camera", "fov", fov);
  }, [fov]);

  // Zoom dengan roda mouse (mengubah fov: makin kecil = makin dekat).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const next = Math.min(90, Math.max(30, fovValueRef.current + (e.deltaY > 0 ? 3 : -3)));
      fovRef.current(next);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 bg-black">
      {loading && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/60 text-white">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-3 text-sm">Memuat panorama…</span>
        </div>
      )}
    </div>
  );
}
