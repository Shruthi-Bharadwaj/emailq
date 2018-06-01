const StatsModel = require('./stats.model');
const Sequelize = require('../../../ORM/sequelize');

class Stats extends Sequelize {
  constructor(templateId) {
    super(StatsModel);
    this.templateId = templateId;
  }
  getDeliveryStats() {
    const condition = {
      templateId: this.templateId,
    };
    const projection = ['delivers'];
    return this.find(condition, projection);
  }

  setDeliveryStats() {
    const condition = {
      templateId: this.templateId,
    };
    const incrementFieldsBy = {
      delivers: 1,
    };
    return this.incrementOrCreate(condition, incrementFieldsBy);
  }
}

module.exports = Stats;
