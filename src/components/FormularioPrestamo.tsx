import React, { useState } from 'react';
import type { Equipo } from '../types';

interface FormularioPrestamoProps {
  equiposDisponibles: Equipo[];
  onGuardarPrestamo: (equipoId: number, solicitante: string, carne: string, fechaLimite: string) => void;
  onCancelar: () => void;
}

export const FormularioPrestamo: React.FC<FormularioPrestamoProps> = ({
  equiposDisponibles,
  onGuardarPrestamo,
  onCancelar,
}) => {
  const [equipoId, setEquipoId] = useState<number>(equiposDisponibles[0]?.id || 0);
  const [solicitante, setSolicitante] = useState('');
  const [carne, setCarne] = useState('');
  
  // Calcular fecha máxima permitida según la regla de 4 días
  const hoy = new Date();
  const fechaMinimaStr = hoy.toISOString().split('T')[0];
  
  const fechaMax = new Date();
  fechaMax.setDate(hoy.getDate() + 4);
  const fechaMaxStr = fechaMax.toISOString().split('T')[0];

  const [fechaLimite, setFechaLimite] = useState(fechaMaxStr);
  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  const validarYEnviar = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevosErrores: { [key: string]: string } = {};

    // Validación 1: Solicitante (mínimo 5 caracteres)
    if (!solicitante.trim() || solicitante.trim().length < 5) {
      nuevosErrores.solicitante = 'El nombre del solicitante debe tener al menos 5 caracteres.';
    }

    // Validación 2: Carné con formato exacto 0000-00-00000
    const regexCarne = /^\d{4}-\d{2}-\d{5}$/;
    if (!regexCarne.test(carne)) {
      nuevosErrores.carne = 'Formato de carné inválido. Use: 0000-00-00000 (ej. 0902-23-11039).';
    }

    // Validación 3: Fecha límite (no anterior a hoy ni mayor a 4 días)
    if (!fechaLimite) {
      nuevosErrores.fechaLimite = 'La fecha límite es obligatoria.';
    } else {
      const fechaSel = new Date(fechaLimite);
      const hoySinHora = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
      const maxPermitida = new Date();
      maxPermitida.setDate(hoySinHora.getDate() + 4);

      if (fechaSel < hoySinHora) {
        nuevosErrores.fechaLimite = 'La fecha límite no puede ser anterior a hoy.';
      } else if (fechaSel > maxPermitida) {
        nuevosErrores.fechaLimite = 'Su variante permite un máximo de 4 días de préstamo.';
      }
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setErrores({});
    onGuardarPrestamo(Number(equipoId), solicitante, carne, fechaLimite);
  };

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginBottom: '16px', color: '#1e3a8a' }}>Registrar Nuevo Préstamo</h3>
      <form onSubmit={validarYEnviar} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', marginBottom: '4px' }}>Seleccionar Equipo:</label>
          <select
            value={equipoId}
            onChange={(e) => setEquipoId(Number(e.target.value))}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
          >
            {equiposDisponibles.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.nombre} ({eq.categoria})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', marginBottom: '4px' }}>Nombre del Solicitante:</label>
          <input
            type="text"
            value={solicitante}
            onChange={(e) => setSolicitante(e.target.value)}
            placeholder="Ej. Juan Pérez"
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
          />
          {errores.solicitante && <span style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '2px', display: 'block' }}>{errores.solicitante}</span>}
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', marginBottom: '4px' }}>Carné Universitario:</label>
          <input
            type="text"
            value={carne}
            onChange={(e) => setCarne(e.target.value)}
            placeholder="0902-23-11039"
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
          />
          {errores.carne && <span style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '2px', display: 'block' }}>{errores.carne}</span>}
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', marginBottom: '4px' }}>Fecha Límite (Máximo 4 días):</label>
          <input
            type="date"
            value={fechaLimite}
            min={fechaMinimaStr}
            max={fechaMaxStr}
            onChange={(e) => setFechaLimite(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
          />
          {errores.fechaLimite && <span style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '2px', display: 'block' }}>{errores.fechaLimite}</span>}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
          <button type="submit" style={{ backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
            Guardar Préstamo
          </button>
          <button type="button" onClick={onCancelar} style={{ backgroundColor: '#6b7280', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};