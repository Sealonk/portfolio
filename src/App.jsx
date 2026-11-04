import React, { useState, useEffect } from 'react';
import { Moon, Sun, Globe, Mail, Smartphone, ExternalLink, ArrowUpDown, Printer, FileCheck, ZoomIn, FileText, Menu, X } from 'lucide-react';

// Komponen SVG untuk logo brand
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

// =========================================================================
// KOMPONEN PROJECT SLIDER INTERAKTIF
// =========================================================================
const ProjectSlider = ({ project, lang }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    if (isDragging || !project.sliderImages || project.sliderImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % project.sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isDragging, project.sliderImages]);

  const handleMouseDown = (e) => { setIsDragging(true); setStartX(e.pageX); };
  const handleMouseMove = (e) => { if (!isDragging) return; e.preventDefault(); setDragOffset(e.pageX - startX); };
  
  const handleTouchStart = (e) => { setIsDragging(true); setStartX(e.touches[0].clientX); };
  const handleTouchMove = (e) => { if (!isDragging) return; setDragOffset(e.touches[0].clientX - startX); };
  
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50) setActiveSlide((prev) => (prev + 1) % project.sliderImages.length);
    else if (dragOffset > 50) setActiveSlide((prev) => (prev === 0 ? project.sliderImages.length - 1 : prev - 1));
    setDragOffset(0);
  };

  return (
    <div className="relative aspect-video w-full bg-slate-900 overflow-hidden shrink-0 group">
      <div 
        className={`flex w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab transition-transform duration-700 ease-in-out'}`}
        style={{ transform: `translateX(calc(-${activeSlide * 100}% + ${dragOffset}px))` }}
        onMouseDown={handleMouseDown} onMouseLeave={handleDragEnd} onMouseUp={handleDragEnd} onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleDragEnd}
      >
        {project.sliderImages.map((img, idx) => (
          <div key={idx} className="w-full h-full shrink-0 relative">
            <img src={img} alt={`Slide ${idx}`} className="w-full h-full object-cover opacity-90 pointer-events-none select-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent pointer-events-none"></div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center items-center gap-2 z-20 px-4 pointer-events-none">
        {project.sliderImages.map((_, idx) => {
          const dist = Math.abs(idx - activeSlide);
          const isVisible = dist <= 2; 
          if (!isVisible) return null;
          let dotClass = "h-1.5 md:h-2 rounded-full transition-all duration-300 shadow-md pointer-events-auto ";
          if (dist === 0) dotClass += "w-5 md:w-6 bg-blue-500"; 
          else if (dist === 1) dotClass += "w-2 md:w-2.5 bg-white/80 hover:bg-white cursor-pointer";
          else dotClass += "w-1.5 bg-white/40 hover:bg-white cursor-pointer";
          return (
            <button key={idx} onClick={(e) => { e.stopPropagation(); setActiveSlide(idx); }} className={dotClass} aria-label={`Go to slide ${idx + 1}`} />
          );
        })}
      </div>
      <div className="absolute bottom-8 md:bottom-16 left-4 right-4 md:left-10 md:right-10 z-20 pointer-events-none pr-8 md:pr-24">
        <span className="text-cyan-400 text-[10px] md:text-sm font-bold uppercase tracking-wider mb-1 md:mb-2 block drop-shadow-md">
          {lang === 'en' ? project.category_en : project.category_id}
        </span>
        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
          {lang === 'en' ? project.title_en : project.title_id}
        </h2>
      </div>
    </div>
  );
};

// =========================================================================
// APP UTAMA
// =========================================================================
export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExp, setSelectedExp] = useState(null);
  const [selectedEdu, setSelectedEdu] = useState(null);
  const [selectedAward, setSelectedAward] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  
  const [modalActiveCategory, setModalActiveCategory] = useState('All');
  const [modalSortOrder, setModalSortOrder] = useState('newest');

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    document.title = "Andre Manullang | Cloud & Backend Engineer";
  }, [isDark]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const t = {
    en: {
      nav: ['About', 'Tech Stack', 'Education', 'Experience', 'Projects', 'Awards', 'Certificates', 'Contact'],
      sectionEdu: "Education Background",
      heroBadge: "Hello, I'm Aloysius Andre Nathanael Hasudungan Manullang 👨‍💻",
      heroTitle: "I Architect and Build Scalable Cloud Systems",
      heroDesc: "I am a Cloud and Backend Engineer primarily passionate about Cloud Computing infrastructure. My expertise includes architecting Virtual Machines such as Compute Engine and EC2, configuring auto-scaling, load balancing, and network firewalls. Secondarily, I specialize in building robust backend APIs using Node.js, Express, and MySQL. Additionally, I am highly proficient in English, possessing a native-like accent and excellent verbal communication skills.",
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
      sectionAwards: "Honors & Awards",
      sectionCert: "Certificates & Credentials",
      sectionCertDesc: "Highlight of my professional & academic credentials.",
      sectionContact: "Let's Talk",
      contactDesc: "Feel free to reach out for collaborations, cloud architecture discussions, or just a friendly hello.",
      modalTitle: "Certificate Archive",
      btnAllCerts: "View All Certificates",
      btnView: "View",
      emailMe: "Email Me",
      footerRight: "All rights reserved.",
    },
    id: {
      nav: ['Tentang', 'Teknologi', 'Pendidikan', 'Pengalaman', 'Proyek', 'Penghargaan', 'Sertifikat', 'Kontak'],
      sectionEdu: "Riwayat Pendidikan",
      heroBadge: "Halo, Saya Aloysius Andre Nathanael Hasudungan Manullang 👨‍💻",
      heroTitle: "Saya Merancang dan Membangun Sistem Scalable Cloud",
      heroDesc: "Saya seorang Cloud dan Backend Engineer dengan passion utama pada infrastruktur Cloud Computing—merancang Virtual Machine seperti Compute Engine dan EC2, mengonfigurasi auto-scaling, load balancing, dan network firewall. Selain itu, saya berfokus membangun backend API yang tangguh menggunakan Node.js, Express, dan MySQL. Saya juga sangat fasih berbahasa Inggris, memiliki aksen native-like, dan keterampilan komunikasi verbal yang sangat baik.",
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
      sectionAwards: "Penghargaan & Kompetisi",
      sectionCert: "Sertifikat & Kredensial",
      sectionCertDesc: "Sorotan kualifikasi profesional & akademik saya.",
      sectionContact: "Mari Berdiskusi",
      contactDesc: "Jangan ragu untuk menghubungi saya untuk kolaborasi, diskusi arsitektur cloud, atau sekadar menyapa.",
      modalTitle: "Arsip Seluruh Sertifikat",
      btnAllCerts: "Lihat Semua Sertifikat",
      btnView: "Lihat",
      emailMe: "Email Saya",
      footerRight: "Hak cipta dilindungi undang-undang.",
    }
  };

  const content = t[lang];

  // DATA PENGALAMAN 
  const experiences = [
    {
      role: "IT Developer",
      company: "PTPN I Regional 7",
      date_en: "Jun 2025 - Aug 2025", 
      date_id: "Jun 2025 - Agu 2025",
      type_en: "Internship", type_id: "Magang",
      logo: "https://i.imgur.com/g7bx2jI.png",
      desc_en: "Developed 'Simpelkes' (Sistem Pelaporan Kesehatan). Transitioned the company clinic's manual health reporting, pharmacy, and cost recapitulation from Excel to a centralized web system.",
      desc_id: "Mengembangkan 'Simpelkes' (Sistem Pelaporan Kesehatan). Mendigitalisasi laporan kesehatan, farmasi, dan rekapitulasi biaya klinik perusahaan dari Excel ke sistem web terpusat.",
      long_desc_en: "Began the internship by actively exploring the IT infrastructure, performing hardware troubleshooting (Windows/HDD repairs), and conducting a physical audit of borrowed IT assets across the building. Following iterative brainstorming with the mentor (Pak Rivalino), the focus shifted to developing 'Simpelkes'. Operating within a 4-person collaborative team, I took charge of the Admin module. The development involved continuous feedback loops and live demonstrations with the clinic (Puskesmas) staff to ensure the system perfectly streamlined their workflow.",
      long_desc_id: "Memulai masa KP dengan mengeksplorasi infrastruktur IT, melakukan perbaikan hardware (instalasi Windows/HDD), dan membantu audit aset perangkat IT pinjaman di seluruh gedung. Setelah proses brainstorming iteratif dengan mentor (Pak Rivalino), fokus beralih ke pengembangan 'Simpelkes'. Beroperasi dalam tim beranggotakan 4 orang, saya bertanggung jawab penuh atas modul Admin. Proses pengembangannya melibatkan diskusi dan demonstrasi langsung yang berkelanjutan dengan pihak Puskesmas untuk memastikan sistem benar-benar mempermudah alur kerja mereka.",
      tasks_en: [
        "Participated in daily 08:00 AM SDM briefings and BUMN morning chants (yel-yel), fostering a disciplined corporate culture.",
        "Performed PC troubleshooting and assisted interns in auditing and recording asset tags for electronic devices across all company rooms.",
        "Developed the Admin features for 'Simpelkes', migrating manual Excel-based health, cost, and pharmacy records into a responsive web application.",
        "Conducted cross-departmental requirements gathering, presenting system mockups directly to clinic staff for iterative refinement.",
        "Delivered the final application demo, achieving full approval from both the clinic users and the IT mentor before the official handover."
      ],
      tasks_id: [
        "Mengikuti briefing pagi SDM dan yel-yel BUMN setiap jam 08:00 pagi, beradaptasi dengan budaya kerja korporat yang disiplin.",
        "Melakukan troubleshooting PC dan membantu perekapan nomor seri (audit) perangkat elektronik pinjaman di seluruh ruangan gedung PTPN.",
        "Mengembangkan fitur Admin untuk 'Simpelkes', memigrasikan pencatatan manual (kesehatan, biaya, dan farmasi) dari Excel ke aplikasi web.",
        "Melakukan pengumpulan kebutuhan lintas departemen (menyeberang ke gedung Puskesmas), berdiskusi dan mendemonstrasikan aplikasi untuk direvisi secara iteratif.",
        "Melakukan presentasi dan demo final aplikasi, mendapatkan persetujuan penuh dari pihak Puskesmas dan mentor sebelum penyerahan sistem."
      ],
      gallery: [
        { url: "https://i.imgur.com/6D2kK8v.jpeg", caption_en: "Official Internship Certificate", caption_id: "Sertifikat Resmi Praktik Kerja Lapangan (PKL)" },
        { url: "https://i.imgur.com/VH0qQ3K.jpeg", caption_en: "Internship Transcript & Grades", caption_id: "Transkrip Nilai Praktik Kerja Lapangan" },
        { url: "https://i.imgur.com/BnEbb4l.jpeg", caption_en: "With mentor, Pak Rivalino", caption_id: "Bersama mentor IT, Pak Rivalino" },
        { url: "https://i.imgur.com/rsse9Zv.jpeg", caption_en: "With PTPN Clinic (Puskesmas) staff", caption_id: "Bersama staf Puskesmas PTPN I Regional 7" },
        { url: "https://i.imgur.com/xtiOPZc.jpeg", caption_en: "With fellow internship teammates", caption_id: "Bersama rekan-rekan tim KP" },
        { url: "https://i.imgur.com/ONpJyHL.jpeg", caption_en: "App demonstration to Clinic staff", caption_id: "Demo aplikasi Simpelkes kepada pihak Puskesmas" },
        { url: "https://i.imgur.com/g4wyhFG.jpeg", caption_en: "Drone shot with interns and KP team", caption_id: "Foto drone bersama anak magang dan tim KP" },
        { url: "https://i.imgur.com/D6vAClY.jpeg", caption_en: "First day selfie at the IT division", caption_id: "Selfie hari pertama KP di ruangan IT" },
        { url: "https://i.imgur.com/Hg2yjAu.jpeg", caption_en: "In front of PTPN I Regional 7 main building", caption_id: "Di depan gedung utama PTPN I Regional 7" }
      ]
    },
    {
      role: "Head of Project & Video Editor",
      company: "Himatro Unila",
      date_en: "Mar 2023 - Feb 2025", 
      date_id: "Mar 2023 - Feb 2025",
      type_en: "Organization", type_id: "Organisasi",
      logo: "https://himatrounila.id/wp-content/uploads/2025/05/Himatro-1024x1010.png",
      desc_en: "Progressed from a Long Video Editor to Head of Project. Managed a creative team, oversaw social media KPIs, and directed multimedia productions including the 2024 Company Profile.",
      desc_id: "Berkembang dari Editor Video Panjang menjadi Ketua Pelaksana. Mengelola tim kreatif, mengawasi KPI media sosial, dan mengarahkan produksi multimedia termasuk Company Profile 2024.",
      long_desc_en: "Started in March 2023 (Period 1) as a Long Video Editor under the Info & Media Division (Kominfo Dept). In February 2024 (Period 2), promoted to Head of Project for 'Himatro on Video' (HOV). Successfully led a creative team to hit all monthly content targets and viewership KPIs for YouTube and TikTok of Himatro Unila while balancing 4th-semester academic pressures. Officially demissioned in February 2025 after a successful grand deliberation (Mubes).",
      long_desc_id: "Dimulai pada Maret 2023 (Periode 1) sebagai Editor Video Panjang di bawah Divisi Media Informasi (Departemen Kominfo). Pada Februari 2024 (Periode 2), dipromosikan menjadi Ketua Pelaksana (Head of Project) untuk 'Himatro on Video' (HOV). Berhasil memimpin tim kreatif untuk mencapai seluruh target konten bulanan dan KPI views di YouTube dan TikTok Himatro Unila di tengah tekanan akademik semester 4. Resmi demisioner pada Februari 2025 setelah Musyawarah Besar (Mubes) yang sukses.",
      tasks_en: [
        "Period 1 (2023): Served as Long Video Editor, specializing in YouTube content such as graduation parades (ngarak) and after-movies.",
        "Period 2 (2024): Promoted to Head of Project. Selected, mentored, and managed a team comprising videographers, long/short video editors, and copywriters.",
        "Directed major multimedia projects including the Himatro Company Profile 2024, Himatro Rewind 2024, educational coding series, and individual portrait sessions for organizational ID cards.",
        "Managed official YouTube and TikTok accounts of Himatro Unila. Successfully achieved 100% of monthly posting quotas and viewership KPIs.",
        "Conducted hands-on field documentation, operated camera equipment, and trained members on proper photography and videography techniques.",
        "Collaborated with the Secretary, Division Head, and Department Head to compile tri-monthly accountability reports (LPJ) and final grand deliberation (Mubes) presentations."
      ],
      tasks_id: [
        "Periode 1 (2023): Bertugas sebagai Editor Video Panjang, mengkhususkan diri pada konten YouTube seperti after-movie kegiatan dan dokumentasi ngarak wisuda.",
        "Periode 2 (2024): Dipromosikan menjadi Ketua Pelaksana. Menyeleksi, membimbing, dan memanajemen tim yang terdiri dari videografer, editor video (panjang/pendek), dan typewriter/copywriter.",
        "Mengarahkan proyek multimedia besar termasuk Company Profile Himatro 2024, Himatro Rewind 2024, serial edukasi coding, dan sesi potret individu untuk ID Card kepengurusan.",
        "Mengelola akun resmi YouTube dan TikTok Himatro Unila. Berhasil mencapai 100% kuota posting bulanan dan KPI views.",
        "Melakukan dokumentasi lapangan secara langsung, mengoperasikan peralatan kamera, dan melatih anggota tentang teknik fotografi/videografi yang tepat.",
        "Berkolaborasi dengan Sekretaris, Ketua Divisi, dan Ketua Departemen untuk menyusun Laporan Pertanggungjawaban (LPJ) 3 bulanan dan presentasi Musyawarah Besar akhir periode."
      ],
      gallery: [
        { url: "https://i.imgur.com/lIb30IX.jpeg", caption_en: "Photo of the 2024 Himatro executive board", caption_id: "Foto kepengurusan Himatro 2024" },
        { url: "https://i.imgur.com/s1sRurI.jpeg", caption_en: "2023 Himatro Executive Board Orientation", caption_id: "Orientasi pengurus Himatro 2023" },
        { url: "https://i.imgur.com/vx8aniZ.jpeg", caption_en: "Himatro 2024 Workshop", caption_id: "Lokakarya Himatro 2024" },
        { url: "https://i.imgur.com/zxzgcgp.jpeg", caption_en: "Photos from the Himatro 2024 DIODA (Basic Training and Orientation) event", caption_id: "Foto saat kegiatan DIODA (Diklat dan Orientasi Dasar) Himatro 2024" },
        { url: "https://i.imgur.com/W7mBLBO.jpeg", caption_en: "Company Visit to PT. Perkebunan Nusantara I Regional 7", caption_id: "Visitasi perusahaan ke PT. Perkebunan Nusantara I Regional 7" }
      ]
    },
    {
      role: "Graphic Designer & Print Operator",
      company: "Futura Digital Printing",
      date_en: "Jul 2021 - Nov 2021",
      date_id: "Jul 2021 - Nov 2021",
      type_en: "Internship", type_id: "Praktik Kerja Lapangan",
      logo: "ICON_PRINTER",
      desc_en: "Managed end-to-end print production, from layouting designs in CorelDRAW/Photoshop to operating large-scale digital printing machines and manual finishing.",
      desc_id: "Mengelola produksi cetak end-to-end, mulai dari layout desain di CorelDRAW/Photoshop, mengoperasikan mesin cetak digital skala besar, hingga finishing manual.",
      long_desc_en: "Completed an intensive internship characterized by high trust and responsibility. Entrusted to open and prepare the shop early mornings before taking on core operational duties. Responsibilities spanned the entire production pipeline: from creating and optimizing print layouts using CorelDRAW and Photoshop to operating large-scale digital printing machines and performing final product finishing.",
      long_desc_id: "Menyelesaikan Praktik Kerja Lapangan (PKL) yang intensif dengan tingkat kepercayaan tinggi. Dipercaya untuk membuka dan mempersiapkan kebersihan toko paling awal setiap pagi. Tanggung jawab mencakup seluruh alur produksi: mulai dari pembuatan dan optimasi layout desain menggunakan CorelDRAW dan Photoshop, mengoperasikan mesin cetak banner skala besar, hingga melakukan finishing produk akhir.",
      tasks_en: [
        "Trusted with early morning (08:00 AM) shop access to prepare operations and maintain workspace cleanliness prior to opening.",
        "Created client designs (banners, stickers) via CorelDRAW and optimized print layouts in Photoshop for material efficiency.",
        "Operated and monitored large-scale banner printers, actively rolling the material and implementing a manual hair-drying technique for thick dark inks (red/black) to accelerate drying.",
        "Executed comprehensive product finishing: precise edge-gluing, folding, and eyelet (mata ayam) installation based on specific client requests.",
        "Managed physical inventory, which included purchasing external supplies and safely handling/transporting heavy banner material rolls.",
        "Proactively observed and learned traditional screen printing (sablon) techniques directly from the shop owner to broaden skill sets."
      ],
      tasks_id: [
        "Dipercaya memegang akses toko lebih awal (08:00 pagi) untuk mempersiapkan operasional dan menjaga kebersihan ruang kerja sebelum toko buka.",
        "Membuat desain klien (banner, stiker) dengan CorelDRAW dan mengatur layout cetak gabungan di Photoshop untuk efisiensi bahan.",
        "Mengoperasikan dan memonitor mesin cetak banner besar, termasuk menggulung bahan secara manual dan menggunakan teknik pengeringan hair dryer untuk tinta gelap agar cepat kering.",
        "Melakukan finishing produk akhir secara komprehensif: pengeleman tepi, pelipatan, dan pemasangan mata ayam sesuai permintaan spesifik klien.",
        "Mengelola logistik fisik, termasuk membeli perlengkapan cetak eksternal dan menggotong roll bahan banner yang berat.",
        "Secara proaktif mengobservasi dan mempelajari teknik sablon tradisional langsung dari pemilik percetakan untuk menambah wawasan."
      ],
      gallery: [
        { url: "https://i.imgur.com/WdwqZ4A.jpeg", caption_en: "Operating and monitoring the banner printing machine", caption_id: "Mengoperasikan dan memonitor mesin cetak banner" },
        { url: "https://i.imgur.com/skTYIsM.jpeg", caption_en: "Adjusting and rolling the banner material", caption_id: "Mengatur dan menggulung bahan banner saat dicetak" },
        { url: "https://i.imgur.com/K0B9MST.jpeg", caption_en: "End of internship photo with the supervisor and shop owner", caption_id: "Foto perpisahan PKL bersama pembimbing dan pemilik percetakan" },
        { url: "https://i.imgur.com/WDNdvED.jpeg", caption_en: "Official Internship Certificate", caption_id: "Sertifikat Resmi Praktik Kerja Lapangan (PKL)" },
        { url: "https://i.imgur.com/PyTVxN6.jpeg", caption_en: "Internship Transcript and Grades", caption_id: "Transkrip Nilai Praktik Kerja Lapangan" }
      ]
    }
  ];

  // DATA PENDIDIKAN (Tanpa Gallery, dengan poin-poin yang lebih terfokus & detail)
  const educationData = [
    {
      level_en: "Bachelor's Degree", level_id: "S1 (Sarjana)",
      school: "Universitas Lampung",
      major_en: "Informatics Engineering", major_id: "Teknik Informatika",
      date: "2022 - 2026",
      logo: "https://upload.wikimedia.org/wikipedia/id/f/ff/Logo_UnivLampung.png?utm_source=id.wikipedia.org&utm_campaign=index&utm_content=original",
      desc_en: "Graduated Cum Laude with a 3.85 GPA. Focused on Software Engineering, Cloud Computing, and Backend Architecture.",
      desc_id: "Lulus Cum Laude dengan IPK 3.85. Berfokus pada Rekayasa Perangkat Lunak, Cloud Computing, dan Arsitektur Backend.",
      long_desc_en: "Pursued a comprehensive degree in Informatics Engineering with a specialization in Software Engineering. Throughout my academic journey, I balanced rigorous coursework with active organizational leadership (Himatro) and elite national programs (Bangkit Academy). Culminated my studies by defending an integrated machine-learning clinical nutrition system for RSUD Pringsewu, officially graduating with Cum Laude honors in September 2026.",
      long_desc_id: "Menempuh pendidikan Sarjana Teknik Informatika dengan spesialisasi Rekayasa Perangkat Lunak (RPL). Selama perjalanan akademik, saya menyeimbangkan perkuliahan yang ketat dengan kepemimpinan organisasi aktif (Himatro) dan program nasional elit (Bangkit Academy). Menyelesaikan masa studi dengan mempertahankan sistem gizi klinis berbasis machine learning untuk RSUD Pringsewu, dan resmi diwisuda dengan predikat Pujian (Cum Laude) pada September 2026.",
      points_en: [
        "Led the Bangkit Academy (MSIB) Cloud Computing cohort, ultimately architecting and deploying secure backend infrastructures on Google Cloud Platform.",
        "Developed and defended the Si-Gizi clinical nutrition system thesis project, integrating a GRU machine learning model for hospital food forecasting at RSUD Pringsewu.",
        "Executed 40 days of community service (KKN) in Padang Ratu, Central Lampung, focusing on village administration digitization and educational outreach.",
        "Served as Head of Project for Himatro Unila, efficiently managing organizational workflows and directing comprehensive multimedia productions."
      ],
      points_id: [
        "Menyelesaikan program Bangkit Academy (MSIB) jalur Cloud Computing, secara spesifik merancang dan mendeploy infrastruktur backend yang aman pada Google Cloud Platform.",
        "Mengembangkan dan mempertahankan proyek skripsi sistem gizi klinis (Si-Gizi), yang mengintegrasikan model machine learning GRU untuk peramalan makanan di RSUD Pringsewu.",
        "Melaksanakan Kuliah Kerja Nyata (KKN) selama 40 hari di wilayah Padang Ratu, Lampung Tengah, dengan fokus pada digitalisasi administrasi desa dan penyuluhan edukatif.",
        "Menjabat sebagai Ketua Pelaksana (Head of Project) Himatro Unila, mengelola alur kerja tim dan mengarahkan keseluruhan produksi multimedia organisasi."
      ]
    },
    {
      level_en: "Vocational High School", level_id: "Sekolah Menengah Kejuruan (SMK)",
      school: "SMK Negeri 5 Bandar Lampung",
      major_en: "Multimedia", major_id: "Multimedia",
      date: "2019 - 2022", 
      logo: "https://rmd.lampungprov.go.id/storage/uploads/logos/67fcb86ef2ce2.webp",
      desc_en: "Specialized in Multimedia. Mastered graphic design, video editing, live audio operations, and product photography.",
      desc_id: "Spesialisasi Multimedia. Menguasai desain grafis, editing video, pengoperasian audio live, dan fotografi produk.",
      long_desc_en: "Completed vocational secondary education specializing in Multimedia under the Computer Science and Informatics department. Built comprehensive technical skills across video editing, digital imaging, camera operation, and live audio design through interactive lab sessions, school theater competitions, and filmmaking extracurriculars ('Fiksi'). Underwent rigorous physical and mental discipline training ('Madabintalsik') and successfully passed the National Vocational Competency Exam (UKK) in packaging and poster design.",
      long_desc_id: "Menyelesaikan pendidikan kejuruan dengan spesialisasi Multimedia di bawah jurusan Teknik Komputer dan Informatika. Membangun keterampilan teknis yang komprehensif mencakup editing video, pencitraan digital, pengoperasian kamera, dan desain audio live melalui praktikum lab, kompetisi teater sekolah, serta ekskul pembuatan film ('Fiksi'). Menjalani pelatihan mental dan fisik ('Madabintalsik') dan sukses melampaui Uji Kompetensi Keahlian (UKK) nasional dalam desain kemasan dan poster.",
      points_en: [
        "Mastered advanced techniques in video editing, digital imaging, and configured live audio control setups for major school theater competitions.",
        "Served as the primary Offline Editor for the 'GEGUDUH' short film under the 'Fiksi' extracurricular, managing post-production timelines and grading.",
        "Successfully passed the Vocational Competency Exam (UKK) by presenting a comprehensive project that included end-to-end product packaging and poster design."
      ],
      points_id: [
        "Menguasai teknik tingkat lanjut dalam editing video, pencitraan digital, serta merancang setup kontrol audio live untuk kompetisi teater besar di sekolah.",
        "Berperan sebagai Offline Editor utama untuk proyek film pendek 'GEGUDUH' pada ekstrakurikuler 'Fiksi', mengelola timeline pascaproduksi dan color grading.",
        "Sukses lulus Uji Kompetensi Keahlian (UKK) dengan mempresentasikan proyek komprehensif yang mencakup desain kemasan produk dari awal hingga akhir beserta posternya."
      ]
    },
    {
      level_en: "Junior High School", level_id: "Sekolah Menengah Pertama (SMP)",
      school: "SMP Xaverius 4 Bandar Lampung",
      major_en: "Lower Secondary Education", major_id: "Pendidikan Menengah Pertama",
      date: "2016 - 2019",
      logo: "https://smpxaverius4bdl.sch.id/wp-content/uploads/2024/02/cropped-Desain-tanpa-judul-6.png",
      desc_en: "Built a solid academic foundation with excellent grades in Information Technology and Languages.",
      desc_id: "Membangun landasan akademik yang solid dengan nilai unggul di bidang Teknologi Informasi dan Bahasa.",
      long_desc_en: "Completed junior high school education with consistent academic performance. Maintained a strong focus on core subjects, demonstrating particular excellence in Information and Communication Technology (TIK) and English, which laid the groundwork for my future specialization in Multimedia and Software Engineering.",
      long_desc_id: "Menyelesaikan pendidikan menengah pertama dengan performa akademik yang konsisten. Mempertahankan fokus yang kuat pada mata pelajaran inti, dan menunjukkan keunggulan khusus dalam Teknologi Informasi dan Komunikasi (TIK) serta Bahasa Inggris, yang meletakkan dasar bagi spesialisasi saya di bidang Multimedia dan Rekayasa Perangkat Lunak di masa depan.",
      points_en: [
        "Consistently maintained an outstanding 97/100 average in Information and Communication Technology (TIK) courses.",
        "Built a robust foundational understanding of computer systems, digital literacy, and cross-cultural English communication skills."
      ],
      points_id: [
        "Secara konsisten mempertahankan nilai rata-rata luar biasa (97/100) pada mata pelajaran Teknologi Informasi dan Komunikasi (TIK).",
        "Membangun pemahaman landasan yang kuat mengenai sistem komputer, literasi digital, serta keterampilan komunikasi Bahasa Inggris lintas budaya."
      ]
    },
    {
      level_en: "Elementary School", level_id: "Sekolah Dasar (SD)",
      school: "SD Xaverius 3 Bandar Lampung", 
      major_en: "Elementary Education", major_id: "Pendidikan Dasar",
      date: "2010 - 2016",
      logo: "https://i.imgur.com/mBzWVcq.png",
      desc_en: "Developed early foundations in applied sciences, English proficiency, and basic computer skills.",
      desc_id: "Membangun fondasi awal dalam sains terapan, kemahiran Bahasa Inggris, dan keterampilan komputer dasar.",
      long_desc_en: "Completed primary education with a strong inclination towards technology and languages. This period marked the early validation of my lifelong interest in IT, demonstrated through formal computer skills training and early participation in national-level applied science and English olympiads.",
      long_desc_id: "Menyelesaikan pendidikan dasar dengan minat yang kuat terhadap teknologi dan bahasa. Periode ini menjadi bukti validasi awal dari ketertarikan jangka panjang saya di bidang IT, dibuktikan melalui pelatihan keterampilan komputer formal dan partisipasi awal dalam olimpiade sains terapan dan Bahasa Inggris tingkat nasional.",
      points_en: [
        "Represented the school at the National English and Applied Science Olympic (NEASO) at UGM, securing a highly commended 'A-' score in the Civics category.",
        "Graduated from the extracurricular BSW Gramedia Computer Skills program, achieving an 'Excellent' predicate in foundational software usage."
      ],
      points_id: [
        "Mewakili sekolah pada ajang National English and Applied Science Olympic (NEASO) di UGM, dan berhasil meraih skor 'A-' (Sangat Baik) pada kategori Civics.",
        "Lulus dari program ekstrakurikuler Pendidikan Keterampilan Komputer BSW Gramedia, mencapai predikat 'Baik Sekali' dalam penggunaan software dasar."
      ]
    }
  ];

  // DATA PROYEK
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
      githubUrl: "https://github.com/Sealonk/Sistem-Informasi-Gizi-RSUD-Pringsewu.git",
      sliderImages: [
        "https://i.imgur.com/9bA8eiw.png", "https://i.imgur.com/GrHnqWA.png", "https://i.imgur.com/qF9LZLp.png",
        "https://i.imgur.com/8aguRNo.png", "https://i.imgur.com/8WwPEcV.png", "https://i.imgur.com/SQ7zHB6.png",
        "https://i.imgur.com/JWK6cSV.png", "https://i.imgur.com/PC37rbm.png", "https://i.imgur.com/N8yxnNt.png",
        "https://i.imgur.com/EgVAYxj.png", "https://i.imgur.com/Y7zpvwx.png", "https://i.imgur.com/JXDSoDk.png",
        "https://i.imgur.com/hfuH9U1.png"
      ],
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
      gallery: [
        { url: "https://i.imgur.com/sk9klVI.png", caption_en: "GCP Cloud Infrastructure Architecture", caption_id: "Arsitektur Infrastruktur Cloud GCP" },
        { url: "https://i.imgur.com/7t561LI.png", caption_en: "Relational Database ERD", caption_id: "ERD Database Relasional" },
        { url: "https://i.imgur.com/EozPHNE.png", caption_en: "Postman Stress Testing Results", caption_id: "Hasil Stress Testing Postman" },
        { url: "https://i.imgur.com/1Pf61MG.png", caption_en: "Backend Folder Structure", caption_id: "Struktur Folder Backend" }
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
      desc_en: "Developed during an internship at PTPN I Regional 7. Architected an Administrator Module (Single Source of Truth) integrating health and pharmacy data from 28 clinic units across three provinces.",
      desc_id: "Dikembangkan saat PKL di PTPN I Regional 7. Merancang Modul Administrator (Single Source of Truth) yang mengintegrasikan data kesehatan dan farmasi dari 28 unit klinik di tiga provinsi.",
      long_desc_en: "Simpelkes (Sistem Pelaporan Kesehatan) is an enterprise web application built for PTPN I Regional 7 to manage 28 Puskesbun (clinic units) spread across three provinces. Functioning as a Single Source of Truth, the system digitizes the recapitulation of 16 health data categories, an integrated cost module (Health Costs, BPJS Dues, and Capitation Funds), and end-to-end pharmacy master data (stock and daily usage analytics). Developed by a 4-developer team using MVC architecture with Laravel 10, the project leverages Google Cloud SQL to resolve schema migration conflicts during collaborative development.",
      long_desc_id: "Simpelkes (Sistem Pelaporan Kesehatan) adalah aplikasi web enterprise yang dibangun untuk PTPN I Regional 7 guna mengelola 28 Puskesbun (unit klinik) yang tersebar di tiga provinsi. Berfungsi sebagai Single Source of Truth, sistem ini mendigitalkan rekapitulasi 16 kategori data kesehatan, modul biaya terintegrasi (Biaya Kesehatan, Iuran BPJS, dan Dana Kapitasi), serta master data farmasi (stok dan analisis penggunaan harian). Dikembangkan oleh tim 4 orang menggunakan arsitektur MVC Laravel 10, proyek ini memanfaatkan Google Cloud SQL untuk mengatasi konflik migrasi skema database saat pengembangan bersama.",
      thumbnail: "https://i.imgur.com/CyZ65Yl.png",
      githubUrl: "https://github.com/faqihhmwn/Project-KP-PTPN.git", 
      sliderImages: [
        "https://i.imgur.com/pDTI6nl.png", "https://i.imgur.com/CyZ65Yl.png", "https://i.imgur.com/OZ2CbNc.png",
        "https://i.imgur.com/uLDbjI7.png", "https://i.imgur.com/XSrCLq6.png", "https://i.imgur.com/QdxrFOC.png",
        "https://i.imgur.com/XpDIBuF.png", "https://i.imgur.com/nbUbPJ7.png", "https://i.imgur.com/s7iWWd5.png",
        "https://i.imgur.com/EaqnrpD.png", "https://i.imgur.com/QM77f8N.png"
      ],
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
      gallery: [
        { url: "https://i.imgur.com/A20RgJJ.png", caption_en: "Project Directory Structure", caption_id: "Struktur Direktori Proyek" },
        { url: "https://i.imgur.com/frg8Kjr.png", caption_en: "Use Case Diagram for Admin Health Report", caption_id: "Use Case Diagram untuk Laporan Kesehatan Admin" },
        { url: "https://i.imgur.com/CjTcu1K.png", caption_en: "Use Case Diagram for Admin Pharmacy", caption_id: "Use Case Diagram untuk Farmasi Admin" },
        { url: "https://i.imgur.com/GVnkbjs.png", caption_en: "Use Case Diagram for Admin Cost Recapitulation", caption_id: "Use Case Diagram untuk Rekapitulasi Biaya Admin" },
        { url: "https://i.imgur.com/LEvvl82.png", caption_en: "Activity Diagram for Admin Health Report", caption_id: "Activity Diagram untuk Laporan Kesehatan Admin" },
        { url: "https://i.imgur.com/NeWIzSC.png", caption_en: "Activity Diagram for Admin Pharmacy", caption_id: "Activity Diagram untuk Farmasi Admin" },
        { url: "https://i.imgur.com/H8zGNT6.png", caption_en: "Activity Diagram for Admin Cost Recapitulation", caption_id: "Activity Diagram untuk Rekapitulasi Biaya Admin" },
        { url: "https://i.imgur.com/HkoxPb6.png", caption_en: "Sequence Diagram for Admin Health Report", caption_id: "Sequence Diagram untuk Laporan Kesehatan Admin" },
        { url: "https://i.imgur.com/SFKHryF.png", caption_en: "Sequence Diagram for Admin Pharmacy", caption_id: "Sequence Diagram untuk Farmasi Admin" },
        { url: "https://i.imgur.com/LAWNCO2.png", caption_en: "Sequence Diagram for Admin Cost Recapitulation", caption_id: "Sequence Diagram untuk Rekapitulasi Biaya Admin" },
        { url: "https://i.imgur.com/LYasc15.png", caption_en: "Entity Relationship Diagram for Admin Health Report", caption_id: "Entity Relationship Diagram untuk Laporan Kesehatan Admin" },
        { url: "https://i.imgur.com/jBOPUgg.png", caption_en: "Entity Relationship Diagram for Admin Pharmacy", caption_id: "Entity Relationship Diagram untuk Farmasi Admin" },
        { url: "https://i.imgur.com/80peIDv.png", caption_en: "Entity Relationship Diagram for Admin Cost Recapitulation", caption_id: "Entity Relationship Diagram untuk Rekapitulasi Biaya Admin" }
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
      desc_en: "Bangkit Academy 2024 Capstone Project. Developed the backend RESTful API and cloud infrastructure for a financial tracking mobile app featuring AI-powered OCR receipt scanning.",
      desc_id: "Capstone Project Bangkit Academy 2024. Mengembangkan backend RESTful API dan infrastruktur cloud untuk aplikasi mobile pelacakan keuangan dengan fitur scan struk OCR berbasis AI.",
      long_desc_en: "Dwitin is a personal financial tracking application developed as a Product-based Capstone Project for Bangkit Academy 2024. The app helps users track daily income and expenses, automatically calculating total balances to build better financial habits. A standout feature is the integration of an Optical Character Recognition (OCR) machine learning model that allows users to scan shopping receipts via camera or gallery; the AI automatically extracts the transaction name, total amount, and date. Built collaboratively, the backend is powered by Node.js and Express.js, hosted on a statically-IP-configured Google Compute Engine, utilizing Google Cloud SQL for relational data and Cloud Storage buckets for saving receipt images and user profiles.",
      long_desc_id: "Dwitin adalah aplikasi pelacakan keuangan pribadi yang dikembangkan sebagai Capstone Project Bangkit Academy 2024. Aplikasi ini membantu pengguna mencatat pemasukan dan pengeluaran, serta menghitung total saldo secara otomatis untuk membentuk kebiasaan finansial yang lebih baik. Fitur unggulan dari aplikasi ini adalah integrasi model machine learning Optical Character Recognition (OCR) yang memungkinkan pengguna memindai struk belanja (melalui kamera atau galeri); AI akan secara otomatis mengekstrak nama transaksi, total pengeluaran, dan tanggal. Dibangun secara kolaboratif, backend aplikasi ini ditenagai oleh Node.js dan Express.js, di-host pada Google Compute Engine dengan konfigurasi IP Statis, serta memanfaatkan Google Cloud SQL (MySQL) dan Google Cloud Storage (Bucket) untuk menyimpan gambar struk dan foto profil pengguna.",
      thumbnail: "https://i.imgur.com/6E5uR7H.png", 
      githubUrl: "https://github.com/Sealonk/dwitin-backend.git", 
      sliderImages: [
        "https://i.imgur.com/u1K7cvi.png", "https://i.imgur.com/CDoR6Ey.png", "https://i.imgur.com/X8Hze3L.png",
        "https://i.imgur.com/WsEGj5p.png", "https://i.imgur.com/knzrYk2.png", "https://i.imgur.com/8A7kyOS.png",
        "https://i.imgur.com/zgo1E3y.png", "https://i.imgur.com/0snaF1W.png"
      ],
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
      gallery: [
        { url: "https://i.imgur.com/rNQafYu.png", caption_en: "Dwitin Dashboard & Latest Transactions", caption_id: "Beranda Dwitin & Transaksi Terbaru" },
        { url: "https://i.imgur.com/t6GkB5G.png", caption_en: "AI Receipt Scanning Feature via Camera/Gallery", caption_id: "Fitur Scan Struk AI melalui Kamera/Galeri" },
        { url: "https://i.imgur.com/N9H2S7Q.png", caption_en: "Auto-filled Transaction Data from OCR", caption_id: "Data Transaksi Terisi Otomatis dari Hasil OCR" },
        { url: "https://i.imgur.com/0snaF1W.png", caption_en: "RESTful API Endpoints Mapping on Postman", caption_id: "Pemetaan Endpoint RESTful API pada Postman" }
      ]
    }
  ];

  // DATA AWARDS & PENGHARGAAN (Section Baru)
  const awardsData = [
    {
      title_en: "Cum Laude Graduation Honors", title_id: "Predikat Kelulusan Pujian (Cum Laude)",
      issuer: "Universitas Lampung",
      date_en: "Sep 2026", date_id: "Sep 2026",
      desc_en: "Awarded the Cum Laude predicate for achieving an outstanding 3.85 GPA out of 146 SKS during my undergraduate studies in Informatics Engineering. This honor reflects my consistent academic excellence and dedication to mastering software engineering and cloud computing.",
      desc_id: "Dianugerahi predikat Cum Laude (Pujian) karena berhasil meraih IPK 3.85 dari total 146 SKS selama masa studi sarjana Teknik Informatika. Penghargaan ini mencerminkan keunggulan akademik yang konsisten serta dedikasi dalam mendalami rekayasa perangkat lunak dan komputasi cloud.",
      thumbnail: "https://i.imgur.com/Ckjcv6r.jpeg",
      gallery: [ { url: "https://i.imgur.com/Ckjcv6r.jpeg", caption_en: "Cum Laude Certificate of Excellence", caption_id: "Piagam Penghargaan Predikat Cum Laude" } ]
    },
    {
      title_en: "Silver Award - iTaLiiC (ECHOPEN)", title_id: "Silver Award - iTaLiiC (ECHOPEN)",
      issuer: "Universiti Teknologi MARA",
      date_en: "Jun 2025", date_id: "Jun 2025",
      desc_en: "Won the Silver Award at the International Academic Competition (iTaLiiC) hosted by Universiti Teknologi MARA. This achievement recognized the successful presentation of an innovative technological project on an international stage, demonstrating applied engineering skills.",
      desc_id: "Meraih Silver Award pada Kompetisi Akademik Internasional (iTaLiiC) yang diselenggarakan oleh Universiti Teknologi MARA. Pencapaian ini mengakui keberhasilan presentasi proyek teknologi yang inovatif di kancah internasional, menunjukkan keterampilan terapan di bidang teknik.",
      thumbnail: "https://i.imgur.com/LJR8VEU.png",
      gallery: [ { url: "https://i.imgur.com/LJR8VEU.png", caption_en: "Silver Award Certificate", caption_id: "Sertifikat Silver Award - iTaLiiC" } ]
    },
    {
      title_en: "Best III Gong Award - FFPJ XI", title_id: "Terbaik III Gong Award - FFPJ XI",
      issuer: "FFPJ Foundation",
      date_en: "Dec 2020", date_id: "Des 2020",
      desc_en: "Awarded Best III in the Gong Award category at the 11th Jogja Student Film Festival (FFPJ). This national-level recognition was granted for exceptional cinematography, storytelling, and post-production editing on a competitive short film project.",
      desc_id: "Dianugerahi Terbaik III kategori Gong Award pada Festival Film Pelajar Jogja (FFPJ) ke-11. Penghargaan tingkat nasional ini diberikan atas pencapaian luar biasa di bidang sinematografi, penceritaan (storytelling), dan pengeditan pascaproduksi pada proyek film pendek.",
      thumbnail: "https://i.imgur.com/KKNsaFB.png",
      gallery: [ { url: "https://i.imgur.com/KKNsaFB.png", caption_en: "Gong Award Certificate", caption_id: "Sertifikat Terbaik III Gong Award" } ]
    },
    {
      title_en: "2nd Place - Fiction Film Competition", title_id: "Juara II - Lomba Film Fiksi",
      issuer: "MKKS SMK Kota Bandar Lampung",
      date_en: "Feb 2020", date_id: "Feb 2020",
      desc_en: "Secured 2nd place in the city-wide vocational high school (SMK) fiction film competition. As a core multimedia team member, I contributed extensively to the video editing and digital imaging processes that led the project to victory.",
      desc_id: "Meraih Juara 2 pada lomba film fiksi tingkat SMK se-Kota Bandar Lampung. Sebagai anggota inti tim multimedia, saya berkontribusi besar pada proses pengeditan video dan pencitraan digital yang mengantarkan proyek ini meraih kemenangan.",
      thumbnail: "https://i.imgur.com/RBaqqlR.png",
      gallery: [ { url: "https://i.imgur.com/RBaqqlR.png", caption_en: "2nd Place Fiction Film Certificate", caption_id: "Sertifikat Juara 2 Lomba Film Fiksi" } ]
    },
    {
      title_en: "2nd Place - Talent & Interest Festival", title_id: "Juara 2 - Gebyar Minat & Bakat",
      issuer: "SMK Negeri 4 Bandar Lampung",
      date_en: "2020", date_id: "2020",
      desc_en: "Achieved 2nd place in the local talent and interest festival by showcasing advanced multimedia and creative skills. The event highlighted practical abilities in digital arts and technical execution.",
      desc_id: "Meraih Juara 2 pada festival minat dan bakat lokal dengan menampilkan keterampilan multimedia tingkat lanjut. Acara ini menyoroti kemampuan praktis dalam seni digital dan eksekusi teknis.",
      thumbnail: "https://i.imgur.com/Ww6okqx.png",
      gallery: [ { url: "https://i.imgur.com/Ww6okqx.png", caption_en: "Talent Festival Certificate", caption_id: "Sertifikat Juara 2 Gebyar Minat & Bakat" } ]
    },
    {
      title_en: "NEASO National Olympic Competitor", title_id: "Peserta NEASO (Olimpiade Nasional)",
      issuer: "Universitas Gadjah Mada (UGM)",
      date_en: "Feb 2014", date_id: "Feb 2014",
      desc_en: "Competed in the National English and Applied Science Olympic (NEASO) held at Universitas Gadjah Mada (UGM). Representing my school on a national stage, I successfully secured a highly commended 'A-' (Very Good) score in the Civics category.",
      desc_id: "Berkompetisi dalam ajang National English and Applied Science Olympic (NEASO) yang diselenggarakan di Universitas Gadjah Mada (UGM). Mewakili sekolah di kancah nasional, saya berhasil meraih skor 'A-' (Sangat Baik) pada kategori Civics.",
      thumbnail: "https://i.imgur.com/V2q2kII.jpeg",
      gallery: [ { url: "https://i.imgur.com/V2q2kII.jpeg", caption_en: "NEASO Certificate", caption_id: "Sertifikat Olimpiade Nasional (NEASO)" } ]
    }
  ];

  const allCertificatesData = [
    { title: "Bangkit Academy - Cloud Computing", issuer: "Google, GoTo, Traveloka", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "Jan 2025", dateObj: new Date('2025-01-10'), thumbnail: "https://i.imgur.com/7XFH9Qu.png", link: "https://drive.google.com/file/d/1ZX9dQxYVBr2xzPNuceLI-phzHqBEtivS/view?usp=drive_link", featured: true },
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
    { title: "Praktik Kerja Lapangan di PT Perkebunan Nusantara I Regional 7", issuer: "PT Perkebunan Nusantara I Regional 7", catEn: "Internships & Industry Experiences", catId: "Magang & Pengalaman Industri", dateStr: "Oct 2025", dateObj: new Date('2025-10-02'), thumbnail: "https://i.imgur.com/6D2kK8v.jpeg", link: "https://drive.google.com/file/d/15Y57Ws_UEeTmNnEo8kU8XPtQGZkS3SRT/view?usp=drive_link", featured: true },
    { title: "Praktik Kerja Lapangan di Futura Digital Printing", issuer: "SMK Negeri 5 Bandar Lampung & Futura Digital Printing", catEn: "Internships & Industry Experiences", catId: "Magang & Pengalaman Industri", dateStr: "Nov 2021", dateObj: new Date('2021-11-30'), thumbnail: "https://i.imgur.com/WDNdvED.jpeg", link: "https://drive.google.com/file/d/1GdpHWkieaXBotX1hBINZz71z8gFICp64/view?usp=drive_link", featured: false },
    { title: "IELTS Prediction Test (Score: 8.0)", issuer: "DAILY ENGLISH", catEn: "Language Certifications", catId: "Sertifikasi Bahasa", dateStr: "Oct 2026", dateObj: new Date('2026-10-06'), thumbnail: "https://i.imgur.com/jsi9Hqb.png", link: "https://drive.google.com/file/d/1WKp8qUhRHHmhXSTyHaQttxRHe9mUerhV/view?usp=drive_link", featured: true },
    { title: "TOEIC Prediction Test (Score: 970)", issuer: "Merry English", catEn: "Language Certifications", catId: "Sertifikasi Bahasa", dateStr: "Oct 2026", dateObj: new Date('2026-10-06'), thumbnail: "https://i.imgur.com/eKqhhC4.png", link: "https://drive.google.com/file/d/1po-eqokdBQeFrZRlzejv6svj0htVLd8a/view?usp=drive_link", featured: true },
    { title: "TOEFL Prediction Test (Score: 620)", issuer: "Global Operation Indonesia", catEn: "Language Certifications", catId: "Sertifikasi Bahasa", dateStr: "Oct 2026", dateObj: new Date('2026-10-03'), thumbnail: "https://i.imgur.com/KzeUPfD.png", link: "https://drive.google.com/file/d/10N_JBMp_BhBI0-yfDbyRyMCPGmcV8l_r/view?usp=drive_link", featured: true },
    { title: "English Proficiency Test (Score: 597)", issuer: "UPT Bahasa Unila", catEn: "Language Certifications", catId: "Sertifikasi Bahasa", dateStr: "Mar 2026", dateObj: new Date('2026-03-13'), thumbnail: "https://i.imgur.com/lHIZtqJ.png", link: "https://drive.google.com/file/d/1YAlCKrWFdizQ1MrqfRr_TwADofbrGSFw/view?usp=drive_link", featured: false },
    { title: "Matrikulasi Bahasa Inggris", issuer: "UPT Bahasa Unila", catEn: "Language Certifications", catId: "Sertifikasi Bahasa", dateStr: "Nov 2022", dateObj: new Date('2022-11-10'), thumbnail: "https://i.imgur.com/XJm2n9k.png", link: "https://drive.google.com/file/d/1BYIOU8Dr7GWtuwta4rjK6Fu_W981vvg-/view?usp=drive_link", featured: false },
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
    { title: "International Guest Lecturer", issuer: "Universitas Lampung", catEn: "International Seminars & Webinars", catId: "Seminar & Webinar Internasional", dateStr: "Sep 2023", dateObj: new Date('2023-09-11'), thumbnail: "https://i.imgur.com/mYKGg0l.png", link: "https://drive.google.com/file/d/1pl5JGBl3ocIJmIDaMTU1mbK891bqzN0R/view?usp=drive_link", featured: false },
    { title: "International Webinar of Tsunami", issuer: "Universitas Lampung", catEn: "International Seminars & Webinars", catId: "Seminar & Webinar Internasional", dateStr: "Sep 2023", dateObj: new Date('2023-09-05'), thumbnail: "https://i.imgur.com/ZcUS1OY.png", link: "https://drive.google.com/file/d/1q5jmLhZrFCVCoSgGnwaCaAdR75G4GB9U/view?usp=drive_link", featured: false },
    { title: "Seminar Nasional EEA 2023", issuer: "Himatro Unila", catEn: "National/Local Seminars & Workshops", catId: "Seminar & Workshop Nasional/Lokal", dateStr: "Oct 2023", dateObj: new Date('2023-10-19'), thumbnail: "https://i.imgur.com/0KMXu0Q.png", link: "https://drive.google.com/file/d/1s1lXbjRaGiqoQlZK4MggtQ2HNbzbMdcY/view?usp=drive_link", featured: false },
    { title: "Seminar Nasional EEA 2024", issuer: "Himatro Unila", catEn: "National/Local Seminars & Workshops", catId: "Seminar & Workshop Nasional/Lokal", dateStr: "Sep 2024", dateObj: new Date('2024-09-29'), thumbnail: "https://i.imgur.com/JKlCo65.png", link: "https://drive.google.com/file/d/1i31-VyW6G6mQQzmQRfTEwxg767fD6fBN/view?usp=drive_link", featured: false },
    { title: "Seminar Nasional EEA 2025", issuer: "Himatro Unila", catEn: "National/Local Seminars & Workshops", catId: "Seminar & Workshop Nasional/Lokal", dateStr: "Oct 2025", dateObj: new Date('2025-10-10'), thumbnail: "https://i.imgur.com/V7QdR7h.png", link: "https://drive.google.com/file/d/1o3fy_YqAXpGZt2P7i_8sC5G2rj-c-ydY/view?usp=drive_link", featured: false },
    { title: "Webinar MSIB Angkatan 6", issuer: "Kampus Merdeka", catEn: "National/Local Seminars & Workshops", catId: "Seminar & Workshop Nasional/Lokal", dateStr: "Oct 2023", dateObj: new Date('2023-10-28'), thumbnail: "https://i.imgur.com/qGZFgkx.png", link: "https://drive.google.com/file/d/1jAa8VSa1oT0ThIzZ_pxo4ZeK4Md4Ue2Z/view?usp=drive_link", featured: false },
    { title: "Workshop Bahasa Inggris", issuer: "Himatro Unila", catEn: "National/Local Seminars & Workshops", catId: "Seminar & Workshop Nasional/Lokal", dateStr: "Apr 2024", dateObj: new Date('2024-04-03'), thumbnail: "https://i.imgur.com/4RQNmci.png", link: "https://drive.google.com/file/d/1BqXCWDCVHW3vjYJTLRF5osP7o2EREN-6/view?usp=drive_link", featured: false },
    { title: "Ruangguru - Campus Talk", issuer: "Ruangguru CAMP", catEn: "National/Local Seminars & Workshops", catId: "Seminar & Workshop Nasional/Lokal", dateStr: "May 2023", dateObj: new Date('2023-05-23'), thumbnail: "https://i.imgur.com/cUjRMx3.png", link: "https://drive.google.com/file/d/1YzQpBqurJ_TVf232vgV6soVf_P-5LuGc/view?usp=drive_link", featured: false },
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
    { title: "Sertifikat Kompetensi Keahlian (UKK) Multimedia", issuer: "SMK Negeri 5 Bandar Lampung & Permata Solo", catEn: "Bootcamps & Licenses", catId: "Bootcamp & Lisensi", dateStr: "May 2022", dateObj: new Date('2022-05-31'), thumbnail: "https://i.imgur.com/JsIQloq.jpeg", link: "https://drive.google.com/file/d/1KjmU6IVlOvjlIGM4_P1bRMCClYGJFMnn/view?usp=drive_link",featured: false },
    { title: "Piagam Penghargaan: Predikat Kelulusan Pujian (Cum Laude)", issuer: "Universitas Lampung", catEn: "Awards & Licenses",catId: "Penghargaan & Prestasi", dateStr: "Sep 2026", dateObj: new Date('2026-09-19'), thumbnail: "https://i.imgur.com/Ckjcv6r.jpeg", link: "https://drive.google.com/file/d/1xMFkQF_61l1eF-2bNM6ztspA6Xlpjj5K/view?usp=drive_link", featured: false },
    { title: "National English and Applied Science Olympic (NEASO)", issuer: "Universitas Gadjah Mada (UGM)", catEn: "Awards & Licenses", catId: "Penghargaan & Prestasi", dateStr: "Feb 2014", dateObj: new Date('2014-02-10'), thumbnail: "https://i.imgur.com/V2q2kII.jpeg", link: "https://drive.google.com/file/d/1uaKdgE0kI_04gTaOka0W-sXFunWVEBJp/view?usp=drive_link", featured: false },
    { title: "Penghargaan Kelulusan: Sarjana Teknik Informatika", issuer: "Himatro Unila", catEn: "Trainings & Organizations (Soft Skills)", catId: "Pelatihan & Organisasi (Soft Skill)", dateStr: "Sep 2026", dateObj: new Date('2026-09-19'), thumbnail: "https://i.imgur.com/AprlX6w.jpeg", link: "https://drive.google.com/file/d/1mzMrLRuTOSk-elRO4Rb5P9Y3EXGYT70S/view?usp=drive_link", featured: false },
    { title: "Pendidikan Keterampilan Komputer (Computer Skills)", issuer: "BSW Gramedia & SD Xaverius 3", catEn: "Trainings & Organizations (Soft Skills)", catId: "Pelatihan & Organisasi (Soft Skill)", dateStr: "Jun 2016", dateObj: new Date('2016-06-18'), thumbnail: "https://i.imgur.com/wXWU1iJ.jpeg", link: "https://drive.google.com/file/d/1NXbejJ0CyrJDJ4XzoUJ7GTFNnw1Vu6xJ/view?usp=drive_link", featured: false }
  ];

  const formatDate = (dateObj, currentLang) => {
    if (!dateObj) return "";
    const formatter = new Intl.DateTimeFormat(currentLang === 'id' ? 'id-ID' : 'en-US', { month: 'short', year: 'numeric' });
    return formatter.format(dateObj);
  };

  const modalCategories = ["All", ...Array.from(new Set(allCertificatesData.map(cert => lang === 'en' ? cert.catEn : cert.catId)))];

  const getFilteredAndSortedCerts = () => {
    let filtered = modalActiveCategory !== 'All' ? allCertificatesData.filter(cert => (lang === 'en' ? cert.catEn : cert.catId) === modalActiveCategory) : [...allCertificatesData];
    return filtered.sort((a, b) => modalSortOrder === 'newest' ? b.dateObj - a.dateObj : a.dateObj - b.dateObj);
  };

  return (
    <div className="font-sans antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-pop-in { animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      {/* NAVBAR */}
      <nav className="fixed w-full top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-2.5 md:py-4 flex justify-between items-center">
          
          <a href="#" onClick={(e) => scrollToSection(e, 'section-0')} className="flex items-center gap-2 shrink-0 active:scale-95 transition-transform">
            <img 
              src={isDark ? "/Gemini_Generated_Image_d3o0kqd3o0kqd3o0.png" : "/Gemini_Generated_Image_ehjs18ehjs18ehjs.png"} 
              alt="Andre Logo" 
              className="h-8 md:h-10 w-auto object-contain"
            />
          </a>
          
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            {content.nav.map((item, idx) => (
              <a key={idx} href={`#section-${idx}`} onClick={(e) => scrollToSection(e, `section-${idx}`)} className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5 md:gap-3">
            <button 
              onClick={() => { setLang(lang === 'en' ? 'id' : 'en'); setModalActiveCategory('All'); }}
              className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300 active:scale-95"
            >
              <Globe size={14} className="md:w-[18px] md:h-[18px]"/>
              <span className="text-[10px] md:text-xs font-bold">{lang.toUpperCase()}</span>
            </button>
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-1.5 md:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300 active:scale-95"
            >
              {isDark ? <Sun size={16} className="md:w-5 md:h-5"/> : <Moon size={16} className="md:w-5 md:h-5"/>}
            </button>
            
            <a href="ISI_LINK_GOOGLE_DRIVE_PDF_ANDA_DISINI" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-105 transition-all shadow-md">
              <FileText size={16} /> {lang === 'en' ? 'View CV' : 'Lihat CV'}
            </a>

            <button 
              className="lg:hidden p-1.5 text-slate-900 dark:text-white active:scale-90 transition-transform"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={22}/> : <Menu size={22}/>}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800 shadow-xl py-2 px-3 flex flex-col gap-0.5 animate-pop-in">
            {content.nav.map((item, idx) => (
              <a key={idx} href={`#section-${idx}`} onClick={(e) => scrollToSection(e, `section-${idx}`)} className="text-xs font-semibold text-slate-700 dark:text-slate-300 py-1.5 px-3 rounded-lg active:bg-blue-50 dark:active:bg-slate-800 active:scale-[0.98] transition-all">
                {item}
              </a>
            ))}
            <a href="ISI_LINK_GOOGLE_DRIVE_PDF_ANDA_DISINI" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 bg-slate-900 dark:bg-cyan-500 text-white dark:text-slate-950 px-4 py-1.5 rounded-full text-[10px] font-bold mt-1 mx-2 active:scale-95 transition-transform">
              <FileText size={12} /> {lang === 'en' ? 'View Full CV' : 'Lihat CV Lengkap'}
            </a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="section-0" className="pt-24 pb-8 md:pt-40 md:pb-20 px-4 md:px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-5 md:gap-12">
        
        {/* CONTAINER KIRI (Teks) - Di mobile urutannya ke-3 (paling bawah) */}
        <div className="flex-1 space-y-3 md:space-y-6 text-center md:text-left order-3 md:order-1 mt-2 md:mt-0 w-full">
          {/* BADGE DESKTOP (disembunyikan di mobile) */}
          <span className="hidden md:inline-block py-1 px-3 rounded-full bg-blue-50 dark:bg-cyan-900/30 text-blue-600 dark:text-cyan-400 text-sm font-medium border border-blue-100 dark:border-cyan-800">
            {content.heroBadge}
          </span>
          
          <h1 className="text-1xl sm:text-2xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
            {content.heroTitle}
          </h1>
          <p className="text-[11px] sm:text-sm md:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mx-auto md:mx-0">
            {content.heroDesc}
          </p>
        
            <div className="flex justify-center md:justify-start gap-4 mt-9 text-[11px] md:text-base text-slate-500 dark:text-slate-400">
              <a href="https://linkedin.com/in/aloysius-andre-n-h-m" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 md:gap-2 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">
                <LinkedinIcon /> LinkedIn
              </a>
              <a href="https://github.com/Sealonk" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 md:gap-2 hover:text-slate-900 dark:hover:text-white transition-colors">
                <GithubIcon /> GitHub
              </a>
            </div>

            {/* Buttons (Now below socials) */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-2.5 md:gap-4 mt-9">
              <button onClick={(e) => scrollToSection(e, 'section-4')} className="w-full sm:w-auto bg-slate-900 dark:bg-cyan-500 text-white dark:text-slate-950 px-6 py-2.5 md:px-8 md:py-3 rounded-full text-[11px] md:text-base font-bold active:scale-95 hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2">
                {content.btnWork} &rarr;
              </button>
              <button onClick={(e) => scrollToSection(e, 'section-1')} className="w-full sm:w-auto bg-transparent text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 px-6 py-2.5 md:px-8 md:py-3 rounded-full text-[11px] md:text-base font-bold active:scale-95 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                {content.btnAbout}
              </button>
            </div>
          </div>

        {/* CONTAINER KANAN (Foto + Badge Mobile) - Di mobile urutannya ke-2 (tengah) */}
        <div className="w-full md:flex-1 mx-auto relative mt-2 md:mt-0 order-2 md:order-2 flex flex-col items-center gap-3">
          
          {/* BADGE MOBILE (hanya muncul di mobile, di atas foto) */}
          <span className="md:hidden inline-block py-1 px-3 rounded-full bg-blue-50 dark:bg-cyan-900/30 text-blue-600 dark:text-cyan-400 text-[10px] sm:text-xs font-semibold border border-blue-100 dark:border-cyan-800 text-center">
            {content.heroBadge}
          </span>

          {/* FOTO (Dikecilin di mobile jadi max-w-[180px] agar proporsional dan kotak) */}
          <div className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-md aspect-[4/5] md:h-[575px] bg-gray-100 dark:bg-slate-900 rounded-[2rem] md:rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl overflow-hidden relative flex items-end justify-center group">
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-slate-50 dark:from-cyan-900/20 dark:to-slate-900 transition-colors"></div>
             <img 
               src="/IMG_10011127.png" 
               alt="Andre Portrait" 
               className="w-full h-full object-cover object-top relative z-10 group-hover:scale-105 transition-transform duration-500" 
               onError={(e) => {
                 e.target.style.display = 'none';
                 e.target.nextSibling.style.display = 'flex';
               }}
             />
             <div className="absolute inset-0 hidden items-center justify-center text-gray-400 dark:text-slate-600 text-xs md:text-sm font-mono text-center px-4 z-20">
               [ Letakkan "IMG_10011127.png" di folder "public" ]
             </div>
          </div>
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section id="section-1" className="py-16 md:py-20 px-6 sm:px-10 md:px-12 max-w-7xl mx-auto scroll-mt-16 md:scroll-mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 md:mb-10 tracking-tight text-center md:text-left">
          {content.sectionSkills}
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
          {[
            { name: 'Google Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg' },
            { name: 'AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg', invertDark: true },
            { name: 'Azure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' },
            { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
            { name: 'Express.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', invertDark: true },
            { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
            { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
            { name: 'Laravel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
            { name: 'React.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
            { name: 'Microsoft Word', logo: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Microsoft_Office_Word_%282019%E2%80%932025%29.svg/1280px-Microsoft_Office_Word_%282019%E2%80%932025%29.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail' },
            { name: 'Microsoft Excel', logo: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Microsoft_Office_Excel_%282025%E2%80%93present%29.svg/1280px-Microsoft_Office_Excel_%282025%E2%80%93present%29.svg.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail' },
            { name: 'Microsoft PowerPoint', logo: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Microsoft_Office_PowerPoint_%282025%E2%80%93present%29.svg/960px-Microsoft_Office_PowerPoint_%282025%E2%80%93present%29.svg.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail' }
          ].map((tech, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-1.5 md:gap-4 p-2 md:p-4 border border-gray-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-medium shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-slate-700 transition-all cursor-default group overflow-hidden">
              <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 shrink-0 flex items-center justify-center">
                <img src={tech.logo} alt={`${tech.name} logo`} className={`w-full h-full object-contain group-hover:scale-110 transition-transform ${tech.invertDark ? 'dark:invert opacity-80' : ''}`} />
              </div>
              <span className="text-[9px] sm:text-[11px] md:text-base truncate w-full text-center md:text-left">{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION SECTION (TIMELINE UI) */}
      <section id="section-2" className="w-full bg-slate-50 dark:bg-slate-900/30 border-y border-gray-100 dark:border-slate-800 py-12 md:py-20 scroll-mt-10 md:scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 md:mb-12 tracking-tight">{content.sectionEdu}</h2>
          
          <div className="relative border-l-2 border-gray-200 dark:border-slate-800 ml-2 md:ml-8 space-y-4 md:space-y-10">
            {educationData.map((edu, idx) => (
              <div key={idx} className="relative pl-4 md:pl-12">
                <div className="absolute -left-[9px] top-4 md:top-5 w-4 h-4 rounded-full bg-blue-600 dark:bg-cyan-500 ring-4 ring-slate-50 dark:ring-slate-900"></div>
                
                <div 
                  className="group flex flex-row bg-white dark:bg-slate-950 p-3 md:p-6 rounded-xl md:rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm active:scale-[0.98] md:active:scale-100 hover:shadow-md transition-all cursor-pointer items-start"
                  onClick={() => setSelectedEdu(edu)}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-lg md:rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center overflow-hidden mr-3 md:mr-6 self-start">
                    <img src={edu.logo} alt={`${edu.school} logo`} className="w-full h-full object-contain p-1.5 md:p-2" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start w-full gap-2">
                      <div className="flex-1">
                        <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 block mb-0.5 md:mb-1">
                          {lang === 'en' ? edu.level_en : edu.level_id}
                        </span>
                        <h3 className="text-[11px] sm:text-xs md:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
                          {edu.school}
                        </h3>
                        <p className="text-[9px] md:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-0.5 md:mt-1">
                          {lang === 'en' ? edu.major_en : edu.major_id}
                        </p>
                      </div>
                      <span className="px-1.5 py-0.5 md:px-2.5 md:py-1 text-[8px] md:text-xs font-mono bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded md:rounded-md shrink-0">
                        {edu.date}
                      </span>
                    </div>
                    
                    <p className="text-[9px] md:text-sm text-slate-600 dark:text-slate-400 mt-1.5 md:mt-2 leading-relaxed">
                      {lang === 'en' ? edu.desc_en : edu.desc_id}
                    </p>
                  </div>
                  
                  <div className="hidden md:flex items-center ml-4 text-gray-300 dark:text-slate-700 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="section-3" className="w-full bg-white dark:bg-slate-950 py-12 md:py-20 scroll-mt-10 md:scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 md:mb-12 tracking-tight">{content.sectionExp}</h2>
          
          <div className="space-y-3 md:space-y-6">
            {experiences.map((exp, idx) => (
              <div 
                key={idx} 
                className="group flex flex-row bg-white dark:bg-slate-950 p-3 md:p-8 rounded-xl md:rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm active:scale-[0.98] md:active:scale-100 hover:shadow-lg transition-all cursor-pointer items-start relative"
                onClick={() => setSelectedExp(exp)}
              >
                <div className="w-12 h-12 md:w-24 md:h-24 shrink-0 rounded-lg md:rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 flex items-center justify-center overflow-hidden shadow-sm mr-3 md:mr-6 self-start md:self-center">
                  {exp.logo === "ICON_PRINTER" ? (
                    <Printer size={24} className="md:w-8 md:h-8 text-slate-400 dark:text-slate-500" />
                  ) : (
                    <img src={exp.logo} alt={`${exp.company} logo`} className="w-full h-full object-contain p-1 md:p-2" />
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start w-full gap-2">
                    <div className="flex-1">
                      <span className="inline-block px-1.5 py-0.5 md:px-2.5 md:py-1 mb-1 md:mb-2 text-[8px] md:text-[10px] font-bold uppercase tracking-wider rounded bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 w-max">
                        {lang === 'en' ? exp.type_en : exp.type_id}
                      </span>
                      <h3 className="text-[11px] sm:text-xs md:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
                        {exp.role}
                      </h3>
                      <p className="text-[9px] md:text-sm text-blue-600 dark:text-cyan-400 font-medium mt-0.5 md:mt-1">
                        {exp.company}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-end shrink-0 pt-0 md:pt-1">
                       <div className="flex items-center">
                         <span className="text-[8px] md:text-sm font-mono px-1.5 py-0.5 md:px-2.5 md:py-1 bg-gray-50 dark:bg-slate-900 rounded md:rounded-md border border-gray-100 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                           {lang === 'en' ? exp.date_en : exp.date_id}
                         </span>
                         <div className="hidden md:flex items-center justify-end overflow-hidden max-w-0 opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 transition-all duration-300">
                           <span className="flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-cyan-400 whitespace-nowrap pl-3">
                             {lang === 'en' ? 'View Detail' : 'Lihat Detail'} <ExternalLink size={16} />
                           </span>
                         </div>
                       </div>
                    </div>
                  </div>
                  
                  <p className="text-[9px] md:text-base text-slate-600 dark:text-slate-400 mt-1.5 md:mt-2 leading-relaxed md:pr-10">
                    {lang === 'en' ? exp.desc_en : exp.desc_id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="section-4" className="w-full bg-slate-50 dark:bg-slate-900/30 border-y border-gray-100 dark:border-slate-800 py-12 md:py-20 scroll-mt-10 md:scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 md:mb-12 tracking-tight">{content.sectionProj}</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {projectsData.map((proj, idx) => (
              <div 
                key={idx} 
                className={`group flex flex-col cursor-pointer border border-gray-200 dark:border-slate-800 rounded-xl md:rounded-2xl p-2 md:p-4 active:scale-[0.98] md:active:scale-100 hover:shadow-xl transition-all bg-white dark:bg-slate-950 h-full ${idx === 2 && projectsData.length === 3 ? 'col-span-2 lg:col-span-1 mx-auto lg:mx-0 w-[calc(50%-0.375rem)] lg:w-full' : ''}`}
                onClick={() => setSelectedProject(proj)}
              >
                <div className="aspect-video bg-gray-100 dark:bg-slate-900 rounded-md md:rounded-xl mb-2 md:mb-4 overflow-hidden relative">
                   <img src={proj.thumbnail} alt={proj.title_en} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                   <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                      <span className="bg-blue-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-full text-[9px] md:text-sm font-bold flex items-center gap-1 md:gap-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
                        {content.btnView} <ExternalLink size={12} className="md:w-3.5 md:h-3.5" />
                      </span>
                   </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <span className="text-[7px] md:text-xs font-bold text-blue-600 dark:text-cyan-500 uppercase tracking-wider mb-1 md:mb-2 line-clamp-1">
                    {lang === 'en' ? proj.category_en : proj.category_id}
                  </span>
                  <h3 className="text-[10px] sm:text-[11px] md:text-xl font-bold text-slate-900 dark:text-white mb-1 md:mb-3 leading-tight">
                    {lang === 'en' ? proj.title_en : proj.title_id}
                  </h3>
                  <p className="text-[8px] sm:text-[9px] md:text-sm text-slate-600 dark:text-slate-400 mb-2 md:mb-4">
                    {lang === 'en' ? proj.desc_en : proj.desc_id}
                  </p>
                  
                  <div className="mt-auto flex flex-wrap gap-1 md:gap-1.5 pt-2 md:pt-3 border-t border-gray-100 dark:border-slate-800">
                    {proj.techList.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[7px] md:text-[10px] font-semibold px-1.5 py-0.5 md:px-2 md:py-1 bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded md:rounded-md whitespace-nowrap">
                        {tech}
                      </span>
                    ))}
                    {proj.techList.length > 3 && (
                      <span className="text-[7px] md:text-[10px] font-semibold px-1.5 py-0.5 md:px-2 md:py-1 bg-gray-50 dark:bg-slate-900 text-slate-400 rounded md:rounded-md border border-gray-200 dark:border-slate-700">
                        +{proj.techList.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS SECTION (NEW) */}
      {/* AWARDS SECTION */}
      <section id="section-5" className="w-full bg-white dark:bg-slate-950 py-12 md:py-20 scroll-mt-10 md:scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 md:mb-12 tracking-tight flex items-center gap-2.5 md:gap-3">
            {content.sectionAwards}
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {awardsData.map((award, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col cursor-pointer border border-gray-200 dark:border-slate-800 rounded-xl md:rounded-2xl p-2 md:p-4 active:scale-[0.98] md:active:scale-100 hover:shadow-xl transition-all bg-slate-50 dark:bg-slate-900 h-full"
                onClick={() => setSelectedAward(award)}
              >
                <div className="aspect-video bg-gray-200 dark:bg-slate-800 rounded-md md:rounded-xl mb-2 md:mb-4 overflow-hidden relative p-1 md:p-3 flex items-center justify-center">
                   <img src={award.thumbnail} alt={award.title_en} loading="lazy" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"/>
                   <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                      <span className="bg-blue-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-full text-[9px] md:text-sm font-bold flex items-center gap-1 md:gap-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
                        {content.btnView} <ExternalLink size={12} className="md:w-3.5 md:h-3.5" />
                      </span>
                   </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="text-[10px] sm:text-[11px] md:text-lg font-bold text-slate-900 dark:text-white mb-1 md:mb-2 leading-tight">
                    {lang === 'en' ? award.title_en : award.title_id}
                  </h3>
                  <p className="text-[8px] sm:text-[9px] md:text-sm text-slate-500 dark:text-slate-400 font-medium mb-1.5 md:mb-3">
                    {award.issuer}
                  </p>
                  <p className="text-[8px] sm:text-[9px] md:text-xs text-slate-600 dark:text-slate-400 line-clamp-2 md:line-clamp-3 mb-2 md:mb-4">
                    {lang === 'en' ? award.desc_en : award.desc_id}
                  </p>
                  
                  <div className="mt-auto pt-2 md:pt-3 border-t border-gray-200 dark:border-slate-800">
                    <span className="text-[8px] md:text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                      {lang === 'en' ? award.date_en : award.date_id}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATES SECTION */}
      <section id="section-6" className="w-full bg-slate-50 dark:bg-slate-900/30 border-y border-gray-100 dark:border-slate-800 py-12 md:py-20 scroll-mt-10 md:scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-12 gap-3 md:gap-4 text-center md:text-left">
            <div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 md:mb-4 tracking-tight">
                {content.sectionCert}
              </h2>
              <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto md:mx-0">
                {content.sectionCertDesc}
              </p>
            </div>
            
            <button onClick={() => setShowAllCerts(true)} className="mt-2 md:mt-0 inline-flex items-center justify-center md:justify-end gap-1.5 md:gap-2 text-blue-600 dark:text-cyan-400 font-bold text-[11px] md:text-sm hover:underline hover:scale-105 transition-transform">
              {content.btnAllCerts} <ExternalLink size={14} className="md:w-4 md:h-4"/>
            </button>
          </div>
          
          <div className="grid grid-cols-12 gap-2 md:gap-6 auto-rows-max content-start">
            {allCertificatesData.filter(cert => cert.featured).sort((a, b) => b.dateObj - a.dateObj).slice(0, 8).map((cert, idx) => {
              let colClasses = "col-span-4 lg:col-span-3";
              if (idx === 6) colClasses = "col-start-3 col-span-4 lg:col-start-auto lg:col-span-3";
              if (idx === 7) colClasses = "col-start-7 col-span-4 lg:col-start-auto lg:col-span-3";
              
              return (
                <div key={idx} className={`group flex flex-col p-1.5 md:p-4 bg-white dark:bg-slate-950 rounded-xl md:rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm active:scale-[0.98] md:active:scale-100 hover:shadow-md transition-all relative h-full ${colClasses}`}>
                  <div className="aspect-video mb-1.5 md:mb-3 rounded-lg md:rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 p-1 md:p-2 relative flex items-center justify-center">
                    <img src={cert.thumbnail} alt={cert.title} loading="lazy" className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg md:rounded-xl">
                      <a href={cert.link} target="_blank" rel="noreferrer" className="px-2 py-1 md:px-4 md:py-2 bg-blue-600 text-white text-[8px] md:text-sm font-bold rounded-full flex items-center gap-1 md:gap-2 hover:bg-blue-500 transition-colors shadow-lg">
                        {content.btnView} <ExternalLink size={10} className="md:w-3.5 md:h-3.5"/>
                      </a>
                    </div>
                  </div>
                  <span className="text-[7px] md:text-[10px] font-bold text-blue-600 dark:text-cyan-500 uppercase tracking-wider mb-1 block">
                    {lang === 'en' ? cert.catEn : cert.catId}
                  </span>
                  <h3 className="text-[9px] sm:text-[10px] md:text-sm font-bold text-slate-900 dark:text-white leading-tight mb-1">{cert.title}</h3>
                  <p className="text-[7px] md:text-xs text-slate-500 dark:text-slate-400 mb-1.5 md:mb-4">{cert.issuer}</p>
                  
                  <div className="mt-auto pt-1.5 md:pt-3 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-[7px] md:text-xs font-mono text-slate-400">{formatDate(cert.dateObj, lang)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* MODAL AREA DENGAN ANIMASI POP-IN                           */}
      {/* ========================================================== */}

      {/* MODAL POP-UP AWARDS */}
      {selectedAward && (
        <div className="fixed inset-0 z-[70] bg-slate-900/80 backdrop-blur-sm flex justify-center items-center p-3 md:p-6">
          <div className="animate-pop-in relative bg-white dark:bg-slate-950 w-full max-w-3xl max-h-[95vh] rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-slate-800">
            <div className="px-4 md:px-6 py-3 md:py-4 flex justify-between items-center bg-gray-50 dark:bg-slate-900/50 shrink-0 border-b border-gray-200 dark:border-slate-800">
              
              {/* BADGE AWARDS DIPERBAIKI (TIDAK MENUMPUK) */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-500 whitespace-nowrap">
                {lang === 'en' ? 'Award Details' : 'Detail Penghargaan'}
              </span>

              <button onClick={() => setSelectedAward(null)} className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-gray-200 hover:bg-red-500 hover:text-white dark:bg-slate-800 text-slate-600 dark:text-white rounded-full transition-colors shrink-0">
                <X size={14} className="md:w-4 md:h-4"/>
              </button>
            </div>
            
            <div className="overflow-y-auto p-4 md:p-8 custom-scrollbar">
              <div className="flex flex-col items-center text-center mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-100 dark:border-slate-800">
                <h3 className="text-xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2 md:mb-3">{lang === 'en' ? selectedAward.title_en : selectedAward.title_id}</h3>
                <p className="text-sm md:text-lg text-blue-600 dark:text-cyan-400 font-semibold mb-3 md:mb-4">{selectedAward.issuer}</p>
                <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-center">
                  <span className="px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-mono bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg border border-gray-200 dark:border-slate-700">
                    {lang === 'en' ? selectedAward.date_en : selectedAward.date_id}
                  </span>
                </div>
              </div>
              <div className="space-y-5 md:space-y-6">
                <div>
                  <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-2 md:mb-3">{lang === 'en' ? 'Description' : 'Deskripsi'}</h4>
                  <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 leading-relaxed text-justify">{lang === 'en' ? selectedAward.desc_en : selectedAward.desc_id}</p>
                </div>
                {selectedAward.gallery && selectedAward.gallery.length > 0 && (
                  <div className="pt-5 md:pt-8 border-t border-gray-100 dark:border-slate-800">
                    <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-4 md:mb-5 flex items-center gap-2">
                      <FileCheck size={18} className="md:w-5 md:h-5 text-blue-600 dark:text-cyan-500" />
                      {lang === 'en' ? 'Gallery & Credentials' : 'Galeri & Kredensial'}
                    </h4>
                    
                    {/* GALLERY 3 KOLOM JUGA UNTUK MOBILE */}
                    <div className="grid grid-cols-3 gap-2 md:gap-5">
                      {selectedAward.gallery.map((img, i) => (
                        <div key={i} className="group flex flex-col h-full">
                          <div className="aspect-[4/3] bg-gray-100 dark:bg-slate-900 p-2 md:p-3 rounded-lg md:rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md cursor-zoom-in transition-all relative overflow-hidden flex items-center justify-center mt-auto" onClick={() => setZoomedImage(img.url)}>
                            <img src={img.url} alt={lang === 'en' ? img.caption_en : img.caption_id} loading="lazy" className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-300 drop-shadow-sm rounded" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-slate-900/10 dark:group-hover:bg-black/20 transition-colors flex items-center justify-center">
                              <div className="bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 p-1 md:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                                <ZoomIn size={12} className="md:w-[18px] md:h-[18px]"/>
                              </div>
                            </div>
                          </div>
                          <span className="text-[7px] sm:text-[9px] md:text-xs text-center font-bold text-slate-500 dark:text-slate-400 mt-1 md:mt-2">
                            {lang === 'en' ? img.caption_en : img.caption_id}
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL POP-UP SEMUA SERTIFIKAT */}
      {showAllCerts && (
        <div className="fixed inset-0 z-[60] bg-slate-900/80 backdrop-blur-sm flex justify-center items-center p-3 md:p-6">
          <div className="animate-pop-in bg-white dark:bg-slate-950 w-full max-w-7xl h-[95vh] md:h-[90vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-gray-200 dark:border-slate-800">
            <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 bg-white dark:bg-slate-950 shrink-0">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                {content.modalTitle}
              </h3>
              <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
                <button onClick={() => setModalSortOrder(modalSortOrder === 'newest' ? 'oldest' : 'newest')} className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full text-[11px] md:text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex-1 md:flex-none justify-center">
                  <ArrowUpDown size={14} className="md:w-3.5 md:h-3.5"/> 
                  {modalSortOrder === 'newest' ? (lang==='en'?'Newest First':'Terbaru') : (lang==='en'?'Oldest First':'Terlama')}
                </button>
                <button onClick={() => setShowAllCerts(false)} className="p-1.5 md:p-2 bg-gray-100 dark:bg-slate-800 hover:bg-red-500 hover:text-white rounded-full transition-colors text-slate-600 dark:text-slate-300 shrink-0">
                  <X size={18} className="md:w-5 md:h-5"/>
                </button>
              </div>
            </div>
            <div className="px-3 md:px-6 py-2 md:py-4 border-b border-gray-200 dark:border-slate-800 flex flex-nowrap md:flex-wrap gap-2 shrink-0 bg-white dark:bg-slate-950 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto max-h-none md:max-h-32 no-scrollbar md:custom-scrollbar">
              {modalCategories.map((cat, idx) => (
                <button key={idx} onClick={() => setModalActiveCategory(cat)} className={`px-2.5 py-1.5 md:px-4 md:py-2 rounded-full text-[9px] whitespace-nowrap md:text-xs font-semibold transition-all border shrink-0 ${modalActiveCategory === cat ? 'bg-blue-600 text-white border-blue-600 shadow-md dark:bg-cyan-500 dark:text-slate-950 dark:border-cyan-500' : 'bg-gray-50 text-slate-600 border-gray-200 hover:bg-gray-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'}`}>
                  {cat === 'All' ? (lang === 'en' ? 'All Certificates' : 'Semua Sertifikat') : cat}
                </button>
              ))}
            </div>
            
            {/* GRID 3 KOLOM MOBILE */}
            <div className="overflow-y-auto p-3 md:p-6 flex-1 bg-gray-100 dark:bg-slate-900/60 custom-scrollbar">
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 auto-rows-max content-start">
                {getFilteredAndSortedCerts().map((cert, idx) => (
                  <div key={idx} className="group flex flex-col border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm active:scale-[0.98] md:active:scale-100 hover:shadow-md transition-all bg-white dark:bg-slate-800 h-full p-1.5 md:p-0">
                    <div className="aspect-video bg-slate-100 dark:bg-slate-700 relative overflow-hidden md:p-3 p-1 rounded-lg md:rounded-none flex items-center justify-center">
                      <img src={cert.thumbnail} alt={cert.title} loading="lazy" className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300 md:rounded-md" />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg md:rounded-t-xl">
                        <a href={cert.link} target="_blank" rel="noreferrer" className="px-2 py-1 md:px-4 md:py-2 bg-blue-600 text-white text-[8px] md:text-sm font-bold rounded-full flex items-center gap-1 hover:bg-blue-500 transition-colors shadow-lg">
                          {content.btnView} <ExternalLink size={10} className="md:w-3.5 md:h-3.5"/>
                        </a>
                      </div>
                    </div>
                    <div className="md:p-4 pt-1 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[7px] md:text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider mb-1 block line-clamp-1">{lang === 'en' ? cert.catEn : cert.catId}</span>
                        <h5 className="font-bold text-slate-900 dark:text-white text-[9px] sm:text-[10px] md:text-sm mb-1 leading-snug">{cert.title}</h5>
                        <p className="text-[7px] md:text-xs text-slate-500 dark:text-slate-400">{cert.issuer}</p>
                      </div>
                      <div className="mt-1 md:mt-4 pt-1 md:pt-3 md:border-t md:border-gray-100 md:dark:border-slate-700 flex justify-between items-center text-[7px] md:text-xs">
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

      {/* MODAL POP-UP DETAIL PENGALAMAN */}
      {selectedExp && (
        <div className="fixed inset-0 z-[70] bg-slate-900/80 backdrop-blur-sm flex justify-center items-center p-3 md:p-6">
          <div className="animate-pop-in relative bg-white dark:bg-slate-950 w-full max-w-4xl max-h-[95vh] rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-slate-800">
            <div className="px-4 md:px-6 py-3 md:py-4 flex justify-between items-center bg-gray-50 dark:bg-slate-900/50 shrink-0 border-b border-gray-200 dark:border-slate-800">
              <span className="inline-block px-2.5 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider rounded-full bg-blue-100 dark:bg-cyan-900/40 text-blue-700 dark:text-cyan-400">
                {lang === 'en' ? selectedExp.type_en : selectedExp.type_id}
              </span>
              <button onClick={() => setSelectedExp(null)} className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-gray-200 hover:bg-red-500 hover:text-white dark:bg-slate-800 text-slate-600 dark:text-white rounded-full transition-colors shrink-0">
                <X size={14} className="md:w-4 md:h-4"/>
              </button>
            </div>
            <div className="overflow-y-auto p-4 md:p-8 custom-scrollbar">
              <div className="flex flex-col items-center text-center mb-6 md:mb-10 pb-6 md:pb-8 border-b border-gray-100 dark:border-slate-800">
                <div className="w-16 h-16 md:w-32 md:h-32 shrink-0 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 flex items-center justify-center overflow-hidden mb-3 md:mb-5 shadow-sm">
                  {selectedExp.logo === "ICON_PRINTER" ? <Printer size={32} className="md:w-12 md:h-12 text-slate-400 dark:text-slate-500" /> : <img src={selectedExp.logo} alt="Logo" className="w-full h-full object-contain p-2 md:p-3" />}
                </div>
                <h3 className="text-lg md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-1.5 md:mb-2">{selectedExp.role}</h3>
                <p className="text-sm md:text-lg text-blue-600 dark:text-cyan-400 font-semibold mb-2.5 md:mb-3">{selectedExp.company}</p>
                <span className="px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-mono bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg border border-gray-200 dark:border-slate-700">{lang === 'en' ? selectedExp.date_en : selectedExp.date_id}</span>
              </div>
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-2 md:mb-3">{lang === 'en' ? 'Overview' : 'Gambaran Umum'}</h4>
                  <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 leading-relaxed text-justify">{lang === 'en' ? selectedExp.long_desc_en : selectedExp.long_desc_id}</p>
                </div>
                {selectedExp.tasks_en && (
                  <div>
                    <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-3 md:mb-4">{lang === 'en' ? 'Key Responsibilities' : 'Tanggung Jawab Utama'}</h4>
                    <ul className="space-y-2.5 md:space-y-3">
                      {(lang === 'en' ? selectedExp.tasks_en : selectedExp.tasks_id).map((task, i) => (
                        <li key={i} className="flex items-start gap-2.5 md:gap-3 text-xs md:text-base text-slate-600 dark:text-slate-400">
                          <span className="mt-1 md:mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-500 shrink-0"></span>
                          <span className="leading-relaxed">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedExp.gallery && selectedExp.gallery.length > 0 && (
                  <div className="pt-5 md:pt-6 border-t border-gray-100 dark:border-slate-800">
                    <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-3 md:mb-4">{lang === 'en' ? 'Documentation' : 'Dokumentasi & Kredensial'}</h4>
                    <div className="grid grid-cols-3 gap-2 md:gap-6">
                      {selectedExp.gallery.map((img, i) => (
                        <div key={i} className="group flex flex-col gap-1.5 md:gap-3">
                          <div className="aspect-[4/3] bg-gray-100 dark:bg-slate-900 p-1 md:p-2 rounded-lg md:rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md cursor-zoom-in overflow-hidden flex items-center justify-center transition-shadow" onClick={() => setZoomedImage(img.url)}>
                            <img src={img.url} alt={lang === 'en' ? img.caption_en : img.caption_id} loading="lazy" className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300 rounded-md drop-shadow-sm" />
                          </div>
                          <span className="text-[7px] md:text-xs text-center font-semibold text-slate-600 dark:text-slate-300">{lang === 'en' ? img.caption_en : img.caption_id}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL POP-UP DETAIL PENDIDIKAN (Tanpa Gallery) */}
      {selectedEdu && (
        <div className="fixed inset-0 z-[70] bg-slate-900/80 backdrop-blur-sm flex justify-center items-center p-3 md:p-6">
          <div className="animate-pop-in relative bg-white dark:bg-slate-950 w-full max-w-3xl max-h-[95vh] rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-slate-800">
            <div className="px-4 md:px-6 py-3 md:py-4 flex justify-between items-center bg-gray-50 dark:bg-slate-900/50 shrink-0 border-b border-gray-200 dark:border-slate-800">
              <span className="inline-block px-2.5 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider rounded-full bg-blue-100 dark:bg-cyan-900/40 text-blue-700 dark:text-cyan-400">
                {lang === 'en' ? 'Education Details' : 'Detail Pendidikan'}
              </span>
              <button onClick={() => setSelectedEdu(null)} className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-gray-200 hover:bg-red-500 hover:text-white dark:bg-slate-800 text-slate-600 dark:text-white rounded-full transition-colors shrink-0">
                <X size={14} className="md:w-4 md:h-4"/>
              </button>
            </div>
            <div className="overflow-y-auto p-4 md:p-8 custom-scrollbar">
              <div className="flex flex-col items-center text-center mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-100 dark:border-slate-800">
                <div className="w-16 h-16 md:w-32 md:h-32 shrink-0 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 flex items-center justify-center overflow-hidden mb-3 md:mb-5 shadow-sm">
                  <img src={selectedEdu.logo} alt="Logo Sekolah" className="w-full h-full object-contain p-2 md:p-3" />
                </div>
                <h3 className="text-lg md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-1.5 md:mb-2">{selectedEdu.school}</h3>
                <p className="text-sm md:text-lg text-blue-600 dark:text-cyan-400 font-semibold mb-2.5 md:mb-3">{lang === 'en' ? selectedEdu.major_en : selectedEdu.major_id}</p>
                <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-center">
                  <span className="px-3 py-1 md:px-4 md:py-1.5 text-[9px] md:text-xs font-bold uppercase tracking-wider bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg">
                    {lang === 'en' ? selectedEdu.level_en : selectedEdu.level_id}
                  </span>
                  <span className="px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-mono bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg border border-gray-200 dark:border-slate-700">
                    {selectedEdu.date}
                  </span>
                </div>
              </div>
              <div className="space-y-5 md:space-y-6">
                <div>
                  <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-2 md:mb-3">{lang === 'en' ? 'Overview' : 'Gambaran Umum'}</h4>
                  <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 leading-relaxed text-justify">{lang === 'en' ? selectedEdu.long_desc_en : selectedEdu.long_desc_id}</p>
                </div>
                {selectedEdu.points_en && selectedEdu.points_en.length > 0 && (
                  <div>
                    <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-3 md:mb-4">{lang === 'en' ? 'Key Activities & Achievements' : 'Kegiatan & Pencapaian Utama'}</h4>
                    <ul className="space-y-2.5 md:space-y-3">
                      {(lang === 'en' ? selectedEdu.points_en : selectedEdu.points_id).map((task, i) => (
                        <li key={i} className="flex items-start gap-2.5 md:gap-3 text-xs md:text-base text-slate-600 dark:text-slate-400">
                          <span className="mt-1 md:mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-500 shrink-0"></span>
                          <span className="leading-relaxed">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL POP-UP DETAIL PROYEK */}
      {selectedProject && (
        <div className="fixed inset-0 z-[70] bg-slate-900/80 backdrop-blur-sm flex justify-center items-center p-3 md:p-6">
          <div className="animate-pop-in relative bg-white dark:bg-slate-950 w-full max-w-5xl h-[95vh] rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-slate-800">
            
            <button onClick={() => setSelectedProject(null)} className="absolute top-3 right-3 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-black/60 hover:bg-red-500 text-white rounded-full backdrop-blur-md transition-colors z-[100] shadow-lg">
              <X size={16} className="md:w-5 md:h-5"/>
            </button>

            <div className="overflow-y-auto w-full h-full custom-scrollbar flex flex-col">
              {selectedProject.sliderImages && selectedProject.sliderImages.length > 0 ? (
                <ProjectSlider project={selectedProject} lang={lang} />
              ) : (
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden shrink-0">
                  <img src={selectedProject.thumbnail} alt="Cover" className="w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                  <div className="absolute bottom-6 md:bottom-16 left-4 right-4 md:left-10 md:right-10 z-20 pr-10 md:pr-24">
                    <span className="text-cyan-400 text-[10px] md:text-sm font-bold uppercase tracking-wider mb-1 md:mb-2 block drop-shadow-md">
                      {lang === 'en' ? selectedProject.category_en : selectedProject.category_id}
                    </span>
                    <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                      {lang === 'en' ? selectedProject.title_en : selectedProject.title_id}
                    </h2>
                  </div>
                </div>
              )}

              <div className="p-4 md:p-10 flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 bg-white dark:bg-slate-950 flex-1">
                <div className="flex-[2] space-y-6 md:space-y-10">
                  <div>
                    <h4 className="text-base md:text-2xl font-bold text-slate-900 dark:text-white mb-2 md:mb-4">{lang === 'en' ? 'Project Overview' : 'Gambaran Proyek'}</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs md:text-base text-justify">{lang === 'en' ? selectedProject.long_desc_en : selectedProject.long_desc_id}</p>
                  </div>
                  {(selectedProject.role_en || selectedProject.role_id) && (
                    <div>
                      <h4 className="text-base md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-5">{lang === 'en' ? 'Key Features & Contributions' : 'Fitur Utama & Kontribusi Saya'}</h4>
                      <ul className="space-y-3 md:space-y-4">
                        {(lang === 'en' ? selectedProject.role_en : selectedProject.role_id).map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 md:gap-4 text-xs md:text-base text-slate-600 dark:text-slate-400">
                            <span className="mt-1 md:mt-1.5 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-600 dark:bg-cyan-500 shrink-0"></span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                    <div>
                      <h4 className="text-base md:text-2xl font-bold text-slate-900 dark:text-white mb-3 md:mb-5">{lang === 'en' ? 'Gallery' : 'Galeri'}</h4>
                      <div className="grid grid-cols-3 gap-2 md:gap-6">
                        {selectedProject.gallery.map((img, i) => (
                          <div key={i} className="group flex flex-col gap-1.5 md:gap-3">
                            <div className="aspect-video bg-gray-100 dark:bg-slate-900 p-1 md:p-2 rounded-lg md:rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-lg cursor-zoom-in overflow-hidden flex items-center justify-center transition-shadow" onClick={() => setZoomedImage(img.url)}>
                              <img src={img.url} alt={lang === 'en' ? img.caption_en : img.caption_id} loading="lazy" className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300 rounded-md drop-shadow-sm" />
                            </div>
                            <span className="text-[7px] md:text-xs text-center font-semibold text-slate-600 dark:text-slate-300">{lang === 'en' ? img.caption_en : img.caption_id}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-5 md:space-y-8">
                  <div className="p-4 md:p-6 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-gray-100 dark:border-slate-800">
                    <h4 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white mb-3 md:mb-5 uppercase tracking-wider">{lang === 'en' ? 'Technologies' : 'Teknologi'}</h4>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {selectedProject.techList.map((tech, i) => (
                        <span key={i} className="text-[10px] md:text-xs font-semibold px-2 py-1.5 md:px-3 md:py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    {selectedProject.githubUrl && selectedProject.githubUrl !== "#" && (
                      <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 md:py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-xs md:text-base font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-md">
                        <GithubIcon /> {lang === 'en' ? 'View Source Code' : 'Lihat Source Code'}
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
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex justify-center items-center p-2 md:p-10 cursor-zoom-out" onClick={() => setZoomedImage(null)}>
          <button className="absolute top-4 right-4 md:top-10 md:right-10 p-2 md:p-3 bg-white/10 hover:bg-red-500 text-white rounded-full transition-colors z-[110]" onClick={() => setZoomedImage(null)}>
            <X size={20} className="md:w-6 md:h-6"/>
          </button>
          <img src={zoomedImage} alt="Zoomed View" className="max-w-full max-h-[90vh] object-contain rounded-lg md:rounded-xl shadow-2xl cursor-default" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
      
      {/* CONTACT SECTION */}
      <section id="section-7" className="w-full bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 py-12 md:py-24 scroll-mt-10 md:scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2 md:mb-6 tracking-tight">{content.sectionContact}</h2>
          <p className="text-xs md:text-lg text-slate-600 dark:text-slate-400 mb-6 md:mb-10 max-w-2xl mx-auto px-2 md:px-0">
            {content.contactDesc}
          </p>
          <div className="flex flex-row justify-center gap-3 md:gap-6">
            <a href="mailto:aloysiusandrenhm@gmail.com" className="flex items-center justify-center gap-1.5 md:gap-3 px-4 py-2.5 md:px-8 md:py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-[11px] md:text-base font-bold active:scale-95 hover:scale-105 transition-transform shadow-lg">
              <Mail size={14} className="md:w-5 md:h-5" /> {content.emailMe}
            </a>
            <a href="https://wa.me/6289618927443" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 md:gap-3 px-4 py-2.5 md:px-8 md:py-4 bg-[#25D366] text-white rounded-full text-[11px] md:text-base font-bold active:scale-95 hover:scale-105 transition-transform shadow-lg">
              <Smartphone size={14} className="md:w-5 md:h-5" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-slate-50 dark:bg-slate-900/30 py-5 md:py-8 border-t border-gray-100 dark:border-slate-800 text-center text-[10px] md:text-sm text-slate-500 dark:text-slate-400 px-4">
        <p>&copy; {new Date().getFullYear()} Aloysius Andre Nathanael Hasudungan Manullang. {content.footerRight}</p>
      </footer>

    </div>
  );
}