import React, { useState } from "react";
import { Toolbar } from "primereact/toolbar";
import EntradaForm from "../components/EntradaForm";
import EntradaView from "../components/EntradaView";  // Cambiado a singular
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function EntradaContainer() {
  const [reload, setReload] = useState(0);

  const handleNuevaEntrada = () => {
    setReload(reload + 1);
  };

  return (
    <div className="p-4">
      <Toolbar className="mb-4" left={<h2>Sansamark</h2>} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EntradaForm onNuevaEntrada={handleNuevaEntrada} />
        <EntradaView triggerReload={reload} />
      </div>
    </div>
  );
}