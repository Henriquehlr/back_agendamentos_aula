const { Log } = require("../models");

async function registerLog({ name, activityType, module, userId }) {
  try {
    await Log.create({
      name,
      activityType,
      module,
      datetime: new Date(),
      userId,
    });
  } catch (err) {
    console.error("Erro ao registrar log:", err.message);
  }
}

module.exports = registerLog;
