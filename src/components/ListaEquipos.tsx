import React from 'react';
import type { Equipo } from '../types';
import { TarjetaEquipo } from './TarjetaEquipo';

interface ListaEquiposProps {
  equipos: Equipo[];
  onPrestar: (id: number) => void;
}

export const ListaEquipos: React.FC<ListaEquiposProps> = ({ equipos, onPrestar }) => {
  return (
    <div className="grilla-equipos">
      {equipos.map((equipo) => (
        <TarjetaEquipo
          key={equipo.id}
          equipo={equipo}
          onPrestar={onPrestar}
        />
      ))}
    </div>
  );
};