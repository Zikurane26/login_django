// src/components/FiltrarChalecos.tsx
import React, { useState, ChangeEvent } from 'react';

interface Beneficiario {
  cedula: number;
  nombre: string;
  chalecos: number[];
}

const FiltrarChalecos: React.FC = () => {
  const [filtro, setFiltro] = useState<string>('');
  const [tipoFiltro, setTipoFiltro] = useState<'cedula' | 'nombre'>('cedula');
  const [resultado, setResultado] = useState<Beneficiario | null>(null);

  const handleFiltrar = async () => {
    const url = tipoFiltro === 'cedula' 
      ? `http://127.0.0.1:8000/api/beneficiarios-con-chalecos/cedula/${filtro}/` 
      : `http://127.0.0.1:8000/api/beneficiarios-con-chalecos/nombre/${filtro}/`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }
  
      const beneficiario: Beneficiario = await response.json();
      setResultado(beneficiario ?? null);
    } catch (error) {
      console.error("Error al filtrar:", error);
      alert("Hubo un problema con la búsqueda. Intenta de nuevo.");
    }
  };

  return (
    <div className="container-unp" style={{ marginTop: '20px' }}>
      <h2 className="title-unp">Filtrado de Chalecos</h2>
      
      {/* Tarjeta para el formulario de filtrado */}
      <div className="card-unp" style={{ padding: '20px', marginBottom: '20px' }}>
        <div className="form-group">
          <label>Filtrar por:</label>
          <select
            value={tipoFiltro}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setTipoFiltro(e.target.value as 'cedula' | 'nombre')
            }
            className="form-control"
          >
            <option value="cedula">Cédula</option>
            <option value="nombre">Nombre</option>
          </select>
        </div>
        <div className="form-group" style={{ marginTop: '10px' }}>
          <input
            type="text"
            placeholder="Valor de búsqueda"
            value={filtro}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFiltro(e.target.value)}
            className="form-control"
          />
        </div>
        <button
          className="btn-unp"
          onClick={handleFiltrar}
          style={{ marginTop: '10px' }}
        >
          Filtrar
        </button>
      </div>
  
      {resultado ? (
        <div className="card-unp" style={{ padding: '20px' }}>
          <h3 className="subtitle-unp">
            Beneficiario: {resultado.nombre} (Cédula: {resultado.cedula})
          </h3>
          <p>Total de chalecos: {resultado.chalecos?.length || 0}</p>
          <ul className="list-unp">
            {resultado.chalecos?.map((serial) => (
              <li key={serial}>Chaleco Serial: {serial}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No se encontró ningún beneficiario</p>
      )}
    </div>
  );  
};

export default FiltrarChalecos;
