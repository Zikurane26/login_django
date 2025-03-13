import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';


interface Beneficiario {
  cedula: number;
  nombre: string;
  direccion: string;
  poblacion: string;
}

interface FormData {
  cedula: string; 
  nombre: string;
  direccion: string;
  poblacion: string;
}

const BeneficiariosCRUD: React.FC = () => {
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [formData, setFormData] = useState<FormData>({
    cedula: '',
    nombre: '',
    direccion: '',
    poblacion: ''
  });

  // Función para obtener la lista de beneficiarios
  const fetchBeneficiarios = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/beneficiarios/');
    const data: Beneficiario[] = await response.json();
    setBeneficiarios(data);
  };

  useEffect(() => {
    fetchBeneficiarios();
  }, []);

  // Tipar el evento para inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Tipar el evento del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/beneficiarios/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      fetchBeneficiarios();
      setFormData({ cedula: '', nombre: '', direccion: '', poblacion: '' });
    }
  };

  return (
    <div className="container-unp" style={{ marginTop: '20px' }}>
      <h2 className="title-unp">Beneficiarios</h2>
      <div className="card-unp">
        <h3 className="subtitle-unp">Crear Beneficiario</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cédula</label>
            <input
              name="cedula"
              placeholder="Cédula"
              value={formData.cedula}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Nombre</label>
            <input
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Población</label>
            <input
              name="poblacion"
              placeholder="Población"
              value={formData.poblacion}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="btn-unp"
            type="submit"
            style={{ marginTop: '10px' }}
          >
            Crear Beneficiario
          </button>
        </form>
      </div>
  
      {/* Tarjeta para listar beneficiarios */}
      <div className="card-unp">
        <h3 className="subtitle-unp">Lista de Beneficiarios</h3>
        <ul>
          {beneficiarios.map((b) => (
            <li key={b.cedula}>
              {b.cedula} - {b.nombre} - {b.direccion} - {b.poblacion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BeneficiariosCRUD;
