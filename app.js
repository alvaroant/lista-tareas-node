require("colors");
const { guardarNota, leerNota } = require("./helpers/guardarNota");
const {
  inquirerMenu,
  leerInput,
  pausa,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");
console.clear();

const main = async () => {
  let opt = "";

  const tareas = new Tareas();

  const archivo = leerNota();

  if (archivo) {
    tareas.cargarTareasFromArray(archivo);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarTareasCompletadas();
        break;
      case "4":
        tareas.listarTareasPendientes();
        break;
      case "5":
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.completarTareas(ids);

        break;
      case "6":
        if (tareas.listadoArr.length === 0) {
          console.log("No tienes tareas".red);
          break;
        }
        const id = await listadoTareasBorrar(tareas.listadoArr);

        const ok = await confirmar("¿Estas seguro?");
        ok ? tareas.borrarTarea(id) : null;

        break;
      case "0":
        break;
    }

    guardarNota(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
