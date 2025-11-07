import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Messages } from "primereact/messages";
import { ListBox } from "primereact/listbox";
import { SelectButton } from "primereact/selectbutton";
import { EntradaService } from "../../services/EntradaService";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function EntradaForm({ onNuevaEntrada }) {
  const [entrada, setEntrada] = useState({
    dia: "",
    tipoPago: "",
    cantidad: 1,
    ciudad: "",
    pelicula: "",
  });

  const toast = useRef(null);
  const msgs = useRef(null);

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const tiposPago = ["Efectivo", "Tarjeta"];
  const peliculas = [
    { label: "Wifi Ralph", value: "Wifi Ralph" },
    { label: "Dragon Ball Super Broly", value: "Dragon Ball Super Broly" },
    { label: "Cascanueces", value: "Cascanueces" },
    { label: "El Grinch", value: "El Grinch" },
  ];

  const validar = () => {
    msgs.current.clear();
    const errores = [];
    if (!entrada.dia) errores.push({ severity: "error", summary: "Día", detail: "Debe seleccionar un día." });
    if (!entrada.tipoPago) errores.push({ severity: "error", summary: "Tipo de pago", detail: "Debe seleccionar un tipo de pago." });
    if (!entrada.pelicula) errores.push({ severity: "error", summary: "Película", detail: "Debe seleccionar una película." });
    if (!entrada.ciudad || !entrada.ciudad.trim()) errores.push({ severity: "error", summary: "Ciudad", detail: "La ciudad es obligatoria." });
    if (!entrada.cantidad || entrada.cantidad <= 0) errores.push({ severity: "error", summary: "Cantidad", detail: "La cantidad debe ser mayor que 0." });

    if (errores.length > 0) {
      msgs.current.show(errores);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;

    const nueva = EntradaService.crearEntrada(entrada);
    if (typeof onNuevaEntrada === "function") onNuevaEntrada(nueva);

    toast.current.show({
      severity: "success",
      summary: "Compra exitosa",
      detail: "La entrada se ha guardado correctamente.",
      life: 3000,
    });

    setEntrada({
      dia: "",
      tipoPago: "",
      cantidad: 1,
      ciudad: "",
      pelicula: "",
    });
    msgs.current.clear();
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-xl border border-gray-200 max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Comprar Entrada
      </h3>

      <Messages ref={msgs} />
      <Toast ref={toast} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/*  Día */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <i className="pi pi-calendar mw-5 text-indigo-500"></i>
            Día
          </label>
          <Dropdown
            value={entrada.dia}
            options={dias}
            onChange={(e) => setEntrada({ ...entrada, dia: e.value })}
            placeholder="Seleccione un día"
            className="w-full md:w-1/2"
          />
        </div>

        {/* Tipo de pago y cantidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <i className="pi pi-credit-card text-indigo-500"></i>
              Tipo de Pago
            </label>
            <SelectButton
              value={entrada.tipoPago}
              options={tiposPago}
              onChange={(e) => setEntrada({ ...entrada, tipoPago: e.value })}
              className="w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <i className="pi pi-sort-numeric-up text-indigo-500"></i>
              Cantidad de Entradas
            </label>
            <InputNumber
              value={entrada.cantidad}
              onValueChange={(e) => setEntrada({ ...entrada, cantidad: e.value })}
              min={1}
              showButtons
              useGrouping={false}
              className="w-full"
            />
          </div>
        </div>

        {/* Ciudad */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <i className="pi pi-map-marker text-indigo-500"></i>
            Ciudad
          </label>
          <InputText
            value={entrada.ciudad}
            onChange={(e) => setEntrada({ ...entrada, ciudad: e.target.value })}
            placeholder="Ej. Valparaíso"
            className="w-full md:w-1/2"
          />
        </div>

        {/* Película */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <i className="pi pi-video text-indigo-500"></i>
            Película
          </label>
          <ListBox
            value={entrada.pelicula}
            options={peliculas}
            onChange={(e) => setEntrada({ ...entrada, pelicula: e.value })}
            optionLabel="label"
            className="w-full md:w-2/3"
            listStyle={{ maxHeight: "10rem" }}
          />
        </div>

        {/* Botón */}
        <div className="flex justify-center pt-4">
          <Button
            label="Comprar"
            icon="pi pi-check"
            type="submit"
            className="p-button-success px-6 py-3 md-4 text-lg font-medium rounded-lg"
          />
        </div>
      </form>
    </div>
  );
}
