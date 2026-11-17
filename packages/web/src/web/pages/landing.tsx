import { Link } from "wouter";
import { ArrowRight, Smartphone } from "lucide-react";

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B2E26] text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        src="/videos/corporate.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E26] via-[#0B2E26]/70 to-[#0B2E26]/20" />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-12">
        <img src="/images/logo.png" alt="PT Vale Indonesia" className="h-7 w-auto" />
        <span className="rounded-full border border-white/25 px-3 py-1 text-xs tracking-wide text-white/80">
          Prototipe Presentasi
        </span>
      </header>

      <main className="relative z-10 flex min-h-[calc(100vh-88px)] flex-col justify-end px-6 pb-16 sm:px-12 sm:pb-24">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#F2B705]">
          PT Vale Indonesia
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          Tur Virtual 360° <br className="hidden sm:block" />
          Lokasi Operasi
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          Jelajahi tambang, pabrik pengolahan nikel, workshop, dan PLTA langsung dari browser Anda.
          Pindah antar lokasi, buka informasi di setiap titik, dan tonton video operasional.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/peta"
            className="group inline-flex items-center gap-2 rounded-full bg-[#F2B705] px-7 py-3.5 font-bold text-[#0B2E26] transition hover:bg-[#FFCB2B]"
          >
            Jelajahi Lokasi
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </Link>
          <span className="inline-flex items-center gap-2 text-sm text-white/70">
            <Smartphone className="h-4 w-4" />
            Dapat diakses dari desktop dan mobile
          </span>
        </div>
      </main>
    </div>
  );
}
