import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, Maximize, Minimize, Minus, Plus } from "lucide-react";
import { SCENES, getScene, type Hotspot } from "../data/tour";
import { PanoramaViewer } from "../components/panorama-viewer";
import { HotspotModal } from "../components/hotspot-modal";

const DEFAULT_FOV = 70;
const MIN_FOV = 30;
const MAX_FOV = 90;

export default function TourPage({ params }: { params: { sceneId: string } }) {
  const scene = getScene(params.sceneId);
  const [, navigate] = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const [fov, setFov] = useState(DEFAULT_FOV);
  const [active, setActive] = useState<Hotspot | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!scene) navigate("/peta", { replace: true });
  }, [scene, navigate]);

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Pindah lokasi: reset zoom dan tutup popup.
  useEffect(() => {
    setFov(DEFAULT_FOV);
    setActive(null);
  }, [params.sceneId]);

  const onHotspot = useCallback(
    (h: Hotspot) => {
      if (h.kind === "nav") navigate(`/tur/${h.target}`);
      else setActive(h);
    },
    [navigate],
  );

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else rootRef.current?.requestFullscreen();
  };

  const zoom = (delta: number) => setFov((f) => Math.min(MAX_FOV, Math.max(MIN_FOV, f + delta)));

  if (!scene) return null;

  return (
    <div ref={rootRef} className="relative h-[100dvh] w-full overflow-hidden bg-black text-white">
      <PanoramaViewer scene={scene} fov={fov} onFovChange={setFov} onHotspot={onHotspot} />

      {/* Bar atas */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-3 sm:p-5">
        <div className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-[#0B2E26]/85 px-3 py-2 backdrop-blur">
          <Link
            href="/peta"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" /> Peta
          </Link>
          <div className="pr-2">
            <h1 className="text-sm font-bold leading-tight sm:text-base">{scene.title}</h1>
            <p className="hidden text-xs text-white/70 sm:block">{scene.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Bar bawah: pindah lokasi */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 p-3 sm:p-5">
        <nav className="pointer-events-auto flex w-full gap-2 overflow-x-auto rounded-2xl bg-[#0B2E26]/85 p-2 backdrop-blur sm:w-auto sm:flex-wrap">
          {SCENES.map((s) => (
            <Link
              key={s.id}
              href={`/tur/${s.id}`}
              className={`shrink-0 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
                s.id === scene.id ? "bg-[#F2B705] text-[#0B2E26]" : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {s.title}
            </Link>
          ))}
        </nav>

      </div>

      {/* Kontrol zoom dan layar penuh */}
      <div className="pointer-events-auto absolute right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-2 sm:right-5">
        <div className="flex flex-col overflow-hidden rounded-2xl bg-[#0B2E26]/85 backdrop-blur">
          <button onClick={() => zoom(-5)} className="p-3 hover:bg-white/15" aria-label="Perbesar">
            <Plus className="h-5 w-5" />
          </button>
          <button
            onClick={() => zoom(5)}
            className="border-t border-white/10 p-3 hover:bg-white/15"
            aria-label="Perkecil"
          >
            <Minus className="h-5 w-5" />
          </button>
        </div>
        <button
          onClick={toggleFullscreen}
          className="rounded-2xl bg-[#0B2E26]/85 p-3 backdrop-blur hover:bg-white/15"
          aria-label={fullscreen ? "Keluar layar penuh" : "Layar penuh"}
        >
          {fullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </button>
      </div>

      {/* Petunjuk singkat */}
      <p className="pointer-events-none absolute left-1/2 top-24 z-20 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-xs text-white/80 sm:top-28">
        Seret untuk melihat sekitar · Gulir untuk zoom · Klik ikon untuk informasi
      </p>

      <HotspotModal hotspot={active} onClose={() => setActive(null)} />
    </div>
  );
}
