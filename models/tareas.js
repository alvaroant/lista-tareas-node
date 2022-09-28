const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  completarTareas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(arr = []) {
    arr.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    let count = 1;
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];

      const estado =
        tarea.completadoEn !== null ? "Completada".green : "Pendiente".red;

      console.log(`${(count + ".").green} ${tarea.desc} :: ${estado}`);
      count++;
    });
  }

  listarTareasCompletadas(completadas = true) {
    let count = 1;
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      const { completadoEn } = tarea;

      if (completadoEn !== null) {
        console.log(
          `${(count + ".").green} ${tarea.desc} :: ${completadoEn.green}`
        );
        count++;
      }
    });
  }

  listarTareasPendientes() {
    let count = 1;
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      const { completadoEn } = tarea;
      const estado =
        completadoEn !== null ? "Completada".green : "Pendiente".red;

      if (completadoEn === null) {
        console.log(`${(count + ".").green} ${tarea.desc} :: ${estado}`);
        count++;
      }
    });
  }
}

module.exports = Tareas;
