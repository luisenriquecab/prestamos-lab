import React, { useState } from 'react';
import type { Equipo, Prestamo } from './types';
import { Encabezado } from './components/Encabezado';
import { ListaEquipos } from './components/ListaEquipos';
import { FormularioPrestamo } from './components/FormularioPrestamo';

const EQUIPOS_INICIALES: Equipo[] = [
  { id: 1, nombre: 'Switch Cisco Catalyst 2960 24p', categoria: 'Switch', disponible: true },
  { id: 2, nombre: 'Switch TP-Link Gigabit 16p', categoria: 'Switch', disponible: false },
  { id: 3, nombre: 'Switch Aruba Instant On 1930', categoria: 'Switch', disponible: true },
  { id: 4, nombre: 'Cable de red UTP Cat6 (5 metros)', categoria: 'Cable de red', disponible: true },
  { id: 5, nombre: 'Cable de red UTP Cat6A Blindado (10m)', categoria: 'Cable de red', disponible: true },
  { id: 6, nombre: 'Cable de red Patch Cord Cat5e (3m)', categoria: 'Cable de red', disponible: false },
  { id: 7, nombre: 'Access Point Ubiquiti UniFi U6 Lite', categoria: 'Access Point', disponible: true },
  { id: 8, nombre: 'Access Point MikroTik cAP ac Dual-Band', categoria: 'Access Point', disponible: true }
];

const PRESTAMOS_INICIALES: Prestamo[] = [
  {
    id: 1,
    equipoId: 2,
    solicitante: 'Carlos Mendoza',
    carne: '0902-23-11011',
    fechaPrestamo: '2026-10-20',
    fechaLimite: '2026-10-22',
    devuelto: false,
  },
  {
    id: 2,
    equipoId: 6,
    solicitante: 'Ana Lucía Gómez',
    carne: '0902-23-11022',
    fechaPrestamo: '2026-10-18',
    fechaLimite: '2026-10-21', // Vencido respecto a la fecha actual
    devuelto: false,
  }
];

export const App: React.FC = () => {
  const [equipos, setEquipos] = useState<Equipo[]>(EQUIPOS_INICIALES);
  const [prestamos, setPrestamos] = useState<Prestamo[]>(PRESTAMOS_INICIALES);
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('TODAS');

  // Filtrado combinado por nombre y categoría
  const equiposFiltrados = equipos.filter((eq) => {
    const coincideNombre = eq.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCat = categoriaFiltro === 'TODAS' || eq.categoria === categoriaFiltro;
    return coincideNombre && coincideCat;
  });

  // Préstamos activos ordenados por fecha límite (el más próximo primero - Regla Variante 8 o 9)
  const prestamosActivos = prestamos
    .filter((p) => !p.devuelto)
    .sort((a, b) => new Date(a.fechaLimite).getTime() - new Date(b.fechaLimite).getTime());

  const handleGuardarPrestamo = (equipoId: number, solicitante: string, carne: string, fechaLimite: string) => {
    const nuevoPrestamo: Prestamo = {
      id: Date.now(),
      equipoId,
      solicitante,
      carne,
      fechaPrestamo: new Date().toISOString().split('T')[0],
      fechaLimite,
      devuelto: false,
    };

    setPrestamos([...prestamos, nuevoPrestamo]);
    setEquipos(
      equipos.map((eq) => (eq.id === equipoId ? { ...eq, disponible: false } : eq))
    );
    setMostrarFormulario(false);
  };

  const handleDevolver = (prestamoId: number, equipoId: number) => {
    setPrestamos(
      prestamos.map((p) => (p.id === prestamoId ? { ...p, devuelto: true } : p))
    );
    setEquipos(
      equipos.map((eq) => (eq.id === equipoId ? { ...eq, disponible: true } : eq))
    );
  };

  return (
    <div className="contenedor-principal">
      <Encabezado equipos={equipos} />

      <main>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2>Gestión de Inventario</h2>
          {!mostrarFormulario && (
            <button className="btn-accion" onClick={() => setMostrarFormulario(true)}>
              + Registrar Préstamo
            </button>
          )}
        </div>

        {mostrarFormulario && (
          <FormularioPrestamo
            equiposDisponibles={equipos.filter((e) => e.disponible)}
            onGuardarPrestamo={handleGuardarPrestamo}
            onCancelar={() => setMostrarFormulario(false)}
          />
        )}

        {/* Filtros y Búsqueda */}
        <div className="barra-controles">
          <input
            type="text"
            className="input-buscar"
            placeholder="Buscar equipo por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <select
            className="select-categoria"
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            <option value="TODAS">Todas las categorías</option>
            <option value="Switch">Switch</option>
            <option value="Cable de red">Cable de red</option>
            <option value="Access Point">Access Point</option>
          </select>
        </div>

        <ListaEquipos equipos={equiposFiltrados} onPrestar={() => setMostrarFormulario(true)} />

        {/* Sección de Préstamos Activos */}
        <section style={{ marginTop: '40px' }}>
          <h2 style={{ marginBottom: '12px', color: '#111827' }}>Préstamos Activos (Ordenados por cercanía)</h2>
          {prestamosActivos.length === 0 ? (
            <p style={{ color: '#6b7280' }}>No hay préstamos activos en este momento.</p>
          ) : (
            <table className="tabla-prestamos">
              <thead>
                <tr>
                  <th>Equipo</th>
                  <th>Solicitante</th>
                  <th>Carné</th>
                  <th>Fecha Límite</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {prestamosActivos.map((p) => {
                  const equipoAsociado = equipos.find((eq) => eq.id === p.equipoId);
                  const hoyStr = new Date().toISOString().split('T')[0];
                  const esVencido = p.fechaLimite < hoyStr;

                  return (
                    <tr key={p.id} className={esVencido ? 'fila-vencida' : ''}>
                      <td>{equipoAsociado?.nombre || 'Equipo desconocido'}</td>
                      <td>{p.solicitante}</td>
                      <td>{p.carne}</td>
                      <td>{p.fechaLimite}</td>
                      <td>
                        {esVencido ? (
                          <span style={{ color: '#dc2626', fontWeight: 700 }}>Vencido</span>
                        ) : (
                          <span style={{ color: '#16a34a', fontWeight: 600 }}>En plazo</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn-devolver"
                          onClick={() => handleDevolver(p.id, p.equipoId)}
                        >
                          Devolver
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;