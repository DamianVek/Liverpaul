import { useState } from "react";

function VerOrdenes() {
  const [ordenes, setOrdenes] = useState([
    {
      id: 1,
      cliente: "Carlos Pérez",
      equipo: "iPhone 13",
      problema: "Pantalla rota",
      costo: 2500,
      estado: "En Proceso",
      imagen: "https://via.placeholder.com/300x200", // ejemplo
    },
    {
      id: 2,
      cliente: "María López",
      equipo: "Laptop Dell",
      problema: "No enciende",
      costo: 1800,
      estado: "Pendiente",
      imagen: "https://via.placeholder.com/300x200",
    },
  ]);

  const [imagenModal, setImagenModal] = useState(null);

  // Finalizar una orden
  const finalizarOrden = (id) => {
    setOrdenes(
      ordenes.map((o) =>
        o.id === id ? { ...o, estado: "Finalizado" } : o
      )
    );
  };

  // Eliminar una orden
  const eliminarOrden = (id) => {
    setOrdenes(ordenes.filter((o) => o.id !== id));
  };

  return (
    <div>
      <h2>📋 Órdenes de Reparación</h2>

      {ordenes.length === 0 ? (
        <p className="center-text">No hay órdenes registradas.</p>
      ) : (
        ordenes.map((orden) => (
          <div key={orden.id} className="card">
            <h3>👤 Cliente: {orden.cliente}</h3>
            <p><strong>Equipo:</strong> {orden.equipo}</p>
            <p><strong>Problema:</strong> {orden.problema}</p>
            <p><strong>Costo:</strong> ${orden.costo}</p>
            <p>
              <strong>Estado:</strong>{" "}
              <span
                style={{
                  color:
                    orden.estado === "Finalizado"
                      ? "#28a745"
                      : orden.estado === "En Proceso"
                      ? "#ffc107"
                      : "#dc3545",
                }}
              >
                {orden.estado}
              </span>
            </p>

            {/* Imagen con modal */}
            {orden.imagen && (
              <img
                src={orden.imagen}
                alt="Evidencia"
                onClick={() => setImagenModal(orden.imagen)}
              />
            )}

            {/* Botones de acción */}
            <div className="flex-center gap-15">
              {orden.estado !== "Finalizado" && (
                <button
                  className="btn-primary"
                  onClick={() => finalizarOrden(orden.id)}
                >
                  ✅ Finalizar
                </button>
              )}
              <button
                className="btn-secondary"
                onClick={() => alert("Función de edición próximamente")}
              >
                ✏️ Editar
              </button>
              <button
                className="btn-danger"
                onClick={() => eliminarOrden(orden.id)}
              >
                🗑 Eliminar
              </button>
            </div>
          </div>
        ))
      )}

      {/* Modal para imagen */}
      {imagenModal && (
        <div
          className="modal"
          onClick={() => setImagenModal(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <img
            src={imagenModal}
            alt="Ampliada"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "12px",
              boxShadow: "0 0 15px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default VerOrdenes;
