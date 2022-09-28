const fs = require("fs");

const guardarNota = (data) => {
  const path = "./db/data.json";

  fs.writeFileSync(path, JSON.stringify(data));
};

const leerNota = () => {
  if (fs.existsSync("./db/data.json")) {
    const archivo = fs.readFileSync("./db/data.json", { encoding: "utf-8" });
    return JSON.parse(archivo);
  }
};

module.exports = { guardarNota, leerNota };
