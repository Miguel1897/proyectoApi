import express from 'express';
import bookRoutes from './src/routes/bookRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

const app = express(); // Aquí mueve la declaración de app arriba

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

const PORT = 3000;

// Lista de usuarios (simulando una base de datos)
const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'user', password: 'user123' }
];

// Middleware para manejar el formulario de inicio de sesión
app.use(express.urlencoded({ extended: true }));

// Ruta para la página de inicio de sesión
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validar las credenciales del usuario
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    // Si las credenciales son válidas, redirigir a la página de CRUD de libros
    res.redirect('/crud-libros');
  } else {
    // Si las credenciales no son válidas, mostrar un mensaje de error
    res.send('Credenciales inválidas. Por favor, intenta de nuevo.');
  }
});

// Ruta para la página de CRUD de libros
app.get('/crud-libros', (req, res) => {
  res.send('Página de CRUD de libros');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
