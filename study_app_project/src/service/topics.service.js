const {sequelize} = require("../../connection");
const {TopicsModel} = require('../../model/topics.model');

const listar =async function (buscarTexto) {
    console.log('listar topics');

    try {
        const topics = await sequelize.query (`SELECT * FROM themes
                                              WHERE 1=1
                                              AND UPPER(name) LIKE UPPER ('%${buscarTexto}%')
                                              AND deleted IS false
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

constconsultarPorCodigo = async function (codigo) {
    console.log("consultar topic por codigo");

    try {
        const topicModelResult = await TopicsModel.findByPk(codigo);

        if (topicModelResultModelResult) {
            return topicModelResultModelResult;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
        
    }
};

const actualizar = async function (id, create_date, topic_id, order, priority, color, owner_user_id, deleted) {
    console.log("actualizar topic");
    let topicRetorno = null;
    const data = (id, create_date, topic_id, order, priority, color, owner_user_id, deleted)
    try {
        let topicExiste = null;

        if (id) {
            topicExiste = await TopicsModel.findByPk(id);
        } 
        
        if (topicExiste) {
            topicRetorno = await TopicsModel.update(data, {where: {id: id} } );
            topicRetorno = data;
        }
        else {
            topicRetorno = await TopicsModel.create(data);
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
        TopicsModel.destroy( {where: {id: codigo, topic_id: codigo}}, {truncate: false} );
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    listar, actualizar, eliminar, busquedaPorCodigo: constconsultarPorCodigo
}