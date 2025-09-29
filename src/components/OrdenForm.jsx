import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function OrdenForm() {
  const [orden, setOrden] = useState({
    modelo: "",
    falla: "",
    refacciones: "",
    costoRefacciones: "",
    enciende: false,
    costoMano: "",
    notas: "",
    fechaEntrega: "",
    adelanto: "",
    total: "",
    fechaIngreso: new Date().toLocaleDateString(),
    estatus: "pendiente",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOrden({
      ...orden,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "ordenes"), orden);
      alert("Orden registrada con éxito");
      setOrden({
        modelo: "",
        falla: "",
        refacciones: "",
        costoRefacciones: "",
        enciende: false,
        costoMano: "",
        notas: "",
        fechaEntrega: "",
        adelanto: "",
        total: "",
        fechaIngreso: new Date().toLocaleDateString(),
        estatus: "pendiente",
      });
    } catch (error) {
      console.error("Error al registrar la orden:", error);
      alert("No se pudo registrar la orden");
    }
  };

  return (
    <div className="container">
      <h2>Nueva Orden</h2>
      <form onSubmit={handleSubmit} className="card">
    
        <label>Modelo:</label>
        <input
          type="text"
          name="modelo"
          value={orden.modelo}
          onChange={handleChange}
          placeholder="Ej. iPhone 12"
          required
        />

      
        <label>Falla:</label>
        <input
          type="text"
          name="falla"
          value={orden.falla}
          onChange={handleChange}
          placeholder="Ej. No carga"
          required
        />

       
        <label>Refacciones:</label>
        <input
          type="text"
          name="refacciones"
          value={orden.refacciones}
          onChange={handleChange}
        />

       
        <label>Costo de refacciones:</label>
        <input
          type="number"
          name="costoRefacciones"
          value={orden.costoRefacciones}
          onChange={handleChange}
        />

        
        <label>
          <input
            type="checkbox"
            name="enciende"
            checked={orden.enciende}
            onChange={handleChange}
          />
          ¿Enciende?
        </label>

        
        <label>Costo de mano de obra:</label>
        <input
          type="number"
          name="costoMano"
          value={orden.costoMano}
          onChange={handleChange}
        />

        
        <label>Notas:</label>
        <textarea
          name="notas"
          value={orden.notas}
          onChange={handleChange}
          placeholder="Notas adicionales..."
          rows="3"
        ></textarea>

        
        <label>Fecha de entrega:</label>
        <input
          type="date"
          name="fechaEntrega"
          value={orden.fechaEntrega}
          onChange={handleChange}
        />

        
        <label>Adelanto:</label>
        <input
          type="number"
          name="adelanto"
          value={orden.adelanto}
          onChange={handleChange}
        />

        
        <label>Total por cobrar:</label>
        <input
          type="number"
          name="total"
          value={orden.total}
          onChange={handleChange}
        />

       
        <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
          <button type="submit" className="btn-primary">
            Guardar orden
          </button>
          <button
            type="reset"
            onClick={() =>
              setOrden({
                modelo: "",
                falla: "",
                refacciones: "",
                costoRefacciones: "",
                enciende: false,
                costoMano: "",
                notas: "",
                fechaEntrega: "",
                adelanto: "",
                total: "",
                fechaIngreso: new Date().toLocaleDateString(),
                estatus: "pendiente",
              })
            }
            className="btn-secondary"
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrdenForm;
