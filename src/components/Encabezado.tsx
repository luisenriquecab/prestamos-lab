import React from 'react';
import type { Equipo } from '../types';

interface EncabezadoProps {
  equipos: Equipo[];
}

export const Encabezado: React.FC<EncabezadoProps> = ({ equipos }) => {
  const totalEquipos = equipos.length;
  const disponibles = equipos.filter((equipo) => equipo.disponible).length;

  return (
    <header className="encabezado">
      <h1>Préstamos Lab — 0902-23-11039</h1>
      <div className="contador-equipos">
        {disponibles} de {totalEquipos} equipos disponibles
      </div>
    </header>
  );
};