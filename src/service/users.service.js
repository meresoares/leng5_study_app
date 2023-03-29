const { sequelize } = require("../connection");
const { UserModel } = require('../model/users.model');

const listar = async function (textoBuscar) {
    console.log('listar usuarios');

    try {
        const users = await sequelize.query 
        (`SELECT * FROM users
        WHERE 1=1
        AND UPPER(name) LIKE UPPER ('%${textoBuscar}%')
        AND deleted IS false
        ORDER BY id`);

        if (users && users[0]) {
            return users[0];
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const consultarPorCodigo = async function (req, res) {
    console.log("consultar usuario por codigo");

    try {
        const userModelResult = await UserModel.findByPk(id);

        if (userModelResult) {
            return userModelResult;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
        
    }
};

const actualizar = async function (id, name, last_name, avatar, email, password, deleted) {
    console.log("actualizar usuarios");

    let userRetorno = null;
    const data = {id, name, last_name, avatar, email, password, deleted};
    try {
        let usrExiste = null;

        if (id) {
            usrExiste = await UserModel.findByPk(id);
        } 
        
        if (usrExiste) {
            userRetorno = await UserModel.update(data, {where: {id: id} } );
            userRetorno = data;
        }
        else {
            userRetorno = await UserModel.create(data);
        }

        return userRetorno;

    } catch (error) {
        console.log(error);
        throw error;
        
    }
};

const eliminar = async function (id) {
    console.log("eliminar usuario");

    try {
        await sequelize.query("UPDATE users SET deleted=true WHERE id=" +id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    listar, actualizar, eliminar, busquedaPorCodigo: consultarPorCodigo
}