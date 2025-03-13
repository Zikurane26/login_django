import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

interface Chaleco {
  serial: number;
  beneficiario_cedula: number;
}

interface FormData {
  serial: string;
  beneficiario: string;
}

const ChalecosCRUD: React.FC = () => {
  const [chalecos, setChalecos] = useState<Chaleco[]>([]);
  const [formData, setFormData] = useState<FormData>({
    serial: '',
    beneficiario: ''
  });

  const fetchChalecos = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/chalecos/');
    const data: Chaleco[] = await response.json();
    setChalecos(data);
  };

  useEffect(() => {
    fetchChalecos();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/chalecos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serial: parseInt(formData.serial),
        beneficiario_cedula: parseInt(formData.beneficiario)
      })
    });
    if (response.ok) {
      fetchChalecos();
      setFormData({ serial: '', beneficiario: '' });
    }
  };

  return (
    <div className="container-unp" style={{ marginTop: '20px' }}>
      <h2 className="title-unp">Chalecos</h2>
      {/* Tarjeta para crear un chaleco */}
      <div className="card-unp">
        <h3 className="subtitle-unp">Crear Chaleco</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Serial</label>
            <input 
              name="serial" 
              placeholder="Serial" 
              value={formData.serial} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Cédula Beneficiario</label>
            <input 
              name="beneficiario" 
              placeholder="Cédula Beneficiario" 
              value={formData.beneficiario} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button className="btn-unp" type="submit" style={{ marginTop: '10px' }}>
            Crear Chaleco
          </button>
        </form>
      </div>
  
      {/* Tarjeta para listar chalecos */}
      <div className="card-unp">
        <h3 className="subtitle-unp">Lista de Chalecos</h3>
        <ul>
          {chalecos.map((c) => (
            <li key={c.serial}>
              Serial: {c.serial} - Beneficiario: {c.beneficiario_cedula}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );  
};

export default ChalecosCRUD;
