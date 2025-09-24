import { useEffect, useState } from "react";
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc} from "firebase/firestore";

function VerOrdenes() {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const unsuscribe = onSnapshot(collection(db, 'ordenes'), (snapshot) => {
      const listas = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrdenes(listas);
    });

    return () => unsuscribe();
  }, []);

  const eliminarOrden = async (id) => {
    try{
      await deleteDoc(doc(db, "ordenes", id));
      alert ("Orden eliminada.");    
    } catch (error) {
      console.error("Error al eliminar orden", error);
      alert ("No se pudo eliminar la orden");
    }
  };

  return (
    <div>
      <h2>Órdenes Registradas</h2>
      {ordenes.length === 0 ? (
        <p>No hay órdenes registradas.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
  {ordenes.map(ord => (
    <li key={ord.id} className="card">
      <h3>{ord.modelo}</h3>
      <p><strong>Falla:</strong> {ord.falla}</p>
      <p><strong>Refacciones:</strong> {ord.refacciones}</p>
      <p><strong>Costo de refacciones:</strong> ${ord.costoRefacciones}</p>
      <p><strong>¿Enciende?:</strong> {ord.enciende ? "Sí" : "No"}</p>
      <p><strong>Costo de mano de obra:</strong> ${ord.costoMano}</p>
      <p><strong>Notas:</strong> {ord.notas}</p>
      <p><strong>Fecha de entrega:</strong> {ord.fechaEntrega}</p>
      <p><strong>Adelanto:</strong> ${ord.adelanto}</p>
      <p><strong>Total por cobrar:</strong> ${ord.total}</p>
      <p><strong>Fecha de ingreso:</strong> {ord.fechaIngreso}</p>

      {ord.urlFotoDelantera && (
        <img src={ord.urlFotoDelantera} alt="Foto Delantera" width="100" />
      )}
      {ord.urlFotoTrasera && (
        <img src={ord.urlFotoTrasera} alt="Foto Trasera" width="100" />
      )}

      <button 
        onClick={() => eliminarOrden(ord.id)} 
        className="btn-danger" 
        style={{ marginTop: "10px" }}
      >
        Eliminar orden
      </button>
    </li>
  ))}
</ul>

      )}
    </div>
  );
}

export default VerOrdenes;
