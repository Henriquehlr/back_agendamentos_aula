const { Log } = require('../models');

exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Log.findAll({ order: [['datetime', 'DESC']] });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar logs', error });
  }
};

exports.createLog = async (req, res) => {
  try {
    const { name, activityType, module, datetime } = req.body;
    const novoLog = await Log.create({ name, activityType, module, datetime });
    res.status(201).json(novoLog);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar log', error });
  }
};
