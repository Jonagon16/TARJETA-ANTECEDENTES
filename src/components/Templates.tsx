import React from 'react';
import { 
  User, 
  Car, 
  MapPin, 
  ShieldCheck, 
  Search,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { BackgroundCheckData } from '../types';

interface TemplateProps {
  data: BackgroundCheckData;
  id?: string;
}

// License Plate Component
const LicensePlate: React.FC<{ plate: string }> = ({ plate }) => {
  // Logic for Mercosur (New) vs Old plate
  const isNewPlate = plate.length === 7 && /^[A-Z]{2}/.test(plate);

  if (isNewPlate) {
    return (
      <div className="w-48 h-20 bg-white border-[3px] border-black rounded-lg overflow-hidden flex flex-col shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-[#003399] h-5 flex items-center justify-between px-2">
          <div className="w-4 h-3 bg-white/20 rounded-sm"></div>
          <span className="text-[8px] text-white font-bold tracking-widest">MERCOSUR</span>
          <div className="w-4 h-3 bg-white/20 rounded-sm"></div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className="text-3xl font-black tracking-widest text-black">{plate}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-48 h-20 bg-black border-[3px] border-black rounded-lg overflow-hidden flex flex-col shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex-1 flex items-center justify-center border-[4px] border-white m-1 rounded-sm">
        <span className="text-3xl font-black tracking-widest text-white">{plate}</span>
      </div>
    </div>
  );
};

// 4a. Brutalist Person Template
export const BrutalistPersonTemplate: React.FC<TemplateProps> = ({ data, id }) => {
  const { person } = data;
  if (!person) return null;

  return (
    <div id={id} className="bg-white text-black p-0 font-sans w-full max-w-2xl mx-auto border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      <div className="bg-black text-white p-6 flex justify-between items-center">
        <h1 className="text-2xl font-black italic tracking-tighter uppercase">VERIFICADO POR SAG</h1>
        <div className="text-right">
          <p className="text-[10px] font-bold">ANTECEDENTE</p>
          <p className="text-lg font-black uppercase">DNI</p>
        </div>
      </div>

      <div className="grid grid-cols-12 border-b-[4px] border-black">
        <div className="col-span-8 p-8 border-r-[4px] border-black">
          <h2 className="text-[12px] font-black uppercase mb-4 bg-yellow-300 inline-block px-2">Datos Personales</h2>
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Nombre Completo</p>
              <p className="text-3xl font-black leading-none uppercase">{person.name}</p>
            </div>
            <div className="flex gap-12">
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Nacimiento</p>
                <p className="text-xl font-black">{person.birthDate}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Edad</p>
                <p className="text-xl font-black">{person.age} AÑOS</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 p-8 bg-green-400 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-white border-[3px] border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-3">
            <ShieldCheck size={32} strokeWidth={3} />
          </div>
          <p className="text-xl font-black uppercase">SIN NOVEDAD</p>
        </div>
      </div>

      <div className="p-8 bg-blue-50">
        <h2 className="text-[12px] font-black uppercase mb-4 bg-black text-white inline-block px-2">📍 Domicilio Registrado</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Calle y Número</p>
            <p className="text-lg font-black uppercase">{person.street} {person.number}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Ciudad</p>
            <p className="text-lg font-black uppercase">{person.city}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Provincia / País</p>
            <p className="text-lg font-black uppercase">{person.province}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-black text-white p-3 text-[9px] font-bold tracking-[0.3em] text-center uppercase">
        Documento de consulta oficial - Sistema de Antecedentes Generales
      </div>
    </div>
  );
};

// 4b. Brutalist Vehicle Template
export const BrutalistVehicleTemplate: React.FC<TemplateProps> = ({ data, id }) => {
  const { vehicle } = data;
  if (!vehicle) return null;

  const isSinNovedad = vehicle.penalStatus.toUpperCase().includes("SIN NOVEDAD");

  return (
    <div id={id} className="bg-white text-black p-0 font-sans w-full max-w-2xl mx-auto border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      <div className="bg-black text-white p-6 flex justify-between items-center">
        <h1 className="text-2xl font-black italic tracking-tighter uppercase">VERIFICADO POR SAG</h1>
        <div className="text-right">
          <p className="text-[10px] font-bold">ANTECEDENTE</p>
          <p className="text-lg font-black uppercase">PATENTE</p>
        </div>
      </div>

      <div className="grid grid-cols-12 border-b-[4px] border-black">
        <div className="col-span-7 p-8 border-r-[4px] border-black flex flex-col justify-center">
          <h2 className="text-[12px] font-black uppercase mb-4 bg-yellow-300 inline-block px-2">Identificación</h2>
          <LicensePlate plate={vehicle.licensePlate} />
        </div>
        <div className="col-span-5 p-8 bg-green-400 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-white border-[3px] border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-3">
            <CheckCircle2 size={32} strokeWidth={3} />
          </div>
          <p className="text-xl font-black uppercase leading-tight">{vehicle.status}</p>
          <p className="text-[10px] font-bold mt-1 uppercase opacity-70">Fuente: {vehicle.source}</p>
        </div>
      </div>

      <div className="p-8 border-b-[4px] border-black">
        <h2 className="text-[12px] font-black uppercase mb-6 bg-black text-white inline-block px-2">🚗 Datos Básicos del Vehículo</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Marca</p>
            <p className="text-lg font-black uppercase">{vehicle.brand}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Modelo</p>
            <p className="text-lg font-black uppercase">{vehicle.model}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Motor</p>
            <p className="text-sm font-black uppercase">{vehicle.engine}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Chasis</p>
            <p className="text-sm font-black uppercase">{vehicle.chassis}</p>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Registro</p>
            <p className="text-sm font-black uppercase">{vehicle.registry}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="p-8 border-r-[4px] border-black bg-gray-50">
          <h2 className="text-[12px] font-black uppercase mb-4 bg-blue-600 text-white inline-block px-2">👤 Titular</h2>
          <div className="space-y-3">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase">Nombre</p>
              <p className="text-sm font-black uppercase leading-tight">{vehicle.ownerName}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase">Documento</p>
              <p className="text-sm font-black">{vehicle.ownerId}</p>
            </div>
          </div>
        </div>
        <div className={cn("p-8", isSinNovedad ? "bg-green-50" : "bg-red-50")}>
          <h2 className={cn("text-[12px] font-black uppercase mb-4 text-white inline-block px-2", isSinNovedad ? "bg-green-600" : "bg-red-600")}>👮 Penal / Denuncias</h2>
          <p className="text-sm font-black uppercase italic leading-relaxed">{vehicle.penalStatus}</p>
        </div>
      </div>
      
      <div className="bg-black text-white p-3 text-[9px] font-bold tracking-[0.3em] text-center uppercase">
        Consulta D.N.R.P.A. - Verificación de Estado Legal
      </div>
    </div>
  );
};
