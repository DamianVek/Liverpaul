import { useState } from "react";
import OrdenForm from "./components/OrdenForm";
import VerOrdenes from "./components/VerOrdenes";
import ResumenFinanciero from "./components/ResumenFinanciero";

function App() {
  const [vista, setVista] = useState("ver");

  return (
    <div>
      
      <header>
        <h1>Gestión de Órdenes</h1>
      </header>

      
      <nav className="nav-bar">
        <button
          className={`nav-btn ${vista === "ver" ? "activo" : ""}`}
          onClick={() => setVista("ver")}
        >
          📋 Ver Órdenes
        </button>
        <button
          className={`nav-btn ${vista === "nueva" ? "activo" : ""}`}
          onClick={() => setVista("nueva")}
        >
          ➕ Nueva Orden
        </button>
        <button
          className={`nav-btn ${vista === "finanzas" ? "activo" : ""}`}
          onClick={() => setVista("finanzas")}
        >
          💰 Finanzas
        </button>
      </nav>

      <main className="container">
        {vista === "ver" && <VerOrdenes />}
        {vista === "nueva" && <OrdenForm />}
        {vista === "finanzas" && <ResumenFinanciero />}
      </main>

      <footer className="tab-bar">
        <button
          className={`tab-btn ${vista === "ver" ? "activo" : ""}`}
          onClick={() => setVista("ver")}
        >
          📋<br />Órdenes
        </button>
        <button
          className={`tab-btn ${vista === "nueva" ? "activo" : ""}`}
          onClick={() => setVista("nueva")}
        >
          ➕<br />Nueva
        </button>
        <button
          className={`tab-btn ${vista === "finanzas" ? "activo" : ""}`}
          onClick={() => setVista("finanzas")}
        >
          💰<br />Finanzas
        </button>
      </footer>
    </div>
  );
}

export default App;
