const {sequelize} = require("../../connection");
const {ThemesModel} = require('../../model/themes.model');

const listar =async function (buscarTexto) {
    console.log('listar temas');

    try {
        const themes = await sequelize.query (`SELECT * FROM themes
                                              WHERE 1=1
                                              AND UPPER(name) LIKE UPPER ('%${buscarTexto}%')
                                              AND deleted IS false
                                              ORDER BY id`);
        if (themes && themes[0]) {
            return themes[0];
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const consultarPorCodigo = async function (codigo) {
    console.log("consultar tema por codigo");

    try {
        const themesModelResult = await ThemesModel.findByPk(codigo);

        if (themesModelResult) {
            return themesModelResult;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
        
    }
};

const actualizar = async function (create_date, name, description, keywords, owner_user_id, deleted) {
    console.log("actualizar temas");
    let temaRetorno = null;
    const data = (create_date, name, description, keywords, owner_user_id, deleted)
    try {
        let temaExiste = null;

        if (id) {
            temaExiste = await ThemesModel.findByPk(id);
        } 
        
        if (temaExiste) {
            temaRetorno = await ThemesModel.update(data, {where: {id: id} } );
            temaRetorno = data;
        }
        else {
            temaRetorno = await ThemesModel.create(data);
        }

        return temaRetorno;

    } catch (error) {
        console.log(error);
        throw error;
        
    }
};

const eliminar = async function (codigo) {
    console.log("eliminar tema");

    try {
        ThemesModel.destroy ({ where : {id: codigo}}, {truncate: false});
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    listar, actualizar, eliminar, busquedaPorCodigo: consultarPorCodigo
}