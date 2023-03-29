// Ruta absoluta
// const userController = require('/src/controller/users/users.controller');

// Ruta relativa
const userController = require('../../controller/users/users.controller');

module.exports = (app) => {

    app.get('/users/list', userController.listar);
    app.get('/users/:id', userController.busquedaPorCodigo);
    app.post('/users/update', userController.actualizar);
    app.delete('/users/delete/:id', userController.eliminar);
}
