import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faTint,
  faBolt,
  faLeaf,
  faMountain,
} from "@fortawesome/free-solid-svg-icons";

export default function PokemonForm({ onAdd }) {
  const [nombre, setNombre] = useState("");
  const [numero, setNumero] = useState(null);
  const [tipo, setTipo] = useState(null);

  const [nombreError, setNombreError] = useState("");
  const [numeroError, setNumeroError] = useState("");
  const [tipoError, setTipoError] = useState("");
  const [serviceError, setServiceError] = useState("");

  // Íconos asociados a cada tipo
  const tipoIcons = {
    fuego: faFire,
    agua: faTint,
    electrico: faBolt,
    planta: faLeaf,
    roca: faMountain,
  };

  // Opciones del dropdown con íconos
  const tipos = [
    { label: "Fuego", value: "fuego" },
    { label: "Agua", value: "agua" },
    { label: "Eléctrico", value: "electrico" },
    { label: "Planta", value: "planta" },
    { label: "Roca", value: "roca" },
  ];

  const registrar = () => {
    setNombreError("");
    setNumeroError("");
    setTipoError("");
    setServiceError("");

    let isValid = true;

    if (!nombre || nombre.trim() === "") {
      setNombreError("El nombre es obligatorio.");
      isValid = false;
    }

    if (!tipo) {
      setTipoError("El tipo es obligatorio.");
      isValid = false;
    }

    if (!numero || numero === null) {
      setNumeroError("El número es obligatorio.");
      isValid = false;
    } else if (numero < 1) {
      setNumeroError("El número debe ser 1 o mayor.");
      isValid = false;
    }

    if (!isValid) return;

    try {
      onAdd({ nombre, numero, tipo });
      setNombre("");
      setNumero(null);
      setTipo(null);
    } catch (error) {
      setServiceError(error.message);
    }
  };

  // Personalizar cada opción del Dropdown para incluir icono
  const tipoOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        <FontAwesomeIcon icon={tipoIcons[option.value]} />
        <span>{option.label}</span>
      </div>
    );
  };

  // Mostrar el valor seleccionado también con icono
  const selectedTipoTemplate = (option, props) => {
    if (option) {
      return (
        <div className="flex align-items-center gap-2">
          <FontAwesomeIcon icon={tipoIcons[option.value]} />
          <span>{option.label}</span>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  return (
    <div className="card p-4">
      <h3>Registro Pokémon</h3>

      {serviceError && (
        <div className="p-error mb-3" style={{ fontWeight: "bold" }}>
          Error: {serviceError}
        </div>
      )}

      <div className="field">
        <label>Nombre</label>
        <InputText
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={"w-full " + (nombreError ? "p-invalid" : "")}
        />
        {nombreError && <small className="p-error">{nombreError}</small>}
      </div>

      <div className="field mt-3">
        <label>Número</label>
        <InputNumber
          value={numero}
          onValueChange={(e) => setNumero(e.value)}
          className={"w-full " + (numeroError ? "p-invalid" : "")}
          showButtons
          buttonLayout="horizontal"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
          min={1}
        />
        {numeroError && <small className="p-error">{numeroError}</small>}
      </div>

      <div className="field mt-3">
        <label>Tipo</label>
        <Dropdown
          value={tipo}
          options={tipos}
          onChange={(e) => setTipo(e.value)}
          placeholder="Selecciona un tipo"
          className={"w-full " + (tipoError ? "p-invalid" : "")}
          itemTemplate={tipoOptionTemplate}
          valueTemplate={selectedTipoTemplate}
        />
        {tipoError && <small className="p-error">{tipoError}</small>}
      </div>

      <Button label="Registrar" onClick={registrar} className="mt-4 w-full" />
    </div>
  );
}
