import React from 'react';
import type { Equipo } from './types';
import { Encabezado } from './components/Encabezado';
import { ListaEquipos } from './components/ListaEquipos';

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

export const App: React.FC = () => {
  const handlePrestar = (id: number) => {
    console.log('Prestar equipo con ID:', id);
  };

  return (
    <div className="contenedor-principal">
      <Encabezado equipos={EQUIPOS_INICIALES} />
      <main>
        <h2 style={{ marginBottom: '16px', color: '#111827' }}>Vista Inventario</h2>
        <ListaEquipos equipos={EQUIPOS_INICIALES} onPrestar={handlePrestar} />
      </main>
    </div>
  );
};

export default App;