import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw, 
  Share2,
  Layout,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BrutalistPersonTemplate,
  BrutalistVehicleTemplate,
} from './components/Templates';
import { BackgroundCheckData } from './types';
import { cn } from './lib/utils';

const SAMPLE_DATA: BackgroundCheckData = {
  person: {
    name: "GONZALEZ, Jonathan Daniel",
    birthDate: "20/02/1997",
    age: 29,
    street: "MZA 5 CASA 12",
    number: "0",
    city: "PIRANé",
    province: "FORMOSA / ARGENTINA"
  },
  vehicle: {
    licensePlate: "AD123BC", // New plate example
    status: "SIN NOVEDADES",
    source: "D.N.R.P.A.",
    brand: "PEUGEOT",
    model: "PARTNER CONFORT 1.6 HDI",
    engine: "10JBED0047743",
    chassis: "8AEGC9HJCGG511081",
    registry: "1152 - LA MATANZA N° 04",
    ownerName: "CACERES NUÑEZ LINO ALEXANDER",
    ownerId: "92760665",
    cedula: "N/D",
    penalStatus: "SIN NOVEDADES [ESTADO ACTUAL]"
  }
};

const TEMPLATES = [
  { id: 'brutalist-person', name: 'Brutalist Persona', component: BrutalistPersonTemplate },
  { id: 'brutalist-vehicle', name: 'Brutalist Vehículo', component: BrutalistVehicleTemplate },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);

  const currentTemplate = TEMPLATES[currentIndex];

  const handleDownload = async () => {
    if (!templateRef.current) return;
    
    setIsDownloading(true);
    try {
      // Small delay to ensure everything is rendered
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await toPng(templateRef.current, {
        cacheBust: true,
        backgroundColor: '#f8fafc', // Default bg for the image
        pixelRatio: 2, // High quality
      });
      
      const link = document.createElement('a');
      link.download = `reporte-${currentTemplate.id}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Error generating image:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const nextTemplate = () => {
    setCurrentIndex((prev) => (prev + 1) % TEMPLATES.length);
  };

  const prevTemplate = () => {
    setCurrentIndex((prev) => (prev - 1 + TEMPLATES.length) % TEMPLATES.length);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-200">
              <Layout size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Template Gallery</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Background Check System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-medium text-slate-500">
              <Eye size={14} />
              <span>Preview Mode</span>
            </div>
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-lg",
                downloadSuccess 
                  ? "bg-green-500 text-white shadow-green-200" 
                  : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200 active:scale-95 disabled:opacity-50"
              )}
            >
              {isDownloading ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : downloadSuccess ? (
                <CheckCircle2 size={18} />
              ) : (
                <Download size={18} />
              )}
              <span>{downloadSuccess ? 'Guardado!' : isDownloading ? 'Generando...' : 'Descargar Imagen'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sidebar / Controls */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-slate-800">Selecciona un Estilo</h2>
              <p className="text-slate-500 leading-relaxed">
                Plantillas profesionales diseñadas para mostrar antecedentes de personas y vehículos de forma clara y atractiva.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {TEMPLATES.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-200 text-left group",
                    currentIndex === idx 
                      ? "bg-white shadow-xl shadow-slate-200/50 border-2 border-blue-600 text-blue-600" 
                      : "bg-transparent border-2 border-transparent text-slate-400 hover:bg-white hover:text-slate-600"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-black opacity-30">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="font-bold">{t.name}</span>
                  </div>
                  {currentIndex === idx && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                </button>
              ))}
            </div>

            <div className="p-6 bg-blue-50 rounded-[32px] border border-blue-100 space-y-4">
              <div className="flex items-center gap-3 text-blue-600">
                <Share2 size={20} />
                <h3 className="font-bold">Listo para WhatsApp</h3>
              </div>
              <p className="text-sm text-blue-800/70 leading-relaxed">
                Estas plantillas están optimizadas para ser compartidas como imágenes de alta resolución en grupos de mensajería.
              </p>
            </div>
          </div>

          {/* Template Preview */}
          <div className="lg:col-span-8 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vista Previa</span>
                <div className="h-px w-12 bg-slate-200"></div>
                <span className="text-xs font-bold text-blue-600">{currentTemplate.name}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={prevTemplate}
                  className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextTemplate}
                  className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="w-full flex justify-center perspective-1000">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTemplate.id}
                  initial={{ opacity: 0, y: 20, rotateX: -5 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -20, rotateX: 5 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full max-w-2xl"
                >
                  <div ref={templateRef} className="p-4 bg-slate-100 rounded-[44px]">
                    <currentTemplate.component data={SAMPLE_DATA} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-xs font-medium">Alta Resolución (2x)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-xs font-medium">Formato PNG</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-xs font-medium">Optimizado para Móvil</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Background Check Template System. Diseñado para profesionales.
          </p>
        </div>
      </footer>
    </div>
  );
}
