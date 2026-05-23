import { useState, useEffect } from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Resultados from './componentes/Resultados';
import Nav from './componentes/Nav';

const API_URL = 'http://127.0.0.1:8000';

function App() {
  const [apiStatus, setApiStatus] = useState('online');
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then(res => res.json())
      .then(data => { if (data.status !== 'ok') setApiStatus('offline'); })
      .catch(() => setApiStatus('offline'));
  }, []);

  const ejecutarSimulacion = async (parametros) => {
    setLoading(true);
    try {
      
      const queryParams = new URLSearchParams(parametros);
      const res = await fetch(`${API_URL}/simular?${queryParams.toString()}`);
      
      if (!res.ok) throw new Error('Error en la simulación');
      
      const data = await res.json();
      setResultados(data); // Esto automáticamente actualiza la vista
    } catch (error) {
      alert('Error al conectar con la API: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="app-layout">
      <Nav></Nav> 
      <div className="page-container">
        <main>
          <Formulario onSimular={ejecutarSimulacion} isLoading={loading} />
          {resultados && <Resultados data={resultados} />}
        </main>
      </div>
    </div>
      
    </>
  );
}

export default App;