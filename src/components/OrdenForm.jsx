import React, { useState } from "react";
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

function OrdenForm() {
  const [formulario, setFormulario] = useState({
    modelo: "",
    falla: "",
    refacciones: "",
    costoRefacciones: "",
    enciende: false,
    costoMano: "",
    notas: "",
    fechaEntrega: "",
    adelanto: ""
  });

  const [fotoDelantera, setFotoDelantera] = useState(null);
  const [fotoTrasera, setFotoTrasera] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length === 0) return;

    if (name === 'fotoDelantera') {
      setFotoDelantera(files[0]);
    } else if (name === 'fotoTrasera') {
      setFotoTrasera(files[0]);
    }
  };

  const calcularTotal = () => {
    const refacciones = parseFloat(formulario.costoRefacciones) || 0;
    const manoObra = parseFloat(formulario.costoMano) || 0;
    const adelanto = parseFloat(formulario.adelanto) || 0;
    return refacciones + manoObra - adelanto;
  };

  const subirArchivo = async (file, nombreArchivo) => {
    if (!file) return null;
    const storageRef = ref(storage, `ordenes/${nombreArchivo}-${Date.now()}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  }

  const handleGuardarOrden = async () => {
    if (!formulario.modelo || !formulario.falla) {
      alert("Requisito mínimo para una orden: modelo y falla.");
      return;
    }

    try {
      const totalCalculado = calcularTotal();

      const urlFotoDelantera = await subirArchivo(fotoDelantera, 'fotoDelantera');
      const urlFotoTrasera = await subirArchivo(fotoTrasera, 'fotoTrasera');

      const ordenParaGuardar = {
        ...formulario,
        total: totalCalculado,
        fechaIngreso: new Date().toISOString().split("T")[0],
        urlFotoDelantera,
        urlFotoTrasera,
      };

      await addDoc(collection(db, "ordenes"), ordenParaGuardar);
      console.log("Orden guardada:", ordenParaGuardar);
      alert("Orden guardada exitosamente");

      
      setFormulario({
        modelo: "",
        falla: "",
        refacciones: "",
        costoRefacciones: "",
        enciende: false,
        costoMano: "",
        notas: "",
        fechaEntrega: "",
        adelanto: ""
      });
      setFotoDelantera(null);
      setFotoTrasera(null);

    } catch (error) {
      console.error("Error al guardar la orden:", error.message);
      alert("Ocurrió un error al guardar la orden");
    }
  };

  return (
    <form>
      <h2>Ingresa las características del nuevo equipo a reparar</h2>

      <label>Introduce el modelo del dispositivo</label>
      <input
        type="text"
        name='modelo'
        placeholder='iPhone X'
        value={formulario.modelo}
        onChange={handleChange}
      />
      <br />

      <label>¿Cuál es la falla del dispositivo?</label>
      <input
        type="text"
        name='falla'
        placeholder='Cambio de pantalla'
        value={formulario.falla}
        onChange={handleChange}
      />
      <br />

      <label>Refacciones necesarias</label>
      <input
        type="text"
        name='refacciones'
        placeholder='Pantalla iPhone X'
        value={formulario.refacciones}
        onChange={handleChange}
      />
      <br />

      <label>Costo de las piezas</label>
      <input
        type="password"
        name='costoRefacciones'
        value={formulario.costoRefacciones}
        onChange={handleChange}
      />
      <br />

      <label>¿El equipo enciende?</label>
      <input
        type="checkbox"
        name='enciende'
        checked={formulario.enciende}
        onChange={handleChange}
      />
      <br />

      <label>Costo de la mano de obra</label>
      <input
        type="password"
        name='costoMano'
        value={formulario.costoMano}
        onChange={handleChange}
      />
      <br />

      <label>Notas adicionales</label>
      <textarea
        name='notas'
        rows={5}
        cols={30}
        placeholder='Introduce notas adicionales'
        value={formulario.notas}
        onChange={handleChange}
      />
      <br />

      <label>Fecha de entrega</label>
      <input
        type="date"
        name="fechaEntrega"
        value={formulario.fechaEntrega}
        onChange={handleChange}
      />
      <br />

      <label>Adelanto de pago</label>
      <input
        type="text"
        name="adelanto"
        value={formulario.adelanto}
        onChange={handleChange}
      />
      <p><strong>Restante por cobrar:</strong> ${calcularTotal()}</p>

      <br />
      <label>Foto de la parte trasera del dispositivo</label>
      <input
        type="file"
        name="fotoTrasera"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
      />
      <br />

      <label>Foto de la parte delantera del dispositivo</label>
      <input 
        type="file" 
        name="fotoDelantera"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
      />
      <br />

      <div style={{display: "flex"}}>
      {fotoDelantera && (
        <div>
          <p>Vista previa - Foto delantera:</p>
          <button onClick={() => setFotoDelantera(null)}>Eliminar foto</button>
          <br />
          <img src={URL.createObjectURL(fotoDelantera)} alt="Foto Delantera" width={150} />
        </div>
      )}

      {fotoTrasera && (
        <div>
          <p>Vista previa - Foto trasera:</p>
          <button onClick={() => setFotoTrasera(null)}>Eliminar foto</button>
          <br />
          <img src={URL.createObjectURL(fotoTrasera)} alt="Foto Trasera" width={150} />
        </div>
      )}
      </div>


      <br />
      <button type="button" onClick={handleGuardarOrden}>
        Guardar orden
      </button>
    </form>
  );
}

export default OrdenForm;