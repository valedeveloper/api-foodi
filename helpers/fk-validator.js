const validarFK = async (Model, id, nombreCampo = "id") => {
    if (!id || !Number.isInteger(id) || id <= 0) {
        throw new Error(`El ${nombreCampo} '${id}' no es válido.`);
    }

    const registro = await Model.findByPk(id);

    if (!registro) {
        throw new Error(`El ${nombreCampo} '${id}' no existe en la tabla ${Model.tableName}.`);
    }
};

module.exports = { validarFK }
