import { useState } from "react";
import OrdenForm from "./components/OrdenForm";
import VerOrdenes from "./components/VerOrdenes";
import ResumenFinanciero from "./components/ResumenFinanciero";

function App() {
  const [pagina, setPagina] = useState("ordenForm"); // 🔹 Por default abre "Nueva Orden"

  return (
    <div>
      <header>
        <h1>📱 Gestión de Reparaciones</h1>
      </header>

      {/* Navbar (PC) */}
      <nav className="nav-bar">
        <button
          className={`nav-btn ${pagina === "ordenForm" ? "activo" : ""}`}
          onClick={() => setPagina("ordenForm")}
        >
          ➕ Nueva Orden
        </button>
        <button
          className={`nav-btn ${pagina === "verOrdenes" ? "activo" : ""}`}
          onClick={() => setPagina("verOrdenes")}
        >
          📋 Ver Órdenes
        </button>
        <button
          className={`nav-btn ${pagina === "finanzas" ? "activo" : ""}`}
          onClick={() => setPagina("finanzas")}
        >
          💰 Finanzas
        </button>
      </nav>

      {/* Tab Bar (móviles) */}
      <div className="tab-bar">
        <button
          className={`tab-btn ${pagina === "ordenForm" ? "activo" : ""}`}
          onClick={() => setPagina("ordenForm")}
        >
          ➕ Orden
        </button>
        <button
          className={`tab-btn ${pagina === "verOrdenes" ? "activo" : ""}`}
          onClick={() => setPagina("verOrdenes")}
        >
          📋 Órdenes
        </button>
        <button
          className={`tab-btn ${pagina === "finanzas" ? "activo" : ""}`}
          onClick={() => setPagina("finanzas")}
        >
          💰 Finanzas
        </button>
      </div>

      {/* Contenido dinámico */}
      <div className="container">
        {pagina === "ordenForm" && <OrdenForm />}
        {pagina === "verOrdenes" && <VerOrdenes />}
        {pagina === "finanzas" && <ResumenFinanciero />}
      </div>
    </div>
  );
}

export default App;
