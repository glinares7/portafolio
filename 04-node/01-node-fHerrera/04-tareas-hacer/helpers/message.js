require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("===========================".green);
    console.log("   Seleccione una opción".green);
    console.log("===========================\n".green);
    console.log(`${"1".green}. Crear tareas`);
    console.log(`${"2".green}. Listar tareas`);
    console.log(`${"3".green}. ListarTareas completadas `);
    console.log(`${"4".green}. Listar tareas pendientes`);
    console.log(`${"5".green}. Completar tareas`);
    console.log(`${"6".green}. Borrar Tareas`);
    console.log(`${"0".green}. Salir\n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question("Seleccione una opcion:", (opt) => {
      // console.log({ opt });
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question(`\nPresione ${"Enter".green} para continuar\n`, (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
