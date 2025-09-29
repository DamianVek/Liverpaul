import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";

function VerOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

  useEffect(() => {
    const unsuscribe = onSnapshot(collection(db, "ordenes"), (snapshot) => {
      const listas = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrdenes(listas);
    });

    return () => unsuscribe();
  }, []);

  const eliminarOrden = async (id) => {
    try {
      await deleteDoc(doc(db, "ordenes", id));
      alert("Orden eliminada.");
    } catch (error) {
      console.error("Error al eliminar orden", error);
      alert("No se pudo eliminar la orden");
    }
  };

  const actualizarOrden = async (orden) => {
    try {
      const ref = doc(db, "ordenes", orden.id);
      await updateDoc(ref, {
        modelo: orden.modelo,
        falla: orden.falla,
        estatus: orden.estatus,
      });
      alert("Orden actualizada correctamente.");
      setOrdenSeleccionada(null);
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("No se pudo actualizar la orden.");
    }
  };

  return (
    <div className="container">
      <h2>Órdenes Registradas</h2>
      {ordenes.length === 0 ? (
        <p>No hay órdenes registradas.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {ordenes.map((ord) => (
            <li key={ord.id} className="card">
              <h3>{ord.modelo}</h3>

              <p>
                <strong>Estatus:</strong>{" "}
                <span
                  style={{
                    color: ord.estatus === "finalizada" ? "#4caf50" : "#ffc107",
                    fontWeight: "bold",
                  }}
                >
                  {ord.estatus}
                </span>
              </p>

              <p><strong>Falla:</strong> {ord.falla}</p>
              <p><strong>Refacciones:</strong> {ord.refacciones}</p>
              <p><strong>Costo refacciones:</strong> ${ord.costoRefacciones}</p>
              <p><strong>¿Enciende?:</strong> {ord.enciende ? "Sí" : "No"}</p>
              <p><strong>Costo mano de obra:</strong> ${ord.costoMano}</p>
              <p><strong>Notas:</strong> {ord.notas}</p>
              <p><strong>Fecha entrega:</strong> {ord.fechaEntrega}</p>
              <p><strong>Adelanto:</strong> ${ord.adelanto}</p>
              <p><strong>Total por cobrar:</strong> ${ord.total}</p>
              <p><strong>Fecha ingreso:</strong> {ord.fechaIngreso}</p>

              {/* Fotos */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {ord.urlFotoDelantera && (
                  <img
                    src={ord.urlFotoDelantera}
                    alt="Foto Delantera"
                    width="120"
                  />
                )}
                {ord.urlFotoTrasera && (
                  <img
                    src={ord.urlFotoTrasera}
                    alt="Foto Trasera"
                    width="120"
                  />
                )}
              </div>

              
              <div style={{ marginTop: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  onClick={() => setOrdenSeleccionada(ord)}
                  className="btn-secondary"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarOrden(ord.id)}
                  className="btn-danger"
                >
                  Eliminar
                </button>
                <button
                  onClick={() =>
                    actualizarOrden({ ...ord, estatus: "finalizada" })
                  }
                  className="btn-primary"
                >
                  Finalizar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      
      {ordenSeleccionada && (
        <div className="card">
          <h3>Editar orden</h3>
          <label>Modelo:</label>
          <input
            value={ordenSeleccionada.modelo}
            onChange={(e) =>
              setOrdenSeleccionada({
                ...ordenSeleccionada,
                modelo: e.target.value,
              })
            }
          />

          <label>Falla:</label>
          <input
            value={ordenSeleccionada.falla}
            onChange={(e) =>
              setOrdenSeleccionada({
                ...ordenSeleccionada,
                falla: e.target.value,
              })
            }
          />

          <label>Estatus:</label>
          <select
            value={ordenSeleccionada.estatus}
            onChange={(e) =>
              setOrdenSeleccionada({
                ...ordenSeleccionada,
                estatus: e.target.value,
              })
            }
          >
            <option value="pendiente">Pendiente</option>
            <option value="finalizada">Finalizada</option>
          </select>

          <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
            <button
              onClick={() => actualizarOrden(ordenSeleccionada)}
              className="btn-primary"
            >
              Guardar
            </button>
            <button
              onClick={() => setOrdenSeleccionada(null)}
              className="btn-secondary"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerOrdenes;
