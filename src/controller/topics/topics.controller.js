const { sequelize } = require ("../../connection");
const { TopicsModel } = require ("../../model/topics.model");
const TopicService = require("../../service/topics.service");

const listar = async function (req, res) {
    console.log("listar topics");

    try {
        const topics = await TopicService.listar(req.query.filtro || "");

        if(topics) {
            res.json({
                success: true,
                topics: topics
            })
        } else {
            res.json({
                success: true,
                topics: []
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            error: error.message
        }) 
    }
}

const consultarPorCodigo = async function (req, res) {
    console.log("consultar un topic por codigo");
    try {
        const topicsModelResult = await TopicService.busquedaPorCodigo(req.params.filtro || "");

        if (topicsModelResult) {
            res.json({
                success: true,
                topics: topicsModelResult
            })  
        } else {
            res.json({
                success: true,
                topics: [],
            })  
        }

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        })
    }
}

const actualizar = async function (req, res) {
    console.log("actualizar topic");
    let topicRetorno = null;
    //const data = req.body;
    //const id = req.body.id;

    try {
        topicRetorno = await TopicService.actualizar(
            req.body.id,
            req.body.create_date,
            req.body.name,
            req.body.topic_id,
            req.body.order,
            req.body.priority,
            req.body.color,
            req.body.owner_user_id
        );
        
        res.json({
            success: true,
            topic: topicRetorno
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        })
    }
}

const eliminar = async function (req, res) {
    console.log("eliminar topic");

    try {
        await TopicService.eliminar(req.params.filtro || "");
        res.json({
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {
    listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar
}