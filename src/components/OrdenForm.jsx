// src/pages/NuevaOrden.jsx
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function NuevaOrden() {
  const [orden, setOrden] = useState({
    cliente: "",
    telefono: "",
    descripcion: "",
    costoMano: "",
    costoRefacciones: "",
    fecha: new Date().toISOString(),
    imagen: ""
  });
  const [subiendo, setSubiendo] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrden((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async () => {
    if (!orden.cliente || !orden.descripcion) {
      alert("Por favor completa cliente y descripción");
      return;
    }

    try {
      setSubiendo(true);
      await addDoc(collection(db, "ordenes"), orden);
      alert("✅ Orden guardada correctamente.");
      setOrden({
        cliente: "",
        telefono: "",
        descripcion: "",
        costoMano: "",
        costoRefacciones: "",
        fecha: new Date().toISOString(),
        imagen: ""
      });
    } catch (error) {
      console.error("Error al guardar la orden:", error);
      alert("❌ Ocurrió un error al guardar la orden.");
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="container">
      <h2>📝 Nueva Orden</h2>
      <p className="center-text">Registra aquí una nueva orden de trabajo</p>

      <div className="card">
        <label>Cliente</label>
        <input
          type="text"
          name="cliente"
          value={orden.cliente}
          onChange={handleChange}
          placeholder="Nombre del cliente"
        />

        <label>Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={orden.telefono}
          onChange={handleChange}
          placeholder="Ej: 5512345678"
        />

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={orden.descripcion}
          onChange={handleChange}
          placeholder="Describe el servicio a realizar"
        ></textarea>

        <label>Costo de mano de obra</label>
        <input
          type="number"
          name="costoMano"
          value={orden.costoMano}
          onChange={handleChange}
          placeholder="0.00"
        />

        <label>Costo de refacciones</label>
        <input
          type="number"
          name="costoRefacciones"
          value={orden.costoRefacciones}
          onChange={handleChange}
          placeholder="0.00"
        />

        <label>Imagen (opcional, URL)</label>
        <input
          type="text"
          name="imagen"
          value={orden.imagen}
          onChange={handleChange}
          placeholder="Pega aquí la URL de la imagen"
        />

        <button
          className="btn-primary"
          onClick={handleGuardar}
          disabled={subiendo}
        >
          {subiendo ? "Guardando..." : "Guardar Orden"}
        </button>
      </div>
    </div>
  );
}

export default NuevaOrden;
