import React, { useState, useMemo } from 'react';
import { 
  Ship, 
  Anchor, 
  Package, 
  Thermometer, 
  FileCheck, 
  Globe2, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  ShieldCheck, 
  Search, 
  Calculator, 
  Layers, 
  Scale, 
  Snowflake,
  ExternalLink,
  Menu,
  X,
  Building2,
  Boxes,
  Truck
} from 'lucide-react';

// --- DATA DEFINITIONS ---

const SERVICES = [
  {
    id: 'export-import',
    title: 'Ekspor & Impor Terpadu',
    desc: 'Pengurusan dokumen kepabeanan, bea cukai, serta lisensi legalitas lalu lintas komoditas internasional secara komprehensif.',
    icon: FileCheck,
    tag: 'Legal & Clearance',
    stats: '100% Kepatuhan Regulasi'
  },
  {
    id: 'maritime-logistics',
    title: 'Logistik Maritime & Armada',
    desc: 'Pengelolaan rantai pasok laut dan darat dari Cengkareng Timur langsung menuju pelabuhan utama dan titik distribusi nasional.',
    icon: Ship,
    tag: 'Fleet & Transit',
    stats: '>50 Terintegrasi'
  },
  {
    id: 'seafood-processing',
    title: 'Pengolahan Hasil Laut Segar',
    desc: 'Fasilitas pemrosesan dan seleksi grade mutu tinggi untuk komoditas tangkapan laut segar sesuai standar higienis industri.',
    icon: Package,
    tag: 'Fresh Grade A',
    stats: 'Standar HACCP'
  },
  {
    id: 'cold-chain',
    title: 'Rantai Dingin & Depo Beku',
    desc: 'Penyimpanan suhu konstan (-25°C hingga -45°C) menjaga integritas seluler dan kesegaran produk hingga tangan konsumen.',
    icon: Snowflake,
    tag: 'IQF Technology',
    stats: 'Suhu -25°C s/d -45°C'
  }
];

const PRODUCTS = [
  {
    id: 1,
    name: 'Ikan Tuna Yellowfin (Whole/Loins)',
    category: 'Segar & Beku',
    type: 'segar',
    temp: '-18°C s/d 2°C',
    spec: 'Grade A / Sashimi Export Quality',
    origin: 'Perairan Samudra Hindia',
    packaging: 'Vacuum Pack & Insulated Master Box',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    name: 'Cumi-Cumi Segar & Cuttlefish',
    category: 'Produk Segar',
    type: 'segar',
    temp: '0°C s/d 4°C (Ice Chilled)',
    spec: 'Whole Cleaned / Skin-on',
    origin: 'Laut Jawa & Maluku',
    packaging: 'Styrofoam Box with Pure Crushed Ice',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    name: 'Udang Vaname IQF (Frozen)',
    category: 'Produk Beku',
    type: 'beku',
    temp: '-25°C Blast Freeze',
    spec: 'Headless / Peeled Deveined (PDTO)',
    origin: 'Tambak Budidaya Terkontrol',
    packaging: 'IQF Bag 1kg x 10 Master Carton',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    name: 'Ikan Kerapu & Kakap Merah Fillet',
    category: 'Produk Beku',
    type: 'beku',
    temp: '-20°C Deep Cold',
    spec: 'Skin-on Pin-bone Out Fillet',
    origin: 'Perairan Teluk Jakarta & Kepulauan Riau',
    packaging: 'Individual Polybag Master Case',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    name: 'Ikan Tenggiri Segar Utuh',
    category: 'Produk Segar',
    type: 'segar',
    temp: '1°C Chill Storage',
    spec: 'Grade Super / Industri Pengolahan',
    origin: 'Laut Natuna',
    packaging: 'Chilled Air-Freight Ready Box',
    image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    name: 'Gurita Beku (Frozen Octopus)',
    category: 'Produk Beku',
    type: 'beku',
    temp: '-25°C Frozen',
    spec: 'Flower Shaped / Tenderized',
    origin: 'Perairan Sulawesi',
    packaging: 'Block Frozen 10kg Block',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&q=80&w=800'
  }
];

const WORKFLOW = [
  {
    step: '01',
    title: 'Penerimaan & Quality Selection',
    desc: 'Pemeriksaan awal kesegaran, organoleptik, dan grading ukuran produk perikanan dari armada kapal pengangkut.',
    detail: 'Inspeksi laboratorium mikroba dasar dan pemilahan kelas mutu.'
  },
  {
    step: '02',
    title: 'Pemrosesan & Cold Treatment',
    desc: 'Pembersihan, pemotongan presisi, pemrosesan higienis, serta pembekuan kilat metode Individual Quick Freezing (IQF).',
    detail: 'Mempertahankan tekstur asli dan mencegah pembentukan kristal es berlebih.'
  },
  {
    step: '03',
    title: 'Dokumentasi & Kepabeanan',
    desc: 'Pengurusan sertifikat kesehatan perikanan (HC), izin ekspor-impor, sertifikat asal (SKA), dan penanganan Bea Cukai.',
    detail: 'Sistem terintegrasi untuk pengeluaran dokumen tanpa hambatan.'
  },
  {
    step: '04',
    title: 'Distribusi Cold-Chain Terjadwal',
    desc: 'Pengiriman darat dan laut menggunakan truk reefer berpendingin khusus menuju titik tujuan domestik maupun mancanegara.',
    detail: 'Pemantauan suhu GPS dan kelembapan secara real-time.'
  }
];

const CERTIFICATIONS = [
  { code: 'HACCP', label: 'Hazard Analysis Critical Control Point', desc: 'Jaminan keamanan pangan pengolahan ikan.' },
  { code: 'ISO 22000', label: 'Food Safety Management', desc: 'Standar manajemen keamanan pangan internasional.' },
  { code: 'SKP KKP', label: 'Sertifikat Kelayakan Pengolahan', desc: 'Diterbitkan resmi oleh Kementerian Kelautan & Perikanan.' },
  { code: 'HALAL', label: 'Sertifikasi Halal MUI / BPJPH', desc: 'Penanganan komoditas sesuai syariat dan standar higienis.' }
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Quote Calculator State
  const [calcService, setCalcService] = useState('seafood');
  const [calcWeight, setCalcWeight] = useState(500);
  const [calcTemp, setCalcTemp] = useState('frozen');
  const [calcDestination, setCalcDestination] = useState('domestik');

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesTab = activeTab === 'all' || p.type === activeTab;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.origin.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchTerm]);

  // Estimation Calculation
  const estimatedQuote = useMemo(() => {
    let baseRate = calcService === 'seafood' ? 12000 : 18000;
    if (calcTemp === 'frozen') baseRate += 3500;
    if (calcTemp === 'ultra') baseRate += 7000;
    if (calcDestination === 'ekspor') baseRate *= 2.2;
    
    const total = Math.round((calcWeight * baseRate) / 1000) * 1000;
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(total);
  }, [calcService, calcWeight, calcTemp, calcDestination]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-[#008B8B] selection:text-white">
      
      {/* ---------------- SECTION 0: NAVIGATION ---------------- */}
      <header className="sticky top-0 z-50 bg-[#0B192C]/95 backdrop-blur-md border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#008B8B] flex items-center justify-center font-bold text-lg text-white rounded-sm shadow-md transition-transform group-hover:scale-105">
              KM
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-sm sm:text-base leading-none text-white">
                PT KARYA MARITIM
              </span>
              <span className="text-[10px] text-teal-400 tracking-wider font-semibold uppercase mt-0.5">
                & PT KARYA MARITIM DIRGANTARA
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <a href="#tentang" className="hover:text-teal-400 transition-colors">Tentang Perusahaan</a>
            <a href="#layanan" className="hover:text-teal-400 transition-colors">Layanan Utama</a>
            <a href="#katalog" className="hover:text-teal-400 transition-colors">Produk Perikanan</a>
            <a href="#alur" className="hover:text-teal-400 transition-colors">Alur Operasional</a>
            <a href="#kalkulator" className="hover:text-teal-400 transition-colors">Simulasi Kuotasi</a>
            <a href="#kontak" className="hover:text-teal-400 transition-colors">Lokasi & Kontak</a>
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-4">
            <a 
              href="#kalkulator" 
              className="px-5 py-2.5 bg-[#008B8B] hover:bg-teal-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 shadow-lg shadow-teal-900/30"
            >
              <Calculator className="w-4 h-4" />
              Hitung Estimasi
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0B192C] border-b border-slate-800 px-4 pt-2 pb-6 space-y-3 text-sm">
            <a 
              href="#tentang" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-teal-400 font-medium"
            >
              Tentang Perusahaan
            </a>
            <a 
              href="#layanan" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-teal-400 font-medium"
            >
              Layanan Utama
            </a>
            <a 
              href="#katalog" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-teal-400 font-medium"
            >
              Produk Perikanan
            </a>
            <a 
              href="#alur" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-teal-400 font-medium"
            >
              Alur Operasional
            </a>
            <a 
              href="#kalkulator" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-teal-400 font-medium"
            >
              Simulasi Kuotasi
            </a>
            <a 
              href="#kontak" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-300 hover:text-teal-400 font-medium"
            >
              Lokasi & Kontak
            </a>
            <div className="pt-2">
              <a 
                href="#kalkulator" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center block px-4 py-2.5 bg-[#008B8B] text-white font-bold text-xs uppercase tracking-wider rounded-sm"
              >
                Kirim Permintaan Penawaran
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ---------------- SECTION 1: HERO (SPLIT / ASYMMETRIC) ---------------- */}
      <section className="relative bg-[#0B192C] text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#008B8B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1E3E62] border border-teal-500/30 text-teal-300 text-xs font-mono rounded-full uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Cengkareng Timur, Jakarta Barat
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase font-sans">
              Integrasi Logistik Maritim & Perdagangan Hasil Laut Unggulan
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              PT Karya Maritim dan PT Karya Maritim Dirgantara mengelola operasional rantai pasok ekspor-impor terintegrasi, penanganan kepabeanan, serta pengolahan dan distribusi produk perikanan segar dan beku secara profesional.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a 
                href="#katalog" 
                className="px-7 py-3.5 bg-[#008B8B] hover:bg-teal-600 text-white font-bold text-sm uppercase tracking-wider rounded-sm transition-all text-center flex items-center justify-center gap-2 shadow-xl shadow-teal-950/50"
              >
                Katalog Produk Ikan
                <ChevronRight className="w-4 h-4" />
              </a>
              <a 
                href="#layanan" 
                className="px-7 py-3.5 bg-[#1E3E62]/80 hover:bg-[#1E3E62] text-slate-100 font-bold text-sm uppercase tracking-wider rounded-sm border border-slate-700 transition-all text-center flex items-center justify-center gap-2"
              >
                Layanan Logistik & Ekspor
              </a>
            </div>

            {/* Micro Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800">
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold text-teal-400 font-mono">100%</div>
                <div className="text-xs text-slate-400 mt-1 uppercase font-medium">Standar QC Cold Chain</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold text-white font-mono">2</div>
                <div className="text-xs text-slate-400 mt-1 uppercase font-medium">Entitas Badan Hukum</div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-extrabold text-teal-400 font-mono">JAKBAR</div>
                <div className="text-xs text-slate-400 mt-1 uppercase font-medium">Hub Operasional Utama</div>
              </div>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-sm overflow-hidden border-2 border-slate-700 bg-slate-900 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=1000" 
                alt="Kapal Logistik Maritim" 
                className="w-full h-[420px] object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-[#0B192C]/90 p-4 border border-slate-700 rounded-sm backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#008B8B] rounded-sm text-white">
                    <Ship className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Aktivitas Distribusi & Kepabeanan</h4>
                    <p className="text-[11px] text-slate-400">Menghubungkan komoditas lokal menuju pasar global.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- SECTION 2: EXECUTIVE OVERVIEW (DUAL ENTITY FOCUS) ---------------- */}
      <section id="tentang" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono text-[#008B8B] font-bold uppercase tracking-widest block mb-2">
                02 // Profil Korporat
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 uppercase tracking-tight">
                Dua Perusahaan, Satu Komitmen Operasional Terorganisasi
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md mt-4 md:mt-0 leading-relaxed">
              Berpusat di Cengkareng Timur, Jakarta Barat, kami mengkombinasikan efisiensi administrasi operasional dengan keahlian distribusi maritim.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Entity 1 */}
            <div className="bg-[#F8FAFC] border border-slate-200 p-8 rounded-sm hover:border-[#008B8B] transition-colors relative group">
              <div className="absolute top-0 right-0 w-2 h-full bg-[#008B8B]" />
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-6 h-6 text-[#008B8B]" />
                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">PT Karya Maritim</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Fokus utama pada pengelolaan rantai pasok logistik maritim, koordinasi distribusi pengangkutan, serta penanganan perdagangan produk hasil laut berkualitas tinggi untuk memenuhi pasar domestik dan ekspor.
              </p>
              <ul className="space-y-3 text-xs font-semibold uppercase text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  Manajemen Rantai Pasok Hasil Laut
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  Perdagangan Ikan Segar & Pembekuan
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  Pemasaran Domestik & Jaringan Mitra
                </li>
              </ul>
            </div>

            {/* Entity 2 */}
            <div className="bg-[#F8FAFC] border border-slate-200 p-8 rounded-sm hover:border-[#1E3E62] transition-colors relative group">
              <div className="absolute top-0 right-0 w-2 h-full bg-[#1E3E62]" />
              <div className="flex items-center gap-3 mb-6">
                <Truck className="w-6 h-6 text-[#1E3E62]" />
                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">PT Karya Maritim Dirgantara</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Berperan penting dalam administrasi operasional ekspor-impor, penanganan dokumen perizinan komoditas, logistik terpadu, dan pengelolaan kepabeanan secara terstruktur dan efisien.
              </p>
              <ul className="space-y-3 text-xs font-semibold uppercase text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-700" />
                  Layanan Administrasi Ekspor & Impor
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-700" />
                  Manajemen Kepatuhan Kepabeanan
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-700" />
                  Koordinasi Transit Freight Terpadu
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ---------------- SECTION 3: CORE SERVICES & OPERATIONS GRID ---------------- */}
      <section id="layanan" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <span className="text-xs font-mono text-[#008B8B] font-bold uppercase tracking-widest block mb-2">
              03 // Pilar Layanan
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 uppercase tracking-tight">
              Kapabilitas Layanan & Operasional Terintegrasi
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((srv) => {
              const IconComp = srv.icon;
              return (
                <div 
                  key={srv.id} 
                  className="bg-white border border-slate-200 p-6 rounded-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-[#0B192C] text-teal-400 rounded-sm group-hover:bg-[#008B8B] group-hover:text-white transition-colors">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 px-2.5 py-1 rounded-sm border border-slate-200">
                        {srv.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#008B8B] transition-colors">
                      {srv.title}
                    </h3>
                    
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Target:</span>
                    <span className="font-bold text-slate-800">{srv.stats}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ---------------- SECTION 4: PRODUCT SHOWCASE / CATALOG ---------------- */}
      <section id="katalog" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-mono text-[#008B8B] font-bold uppercase tracking-widest block mb-2">
                04 // Komoditas Utama
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 uppercase tracking-tight">
                Katalog Produk Ikan Segar & Perikanan Beku
              </h2>
            </div>
            
            {/* Search and Filters */}
            <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Cari komoditas atau asal..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 text-xs rounded-sm focus:outline-none focus:border-[#008B8B] w-full sm:w-64"
                />
              </div>

              <div className="flex bg-slate-100 p-1 rounded-sm border border-slate-200">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${activeTab === 'all' ? 'bg-[#0B192C] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Semua
                </button>
                <button 
                  onClick={() => setActiveTab('segar')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${activeTab === 'segar' ? 'bg-[#0B192C] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Ikan Segar
                </button>
                <button 
                  onClick={() => setActiveTab('beku')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${activeTab === 'beku' ? 'bg-[#0B192C] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Produk Beku
                </button>
              </div>
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <div key={prod.id} className="bg-[#F8FAFC] border border-slate-200 rounded-sm overflow-hidden flex flex-col justify-between hover:border-slate-400 transition-all group">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-200">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B192C]/90 text-white text-[10px] font-mono px-2.5 py-1 rounded-sm uppercase tracking-wider">
                      {prod.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-teal-900/90 text-teal-200 border border-teal-500/30 text-[10px] font-mono px-2.5 py-1 rounded-sm flex items-center gap-1">
                      <Thermometer className="w-3 h-3" />
                      {prod.temp}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#008B8B] transition-colors">
                      {prod.name}
                    </h3>
                    
                    <div className="space-y-2 text-xs text-slate-600 mt-4 border-t border-slate-200 pt-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Spesifikasi:</span>
                        <span className="font-semibold text-slate-800">{prod.spec}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Asal Tangkapan:</span>
                        <span className="font-semibold text-slate-800">{prod.origin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Pengemasan:</span>
                        <span className="font-semibold text-slate-800">{prod.packaging}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a 
                    href="#kontak"
                    className="w-full py-2 bg-slate-200 hover:bg-[#008B8B] hover:text-white text-slate-700 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors text-center block"
                  >
                    Minta Spesifikasi & Harga
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-300 rounded-sm">
              <p className="text-slate-500 text-sm">Tidak ditemukan produk sesuai kata kunci pencarian Anda.</p>
            </div>
          )}

        </div>
      </section>

      {/* ---------------- SECTION 5: OPERATIONAL WORKFLOW ---------------- */}
      <section id="alur" className="py-20 bg-[#0B192C] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-14">
            <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-widest block mb-2">
              05 // Metodologi Kerja
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
              Alur Operasional Rantai Pasok & Kepabeanan
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {WORKFLOW.map((wf, idx) => (
              <div key={wf.step} className="bg-[#1E3E62]/40 border border-slate-700 p-6 rounded-sm flex flex-col justify-between relative">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-teal-400 font-mono">
                      {wf.step}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-teal-400" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-3">
                    {wf.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {wf.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-700 text-[11px] text-slate-400">
                  <strong className="text-teal-300 block mb-1">Catatan Mutu:</strong>
                  {wf.detail}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------------- SECTION 6: GEOGRAPHIC REACH & LOGISTICS MAP ---------------- */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono text-[#008B8B] font-bold uppercase tracking-widest block">
                06 // Lokasi & Jangkauan
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 uppercase tracking-tight">
                Pusat Operasional Strategis Cengkareng Timur
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                Lokasi kantor dan pengelolaan administrasi operasional kami di Cengkareng Timur, Jakarta Barat memberikan aksesibilitas cepat menuju Bandara Internasional Soekarno-Hatta dan Pelabuhan Utama Tanjung Priok.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 bg-[#F8FAFC] border border-slate-200 rounded-sm">
                  <MapPin className="w-5 h-5 text-[#008B8B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Akses Jalan Utama & Tol</h4>
                    <p className="text-xs text-slate-600 mt-1">Terhubung langsung dengan jaringan tol lingkar luar untuk kecepatan distribusi produk.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-[#F8FAFC] border border-slate-200 rounded-sm">
                  <Globe2 className="w-5 h-5 text-[#008B8B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Tujuan Ekspor Utama</h4>
                    <p className="text-xs text-slate-600 mt-1">Pengiriman terjadwal menuju kawasan Asia Tenggara, Asia Timur, dan Timur Tengah.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Graphic Representation */}
            <div className="lg:col-span-7 bg-[#0B192C] border border-slate-800 p-8 rounded-sm text-white relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Anchor className="w-5 h-5 text-teal-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">Hub Logistik Jakarta Barat</span>
                </div>
                <span className="text-[10px] font-mono text-teal-400 bg-teal-950 px-2 py-1 rounded border border-teal-800">STATUS: AKTIF</span>
              </div>

              <div className="space-y-6 font-mono text-xs">
                <div className="bg-[#1E3E62]/40 p-4 border border-slate-700 rounded-sm flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[10px]">KANTOR PUSAT & OPERASIONAL</span>
                    <span className="font-bold text-white text-sm">Cengkareng Timur, Jakarta Barat</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-teal-400" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-sm">
                    <span className="text-teal-400 font-bold block mb-1">Bandara Soekarno-Hatta</span>
                    <span className="text-slate-400 text-[11px]">Jarak Tempuh Transit Udara Efisien</span>
                  </div>
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-sm">
                    <span className="text-teal-400 font-bold block mb-1">Pelabuhan Tanjung Priok</span>
                    <span className="text-slate-400 text-[11px]">Akses Koridor Laut Ekspor Kontainer</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 text-slate-400 text-[11px] flex justify-between items-center">
                  <span>Koordinasi Administrasi Terpusat</span>
                  <span className="text-white font-bold">100% Terorganisasi</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ---------------- SECTION 7: CERTIFICATIONS & COMPLIANCE ---------------- */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono text-[#008B8B] font-bold uppercase tracking-widest block mb-2">
              07 // Kepatuhan Standardisasi
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 uppercase tracking-tight">
              Sertifikasi Mutu & Kepatuhan Legalitas
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((c, i) => (
              <div key={i} className="bg-white border border-slate-200 p-6 rounded-sm hover:border-[#008B8B] transition-colors">
                <div className="w-12 h-12 bg-slate-100 border border-slate-300 text-[#008B8B] font-mono font-bold text-sm flex items-center justify-center rounded-sm mb-4">
                  {c.code}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{c.label}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------------- SECTION 8: CALCULATOR WIDGET ---------------- */}
      <section id="kalkulator" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono text-[#008B8B] font-bold uppercase tracking-widest block">
                08 // Simulasi Biaya
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 uppercase tracking-tight">
                Kalkulator Estimasi Pengiriman & Komoditas
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Gunakan alat simulasi ini untuk memperkirakan kebutuhan penanganan logistik cold-chain atau komoditas perikanan sesuai spesifikasi Anda.
              </p>
              
              <div className="bg-[#F8FAFC] border border-slate-200 p-6 rounded-sm space-y-3 text-xs text-slate-600">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#008B8B]" />
                  Transparansi Penawaran
                </div>
                <p>Hasil perhitungan merupakan angka perkiraan awal. Nilai final akan disesuaikan dengan volume aktual dan kelengkapan dokumen Bea Cukai.</p>
              </div>
            </div>

            {/* Form & Result Box */}
            <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-300 p-8 rounded-sm">
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                
                {/* Service Type */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Jenis Penanganan</label>
                  <select 
                    value={calcService}
                    onChange={(e) => setCalcService(e.target.value)}
                    className="w-full bg-white border border-slate-300 p-2.5 text-xs rounded-sm focus:outline-none focus:border-[#008B8B]"
                  >
                    <option value="seafood">Komoditas Ikan Segar & Beku</option>
                    <option value="freight">Freight & Logistik Ekspor Impor</option>
                  </select>
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Cakupan Wilayah</label>
                  <select 
                    value={calcDestination}
                    onChange={(e) => setCalcDestination(e.target.value)}
                    className="w-full bg-white border border-slate-300 p-2.5 text-xs rounded-sm focus:outline-none focus:border-[#008B8B]"
                  >
                    <option value="domestik">Domestik / Antar Kota</option>
                    <option value="ekspor">Mancanegara / Ekspor</option>
                  </select>
                </div>

                {/* Weight Slider */}
                <div className="sm:col-span-2">
                  <div className="flex justify-between text-xs font-bold uppercase text-slate-700 mb-2">
                    <span>Estimasi Berat Total</span>
                    <span className="text-[#008B8B] font-mono text-sm">{calcWeight} KG</span>
                  </div>
                  <input 
                    type="range" 
                    min="100" 
                    max="5000" 
                    step="100"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(Number(e.target.value))}
                    className="w-full accent-[#008B8B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>100 KG</span>
                    <span>2.500 KG</span>
                    <span>5.000 KG</span>
                  </div>
                </div>

                {/* Temperature Requirement */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-2">Kebutuhan Pengatur Suhu</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button 
                      type="button"
                      onClick={() => setCalcTemp('chilled')}
                      className={`py-2 px-3 text-xs border rounded-sm font-semibold transition-colors ${calcTemp === 'chilled' ? 'bg-[#0B192C] text-white border-[#0B192C]' : 'bg-white text-slate-700 border-slate-300'}`}
                    >
                      Chilled (0°C to 4°C)
                    </button>
                    <button 
                      type="button"
                      onClick={() => setCalcTemp('frozen')}
                      className={`py-2 px-3 text-xs border rounded-sm font-semibold transition-colors ${calcTemp === 'frozen' ? 'bg-[#0B192C] text-white border-[#0B192C]' : 'bg-white text-slate-700 border-slate-300'}`}
                    >
                      Frozen (-20°C)
                    </button>
                    <button 
                      type="button"
                      onClick={() => setCalcTemp('ultra')}
                      className={`py-2 px-3 text-xs border rounded-sm font-semibold transition-colors ${calcTemp === 'ultra' ? 'bg-[#0B192C] text-white border-[#0B192C]' : 'bg-white text-slate-700 border-slate-300'}`}
                    >
                      Deep Cold (-40°C)
                    </button>
                  </div>
                </div>

              </div>

              {/* Dynamic Result Output */}
              <div className="bg-[#0B192C] p-6 rounded-sm text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest block">Perkiraan Biaya Penanganan:</span>
                  <div className="text-2xl font-extrabold font-mono text-white mt-1">
                    {estimatedQuote}
                  </div>
                </div>
                <a 
                  href="#kontak"
                  className="px-6 py-3 bg-[#008B8B] hover:bg-teal-600 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors text-center whitespace-nowrap"
                >
                  Minta Penawaran Resmi
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ---------------- SECTION 9: CONTACT & HEAD OFFICE DETAILS ---------------- */}
      <section id="kontak" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Direct Information */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono text-[#008B8B] font-bold uppercase tracking-widest block">
                09 // Kontak & Informasi Resmi
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 uppercase tracking-tight">
                Hubungi Tim Operasional Kami
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                Silakan hubungi kantor pusat kami untuk konsultasi dokumen ekspor-impor, penawaran harga komoditas perikanan, atau kerjasama distribusi logistik.
              </p>

              <div className="space-y-4 pt-4 text-xs">
                <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-sm">
                  <MapPin className="w-5 h-5 text-[#008B8B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase">Alamat Kantor Pusat</h4>
                    <p className="text-slate-600 mt-1 leading-relaxed">
                      Cengkareng Timur, Kecamatan Cengkareng, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-sm">
                  <Clock className="w-5 h-5 text-[#008B8B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase">Jam Operasional Kantor</h4>
                    <p className="text-slate-600 mt-1">Senin - Jumat: 08.00 - 17.00 WIB</p>
                    <p className="text-slate-600">Sabtu: 08.00 - 13.00 WIB</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-sm">
                  <Mail className="w-5 h-5 text-[#008B8B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 uppercase">Korespondensi Elektronik</h4>
                    <p className="text-slate-600 mt-1 font-mono">info@karyamaritim.co.id</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="lg:col-span-7 bg-white border border-slate-300 p-8 rounded-sm shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide mb-6">
                Formulir Komunikasi Operasional
              </h3>

              <form onSubmit={(e) => { e.preventDefault(); alert('Pesan Anda berhasil terkirim. Tim PT Karya Maritim akan menghubungi Anda kembali.'); }} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Nama Lengkap *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Masukkan nama Anda"
                      className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs rounded-sm focus:outline-none focus:border-[#008B8B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Perusahaan / Instansi *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Nama perusahaan"
                      className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs rounded-sm focus:outline-none focus:border-[#008B8B]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Email Bisnis *</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="email@perusahaan.com"
                      className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs rounded-sm focus:outline-none focus:border-[#008B8B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Nomor Telepon / WA *</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="0812xxxxxxx"
                      className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs rounded-sm focus:outline-none focus:border-[#008B8B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Subjek Permintaan *</label>
                  <select className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs rounded-sm focus:outline-none focus:border-[#008B8B]">
                    <option>Permintaan Kuotasi Produk Ikan Segar / Beku</option>
                    <option>Pengurusan Dokumen Ekspor / Impor</option>
                    <option>Kerjasama Logistik Rantai Dingin</option>
                    <option>Informasi Umum & Kemitraan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Pesan Rincian *</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Tuliskan spesifikasi volume, tujuan pengiriman, atau rincian kebutuhan Anda..."
                    className="w-full bg-slate-50 border border-slate-300 p-2.5 text-xs rounded-sm focus:outline-none focus:border-[#008B8B]"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-[#0B192C] hover:bg-[#008B8B] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors shadow-md"
                >
                  Kirim Pesan Ke Tim Operasional
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

      {/* ---------------- SECTION 10: FOOTER ---------------- */}
      <footer className="bg-[#0B192C] text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-12 gap-12 border-b border-slate-800 pb-12">
            
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#008B8B] flex items-center justify-center font-bold text-sm text-white rounded-sm">
                  KM
                </div>
                <span className="font-bold tracking-tight text-base text-white">
                  PT KARYA MARITIM
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                PT Karya Maritim dan PT Karya Maritim Dirgantara merupakan penyedia layanan terpadu logistik maritim, pengurusan administrasi ekspor-impor, serta perdagangan komoditas hasil laut berkualitas tinggi di Jakarta Barat.
              </p>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-mono text-teal-400 font-bold uppercase tracking-widest">Navigasi Utama</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><a href="#tentang" className="hover:text-white transition-colors">Tentang Korporat</a></li>
                <li><a href="#layanan" className="hover:text-white transition-colors">Pilar Layanan</a></li>
                <li><a href="#katalog" className="hover:text-white transition-colors">Katalog Ikan Segar & Beku</a></li>
                <li><a href="#alur" className="hover:text-white transition-colors">Alur Rantai Pasok</a></li>
                <li><a href="#kalkulator" className="hover:text-white transition-colors">Simulasi Estimasi Biaya</a></li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-mono text-teal-400 font-bold uppercase tracking-widest">Wilayah Layanan</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Berlokasi strategis di Cengkareng Timur, Jakarta Barat, melayani distribusi hasil laut domestik dan layanan administrasi ekspor-impor internasional.
              </p>
              <div className="pt-2">
                <span className="inline-block text-[10px] font-mono bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1 rounded-sm">
                  JAKARTA BARAT - INDONESIA
                </span>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-4">
            <div>
              © {new Date().getFullYear()} PT Karya Maritim & PT Karya Maritim Dirgantara. All rights reserved.
            </div>
            <div className="flex gap-6">
              <span>Standardisasi HACCP & ISO</span>
              <span>Kepatuhan Bea Cukai</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}