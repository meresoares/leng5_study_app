const {sequelize} = require("../../connection");
const { UsersModel } = require("../../model/users.model");

const UserService = require("../../service/users.service");

const listar = async function(req, res) {
    console.log("listar usuarios");
    try {
        const users = await UserService.listar(req.query.filtro || "");
        if (users) {
            // En Users [0] se encuentra el list que se recupera desde el sql
            res.json ({           
                success: true,
                usuario: users,
            });
        } else {
            res.json({
                success: true,
                usuario: [],
            });
        }
    } catch (error) {
        console.log(error);
        res.json ({
            success: false,
            error: error.message
        });
    }
};

const consultarPorCodigo = async function(req, res) {
    console.log("consultar 1 usuario por codigo");
    try {
        const userModelResult = await UserService.busquedaPorCodigo(req.params.filtro || "");
        if (userModelResult) {
            // En Users [0] se encuentra el list que se recupera desde el sql
            res.json ({           
                success: true,
                usuario: userModelResult
            });
        } else {
            res.json({
                success: true,
                usuario: [],
            });
        }
    } catch (error) {
        console.log(error);
        res.json ({
            success: false,
            error: error.message
        });
    }
};

const actualizar = async function(req, res) {
    console.log("actualizar usuarios");
    let usuarioRetorno = null;
    //const data = req.body;
    //const id = req.body.id;
    
    try {
        usuarioRetorno = await UserService.actualizar(
            req.body.id,
            req.body.name,
            req.body.last_name,
            req.body.avatar,
            req.body.email,
            req.body.password,
            req.body.deleted
        );
        res.json({
            success: true,
            users: usuarioRetorno
        });
    } catch (error) {
        console.log(error);
        res.json ({
            success: false,
            error: error.message
        })
    }
    
};

const eliminar = async function(req, res) {
    console.log("eliminar usuarios");
    //res.send("eliminar de usuarios");
    try {
        await UserService.eliminar(req.params.filtro || "");
        res.json({
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
};

module.exports = {
    listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar
};