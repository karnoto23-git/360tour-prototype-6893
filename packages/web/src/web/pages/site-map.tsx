import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { MAP_LOCATIONS, SCENES, type MapLocation } from "../data/tour";
import { HotspotModal } from "../components/hotspot-modal";

export default function SiteMap() {
  const [, navigate] = useLocation();
  const [info, setInfo] = useState<{ title: string; body: string } | null>(null);

  const open = (loc: MapLocation) => {
    if (loc.sceneId) navigate(`/tur/${loc.sceneId}`);
    else if (loc.info) setInfo(loc.info);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] text-[#0B2E26]">
      <header className="flex items-center justify-between px-6 py-5 sm:px-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-[#2C7A5F]">
          <ArrowLeft className="h-4 w-4" /> Beranda
        </Link>
        <img src="/images/logo.png" alt="PT Vale Indonesia" className="h-6 w-auto invert" />
      </header>

      <main className="px-6 pb-16 sm:px-12">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2C7A5F]">Peta Lokasi</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Masterplan Site</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[#4A6158]">
            Klik titik lokasi pada peta untuk membuka panorama 360°.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5">
          <img src="/images/map.png" alt="Masterplan site PT Vale Indonesia" className="block w-full" />
          {MAP_LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => open(loc)}
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              className="group absolute -translate-x-1/2 -translate-y-full p-2"
              aria-label={loc.label}
            >
              <span className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-[#0B2E26] px-3 py-1.5 text-xs font-bold text-white shadow-lg transition group-hover:bg-[#F2B705] group-hover:text-[#0B2E26] group-focus-visible:bg-[#F2B705] group-focus-visible:text-[#0B2E26] sm:text-sm md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                <MapPin className="h-4 w-4" />
                {loc.label}
              </span>
              <span className="mx-auto block h-3 w-3 rounded-full border-2 border-white bg-[#F2B705] shadow" />
            </button>
          ))}
        </div>

        <h2 className="mt-12 text-lg font-bold">Pilih Lokasi</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SCENES.map((s) => (
            <Link
              key={s.id}
              href={`/tur/${s.id}`}
              className="group overflow-hidden rounded-2xl bg-white shadow ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img src={s.image} alt={s.title} className="h-36 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-[#4A6158]">{s.subtitle}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#2C7A5F]">
                  Buka panorama <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <HotspotModal hotspot={null} fallback={info} onClose={() => setInfo(null)} />
    </div>
  );
}
