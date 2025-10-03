import { useState } from "react";

function ResumenFinanciero() {
  const [ingresos] = useState([
    { id: 1, concepto: "Reparación iPhone", monto: 2500 },
    { id: 2, concepto: "Cambio pantalla Laptop", monto: 1800 },
  ]);

  const [gastos] = useState([
    { id: 1, concepto: "Compra refacciones", monto: 1200 },
    { id: 2, concepto: "Pago servicios", monto: 800 },
  ]);

  const totalIngresos = ingresos.reduce((acc, i) => acc + i.monto, 0);
  const totalGastos = gastos.reduce((acc, g) => acc + g.monto, 0);
  const balance = totalIngresos - totalGastos;

  const exportarPDF = () => {
    alert("Exportando a PDF... (aquí se conecta con jspdf o similar)");
  };

  return (
    <div>
      <h2>📊 Resumen Financiero</h2>

      {/* Balance principal */}
      <div className="card flex-center" style={{ flexDirection: "column" }}>
        <h3>💰 Balance General</h3>
        <p>
          Ingresos: <strong style={{ color: "#28a745" }}>${totalIngresos}</strong>
        </p>
        <p>
          Gastos: <strong style={{ color: "#dc3545" }}>${totalGastos}</strong>
        </p>
        <p>
          Balance:{" "}
          <strong
            style={{
              color: balance >= 0 ? "#28a745" : "#dc3545",
              fontSize: "1.3rem",
            }}
          >
            ${balance}
          </strong>
        </p>
        <button className="btn-primary" onClick={exportarPDF}>
          📄 Exportar PDF
        </button>
      </div>

      {/* Tablas con ingresos y gastos */}
      <div className="resumen-grid">
        <div className="card">
          <h3>📈 Ingresos</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Concepto</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                {ingresos.map((i) => (
                  <tr key={i.id}>
                    <td>{i.concepto}</td>
                    <td>${i.monto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h3>📉 Gastos</h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Concepto</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                {gastos.map((g) => (
                  <tr key={g.id}>
                    <td>{g.concepto}</td>
                    <td>${g.monto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumenFinanciero;
