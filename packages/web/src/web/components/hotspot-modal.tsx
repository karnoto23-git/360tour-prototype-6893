import { useEffect } from "react";
import { X } from "lucide-react";
import type { Hotspot } from "../data/tour";

type Props = {
  hotspot: Hotspot | null;
  onClose: () => void;
  /** Dipakai untuk info lokasi dari peta (mis. Area Komunitas). */
  fallback?: { title: string; body: string } | null;
};

/** Modal informasi, gambar, dan video yang muncul di atas viewer atau peta. */
export function HotspotModal({ hotspot, fallback, onClose }: Props) {
  const open = Boolean(hotspot || fallback);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white text-[#0B2E26] shadow-2xl sm:max-w-3xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow hover:bg-white"
          aria-label="Tutup"
        >
          <X className="h-5 w-5" />
        </button>

        {fallback && <InfoBody title={fallback.title} paragraphs={[fallback.body]} />}

        {hotspot?.kind === "info" && (
          <InfoBody title={hotspot.title} paragraphs={hotspot.paragraphs} facts={hotspot.facts} />
        )}

        {hotspot?.kind === "image" && (
          <div>
            <img src={hotspot.src} alt={hotspot.title} className="max-h-[70vh] w-full bg-[#F4F7F5] object-contain" />
            <div className="p-6">
              <h2 className="text-xl font-bold">{hotspot.title}</h2>
              <p className="mt-1 text-sm text-[#4A6158]">{hotspot.caption}</p>
            </div>
          </div>
        )}

        {hotspot?.kind === "video" && (
          <div>
            <video
              key={hotspot.src}
              src={hotspot.src}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full bg-black"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold">{hotspot.title}</h2>
              <p className="mt-1 text-sm text-[#4A6158]">{hotspot.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoBody({
  title,
  paragraphs,
  facts,
}: {
  title: string;
  paragraphs: string[];
  facts?: { label: string; value: string }[];
}) {
  return (
    <div className="p-6 sm:p-8">
      <h2 className="pr-10 text-2xl font-extrabold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-[#2C4A41]">
        {paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {facts && facts.length > 0 && (
        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          {facts.map((f) => (
            <div key={f.label} className="rounded-xl bg-[#EEF5F1] p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-[#4A6158]">{f.label}</dt>
              <dd className="mt-1 font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
