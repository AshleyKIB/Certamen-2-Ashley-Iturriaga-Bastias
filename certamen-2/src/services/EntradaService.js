export const STORAGE_KEY = "entradas";

export const EntradaService = {
  crearEntrada(entrada) {
    const entradasGuardadas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const nueva = { ...entrada, fechaCreacion: new Date().toISOString() };
    entradasGuardadas.push(nueva);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entradasGuardadas));
    return nueva;
  },

  obtenerEntradas() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  },

  borrarTodas() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
