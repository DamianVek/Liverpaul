import { useState } from 'react';
import './App.css';
import OrdenForm from './components/OrdenForm';
import VerOrdenes from './components/VerOrdenes';
import ResumenFinanciero from './components/ResumenFinanciero';

function App() {
  const [vistaActiva, setVistaActiva] = useState("formulario");

  return (
    <div>
      <header>
        <h1>Administración de Reparaciones</h1>
      </header>

      <div className="container">
        <div className="botones-nav">
          <button onClick={() => setVistaActiva("formulario")}>Nueva orden</button>
          <button onClick={() => setVistaActiva("ordenes")}>Ver órdenes</button>
          <button onClick={() => setVistaActiva("finanzas")}>Mis finanzas</button>
        </div>

        <section style={{ marginTop: "20px" }}>
          {vistaActiva === "formulario" && <OrdenForm />}
          {vistaActiva === "ordenes" && <VerOrdenes />}
          {vistaActiva === "finanzas" && <ResumenFinanciero />}
        </section>
      </div>
    </div>
  );
}

export default App;

