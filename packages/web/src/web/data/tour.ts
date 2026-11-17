// Seluruh data prototipe bersifat hardcoded (tanpa backend).
// Konten informasi bersifat placeholder — verifikasi dengan data resmi PT Vale sebelum presentasi.

export type HotspotKind = "nav" | "info" | "image" | "video";

type HotspotBase = {
  id: string;
  kind: HotspotKind;
  label: string;
  /** Derajat horizontal: 0 = depan, positif = kanan */
  yaw: number;
  /** Derajat vertikal: positif = atas */
  pitch: number;
};

export type Hotspot =
  | (HotspotBase & { kind: "nav"; target: string })
  | (HotspotBase & {
      kind: "info";
      title: string;
      paragraphs: string[];
      facts?: { label: string; value: string }[];
    })
  | (HotspotBase & { kind: "image"; title: string; src: string; caption: string })
  | (HotspotBase & { kind: "video"; title: string; src: string; description: string });

export type Scene = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  hotspots: Hotspot[];
};

export const SCENES: Scene[] = [
  {
    id: "overview",
    title: "Gambaran Umum Lokasi",
    subtitle: "Pandangan drone",
    description: "Pandangan drone atas seluruh kegiatan operasional PT Vale Indonesia.",
    image: "/panoramas/site-overview.jpg",
    hotspots: [
      { id: "ov-mine", kind: "nav", label: "Area Tambang", yaw: -55, pitch: -8, target: "mine" },
      { id: "ov-plant", kind: "nav", label: "Pabrik Pengolahan", yaw: 50, pitch: -6, target: "plant" },
      { id: "ov-hydro", kind: "nav", label: "PLTA", yaw: 170, pitch: -4, target: "hydropower" },
      {
        id: "ov-profile",
        kind: "video",
        label: "Profil Perusahaan",
        yaw: 15,
        pitch: 14,
        title: "Profil Perusahaan",
        src: "/videos/corporate.mp4",
        description: "Ringkasan profil dan kegiatan PT Vale Indonesia.",
      },
      {
        id: "ov-info",
        kind: "info",
        label: "Tentang Lokasi",
        yaw: -110,
        pitch: 6,
        title: "Tentang Lokasi",
        paragraphs: [
          "Lokasi operasi PT Vale Indonesia berada di Sulawesi Selatan dan mencakup area tambang, pabrik pengolahan nikel, workshop pemeliharaan, serta fasilitas pembangkit listrik tenaga air (PLTA).",
        ],
        facts: [
          { label: "Komoditas", value: "Nikel" },
          { label: "Lokasi", value: "Sulawesi Selatan" },
        ],
      },
    ],
  },
  {
    id: "mine",
    title: "Area Penambangan",
    subtitle: "Penggalian dan pengangkutan",
    description: "Kegiatan penggalian dan pengangkutan material tambang.",
    image: "/panoramas/mining-area.jpg",
    hotspots: [
      {
        id: "mi-truck",
        kind: "info",
        label: "Dump Truck",
        yaw: -25,
        pitch: -10,
        title: "Dump Truck",
        paragraphs: [
          "Dump truck digunakan untuk mengangkut material hasil penggalian dari area pit menuju stockpile atau fasilitas pengolahan.",
        ],
        facts: [
          { label: "Fungsi", value: "Pengangkutan material tambang" },
          { label: "Lokasi kerja", value: "Jalur angkut (haul road)" },
        ],
      },
      {
        id: "mi-excavator",
        kind: "info",
        label: "Excavator",
        yaw: 30,
        pitch: -12,
        title: "Excavator",
        paragraphs: [
          "Excavator digunakan untuk menggali dan memuat material tambang ke dalam dump truck.",
        ],
        facts: [
          { label: "Fungsi", value: "Penggalian dan pemuatan material" },
        ],
      },
      {
        id: "mi-process",
        kind: "video",
        label: "Video Proses Tambang",
        yaw: 0,
        pitch: 12,
        title: "Proses Penambangan",
        src: "/videos/mining-process.mp4",
        description: "Alur kerja penggalian, pemuatan, dan pengangkutan material.",
      },
      {
        id: "mi-photo",
        kind: "image",
        label: "Foto Dump Truck",
        yaw: -70,
        pitch: 2,
        title: "Dump Truck di Haul Road",
        src: "/images/truck.png",
        caption: "Ilustrasi dump truck di area tambang.",
      },
      {
        id: "mi-to-plant",
        kind: "nav",
        label: "Ke Pabrik Pengolahan",
        yaw: 100,
        pitch: -4,
        target: "plant",
      },
      {
        id: "mi-to-workshop",
        kind: "nav",
        label: "Ke Workshop",
        yaw: -120,
        pitch: -4,
        target: "workshop",
      },
      {
        id: "mi-back",
        kind: "nav",
        label: "Kembali ke Gambaran Umum",
        yaw: 180,
        pitch: -4,
        target: "overview",
      },
    ],
  },
  {
    id: "plant",
    title: "Pabrik Pengolahan Nikel",
    subtitle: "Fasilitas pengolahan",
    description: "Fasilitas pengolahan nikel dengan beberapa tahap tungku.",
    image: "/panoramas/processing-plant.jpg",
    hotspots: [
      {
        id: "pl-dry",
        kind: "info",
        label: "Tungku Pengeringan",
        yaw: -40,
        pitch: -6,
        title: "Tungku Pengeringan (Drying Furnace)",
        paragraphs: [
          "Tahap awal untuk mengurangi kadar air pada bijih nikel sebelum diproses lebih lanjut.",
        ],
      },
      {
        id: "pl-red",
        kind: "info",
        label: "Tungku Reduksi",
        yaw: 10,
        pitch: -4,
        title: "Tungku Reduksi (Reduction Furnace)",
        paragraphs: [
          "Tahap reduksi untuk mengubah bijih menjadi bentuk yang lebih lanjut dapat diolah.",
        ],
      },
      {
        id: "pl-elec",
        kind: "info",
        label: "Tungku Listrik",
        yaw: 60,
        pitch: -4,
        title: "Tungku Listrik (Electric Furnace)",
        paragraphs: [
          "Tahap peleburan menggunakan tenaga listrik untuk menghasilkan produk nikel.",
        ],
      },
      {
        id: "pl-diagram",
        kind: "image",
        label: "Diagram Proses",
        yaw: -100,
        pitch: 4,
        title: "Diagram Proses Pengolahan",
        src: "/images/plant.png",
        caption: "Diagram alur proses pengolahan nikel (ilustrasi).",
      },
      {
        id: "pl-to-mine",
        kind: "nav",
        label: "Ke Area Tambang",
        yaw: 180,
        pitch: -4,
        target: "mine",
      },
      {
        id: "pl-back",
        kind: "nav",
        label: "Kembali ke Gambaran Umum",
        yaw: 120,
        pitch: -10,
        target: "overview",
      },
    ],
  },
  {
    id: "hydropower",
    title: "PLTA",
    subtitle: "Energi terbarukan",
    description: "Fasilitas pembangkit listrik tenaga air sebagai sumber energi terbarukan.",
    image: "/panoramas/hydropower.jpg",
    hotspots: [
      {
        id: "hy-larona",
        kind: "info",
        label: "PLTA Larona",
        yaw: -50,
        pitch: -4,
        title: "PLTA Larona",
        paragraphs: ["Pembangkit listrik tenaga air di sistem Sungai Larona."],
      },
      {
        id: "hy-balambano",
        kind: "info",
        label: "PLTA Balambano",
        yaw: 10,
        pitch: -4,
        title: "PLTA Balambano",
        paragraphs: ["Pembangkit listrik tenaga air di sistem Sungai Malili."],
      },
      {
        id: "hy-karebbe",
        kind: "info",
        label: "PLTA Karebbe",
        yaw: 70,
        pitch: -4,
        title: "PLTA Karebbe",
        paragraphs: ["Pembangkit listrik tenaga air di sistem Sungai Malili."],
      },
      {
        id: "hy-back",
        kind: "nav",
        label: "Kembali ke Gambaran Umum",
        yaw: 180,
        pitch: -6,
        target: "overview",
      },
    ],
  },
  {
    id: "workshop",
    title: "Workshop Pemeliharaan",
    subtitle: "Pemeliharaan alat berat",
    description: "Area perawatan dan perbaikan alat berat tambang.",
    image: "/panoramas/workshop.jpg",
    hotspots: [
      {
        id: "ws-info",
        kind: "info",
        label: "Pemeliharaan Alat Berat",
        yaw: -30,
        pitch: -4,
        title: "Pemeliharaan Alat Berat",
        paragraphs: [
          "Workshop menangani perawatan rutin dan perbaikan dump truck serta alat berat lainnya agar operasi tambang tetap berjalan.",
        ],
      },
      {
        id: "ws-back-mine",
        kind: "nav",
        label: "Kembali ke Area Tambang",
        yaw: 150,
        pitch: -4,
        target: "mine",
      },
    ],
  },
];

export type MapLocation = {
  id: string;
  label: string;
  /** Posisi pin dalam persen terhadap gambar masterplan */
  x: number;
  y: number;
  sceneId?: string;
  info?: { title: string; body: string };
};

export const MAP_LOCATIONS: MapLocation[] = [
  { id: "mine", label: "Area Tambang", x: 24, y: 68, sceneId: "mine" },
  { id: "workshop", label: "Workshop", x: 26, y: 28, sceneId: "workshop" },
  { id: "plant", label: "Pabrik Pengolahan", x: 50, y: 50, sceneId: "plant" },
  { id: "hydropower", label: "PLTA", x: 76, y: 24, sceneId: "hydropower" },
  {
    id: "community",
    label: "Area Komunitas",
    x: 78,
    y: 70,
    info: {
      title: "Area Komunitas",
      body: "Area pemukiman dan fasilitas komunitas di sekitar lokasi operasi. Konten detail akan ditambahkan pada fase berikutnya.",
    },
  },
];

export function getScene(id: string | undefined) {
  return SCENES.find((s) => s.id === id);
}
