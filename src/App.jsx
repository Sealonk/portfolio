import React, { useState, useEffect } from 'react';
import { Moon, Sun, Globe, Mail, Smartphone, ExternalLink, ArrowUpDown } from 'lucide-react';

// Komponen SVG untuk logo brand
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState('en');
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  
  // State untuk Modal Sertifikat
  const [modalActiveCategory, setModalActiveCategory] = useState('All');
  const [modalSortOrder, setModalSortOrder] = useState('newest'); // 'newest' | 'oldest'

  // Efek untuk mengubah class 'dark' di elemen html
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    let interval;
    if (selectedProject?.sliderImages?.length > 1) {
      interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % selectedProject.sliderImages.length);
      }, 3000); // Angka 3000 = 3 detik. Bisa Anda sesuaikan.
    }
    return () => clearInterval(interval);
  }, [isDark, selectedProject, activeSlide]);

  // Data Konten Terjemahan
  const t = {
    en: {
      nav: ['About', 'Tech Stack', 'Experience', 'Projects', 'Certificates', 'Contact'],
      heroBadge: "Hello, I'm Aloysius Andre Nathanael Hasudungan Manullang 👨‍💻",
      heroTitle: "I Architect And Build Cloud Systems That Scale.",
      heroDesc: "I'm a Cloud & Backend Engineer passionate about crafting clean, efficient infrastructure, scalable APIs, and integrating AI into functional applications.",
      btnWork: "View My Work",
      btnAbout: "About Me",
      stats: [
        { label: "Cloud Platforms", val: "3" },
        { label: "IELTS Score", val: "8.0" },
        { label: "TOEFL Score", val: "620" },
        { label: "TOEIC Score", val: "970" },
      ],
      sectionSkills: "Tech Stack & Skills",
      sectionExp: "Professional Experience",
      sectionProj: "Featured Projects",
      sectionCert: "Certificates & Awards",
      sectionCertDesc: "Highlight of my professional & academic credentials.",
      sectionContact: "Let's Talk",
      contactDesc: "Feel free to reach out for collaborations, cloud architecture discussions, or just a friendly hello.",
      modalTitle: "Certificate Archive",
      btnAllCerts: "View All Certificates",
      btnView: "View",
    },
    id: {
      nav: ['Tentang', 'Teknologi', 'Pengalaman', 'Proyek', 'Sertifikat', 'Kontak'],
      heroBadge: "Halo, Saya Aloysius Andre Nathanael Hasudungan Manullang 👨‍💻",
      heroTitle: "Saya Merancang Dan Membangun Sistem Cloud Skalabel.",
      heroDesc: "Saya seorang Cloud & Backend Engineer yang bersemangat dalam membangun infrastruktur yang bersih, efisien, API yang tangguh, serta mengintegrasikan AI ke dalam aplikasi fungsional.",
      btnWork: "Lihat Karya Saya",
      btnAbout: "Tentang Saya",
      stats: [
        { label: "Platform Cloud", val: "3" },
        { label: "Skor IELTS", val: "8.0" },
        { label: "Skor TOEFL", val: "620" },
        { label: "Skor TOEIC", val: "970" },
      ],
      sectionSkills: "Keahlian & Teknologi",
      sectionExp: "Pengalaman Profesional",
      sectionProj: "Proyek Pilihan",
      sectionCert: "Sertifikat & Penghargaan",
      sectionCertDesc: "Sorotan kredensial profesional & akademik saya.",
      sectionContact: "Mari Berdiskusi",
      contactDesc: "Jangan ragu untuk menghubungi saya untuk kolaborasi, diskusi arsitektur cloud, atau sekadar menyapa.",
      modalTitle: "Arsip Seluruh Sertifikat",
      btnAllCerts: "Lihat Semua Sertifikat",
      btnView: "Lihat",
    }
  };

  const content = t[lang];

  // Data Riwayat
  const experiences = [
    {
      role: "IT Developer (Internship)",
      company: "PTPN 1 Regional 7",
      date: "2025",
      desc_en: "Developed 'Aplikasi Simpel Kas' and health reporting systems. Implemented database architecture and built cloud-based backend for real-time monitoring.",
      desc_id: "Mengembangkan 'Aplikasi Simpel Kas' dan sistem pelaporan kesehatan. Mengimplementasikan arsitektur database dan backend berbasis cloud untuk pemantauan real-time."
    },
    {
      role: "Head of Project (Himatro on Video)",
      company: "Himatro Universitas Lampung",
      date: "2023 - 2025",
      desc_en: "Led the production team under the Info & Media Division. Managed workflows, member resources, and successfully delivered educational and event documentation content.",
      desc_id: "Memimpin tim produksi di bawah Divisi Media Informasi. Mengelola alur kerja, sumber daya anggota, dan sukses memproduksi konten edukasi serta dokumentasi acara."
    },
    {
      role: "Graphic Designer & Print Operator",
      company: "Futura Digital Printing",
      date: "2021",
      desc_en: "Handled layout configurations using Photoshop for large-scale printing efficiency and operated digital printing machines.",
      desc_id: "Menangani konfigurasi tata letak menggunakan Photoshop untuk efisiensi pencetakan skala besar dan mengoperasikan mesin cetak digital."
    }
  ];

const projectsData = [
    {
      id: "proj-1",
      title_en: "RSUD Pringsewu Nutrition & Forecasting",
      title_id: "Sistem Gizi & Peramalan RSUD Pringsewu",
      category_en: "Backend, ML Integration & Cloud",
      category_id: "Backend, Integrasi ML & Cloud",
      techList: [
        "Node.js", "Express.js", "FastAPI", "Python", "GRU (Gated Recurrent Unit)", 
        "MySQL", "Google App Engine", "Google Cloud SQL", "Postman", "JWT", "BCrypt"
      ],
      desc_en: "Undergraduate Thesis. Developed the backend microservices infrastructure and API endpoints to integrate a GRU-based machine learning model for daily patient forecasting.",
      desc_id: "Proyek Skripsi. Mengembangkan infrastruktur backend microservices dan endpoint API untuk mengintegrasikan model machine learning berbasis GRU dalam memprediksi pasien harian.",
      long_desc_en: "Si-Gizi is a comprehensive clinical nutrition assessment and patient forecasting system built for RSUD Pringsewu. The backend automates precise clinical logic using the Mifflin-St Jeor equation, Ulna/LiLA anthropometric estimations, and correction factors for 5 major chronic diseases (Diabetes Mellitus, CKD, Heart Failure, Stroke, and Gastritis). Developed using the Rapid Application Development (RAD) method, the system integrates predictive endpoints powered by a GRU model—developed by the team's AI Specialist—to forecast daily food portions and effectively reduce hospital food waste.",
      long_desc_id: "Si-Gizi adalah sistem asesmen gizi klinis dan peramalan pasien komprehensif untuk RSUD Pringsewu. Backend ini mengotomatisasi logika klinis presisi menggunakan rumus Mifflin-St Jeor, estimasi antropometri Ulna/LiLA, dan faktor koreksi untuk 5 penyakit kronis utama (Diabetes Melitus, CKD, Gagal Jantung, Stroke, dan Gastritis). Dikembangkan dengan metode Rapid Application Development (RAD), sistem ini mengintegrasikan endpoint prediktif berbasis model GRU—yang dikerjakan oleh Spesialis AI tim—untuk meramalkan porsi makanan harian dan menekan sisa makanan (food waste) rumah sakit.",
      thumbnail: "https://i.imgur.com/qF9LZLp.png",
      githubUrl: "#",
      liveUrl: "",
      sliderImages: [
        "https://i.imgur.com/9bA8eiw.png",
        "https://i.imgur.com/GrHnqWA.png",
        "https://i.imgur.com/qF9LZLp.png",
        "https://i.imgur.com/8aguRNo.png",
        "https://i.imgur.com/8WwPEcV.png",
        "https://i.imgur.com/SQ7zHB6.png",
        "https://i.imgur.com/JWK6cSV.png",
        "https://i.imgur.com/PC37rbm.png",
        "https://i.imgur.com/N8yxnNt.png",
        "https://i.imgur.com/EgVAYxj.png",
        "https://i.imgur.com/Y7zpvwx.png",
        "https://i.imgur.com/JXDSoDk.png",
        "https://i.imgur.com/hfuH9U1.png"
      ],

      // === DATA TAMBAHAN KHUSUS UNTUK MODAL DETAIL PROYEK ===
      
      // PERAN / KEY FEATURES
      role_en: [
        "Served as Backend Developer, architecting API infrastructure using Node.js and Express.js to integrate the GRU prediction model developed by the AI Specialist.",
        "Engineered cloud-native infrastructure on GCP. Utilized Google App Engine (Standard Environment) for scale-to-zero capabilities and Google Cloud SQL (MySQL) in the Jakarta region for low-latency data persistence.",
        "Automated complex clinical nutrition rules (Mifflin-St Jeor, Ulna/LiLA) and implemented versioning with soft-delete mechanisms to maintain secure medical audit trails.",
        "Implemented multi-layered Role-Based Access Control (Admin, Nutritionist, Management read-only) secured with JWT and BCrypt hashing.",
        "Conducted rigorous API performance testing on 18 endpoints using Postman, handling a Peak Load of 50 Virtual Users with an absolute 0.00% error rate, 95.57 req/sec max throughput, and ultra-fast 82-129 ms response latency."
      ],
      role_id: [
        "Berperan sebagai Backend Developer, merancang infrastruktur API menggunakan Node.js dan Express.js untuk mengintegrasikan model prediksi GRU yang dikembangkan oleh Spesialis AI.",
        "Merekayasa infrastruktur cloud-native di GCP. Memanfaatkan Google App Engine (Standard Environment) untuk kapabilitas scale-to-zero dan Google Cloud SQL (MySQL) di region Jakarta demi latensi rendah.",
        "Mengotomatisasi aturan gizi klinis kompleks (Mifflin-St Jeor, Ulna/LiLA) dan menerapkan sistem versioning serta mekanisme soft delete untuk menjaga rekam jejak audit (audit trail) medis.",
        "Mengimplementasikan Role-Based Access Control (RBAC) lapis ganda (Admin, Staf Ahli Gizi, dan Manajemen RSUD read-only) yang diamankan dengan JWT dan hashing BCrypt.",
        "Melakukan Black Box & Performance Testing ketat pada 18 endpoint menggunakan Postman, mampu menangani Peak Load 50 Virtual Users dengan error rate absolut 0.00%, throughput maksimal 95,57 request/detik, dan latensi 82-129 ms."
      ],
      
      // GALERI
      gallery: [
        { url: "https://i.imgur.com/sk9klVI.png",
          caption_en: "GCP Cloud Infrastructure Architecture",
          caption_id: "Arsitektur Infrastruktur Cloud GCP"
        },
        { url: "https://i.imgur.com/7t561LI.png",
          caption_en: "Relational Database ERD",
          caption_id: "ERD Database Relasional"
        },
        { url: "https://i.imgur.com/EozPHNE.png",
          caption_en: "Postman Stress Testing Results",
          caption_id: "Hasil Stress Testing Postman"
        },
        { url: "https://i.imgur.com/1Pf61MG.png",
          caption_en: "Backend Folder Structure",
          caption_id: "Struktur Folder Backend"
        }
      ]
    },
    {
      id: "proj-2",
      title_en: "Simpelkes - Healthcare & Pharmacy System",
      title_id: "Simpelkes - Sistem Informasi Kesehatan & Farmasi",
      category_en: "Fullstack Web & Cloud Database",
      category_id: "Web Fullstack & Database Cloud",
      techList: [
        "Laravel 10", "Blade Templating Engine", "PHP", "MySQL", "Google Cloud SQL", "Bootstrap", "Postman"
      ],
      // Deskripsi Singkat untuk Card di Halaman Utama
      desc_en: "Developed during an internship at PTPN I Regional 7. Architected an Administrator Module (Single Source of Truth) integrating health and pharmacy data from 28 clinic units across three provinces.",
      desc_id: "Dikembangkan saat PKL di PTPN I Regional 7. Merancang Modul Administrator (Single Source of Truth) yang mengintegrasikan data kesehatan dan farmasi dari 28 unit klinik di tiga provinsi.",
      
      // Overview Panjang untuk Modal Detail
      long_desc_en: "Simpelkes (Sistem Pelaporan Kesehatan) is an enterprise web application built for PTPN I Regional 7 to manage 28 Puskesbun (clinic units) spread across three provinces. Functioning as a Single Source of Truth, the system digitizes the recapitulation of 16 health data categories, an integrated cost module (Health Costs, BPJS Dues, and Capitation Funds), and end-to-end pharmacy master data (stock and daily usage analytics). Developed by a 4-developer team using MVC architecture with Laravel 10, the project leverages Google Cloud SQL to resolve schema migration conflicts during collaborative development.",
      long_desc_id: "Simpelkes (Sistem Pelaporan Kesehatan) adalah aplikasi web enterprise yang dibangun untuk PTPN I Regional 7 guna mengelola 28 Puskesbun (unit klinik) yang tersebar di tiga provinsi. Berfungsi sebagai Single Source of Truth, sistem ini mendigitalkan rekapitulasi 16 kategori data kesehatan, modul biaya terintegrasi (Biaya Kesehatan, Iuran BPJS, dan Dana Kapitasi), serta master data farmasi (stok dan analisis penggunaan harian). Dikembangkan oleh tim 4 orang menggunakan arsitektur MVC Laravel 10, proyek ini memanfaatkan Google Cloud SQL untuk mengatasi konflik migrasi skema database saat pengembangan bersama.",
      
      thumbnail: "https://i.imgur.com/CyZ65Yl.png",
      githubUrl: "https://github.com/faqihhmwn/Project-KP-PTPN.git", 
      liveUrl: "", 

      // CAROUSEL SCREENSHOT SLIDER (Header Modal)
      sliderImages: [
        "https://i.imgur.com/pDTI6nl.png",
        "https://i.imgur.com/CyZ65Yl.png",
        "https://i.imgur.com/OZ2CbNc.png",
        "https://i.imgur.com/uLDbjI7.png",
        "https://i.imgur.com/XSrCLq6.png",
        "https://i.imgur.com/QdxrFOC.png",
        "https://i.imgur.com/XpDIBuF.png",
        "https://i.imgur.com/nbUbPJ7.png",
        "https://i.imgur.com/s7iWWd5.png",
        "https://i.imgur.com/EaqnrpD.png",
        "https://i.imgur.com/QM77f8N.png"
      ],

      // FITUR UTAMA & PERAN SPESIFIK ANDA
      role_en: [
        "Architected the Administrator Module (Single Source of Truth) across all core features to centralize data from 28 remote clinic units.",
        "Developed fullstack workflows utilizing Laravel 10 MVC architecture and Blade Templating Engine for administrative forms and interactive dashboards.",
        "Integrated comprehensive financial modules for precise recalculation of Medical Expenses, BPJS Dues, and Capitation Funds.",
        "Engineered the pharmacy master data module, including a monthly usage grid (day 1-31) and automated stock tracking analytics.",
        "Provisioned and configured Google Cloud SQL as a centralized database environment, preventing local database drift and enabling smooth concurrent development.",
        "Executed comprehensive Black Box Testing using Postman across all API workflows and user actions, achieving a 100% pass rate."
      ],
      role_id: [
        "Merancang Modul Administrator (Single Source of Truth) pada seluruh fitur utama untuk memusatkan data dari 28 unit klinik yang tersebar.",
        "Mengembangkan alur kerja fullstack memanfaatkan arsitektur MVC Laravel 10 dan Blade Templating Engine untuk form administratif dan dashboard interaktif.",
        "Mengintegrasikan modul keuangan komprehensif untuk rekapitulasi presisi Biaya Kesehatan, Iuran BPJS, dan Dana Kapitasi.",
        "Merekayasa modul master data farmasi, termasuk grid rekapitulasi bulanan berbasis harian (tanggal 1–31) dan analitik pelacakan stok otomatis.",
        "Mengonfigurasi Google Cloud SQL sebagai database terpusat, mencegah bentrok migrasi lokal serta memperlancar kolaborasi pengembangan tim.",
        "Melakukan Black Box Testing secara menyeluruh menggunakan Postman pada semua alur endpoint dan aksi pengguna dengan tingkat kelulusan 100% (Pass)."
      ],

      // GALERI ARSITEKTUR & SCREENSHOT DENGAN CAPTION BILINGUAL
      gallery: [
        { 
          url: "https://i.imgur.com/A20RgJJ.png",
          caption_en: "Project Directory Structure",
          caption_id: "Struktur Direktori Proyek"
        },
        { 
          url: "https://i.imgur.com/frg8Kjr.png",
          caption_en: "Use Case Diagram for Admin Health Report",
          caption_id: "Use Case Diagram untuk Laporan Kesehatan Admin"
        },
        { 
          url: "https://i.imgur.com/CjTcu1K.png",
          caption_en: "Use Case Diagram for Admin Pharmacy",
          caption_id: "Use Case Diagram untuk Farmasi Admin"
        },
        { 
          url: "https://i.imgur.com/GVnkbjs.png",
          caption_en: "Use Case Diagram for Admin Cost Recapitulation",
          caption_id: "Use Case Diagram untuk Rekapitulasi Biaya Admin"
        },
        { 
          url: "https://i.imgur.com/LEvvl82.png",
          caption_en: "Activity Diagram for Admin Health Report",
          caption_id: "Activity Diagram untuk Laporan Kesehatan Admin"
        },
        { 
          url: "https://i.imgur.com/NeWIzSC.png",
          caption_en: "Activity Diagram for Admin Pharmacy",
          caption_id: "Activity Diagram untuk Farmasi Admin"
        },
        { 
          url: "https://i.imgur.com/H8zGNT6.png",
          caption_en: "Activity Diagram for Admin Cost Recapitulation",
          caption_id: "Activity Diagram untuk Rekapitulasi Biaya Admin"
        },
        { 
          url: "https://i.imgur.com/HkoxPb6.png",
          caption_en: "Sequence Diagram for Admin Health Report",
          caption_id: "Sequence Diagram untuk Laporan Kesehatan Admin"
        },
        { 
          url: "https://i.imgur.com/SFKHryF.png",
          caption_en: "Sequence Diagram for Admin Pharmacy",
          caption_id: "Sequence Diagram untuk Farmasi Admin"
        },
        { 
          url: "https://i.imgur.com/LAWNCO2.png",
          caption_en: "Sequence Diagram for Admin Cost Recapitulation",
          caption_id: "Sequence Diagram untuk Rekapitulasi Biaya Admin"
        },
        { 
          url: "https://i.imgur.com/LYasc15.png",
          caption_en: "Entity Relationship Diagram for Admin Health Report",
          caption_id: "Entity Relationship Diagram untuk Laporan Kesehatan Admin"
        },
        { 
          url: "https://i.imgur.com/jBOPUgg.png",
          caption_en: "Entity Relationship Diagram for Admin Pharmacy",
          caption_id: "Entity Relationship Diagram untuk Farmasi Admin"
        },
        { 
          url: "https://i.imgur.com/80peIDv.png",
          caption_en: "Entity Relationship Diagram for Admin Cost Recapitulation",
          caption_id: "Entity Relationship Diagram untuk Rekapitulasi Biaya Admin"
        }
      ]
    },
    {
      id: "proj-3",
      title_en: "Dwitin - Financial Tracking & OCR Management App",
      title_id: "Dwitin - Aplikasi Manajemen Keuangan & OCR Tracker",
      category_en: "Backend API & Cloud Infrastructure",
      category_id: "Backend API & Infrastruktur Cloud",
      techList: [
        "Node.js", "Express.js", "MySQL", "Google Compute Engine", 
        "Google Cloud SQL", "Google Cloud Storage (Bucket)", "Postman", "Kotlin", "TensorFlow Lite"
      ],
      // Deskripsi Singkat untuk Card di Halaman Utama
      desc_en: "Bangkit Academy 2024 Capstone Project. Developed the backend RESTful API and cloud infrastructure for a financial tracking mobile app featuring AI-powered OCR receipt scanning.",
      desc_id: "Capstone Project Bangkit Academy 2024. Mengembangkan backend RESTful API dan infrastruktur cloud untuk aplikasi mobile pelacakan keuangan dengan fitur scan struk OCR berbasis AI.",
      
      // Overview Panjang untuk Modal Detail
      long_desc_en: "Dwitin is a personal financial tracking application developed as a Product-based Capstone Project for Bangkit Academy 2024. The app helps users track daily income and expenses, automatically calculating total balances to build better financial habits. A standout feature is the integration of an Optical Character Recognition (OCR) machine learning model that allows users to scan shopping receipts via camera or gallery; the AI automatically extracts the transaction name, total amount, and date. Built collaboratively, the backend is powered by Node.js and Express.js, hosted on a statically-IP-configured Google Compute Engine, utilizing Google Cloud SQL for relational data and Cloud Storage buckets for saving receipt images and user profiles.",
      long_desc_id: "Dwitin adalah aplikasi pelacakan keuangan pribadi yang dikembangkan sebagai Capstone Project Bangkit Academy 2024. Aplikasi ini membantu pengguna mencatat pemasukan dan pengeluaran, serta menghitung total saldo secara otomatis untuk membentuk kebiasaan finansial yang lebih baik. Fitur unggulan dari aplikasi ini adalah integrasi model machine learning Optical Character Recognition (OCR) yang memungkinkan pengguna memindai struk belanja (melalui kamera atau galeri); AI akan secara otomatis mengekstrak nama transaksi, total pengeluaran, dan tanggal. Dibangun secara kolaboratif, backend aplikasi ini ditenagai oleh Node.js dan Express.js, di-host pada Google Compute Engine dengan konfigurasi IP Statis, serta memanfaatkan Google Cloud SQL (MySQL) dan Google Cloud Storage (Bucket) untuk menyimpan gambar struk dan foto profil pengguna.",
      
      // Link dan Thumbnail
      thumbnail: "https://i.imgur.com/6E5uR7H.png", // Ganti dengan screenshot Halaman Awal Dwitin[cite: 343]
      githubUrl: "https://github.com/Sealonk/dwitin-backend.git", // Ganti dengan link Dwitin Backend GitHub Repository[cite: 370]
      liveUrl: "", // API Endpoint URL dari Postman documentation[cite: 365, 370]

      // CAROUSEL SCREENSHOT SLIDER (Header Modal)
      sliderImages: [
        "https://i.imgur.com/u1K7cvi.png",
        "https://i.imgur.com/CDoR6Ey.png",
        "https://i.imgur.com/X8Hze3L.png",
        "https://i.imgur.com/WsEGj5p.png",
        "https://i.imgur.com/knzrYk2.png",
        "https://i.imgur.com/8A7kyOS.png",
        "https://i.imgur.com/zgo1E3y.png",
        "https://i.imgur.com/0snaF1W.png"
      ],

      // FITUR UTAMA & PERAN SPESIFIK ANDA (Fokus Backend & Cloud)
      role_en: [
        "Served as a Cloud Computing cohort member, architecting and deploying the backend server and Google Cloud infrastructure.",
        "Developed robust RESTful APIs using Node.js and Express.js to handle user authentication, transaction CRUD operations, and multipart form data for image processing.",
        "Provisioned a Google Compute Engine instance and configured a Static IP address along with specific firewall rules (allowing HTTP/HTTPS) to ensure stable and secure external API accessibility.",
        "Integrated Google Cloud SQL (MySQL) for scalable relational database management and Google Cloud Storage (Buckets) for securely storing user profile pictures and scanned OCR receipt images.",
        "Collaborated cross-functionally with Mobile Development (Kotlin) and Machine Learning (TensorFlow Lite) teams to define API JSON specifications and endpoint workflows.",
        "Conducted comprehensive API endpoint testing, validation, and documentation mapping using Postman."
      ],
      role_id: [
        "Berperan sebagai anggota tim Cloud Computing, merancang dan men-deploy server backend serta keseluruhan infrastruktur Google Cloud.",
        "Mengembangkan RESTful API yang tangguh menggunakan Node.js dan Express.js untuk menangani autentikasi pengguna, operasi CRUD transaksi, dan pengiriman form data (gambar).",
        "Melakukan provisioning instance Google Compute Engine dan mengonfigurasi IP Eksternal Statis (Static IP) beserta aturan Firewall (HTTP/HTTPS) untuk memastikan aksesibilitas API publik yang stabil.",
        "Mengintegrasikan Google Cloud SQL (MySQL) untuk manajemen database relasional dan Google Cloud Storage (Bucket) untuk menyimpan foto profil pengguna serta gambar struk hasil scan OCR.",
        "Berkolaborasi lintas tim dengan Mobile Development (Kotlin) dan Machine Learning (TensorFlow Lite) untuk menentukan spesifikasi respons JSON API dan alur integrasi aplikasi.",
        "Melakukan pengujian endpoint, validasi autentikasi token (JWT), dan pembuatan dokumentasi API menggunakan Postman."
      ],

      // GALERI ARSITEKTUR & SCREENSHOT DENGAN CAPTION BILINGUAL
      gallery: [
        { 
          url: "https://i.imgur.com/rNQafYu.png", //[cite: 346]
          caption_en: "Dwitin Dashboard & Latest Transactions",
          caption_id: "Beranda Dwitin & Transaksi Terbaru"
        },
        { 
          url: "https://i.imgur.com/t6GkB5G.png", //[cite: 350]
          caption_en: "AI Receipt Scanning Feature via Camera/Gallery",
          caption_id: "Fitur Scan Struk AI melalui Kamera/Galeri"
        },
        { 
          url: "https://i.imgur.com/N9H2S7Q.png", //[cite: 352]
          caption_en: "Auto-filled Transaction Data from OCR",
          caption_id: "Data Transaksi Terisi Otomatis dari Hasil OCR"
        },
        { 
          url: "https://i.imgur.com/0snaF1W.png", // Gunakan logo/skema postman API doc[cite: 365]
          caption_en: "RESTful API Endpoints Mapping on Postman",
          caption_id: "Pemetaan Endpoint RESTful API pada Postman"
        }
      ]
    }
  ];

  // =========================================================================
  // DATA SELURUH SERTIFIKAT (Dimodifikasi menjadi satu array panjang)
  // Ini agar kita bisa dengan mudah melakukan map() dan memfilternya
  // =========================================================================
  const allCertificatesData = [
    // -------------------------------------------------------------
    // Kategori: Bootcamps & Licenses (Bootcamp & Lisensi)
    // -------------------------------------------------------------
    { 
      title: "Bangkit Academy - Cloud Computing", 
      issuer: "Google, GoTo, Traveloka", 
      catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", 
      dateStr: "Jan 2025", dateObj: new Date('2025-01-10'), 
      thumbnail: "https://i.imgur.com/7XFH9Qu.png", 
      link: "https://drive.google.com/file/d/1ZX9dQxYVBr2xzPNuceLI-phzHqBEtivS/view?usp=drive_link",
      featured: true // Tandai sebagai highlight di halaman depan
    },
    { title: "[New] Ultimate AWS Certified Cloud Practitioner CLF-C02 2026", issuer: "Udemy", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Oct 2026", dateObj: new Date('2026-10-24'), thumbnail: "https://i.imgur.com/krlxayy.jpeg", link: "http://ude.my/UC-cfbf7feb-17a9-4568-9624-df0328ce6bc7", featured: true },
    { title: "Master Microsoft Azure Fundamentals: AZ-900 Exam Prep 2026", issuer: "Udemy", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Oct 2026", dateObj: new Date('2026-10-25'), thumbnail: "https://i.imgur.com/g1Np1CG.jpeg", link: "http://ude.my/UC-67bd093c-5f6a-42cd-ad41-288c48941e50", featured: true },
    { title: "Database Design", issuer: "Oracle Academy", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Jun 2024", dateObj: new Date('2024-06-03'), thumbnail: "https://i.imgur.com/P52Ndwn.png", link: "https://drive.google.com/file/d/11wLOmP7VvfnCZPoa4HV5ipe_qFS3mQXa/view?usp=drive_link", featured: false },
    { title: "Database Programming with SQL", issuer: "Oracle Academy", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Dec 2023", dateObj: new Date('2023-12-11'), thumbnail: "https://i.imgur.com/ImGRUyA.png", link: "https://drive.google.com/file/d/1BvT8ZA467wFzVWhQmrKSJfJ0MLMoxtsf/view?usp=drive_link", featured: false },
    { title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software", issuer: "Dicoding", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: " Sep 2024", dateObj: new Date('2024-09-11'), thumbnail: "https://i.imgur.com/pFpWenu.png", link: "https://www.dicoding.com/certificates/81P2NRDKYXOY", featured: false },
    { title: "CCNAv7: Introduction to Networks", issuer: "Cisco Networking Academy", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Jun 2024", dateObj: new Date('2024-06-19'), thumbnail: "https://i.imgur.com/5gmPUwI.png", link: "https://drive.google.com/file/d/1B0rtsWMcF0kbVwsHLSEYiWw_0N9RTV8O/view?usp=drive_link", featured: false },
    { title: "CCNA: Introduction to Networks", issuer: "Cisco Networking Academy", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Jun 2024", dateObj: new Date('2024-06-19'), thumbnail: "https://images.credly.com/size/340x340/images/70d71df5-f3dc-4380-9b9d-f22513a70417/CCNAITN__1_.png", link: "https://www.credly.com/badges/6f8ee87d-fda1-4f64-8b72-921f42c395d1/public_url", featured: false },
    { title: "Partner: PCAP - Programming Essentials in Python", issuer: "Cisco Networking Academy", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Sep 2023", dateObj: new Date('2023-09-19'), thumbnail: "https://i.imgur.com/Wp6vjdu.png", link: "https://drive.google.com/file/d/1Zyx-Da1N5ZRnzFYuU6vJRxybyjmKZDIl/view?usp=drive_link", featured: false },
    { title: "Pengenalan ke Logika Pemrograman (Programming Logic 101)", issuer: "Dicoding", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Sep 2024", dateObj: new Date('2024-09-11'), thumbnail: "https://i.imgur.com/CYjG6R8.png", link: "https://www.dicoding.com/certificates/53XEOR76YZRN", featured: false },
    { title: "Belajar Dasar Pemrograman Web", issuer: "Dicoding", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Sep 2024", dateObj: new Date('2024-09-19'), thumbnail: "https://i.imgur.com/PYLbYEa.png", link: "https://www.dicoding.com/certificates/4EXGQW1DGZRL", featured: false },
    { title: "Belajar Dasar Git dengan GitHub", issuer: "Dicoding", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Sep 2024", dateObj: new Date('2024-09-12'), thumbnail: "https://i.imgur.com/5fphqgf.png", link: "https://www.dicoding.com/certificates/NVP7Q28Y4ZR0", featured: false },
    { title: "Belajar Dasar Pemrograman JavaScript", issuer: "Dicoding", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Nov 2024", dateObj: new Date('2024-11-01'), thumbnail: "https://i.imgur.com/50Er3td.png", link: "https://www.dicoding.com/certificates/KEXLY7MRWZG2", featured: false },
    { title: "Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud", issuer: "Dicoding", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Nov 2024", dateObj: new Date('2024-11-09'), thumbnail: "https://i.imgur.com/kEoXS5F.png", link: "https://www.dicoding.com/certificates/98XW50069PM3", featured: false },
    { title: "Belajar Dasar AI", issuer: "Dicoding", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Nov 2024", dateObj: new Date('2024-11-18'), thumbnail: "https://i.imgur.com/uFKih8c.png", link: "https://www.dicoding.com/certificates/QLZ9VON99X5D", featured: false },
    { title: "Menjadi Google Cloud Engineer", issuer: "Dicoding", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Nov 2024", dateObj: new Date('2024-11-14'), thumbnail: "https://i.imgur.com/TeQZGyt.png", link: "https://www.dicoding.com/certificates/L4PQ5WOV4ZO1", featured: false },
    { title: "Belajar Penerapan Machine Learning dengan Google Cloud", issuer: "Dicoding", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Nov 2024", dateObj: new Date('2024-11-27'), thumbnail: "https://i.imgur.com/KWm7BKZ.png", link: "https://www.dicoding.com/certificates/2VX34E79QZYQ", featured: false },
    { title: "Studi Independen Bersertifikat Angkatan 7 di Yayasan Dicoding Indonesia", issuer: "Kampus Merdeka", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Dec 2024", dateObj: new Date('2024-12-31'), thumbnail: "https://i.imgur.com/8dZJWkl.png", link: "https://drive.google.com/file/d/1AvYJ3HOY-ASXnBsLosaKo1nnjj6wArBm/view?usp=drive_link", featured: false },
    { title: "AWS Foundations: Getting Started with the AWS Cloud Essentials", issuer: "AWS Training & Certification", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Sep 2026", dateObj: new Date('2026-09-30'), thumbnail: "https://i.imgur.com/LRgtQLv.png", link: "https://drive.google.com/file/d/1mzV5dR3Q6ayP0AaizomzWXB2kOz5daWz/view?usp=drive_link", featured: false },
    { title: "Google Cloud Computing Foundations Certificate", issuer: "Google Cloud", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Oct 2024", dateObj: new Date('2024-10-02'), thumbnail: "https://images.credly.com/size/340x340/images/4dda8ae4-99ee-476c-bca3-6f0adbab42fe/image.png", link: "https://www.credly.com/badges/d75e6426-7137-4b41-9841-38da1cc3afd9/public_url", featured: true },
    
    // -------------------------------------------------------------
    // Kategori: Awards & Licenses (Penghargaan & Kompetisi)
    // -------------------------------------------------------------
    { 
      title: "Silver Award - iTaLiiC (ECHOPEN)", 
      issuer: "Universiti Teknologi MARA", 
      catEn: "Awards & Licenses", catId: "Penghargaan & Kompetisi", 
      dateStr: "Jun 2025", dateObj: new Date('2025-06-27'), 
      thumbnail: "https://i.imgur.com/LJR8VEU.png", 
      link: "https://drive.google.com/file/d/1GADhyoozIVdGt6ROp-_f13RToB-XlpJs/view?usp=drive_link",
      featured: true 
    },
    { title: "Juara II - Lomba Film Fiksi", issuer: "MKKS SMK Kota Bandar Lampung", catEn: "Awards & Licenses", catId: "Penghargaan & Kompetisi", dateStr: "Feb 2020", dateObj: new Date('2020-02-21'), thumbnail: "https://i.imgur.com/RBaqqlR.png", link: "https://drive.google.com/file/d/1smg_RYdidBYbBTlz48x5el9IWdu_lvy_/view?usp=drive_link", featured: false },
    { title: "Juara 2 - Gebyar Minat & Bakat", issuer: "SMK Negeri 4 Bandar Lampung", catEn: "Awards & Licenses", catId: "Penghargaan & Kompetisi", dateStr: "2020", dateObj: new Date('2020-01-01'), thumbnail: "https://i.imgur.com/Ww6okqx.png", link: "https://drive.google.com/file/d/1RPMIbIm5EGfoMe0KNfCBvvpqbYm20Cat/view?usp=drive_link", featured: false },
    { title: "Terbaik III Gong Award - Festival Film Pelajar Jogja XI", issuer: "FFPJ Foundation", catEn: "Awards & Licenses", catId: "Penghargaan & Kompetisi", dateStr: "Dec 2020", dateObj: new Date('2020-12-17'), thumbnail: "https://i.imgur.com/KKNsaFB.png", link: "https://drive.google.com/file/d/1hXzglQaeCvj3Haabo6lbJ0_255QLJKsM/view?usp=drive_link", featured: false },
    
    // -------------------------------------------------------------
    // Kategori: Internships & Industry Experiences (Magang & Pengalaman Industri)
    // -------------------------------------------------------------
    { title: "Praktik Kerja Lapangan di PT Perkebunan Nusantara I Regional 7", issuer: "PT Perkebunan Nusantara I Regional 7", catEn: "Internships & Industry Experiences", catId: "Magang & Pengalaman Industri", dateStr: "Oct 2025", dateObj: new Date('2025-10-02'), thumbnail: "https://i.imgur.com/6D2kK8v.jpeg", link: "https://drive.google.com/file/d/15Y57Ws_UEeTmNnEo8kU8XPtQGZkS3SRT/view?usp=drive_link", featured: false },
    
    // -------------------------------------------------------------
    // Kategori: Language Certifications (Sertifikasi Bahasa)
    // -------------------------------------------------------------
      { 
      title: "IELTS Prediction Test (Score: 8.0)", 
      issuer: "DAILY ENGLISH", 
      catEn: "Language Certifications", catId: "Sertifikasi Bahasa", 
      dateStr: "Oct 2026", dateObj: new Date('2026-10-06'), 
      thumbnail: "https://i.imgur.com/jsi9Hqb.png", 
      link: "https://drive.google.com/file/d/1WKp8qUhRHHmhXSTyHaQttxRHe9mUerhV/view?usp=drive_link",
      featured: true 
    },
    { 
      title: "TOEIC Prediction Test (Score: 970)", 
      issuer: "Merry English", 
      catEn: "Language Certifications", catId: "Sertifikasi Bahasa", 
      dateStr: "Oct 2026", dateObj: new Date('2026-10-06'), 
      thumbnail: "https://i.imgur.com/eKqhhC4.png", 
      link: "https://drive.google.com/file/d/1po-eqokdBQeFrZRlzejv6svj0htVLd8a/view?usp=drive_link",
      featured: true 
    },
    { 
      title: "TOEFL Prediction Test (Score: 620)", 
      issuer: "Global Operation Indonesia", 
      catEn: "Language Certifications", catId: "Sertifikasi Bahasa", 
      dateStr: "Oct 2026", dateObj: new Date('2026-10-03'), 
      thumbnail: "https://i.imgur.com/KzeUPfD.png", 
      link: "https://drive.google.com/file/d/10N_JBMp_BhBI0-yfDbyRyMCPGmcV8l_r/view?usp=drive_link",
      featured: true 
    },
    { title: "English Proficiency Test (Score: 597)", issuer: "UPT Bahasa Unila", catEn: "Language Certifications", catId: "Sertifikasi Bahasa", dateStr: "Mar 2026", dateObj: new Date('2026-03-13'), thumbnail: "https://i.imgur.com/lHIZtqJ.png", link: "https://drive.google.com/file/d/1YAlCKrWFdizQ1MrqfRr_TwADofbrGSFw/view?usp=drive_link", featured: false },
    { title: "Matrikulasi Bahasa Inggris", issuer: "UPT Bahasa Unila", catEn: "Language Certifications", catId: "Sertifikasi Bahasa", dateStr: "Nov 2022", dateObj: new Date('2022-11-10'), thumbnail: "https://i.imgur.com/XJm2n9k.png", link: "https://drive.google.com/file/d/1BYIOU8Dr7GWtuwta4rjK6Fu_W981vvg-/view?usp=drive_link", featured: false },
    
    // -------------------------------------------------------------
    // Kategori: Google Cloud Badges (Lencana Google Cloud)
    // -------------------------------------------------------------
    { title: "Google Cloud Computing Foundations: Cloud Computing Fundamentals", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Sep 2024", dateObj: new Date('2024-09-25'), thumbnail: "https://cdn.qwiklabs.com/ZfZY3e%2FRjS56CUmz0fQhZbKt6eUfC1wAebm50h0dOhc%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/11672110", featured: false },
    { title: "Google Cloud Computing Foundations: Infrastructure in Google Cloud", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Sep 2024", dateObj: new Date('2024-09-26'), thumbnail: "https://cdn.qwiklabs.com/knJt4%2FpZ%2BAU9B6lx6AqxbY0RSzmivt9GXPPzisU4Inw%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/11703760", featured: false },
    { title: "Google Cloud Computing Foundations: Networking & Security in Google Cloud", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Sep 2024", dateObj: new Date('2024-09-27'), thumbnail: "https://cdn.qwiklabs.com/pVYCJYIRQHsBFUUrAg8aYuNEmzbxyqEC2ilOYTmppzo%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/11725627", featured: false },
    { title: "Google Cloud Computing Foundations: Data, ML, and AI in Google Cloud", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Sep 2024", dateObj: new Date('2024-09-28'), thumbnail: "https://cdn.qwiklabs.com/%2FBy3aI0JqF4BU2BLDdbQlmjd133DWGtLMATMDFuobQk%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/11745590", featured: false },
    { title: "Implementing Cloud Load Balancing for Compute Engine", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-01'), thumbnail: "https://cdn.qwiklabs.com/O%2BUe1xXu46e%2ByFUgcqTBv9siZuDhaelyqyBtltnwA4E%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/11804854", featured: false },
    { title: "Set Up an App Dev Environment on Google Cloud", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-01'), thumbnail: "https://cdn.qwiklabs.com/o%2BM1nlI4Yf8S0NtGm6ygsVm5NqJV5dVXy9JyubJVqn0%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/11806988", featured: false },
    { title: "Build a Secure Google Cloud Network", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-02'), thumbnail: "https://cdn.qwiklabs.com/iSYR6VYwTThdX1gWXV9xN9NiwGeNqW65BAtCXgYAxGU%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/11819880", featured: false },
    { title: "Prepare Data for ML APIs on Google Cloud", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-02'), thumbnail: "https://cdn.qwiklabs.com/nPOhhnNKn5VyW7dKUi0ukgK87u1tgExbM1fa%2B%2BeX4zo%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/11822097", featured: false },
    { title: "Build a Certification Study Guide: ACE Exam Prep", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-07'), thumbnail: "https://cdn.qwiklabs.com/6TzBGwX9NISzFhWkJz%2FWzZ6%2BC5KsGhXeXn1K92vzlEI%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/11903195", featured: false },
    { title: "Essential Google Cloud Infrastructure: Core Services", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-10'), thumbnail: "https://cdn.qwiklabs.com/hdHIPz6npkKuMzP%2Bnlk1gyb09IfzhGCrR7SIZ79icWs%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/11963609", featured: false },
    { title: "Getting Started with Google Kubernetes Engine", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-10'), thumbnail: "https://cdn.qwiklabs.com/5qMV5Ck6pa0EMzSSO0fvtyAqkJ00fo6FQ0N8D0%2BepH8%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/11977616", featured: false },
    { title: "Google Cloud Fundamentals: Core Infrastructure", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-11'), thumbnail: "https://cdn.qwiklabs.com/ykqx%2FdKZq0ua0i2KNrC4JDZ0Kt3yO2T9c5NCHHTm7b4%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/11993055", featured: false },
    { title: "Essential Google Cloud Infrastructure: Foundation", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-11'), thumbnail: "https://cdn.qwiklabs.com/sXGuN4FQ6AYqoPPnwxtXaMmA3eKG2ZNFstv5QRYbFTw%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/11993953", featured: false },
    { title: "Getting Started with Terraform for Google Cloud", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-14'), thumbnail: "https://cdn.qwiklabs.com/E0EWS7rM9IiKp4MHZk4XgtRq%2B4RXqpLF0j961kAG5ac%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/12046912", featured: false },
    { title: "Develop Your Google Cloud Network", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-15'), thumbnail: "https://cdn.qwiklabs.com/FUo7WKhzA3ZRaDzF41l0RmGXJ%2BcJMUWR3z%2FN5QePXKg%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/12078164", featured: false },
    { title: "Build Infrastructure with Terraform on Google", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-15'), thumbnail: "https://cdn.qwiklabs.com/eCR%2B8TRt2lGHpvrmy5%2FcQY8%2BxVdR0nNrbtDtPppFN%2Fg%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/12084278", featured: false },
    { title: "Developing a Google SRE Culture", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-16'), thumbnail: "https://cdn.qwiklabs.com/0VkisKkC7b9rlHYO0JkLd3fqVWdgaq%2BLDMn0IsVllxo%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/12111239", featured: false },
    { title: "Reliable Google Cloud Infrastructure: Design and Process", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-17'), thumbnail: "https://cdn.qwiklabs.com/hgqEwDiWVek4jgy88Ac2B8udXI2ZYMnoM%2BdzArdUB%2F0%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/12165144", featured: false },
    { title: "Elastic Google Cloud Infrastructure: Scaling and Automation", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-18'), thumbnail: "https://cdn.qwiklabs.com/fsGaykh5m07vPfTOyYz%2BEwEBeADIagdIqAo0SiLIdBM%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/12180060", featured: false },
    { title: "Logging and Monitoring in Google Cloud", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-18'), thumbnail: "https://cdn.qwiklabs.com/DHpzTAf8nURpg1hIW4%2BFKnALtuv3iID5OLhGWNLw1X8%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/12194394", featured: false },
    { title: "Observability in Google Cloud", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-22'), thumbnail: "https://cdn.qwiklabs.com/FsUiaU6e1uvtoA7g8kzgBevBEjVEkwzQa%2FjaY2QRe4k%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/12286661", featured: false },
    { title: "Implement DevOps Workflows in Google Cloud", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-22'), thumbnail: "https://cdn.qwiklabs.com/wiDbw4PBeAZyyAeuIW9EpZ5LuZ1Rp6WYhbZQ4WUsntc%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/12294173", featured: false },
    { title: "Using DevSecOps in your Google Cloud Environment", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-23'), thumbnail: "https://cdn.qwiklabs.com/qId9SA4VcGH8UCzrCf5FBoM%2F%2F9xupYhDL9oVRx2S3AI%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/12318275", featured: false },
    { title: "Monitor and Log with Google Cloud Observability", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Oct 2024", dateObj: new Date('2024-10-24'), thumbnail: "https://cdn.qwiklabs.com/HapnpI3pe4BJ10SYm7ASD4X1vZvO6VQ8i6k0zBf14uI%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/12352144", featured: false },
    { title: "Application Development on Cloud Run", issuer: "Google Cloud", catEn: "Google Cloud Badges", catId: "Lencana Google Cloud", dateStr: "Nov 2024", dateObj: new Date('2024-11-28'), thumbnail: "https://cdn.qwiklabs.com/0uyvsUi66feL0m5S2tkpc1Ih3wugGPR9iEBp4uuVonY%3D", link: "https://www.skills.google/public_profiles/903d7947-d323-4ae6-9e96-c32a0da4fdd0/badges/13050703", featured: false },
    
    // -------------------------------------------------------------
    // Kategori: International Seminars & Webinars (Seminar & Webinar Internasional)
    // -------------------------------------------------------------
    { title: "International Guest Lecturer", issuer: "Universitas Lampung", catEn: "International Seminars & Webinars", catId: "Seminar & Webinar Internasional", dateStr: "Sep 2023", dateObj: new Date('2023-09-11'), thumbnail: "https://i.imgur.com/mYKGg0l.png", link: "https://drive.google.com/file/d/1pl5JGBl3ocIJmIDaMTU1mbK891bqzN0R/view?usp=drive_link", featured: false },
    { title: "International Webinar of Tsunami", issuer: "Universitas Lampung", catEn: "International Seminars & Webinars", catId: "Seminar & Webinar Internasional", dateStr: "Sep 2023", dateObj: new Date('2023-09-05'), thumbnail: "https://i.imgur.com/ZcUS1OY.png", link: "https://drive.google.com/file/d/1q5jmLhZrFCVCoSgGnwaCaAdR75G4GB9U/view?usp=drive_link", featured: false },
    
    // -------------------------------------------------------------
    // Kategori: National/Local Seminars & Workshops (Seminar & Workshop Nasional/Lokal)
    // -------------------------------------------------------------
    { title: "Seminar Nasional EEA 2023", issuer: "Himatro Unila", catEn: "National/Local Seminars & Workshops", catId: "Seminar & Workshop Nasional/Lokal", dateStr: "Oct 2023", dateObj: new Date('2023-10-19'), thumbnail: "https://i.imgur.com/0KMXu0Q.png", link: "https://drive.google.com/file/d/1s1lXbjRaGiqoQlZK4MggtQ2HNbzbMdcY/view?usp=drive_link", featured: false },
    { title: "Seminar Nasional EEA 2024", issuer: "Himatro Unila", catEn: "National/Local Seminars & Workshops", catId: "Seminar & Workshop Nasional/Lokal", dateStr: "Sep 2024", dateObj: new Date('2024-09-29'), thumbnail: "https://i.imgur.com/JKlCo65.png", link: "https://drive.google.com/file/d/1i31-VyW6G6mQQzmQRfTEwxg767fD6fBN/view?usp=drive_link", featured: false },
    { title: "Seminar Nasional EEA 2025", issuer: "Himatro Unila", catEn: "National/Local Seminars & Workshops", catId: "Seminar & Workshop Nasional/Lokal", dateStr: "Oct 2025", dateObj: new Date('2025-10-10'), thumbnail: "https://i.imgur.com/V7QdR7h.png", link: "https://drive.google.com/file/d/1o3fy_YqAXpGZt2P7i_8sC5G2rj-c-ydY/view?usp=drive_link", featured: false },
    { title: "Webinar MSIB Angkatan 6", issuer: "Kampus Merdeka", catEn: "National/Local Seminars & Workshops", catId: "Seminar & Workshop Nasional/Lokal", dateStr: "Oct 2023", dateObj: new Date('2023-10-28'), thumbnail: "https://i.imgur.com/qGZFgkx.png", link: "https://drive.google.com/file/d/1jAa8VSa1oT0ThIzZ_pxo4ZeK4Md4Ue2Z/view?usp=drive_link", featured: false },
    { title: "Workshop Bahasa Inggris", issuer: "Himatro Unila", catEn: "National/Local Seminars & Workshops", catId: "Seminar & Workshop Nasional/Lokal", dateStr: "Apr 2024", dateObj: new Date('2024-04-03'), thumbnail: "https://i.imgur.com/4RQNmci.png", link: "https://drive.google.com/file/d/1BqXCWDCVHW3vjYJTLRF5osP7o2EREN-6/view?usp=drive_link", featured: false },
    { title: "Ruangguru - Campus Talk", issuer: "Ruangguru CAMP", catEn: "National/Local Seminars & Workshops", catId: "Seminar & Workshop Nasional/Lokal", dateStr: "May 2023", dateObj: new Date('2023-05-23'), thumbnail: "https://i.imgur.com/cUjRMx3.png", link: "https://drive.google.com/file/d/1YzQpBqurJ_TVf232vgV6soVf_P-5LuGc/view?usp=drive_link", featured: false },
    
    // -------------------------------------------------------------
    // Kategori: Trainings & Organizations (Soft Skills) (Pelatihan & Organisasi)
    // -------------------------------------------------------------
    { title: "LKMM-TD Dasar", issuer: "Himatro Unila", catEn: "Trainings & Organizations (Soft Skills)", catId: "Pelatihan & Organisasi (Soft Skills)", dateStr: "Nov 2022", dateObj: new Date('2022-11-20'), thumbnail: "https://i.imgur.com/vcLXqTm.png", link: "https://drive.google.com/file/d/1CyxpENyrOxrfRUe69TgtvQVsYNs8IZ6G/view?usp=drive_link", featured: false },
    { title: "Hi-Class Himatro Unila", issuer: "Himatro Unila", catEn: "Trainings & Organizations (Soft Skills)", catId: "Pelatihan & Organisasi (Soft Skills)", dateStr: "Nov 2022", dateObj: new Date('2022-11-18'), thumbnail: "https://i.imgur.com/25BNyNn.png", link: "https://drive.google.com/file/d/1CyxpENyrOxrfRUe69TgtvQVsYNs8IZ6G/view?usp=drive_link", featured: false },
    { title: "Webinar Essay & KTI", issuer: "Himatro Unila", catEn: "Trainings & Organizations (Soft Skills)", catId: "Pelatihan & Organisasi (Soft Skills)", dateStr: "May 2023", dateObj: new Date('2023-05-13'), thumbnail: "https://i.imgur.com/25qdhwj.png", link: "https://drive.google.com/file/d/1vqbNgrwUHUD-H5jEhg_brNZLP4QU3V4H/view?usp=drive_link", featured: false },
    { title: "Kuliah Umum Karya Ilmiah", issuer: "Fakultas Teknik Unila", catEn: "Trainings & Organizations (Soft Skills)", catId: "Pelatihan & Organisasi (Soft Skills)", dateStr: "Oct 2022", dateObj: new Date('2022-10-20'), thumbnail: "https://i.imgur.com/Ypw17qz.png", link: "https://drive.google.com/file/d/1sCDhsiDDoRJ5kz5D7aM8JTabzVINfLz0/view?usp=drive_link", featured: false },
    { title: "Pelatihan Minat Bakat", issuer: "Universitas Lampung", catEn: "Trainings & Organizations (Soft Skills)", catId: "Pelatihan & Organisasi (Soft Skills)", dateStr: "Aug 2022", dateObj: new Date('2022-08-20'), thumbnail: "https://i.imgur.com/54EKGea.png", link: "https://drive.google.com/file/d/1zWWjxUzYPBFUtb7qXYBVJdDr-lS1olfM/view?usp=drive_link", featured: false },
    { title: "Orientasi Pengurus Himatro Unila 2024", issuer: "Himatro Unila", catEn: "Trainings & Organizations (Soft Skills)", catId: "Pelatihan & Organisasi (Soft Skills)", dateStr: "Apr 2024", dateObj: new Date('2024-04-27'), thumbnail: "https://i.imgur.com/64CeVm6.png", link: "https://drive.google.com/file/d/1aS2pKQEwtDmpZBwuw5zwPlUAm1yNOLzl/view?usp=drive_link", featured: false },
    { title: "Kepengurusan Himatro Unila Periode 2024", issuer: "Himatro Unila", catEn: "Trainings & Organizations (Soft Skills)", catId: "Pelatihan & Organisasi (Soft Skills)", dateStr: "2025", dateObj: new Date('2025-01-01'), thumbnail: "https://i.imgur.com/s93sZMk.jpeg", link: "https://drive.google.com/file/d/1gfMdAY5Gl0YJZCAA7aiSPQAR1NO5A3mv/view?usp=drive_link", featured: false },
    { title: "Kepengurusan Himatro Unila Periode 2023", issuer: "Himatro Unila", catEn: "Trainings & Organizations (Soft Skills)", catId: "Pelatihan & Organisasi (Soft Skills)", dateStr: "2025", dateObj: new Date('2025-01-01'), thumbnail: "https://i.imgur.com/hFtlHNr.jpeg", link: "https://drive.google.com/file/d/1tINE9ZFGPRyvjw9UCtwrFqe29C8OE4lP/view?usp=drive_link", featured: false },
    { title: "General Lecture on Cybersecurity", issuer: "Fakultas Teknik Unila", catEn: "Trainings & Organizations (Soft Skills)", catId: "Pelatihan & Organisasi (Soft Skills)", dateStr: "Jun 2024", dateObj: new Date('2024-06-03'), thumbnail: "https://i.imgur.com/I5xuXKj.jpeg", link: "https://drive.google.com/file/d/1EBeI4DwqpdlSitWsjfpzJTJ-Mer7hQPo/view?usp=drive_link", featured: false },
    { title: "Kuliah Umum Nasional", issuer: "Fakultas Teknik Unila", catEn: "Trainings & Organizations (Soft Skills)", catId: "Pelatihan & Organisasi (Soft Skills)", dateStr: "May 2024", dateObj: new Date('2024-05-21'), thumbnail: "https://i.imgur.com/yGGc3XT.jpeg", link: "https://drive.google.com/file/d/1NvyfkofET9BmlcEMnM84_E46oY98Y6MX/view?usp=drive_link", featured: false },
  ];

  // Fungsi untuk memformat tanggal (Bulan Tahun) sesuai bahasa (en/id)
  const formatDate = (dateObj, currentLang) => {
    if (!dateObj) return "";
    
    // Menggunakan Intl.DateTimeFormat bawaan browser
    const formatter = new Intl.DateTimeFormat(currentLang === 'id' ? 'id-ID' : 'en-US', {
      month: 'short',
      year: 'numeric'
    });
    
    return formatter.format(dateObj);
  };

  // Mendapatkan daftar unik kategori berdasarkan bahasa
  const getUniqueCategories = () => {
    const cats = new Set();
    allCertificatesData.forEach(cert => {
      cats.add(lang === 'en' ? cert.catEn : cert.catId);
    });
    return ["All", ...Array.from(cats)];
  };

  const modalCategories = getUniqueCategories();

  // Memfilter dan mengurutkan data sertifikat di dalam Modal
  const getFilteredAndSortedCerts = () => {
    let filtered = [...allCertificatesData];
    
    // Filter by Category
    if (modalActiveCategory !== 'All') {
      filtered = filtered.filter(cert => {
        const certCat = lang === 'en' ? cert.catEn : cert.catId;
        return certCat === modalActiveCategory;
      });
    }

    // Sort
    return filtered.sort((a, b) => {
      return modalSortOrder === 'newest' ? b.dateObj - a.dateObj : a.dateObj - b.dateObj;
    });
  };

  return (
    <div className="font-sans antialiased min-h-screen">
      {/* NAVBAR */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">
            ANDRE<span className="text-blue-600 dark:text-cyan-400">.</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            {content.nav.map((item, idx) => (
              <a key={idx} href={`#section-${idx}`} className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                setLang(lang === 'en' ? 'id' : 'en');
                setModalActiveCategory('All'); // Reset kategori jika ganti bahasa
              }}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
              title="Toggle Language"
            >
              <Globe size={20} />
              <span className="text-xs font-bold absolute mt-4 ml-1">{lang.toUpperCase()}</span>
            </button>
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href="#section-5" className="hidden md:block bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
              Download CV &rarr;
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="section-0" className="pt-40 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 dark:bg-cyan-900/30 text-blue-600 dark:text-cyan-400 text-sm font-medium border border-blue-100 dark:border-cyan-800">
            {content.heroBadge}
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
            {content.heroTitle}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
            {content.heroDesc}
          </p>
          <div className="flex items-center gap-4 pt-4">
            <a href="#section-3" className="bg-slate-900 dark:bg-cyan-500 text-white dark:text-slate-950 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg">
              {content.btnWork} &rarr;
            </a>
            <a href="#section-1" className="bg-transparent text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 px-8 py-3 rounded-full font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              {content.btnAbout}
            </a>
          </div>
          
          <div className="flex items-center gap-6 pt-8 text-slate-500 dark:text-slate-400">
            <a href="https://linkedin.com/in/aloysius-andre-n-h-m" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
              <LinkedinIcon /> LinkedIn
            </a>
            <a href="https://github.com/Sealonk" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors">
              <GithubIcon /> GitHub
            </a>
          </div>
        </div>

        <div className="flex-1 w-full relative">
          <div className="aspect-video bg-gray-100 dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-2xl overflow-hidden relative">
             <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-slate-600 text-sm font-mono">
               [ Insert Your Image / Tech Visual Here ]
             </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="border-y border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {content.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center md:items-start border-l-2 border-transparent md:border-gray-200 md:dark:border-slate-700 md:pl-6 first:border-none">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.val}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section id="section-1" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 tracking-tight">{content.sectionSkills}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Google Cloud (GCP)', 'AWS', 'Azure', 'Node.js', 'Express.js', 'MySQL', 'FastAPI', 'Laravel', 'React & Next.js', 'Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint'].map((skill, idx) => (
            <div key={idx} className="p-4 border border-gray-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-center font-medium shadow-sm hover:shadow-md transition-shadow">
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="section-2" className="py-20 px-6 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 tracking-tight">{content.sectionExp}</h2>
          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                    <p className="text-blue-600 dark:text-cyan-400 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 mt-2 md:mt-0 font-mono">{exp.date}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {lang === 'en' ? exp.desc_en : exp.desc_id}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="section-3" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 tracking-tight">{content.sectionProj}</h2>
        
        {/* Menggunakan grid-cols-3 agar ketiga proyek tampil berjajar */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((proj, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col cursor-pointer border border-gray-200 dark:border-slate-800 rounded-2xl p-4 hover:shadow-xl transition-all bg-white dark:bg-slate-950 h-full"
              onClick={() => setSelectedProject(proj)} // Buka modal saat diklik
            >
              
              {/* Area Thumbnail */}
              <div className="aspect-video bg-gray-100 dark:bg-slate-900 rounded-xl mb-5 overflow-hidden relative">
                 <img 
                    src={proj.thumbnail} 
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                 />
                 <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
                      {content.btnView} Detail <ExternalLink size={14} />
                    </span>
                 </div>
              </div>

              {/* Teks Informasi */}
              <div className="flex-1 flex flex-col">
                <span className="text-xs font-bold text-blue-600 dark:text-cyan-500 uppercase tracking-wider mb-2">
                  {lang === 'en' ? proj.category_en : proj.category_id} {/* BILINGUAL */}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
                  {lang === 'en' ? proj.title_en : proj.title_id} {/* BILINGUAL */}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                  {lang === 'en' ? proj.desc_en : proj.desc_id}
                </p>
                
                {/* Tech Pills (Tags) */}
                <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-slate-800">
                  {proj.techList.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-[10px] font-semibold px-2 py-1 bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
                      {tech}
                    </span>
                  ))}
                  {proj.techList.length > 3 && (
                    <span className="text-[10px] font-semibold px-2 py-1 bg-gray-50 dark:bg-slate-900 text-slate-400 rounded-md border border-gray-200 dark:border-slate-700">
                      +{proj.techList.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

{/* CERTIFICATES SECTION */}
      <section id="section-4" className="py-20 px-6 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{content.sectionCert}</h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">{content.sectionCertDesc}</p>
            </div>
            <button 
              onClick={() => setShowAllCerts(true)}
              className="group flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 transition-colors shrink-0"
            >
              {content.btnAllCerts} <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>

          {/* Grid Sertifikat Pilihan di Halaman Utama */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max content-start">
            {allCertificatesData
              .filter(cert => cert.featured)
              .sort((a, b) => b.dateObj - a.dateObj) 
              .slice(0, 8) 
              .map((cert, idx) => (
              <div key={idx} className="group flex flex-col p-4 bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative h-full">
                
                {/* Bagian Thumbnail dengan Efek Hover Disamakan dengan Modal */}
                <div className="aspect-video mb-4 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 p-2 relative flex items-center justify-center">
                  <img 
                    src={cert.thumbnail} 
                    alt={cert.title} 
                    loading="lazy"
                    className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300" 
                  />
                  
                  {/* OVERLAY & TOMBOL VIEW YANG MUNCUL SAAT HOVER */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                    <a 
                      href={cert.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full flex items-center gap-2 hover:bg-blue-500 transition-colors shadow-lg"
                    >
                      {content.btnView} <ExternalLink size={14}/>
                    </a>
                  </div>
                </div>
                
                <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-500 uppercase tracking-wider mb-2 block">
                  {lang === 'en' ? cert.catEn : cert.catId}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mb-2">{cert.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{cert.issuer}</p>
                
                <div className="mt-auto pt-3 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-xs font-mono text-slate-400">{formatDate(cert.dateObj, lang)}</span>
                  <a href={cert.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400">
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* MODAL POP-UP SEMUA SERTIFIKAT */}
      {showAllCerts && (
        <div className="fixed inset-0 z-[60] bg-slate-900/80 backdrop-blur-sm flex justify-center items-center p-4 md:p-6">
          {/* Mengubah max-h-[95vh] menjadi h-[95vh] agar tingginya SELALU tetap/konsisten */}
          <div className="bg-white dark:bg-slate-950 w-full max-w-7xl h-[95vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-gray-200 dark:border-slate-800">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-950 shrink-0">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {content.modalTitle}
              </h3>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button 
                  onClick={() => setModalSortOrder(modalSortOrder === 'newest' ? 'oldest' : 'newest')}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <ArrowUpDown size={14} /> 
                  {modalSortOrder === 'newest' ? (lang==='en'?'Newest First':'Terbaru') : (lang==='en'?'Oldest First':'Terlama')}
                </button>
                <button 
                  onClick={() => setShowAllCerts(false)}
                  className="ml-auto p-2 bg-gray-100 dark:bg-slate-800 hover:bg-red-500 hover:text-white rounded-full transition-colors text-slate-600 dark:text-slate-300"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Filter Tabs */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800 flex flex-wrap gap-2 shrink-0 bg-white dark:bg-slate-950">
              {modalCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setModalActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                    modalActiveCategory === cat 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md dark:bg-cyan-500 dark:text-slate-950 dark:border-cyan-500' 
                      : 'bg-gray-50 text-slate-600 border-gray-200 hover:bg-gray-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat === 'All' ? (lang === 'en' ? 'All Certificates' : 'Semua Sertifikat') : cat}
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 flex-1 bg-gray-100 dark:bg-slate-900/60 custom-scrollbar">
              {/* Menggunakan auto-rows-max dan content-start agar ukuran kartu tetap sama dan selalu di atas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max content-start">
                
                {getFilteredAndSortedCerts().map((cert, idx) => (
                  <div key={idx} className="group flex flex-col border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all bg-white dark:bg-slate-800 h-full">
                    
                    {/* Menambahkan p-3 (padding) di sini, dan background abu-abu muda/biru */}
                    <div className="aspect-video bg-slate-100 dark:bg-slate-700 relative overflow-hidden p-3 flex items-center justify-center">
                      <img 
                        src={cert.thumbnail} 
                        alt={cert.title}
                        loading="lazy"
                        className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300 rounded-md" 
                      />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-t-xl">
                        <a 
                          href={cert.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full flex items-center gap-2 hover:bg-blue-500 transition-colors shadow-lg"
                        >
                          {content.btnView} <ExternalLink size={14}/>
                        </a>
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider mb-2 block">
                          {lang === 'en' ? cert.catEn : cert.catId}
                        </span>
                        <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-2 leading-snug">{cert.title}</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{cert.issuer}</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center text-xs">
                        <span className="font-mono text-slate-400 font-semibold">{formatDate(cert.dateObj, lang)}</span>
                      </div>
                    </div>

                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL POP-UP DETAIL PROYEK */}
      {selectedProject && (
        // Latar Belakang Hitam (Fixed, tidak bisa di-scroll)
        <div className="fixed inset-0 z-[70] bg-slate-900/80 backdrop-blur-sm flex justify-center items-center p-4 md:p-6">
          
          {/* KOTAK MODAL UTAMA (Relative, tinggi maksimal layar, overflow tersembunyi) */}
          <div className="relative bg-white dark:bg-slate-950 w-full max-w-5xl h-[95vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-slate-800">
            
            {/* TOMBOL CLOSE - Tepat di dalam kotak, Absolute (Akan selalu diam di pojok kotak) */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center bg-black/60 hover:bg-red-500 text-white rounded-full backdrop-blur-md transition-colors z-[100] shadow-lg"
            >
              ✕
            </button>

            {/* AREA KONTEN (Inilah yang bisa di-scroll ke bawah) */}
            <div className="overflow-y-auto w-full h-full custom-scrollbar flex flex-col">
              
              {/* HEADER: CAROUSEL / SLIDER GAMBAR */}
              {selectedProject.sliderImages && selectedProject.sliderImages.length > 0 ? (
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden shrink-0 group">
                  
                  <div 
                    className="flex w-full h-full transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                  >
                    {selectedProject.sliderImages.map((img, idx) => (
                      <div key={idx} className="w-full h-full shrink-0 relative">
                        <img src={img} alt={`Slide ${idx}`} className="w-full h-full object-cover opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                      </div>
                    ))}
                  </div>

                  {/* Navigasi Bulat (Dynamic Dots) Maksimal 5 Tampil */}
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-2 z-20 overflow-hidden px-4">
                    {selectedProject.sliderImages.map((_, idx) => {
                      const dist = Math.abs(idx - activeSlide);
                      const isVisible = dist <= 2; 
                      if (!isVisible) return null;

                      let dotClass = "h-2 rounded-full transition-all duration-300 shadow-md ";
                      if (dist === 0) dotClass += "w-6 bg-blue-500"; 
                      else if (dist === 1) dotClass += "w-2.5 bg-white/80 hover:bg-white cursor-pointer";
                      else dotClass += "w-1.5 bg-white/40 hover:bg-white cursor-pointer";

                      return (
                        <button 
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setActiveSlide(idx); }}
                          className={dotClass}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      );
                    })}
                  </div>

                  {/* Judul Teks */}
                  <div className="absolute bottom-12 md:bottom-16 left-6 right-6 md:left-10 md:right-10 z-20 pointer-events-none pr-12 md:pr-24">
                    <span className="text-cyan-400 text-sm md:text-base font-bold uppercase tracking-wider mb-2 block drop-shadow-md">
                      {lang === 'en' ? selectedProject.category_en : selectedProject.category_id}
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                      {lang === 'en' ? selectedProject.title_en : selectedProject.title_id}
                    </h2>
                  </div>
                </div>
              ) : (
                /* Fallback (Jika tidak ada slider) */
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden shrink-0">
                  <img src={selectedProject.thumbnail} alt="Cover" className="w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                  
                  <div className="absolute bottom-12 md:bottom-16 left-6 right-6 md:left-10 md:right-10 z-20 pr-12 md:pr-24">
                    <span className="text-cyan-400 text-sm md:text-base font-bold uppercase tracking-wider mb-2 block drop-shadow-md">
                      {lang === 'en' ? selectedProject.category_en : selectedProject.category_id}
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                      {lang === 'en' ? selectedProject.title_en : selectedProject.title_id}
                    </h2>
                  </div>
                </div>
              )}

              {/* BODY KONTEN DETAIL BAWAH */}
              <div className="p-6 md:p-10 flex flex-col md:flex-row gap-10 bg-white dark:bg-slate-950 flex-1">
                
                <div className="flex-[2] space-y-10">
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      {lang === 'en' ? 'Project Overview' : 'Gambaran Proyek'}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base text-justify">
                      {lang === 'en' ? selectedProject.long_desc_en : selectedProject.long_desc_id}
                    </p>
                  </div>
                  
                  {(selectedProject.role_en || selectedProject.role_id) && (
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-5">
                        {lang === 'en' ? 'Key Features & My Contributions' : 'Fitur Utama & Kontribusi Saya'}
                      </h4>
                      <ul className="space-y-4">
                        {(lang === 'en' ? selectedProject.role_en : selectedProject.role_id).map((item, i) => (
                          <li key={i} className="flex items-start gap-4 text-sm md:text-base text-slate-600 dark:text-slate-400">
                            <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-500 shrink-0"></span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                    <div>
                      {/* Judul Galeri (sudah bilingual) */}
                      <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-5">
                        {lang === 'en' ? 'Gallery' : 'Galeri'}
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {selectedProject.gallery.map((img, i) => (
                          <div key={i} className="group flex flex-col gap-3">
                            <div 
                              className="aspect-video bg-gray-100 dark:bg-slate-900 p-2 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-lg cursor-zoom-in overflow-hidden flex items-center justify-center transition-shadow"
                              onClick={() => setZoomedImage(img.url)}
                            >
                              <img 
                                src={img.url} 
                                // HAPUS img.caption lama, ganti dengan fallback bilingual untuk alt text
                                alt={lang === 'en' ? img.caption_en : img.caption_id} 
                                loading="lazy" 
                                className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300 rounded-lg drop-shadow-sm" 
                              />
                            </div>
                            
                            {/* PERBAIKAN: Teks Caption Bilingual dan Warna lebih terang di Dark Mode */}
                            <span className="text-xs text-center font-semibold text-slate-600 dark:text-slate-300">
                              {lang === 'en' ? img.caption_en : img.caption_id}
                            </span>
                            
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-8">
                  <div className="p-6 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-gray-100 dark:border-slate-800">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-5 uppercase tracking-wider">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techList.map((tech, i) => (
                        <span key={i} className="text-xs font-semibold px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {selectedProject.githubUrl && selectedProject.githubUrl !== "#" && (
                      <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-md">
                        <GithubIcon /> View Source Code
                      </a>
                    )}
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX UNTUK ZOOM GAMBAR GALERI */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex justify-center items-center p-4 md:p-10 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 p-3 bg-white/10 hover:bg-red-500 text-white rounded-full transition-colors z-[110]"
            onClick={() => setZoomedImage(null)}
          >
            ✕
          </button>
          
          {/* e.stopPropagation() mencegah Lightbox tertutup jika area gambarnya sendiri yang diklik */}
          <img 
            src={zoomedImage} 
            alt="Zoomed View" 
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      {/* CONTACT SECTION */}
      <section id="section-5" className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">{content.sectionContact}</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          {content.contactDesc}
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="mailto:aloysiusandrenhm@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:scale-105 transition-transform shadow-lg">
            <Mail size={20} /> Email Me
          </a>
          <a href="https://wa.me/6289618927443" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-bold hover:scale-105 transition-transform shadow-lg">
            <Smartphone size={20} /> WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-gray-100 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} Aloysius Andre Nathanael Hasudungan Manullang. All rights reserved.</p>
      </footer>
    </div>
  );
}