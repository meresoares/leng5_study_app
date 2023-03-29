const { sequelize} = require("../connection");
const { TopicModel } = require('../model/topics.model');

const listar =async function (textoBuscar) {
    console.log('listar topics');

    try {
        const topics = await sequelize.query (
            `SELECT * FROM topics
            WHERE 1=1
            AND UPPER(name) LIKE UPPER ('%${textoBuscar}%')
            ORDER BY id`);
        if (topics && topics [0]) {
            return topics[0];
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const consultarPorCodigo = async function (codigo) {
    console.log("consultar topic por codigo");

    try {
        const topicModelResult = await TopicModel.findByPk(codigo);

        if (topicModelResult) {
            return topicModelResult;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
        
    }
};

const actualizar = async function (id, create_date, name, topic_id, order, priority, color, owner_user_id) {
    console.log("actualizar topic");
    let topicRetorno = null;
    const data = (id, create_date, name, topic_id, order, priority, color, owner_user_id)
    try {
        let topicExiste = null;

        if (id) {
            topicExiste = await TopicModel.findByPk(id);
        } 
        
        if (topicExiste) {
            topicRetorno = await TopicModel.update(data, {where: {id: id} } );
            topicRetorno = data;
        }
        else {
            topicRetorno = await TopicModel.create(data);
        }

        return topicRetorno;

    } catch (error) {
        console.log(error);
        throw error;
        
    }
};

const eliminar = async function (id) {
    console.log("eliminar topic");

    try {
        TopicModel.destroy( { where: { id: codigo, topic_id: codigo }}, { truncate: false });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    listar, actualizar, eliminar, busquedaPorCodigo: consultarPorCodigo
}