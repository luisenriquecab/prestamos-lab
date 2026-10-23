import React from 'react';
import type { Equipo } from '../types';

export interface TarjetaEquipoProps {
  equipo: Equipo;
  onPrestar: (id: number) => void;
}

export const TarjetaEquipo: React.FC<TarjetaEquipoProps> = ({ equipo, onPrestar }) => {
  return (
    <div className="tarjeta-equipo">
      <div>
        <div className="tarjeta-cabecera">
          <h3 className="tarjeta-titulo">{equipo.nombre}</h3>
          <span
            className={`etiqueta-estado ${
              equipo.disponible ? 'estado-disponible' : 'estado-prestado'
            }`}
          >
            {equipo.disponible ? 'Disponible' : 'Prestado'}
          </span>
        </div>
        <p className="categoria-texto">Categoría: {equipo.categoria}</p>
      </div>

      <button
        className="btn-prestar"
        disabled={!equipo.disponible}
        onClick={() => onPrestar(equipo.id)}
      >
        Prestar
      </button>
    </div>
  );
};