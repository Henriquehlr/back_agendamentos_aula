const { Log } = require("../models");

async function registerLog({ name, activityType, module }) {
  try {
    await Log.create({
      name,
      activityType,
      module,
      datetime: new Date(),
    });
  } catch (err) {
    console.error("Erro ao registrar log:", err.message);
  }
}

module.exports = registerLog;
