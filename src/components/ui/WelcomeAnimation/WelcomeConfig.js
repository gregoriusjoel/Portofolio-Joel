/**
 * ==========================================================
 *  KONFIGURASI WELCOME ANIMATION (INTRO LOADING)
 * ==========================================================
 */

export const welcomeConfig = {
  // Monogram / Logo Icon
  monogram: {
    show: true,
    image: "/assets/project/Foto Profile/icon-jo-black.png",
    alt: "Joel Avatar",
  },

  // Moniker kecil di atas judul
  moniker: "GREGORIUS JOEL • PORTFOLIO",

  // Judul Utama & Subjudul
  heading: {
    title: "Welcome to my portfolio",
    subtitle: "Turning ideas into impactful, functional digital reality.",
  },

  // Daftar Keahlian / Peran (Ditampilkan dalam 1 capsule elegan)
  roles: ["Full Stack Developer", "UI/UX Designer", "Video Editor"],

  // Durasi Animasi (5 Detik)
  timing: {
    totalDuration: 5000,    // Total durasi 5000ms
    revealDelayTitle: 200,  // Delay judul masuk
    revealDelayRoles: 750,  // Delay roles masuk
    revealDelayBar: 1200,   // Delay progress bar
  },

  // Tombol Skip
  skipButton: {
    show: true,
    label: "Skip",
    shortcutKey: "Esc",
  }
};
