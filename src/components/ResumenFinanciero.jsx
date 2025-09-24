import { useEffect, useState } from "react";
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import jsPDF from "jspdf";

function ResumenFinanciero() {
  const [ordenes, setOrdenes] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [filtroTiempo, setFiltroTiempo] = useState("todos");
  const [nuevoGasto, setNuevoGasto] = useState({ concepto: '', monto: '' });

  const filtrarPorTiempo = (items) => {
    const hoy = new Date();

    if (filtroTiempo === "semana") {
      const hace7dias = new Date();
      hace7dias.setDate(hoy.getDate() - 7);
      return items.filter(item => {
        const fechaItem = new Date(item.fecha);
        return fechaItem >= hace7dias && fechaItem <= hoy;
      });
    }

    if (filtroTiempo === "mes") {
      return items.filter(item => {
        const fechaItem = new Date(item.fecha);
        return (
          fechaItem.getFullYear() === hoy.getFullYear() &&
          fechaItem.getMonth() === hoy.getMonth()
        );
      });
    }

    return items;
  };

  const generarPDF = () => {
    const docPDF = new jsPDF();

    docPDF.setFontSize(16);
    docPDF.text("Resumen financiero", 20, 20);

    const ahora = new Date().toISOString().split("T")[0];
    docPDF.setFontSize(10);
    docPDF.text(`Fecha de corte: ${ahora}`, 20, 28);

    docPDF.setFontSize(12);
    let y = 40;

    docPDF.text(`Periodo: ${filtroTiempo === "semana" ? "Esta semana" : filtroTiempo === "mes" ? "Este mes" : "Todos"}`, 20, y);
    y += 10;

    docPDF.text(`Total por mano de obra: $${totalManoObra.toFixed(2)}`, 20, y);
    y += 10;

    docPDF.text(`Total gastado en refacciones: $${totalRefacciones.toFixed(2)}`, 20, y);
    y += 10;

    docPDF.text(`Total en gastos operativos: $${totalGastosOperativos.toFixed(2)}`, 20, y);
    y += 10;

    const ganancia = (totalManoObra - totalGastosOperativos).toFixed(2);
    docPDF.text(`Ganancia neta (mano de obra - gastos): $${ganancia}`, 20, y);

    docPDF.save(`ResumenFinanciero-${filtroTiempo}-${ahora}.pdf`);
  };

  const ordenesFiltradas = filtrarPorTiempo(ordenes);
  const gastosFiltrados = filtrarPorTiempo(gastos);

  const totalManoObra = ordenesFiltradas.reduce((total, orden) => total + (parseFloat(orden.costoMano) || 0), 0);
  const totalRefacciones = ordenesFiltradas.reduce((total, orden) => total + (parseFloat(orden.costoRefacciones) || 0), 0);
  const totalGastosOperativos = gastosFiltrados.reduce((total, gasto) => total + (parseFloat(gasto.monto) || 0), 0);
  const balance = totalManoObra - totalGastosOperativos;

  useEffect(() => {
    const unsuscribe = onSnapshot(collection(db, 'ordenes'), (snapshot) => {
      const listas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrdenes(listas);
    });
    return () => unsuscribe();
  }, []);

  useEffect(() => {
    const unsuscribe = onSnapshot(collection(db, 'gastosOperativos'), (snapshot) => {
      const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGastos(datos);
    });
    return () => unsuscribe();
  }, []);

  const handleChangeGasto = (e) => {
    const { name, value } = e.target;
    setNuevoGasto(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardarGasto = async () => {
    const montoNumerico = parseFloat(nuevoGasto.monto);

    if (!nuevoGasto.concepto || isNaN(montoNumerico)) {
      alert("Completa ambos campos con datos válidos.");
      return;
    }

    try {
      await addDoc(collection(db, "gastosOperativos"), {
        ...nuevoGasto,
        monto: montoNumerico,
        fecha: new Date().toISOString()
      });

      alert("Gasto guardado correctamente.");
      setNuevoGasto({ concepto: '', monto: '' });
    } catch (error) {
      console.error("Error al guardar el gasto:", error);
      alert("Ocurrió un error al guardar el gasto.");
    }
  };

  const eliminarGasto = async (id) => {
    try {
      await deleteDoc(doc(db, "gastosOperativos", id));
      alert("Gasto eliminado.");
    } catch (error) {
      console.error("Error al eliminar gasto:", error);
      alert("No se pudo eliminar el gasto.");
    }
  };

  return (
    <div>
      <h2>📊 Resumen de las Finanzas</h2>
      <p>Aquí podrás controlar tus ingresos y egresos</p>

      
      <div style={{ margin: "15px 0" }}>
        <button className={filtroTiempo === "todos" ? "activo" : ""} onClick={() => setFiltroTiempo("todos")}>Todos</button>
        <button className={filtroTiempo === "semana" ? "activo" : ""} onClick={() => setFiltroTiempo("semana")}>Esta semana</button>
        <button className={filtroTiempo === "mes" ? "activo" : ""} onClick={() => setFiltroTiempo("mes")}>Este mes</button>
      </div>

     
      <div className="resumen-grid">
        <div className="card">
          <h3>Ingresos (Mano de obra)</h3>
          <p><strong>${totalManoObra.toFixed(2)}</strong></p>
        </div>
        <div className="card">
          <h3>Egresos (Gastos)</h3>
          <p><strong>${totalGastosOperativos.toFixed(2)}</strong></p>
        </div>
        <div className="card">
          <h3>Refacciones</h3>
          <p><strong>${totalRefacciones.toFixed(2)}</strong></p>
        </div>
        <div className="card" style={{ backgroundColor: balance >= 0 ? "#e0f7e9" : "#fdecea" }}>
          <h3>Balance</h3>
          <p><strong>${balance.toFixed(2)}</strong></p>
        </div>
      </div>

     
      <div className="card" style={{ marginTop: "20px" }}>
        <h3>➕ Registrar gasto operativo</h3>
        <input
          type="text"
          name="concepto"
          placeholder="Renta, pegamento, luz..."
          value={nuevoGasto.concepto}
          onChange={handleChangeGasto}
        />
        <input
          type="text"
          name="monto"
          placeholder="Monto"
          value={nuevoGasto.monto}
          onChange={handleChangeGasto}
        />
        <button onClick={handleGuardarGasto}>Guardar gasto</button>
      </div>

      
      <div style={{ marginTop: "20px" }}>
        <h3>📑 Gastos operativos registrados</h3>
        {gastosFiltrados.length === 0 ? (
          <p>No hay gastos operativos registrados en este periodo.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {gastosFiltrados.map(gasto => (
                <tr key={gasto.id}>
                  <td>{gasto.concepto}</td>
                  <td>${parseFloat(gasto.monto).toFixed(2)}</td>
                  <td>{new Date(gasto.fecha).toLocaleDateString()}</td>
                  <td>
                    <button className="btn-danger" onClick={() => eliminarGasto(gasto.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      
      <button onClick={generarPDF} style={{ marginTop: '20px' }}>
        Descargar PDF del resumen
      </button>
    </div>
  );
}

export default ResumenFinanciero;
