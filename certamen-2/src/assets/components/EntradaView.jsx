// src/components/EntradasView.jsx
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { EntradaService } from "../../services/EntradaService";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function EntradaView({ triggerReload }) {
  const peliculasList = [
    { label: "Todos", value: null },
    { label: "Wifi Ralph", value: "Wifi Ralph" },
    { label: "Dragon Ball Super Broly", value: "Dragon Ball Super Broly" },
    { label: "Cascanueces", value: "Cascanueces" },
    { label: "El Grinch", value: "El Grinch" },
  ];

  const [entradas, setEntradas] = useState([]);
  const [peliculaFiltro, setPeliculaFiltro] = useState(null);

  useEffect(() => {
    cargarEntradas();
  }, [triggerReload]);

  const cargarEntradas = () => {
    const e = EntradaService.obtenerEntradas();
    setEntradas(e);
  };

  const handleFiltroChange = (e) => {
    setPeliculaFiltro(e.value);
  };

  const filteredEntradas = peliculaFiltro
    ? entradas.filter((x) => x.pelicula === peliculaFiltro)
    : entradas;

  const valorTemplate = (rowData) => {
    const valor = (Number(rowData.cantidad) || 0) * 5000;
    return <>${valor.toLocaleString()}</>;
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <div className="flex items-center justify-between mb-4">
        <h3>Entradas Compradas</h3>
        <div className="flex items-center gap-2">
          <Dropdown
            value={peliculaFiltro}
            options={peliculasList}
            onChange={handleFiltroChange}
            optionLabel="label"
            optionValue="value"
            placeholder="Filtrar por película"
            style={{ minWidth: 200 }}
          />
          <Button label="Recargar" icon="pi pi-refresh" onClick={cargarEntradas} />
        </div>
      </div>

      <DataTable value={filteredEntradas} emptyMessage="No hay entradas registradas">
        <Column field="dia" header="Día" />
        <Column field="pelicula" header="Película" />
        <Column field="cantidad" header="Cantidad de Entradas" />
        <Column header="Valor a Pagar" body={valorTemplate} />
      </DataTable>
    </div>
  );
}
