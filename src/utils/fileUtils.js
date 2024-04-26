import fs from 'fs/promises'; // Importa fs/promises para obtener funciones de lectura/escritura asincrónicas

const dbFilePath = 'db.json'; // Ruta al archivo db.json (asumiendo que está en el mismo directorio que tu script)

export const readData = async () => {
  try {
    const data = await fs.readFile(dbFilePath, 'utf-8'); // Lee el archivo db.json
    return JSON.parse(data); // Parsea los datos como JSON y devuelve el resultado
  } catch (error) {
    throw new Error(`Error al leer los datos del archivo: ${error.message}`);
  }
};

export const writeData = async (data) => {
  try {
    await fs.writeFile(dbFilePath, JSON.stringify(data)); // Escribe los datos en el archivo db.json
  } catch (error) {
    throw new Error(`Error al escribir los datos en el archivo: ${error.message}`);
  }
};
