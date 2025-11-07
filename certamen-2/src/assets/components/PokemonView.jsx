import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faTint,
  faBolt,
  faLeaf,
  faMountain,
  faQuestion,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function PokemonView({ pokemons, onDelete, onDeleteAll }) {
  const [visible, setVisible] = useState(false);

  // --- Íconos según tipo ---
  const getTipoIcon = (tipo) => {
    switch (tipo) {
      case "fuego":
        return <FontAwesomeIcon icon={faFire} />;
      case "agua":
        return <FontAwesomeIcon icon={faTint} />;
      case "electrico":
        return <FontAwesomeIcon icon={faBolt} />;
      case "planta":
        return <FontAwesomeIcon icon={faLeaf} />;
      case "roca":
        return <FontAwesomeIcon icon={faMountain} />;
      default:
        return <FontAwesomeIcon icon={faQuestion} />;
    }
  };

  // --- Confirmar borrado individual ---
  const confirmDelete = (rowData) => {
    confirmDialog({
      message: `¿Seguro que quieres eliminar a ${rowData.nombre}?`,
      header: "Confirmar eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sí, eliminar",
      rejectLabel: "Cancelar",
      acceptClassName: "p-button-danger",
      accept: () => onDelete(rowData.numero),
    });
  };

  // --- Confirmar borrado total ---
  const confirmDeleteAll = () => {
    confirmDialog({
      message: "¿Seguro que deseas eliminar TODOS los Pokémon?",
      header: "Borrar todos",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sí, borrar todo",
      rejectLabel: "Cancelar",
      acceptClassName: "p-button-danger",
      accept: () => onDeleteAll(),
    });
  };


  // --- Plantillas ---
  const tipoBodyTemplate = (rowData) => (
    <div className="flex align-items-center gap-2">
      {getTipoIcon(rowData.tipo)}
      <span>{rowData.tipo}</span>
    </div>
  );

  const actionBodyTemplate = (rowData) => (
    <Button
      icon={<FontAwesomeIcon icon={faTrash} />}
      className="p-button-danger p-button-rounded"
      onClick={() => confirmDelete(rowData)}
      tooltip="Eliminar Pokémon"
    />
  );

  // --- Render principal ---
  return (
    <div className="card p-4">
      {/* Necesario para mostrar los diálogos de confirmación */}
      <ConfirmDialog />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Pokedex</h3>
        <Button
          label="Borrar todos"
          icon={<FontAwesomeIcon icon={faTrash} />}
          className="p-button-danger p-button-lg"
          onClick={confirmDeleteAll}
        />
      </div>

      <DataTable value={pokemons} paginator rows={5}>
        <Column field="nombre" header="Nombre" sortable />
        <Column field="tipo" header="Tipo" body={tipoBodyTemplate} sortable />
        <Column field="numero" header="Número" sortable />
        <Column
          header="Acciones"
          body={actionBodyTemplate}
          style={{ textAlign: "center", width: "8rem" }}
        />
      </DataTable>
    </div>
  );
}
