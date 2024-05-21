require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env
const express = require('express');
const router = express.Router();
const userController = require('../models/user');

// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
    userController.getAllUsers((err, users) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener usuarios' });
        } else {
            res.json(users);
        }
    });
});

// Ruta para crear un nuevo usuario
router.post('/', (req, res) => {
    const newUser = req.body;

    userController.createUser(newUser, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al crear el usuario' });
        } else {
            res.status(201).json({ message: 'Usuario creado con éxito', userId: result.insertId });
        }
    });
});

// Ruta para obtener un usuario por su ID
router.get('/:id', (req, res) => {
    const userId = req.params.id;

    userController.getUserById(userId, (err, user) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener el usuario' });
        } else {
            res.json(user);
        }
    });
});

// Ruta para actualizar un usuario existente
router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;

    userController.updateUser(userId, updatedUser, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al actualizar el usuario' });
        } else {
            res.json({ message: 'Usuario actualizado con éxito' });
        }
    });
});

// Ruta para eliminar un usuario por su ID
router.delete('/:id', (req, res) => {
    const userId = req.params.id;

    userController.deleteUser(userId, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar el usuario' });
        } else {
            res.json({ message: 'Usuario eliminado con éxito' });
        }
    });
});

module.exports = router;


