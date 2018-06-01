const StatsDAL = require('./DAL/stats.sequelize');

class Stats {
  constructor(templateId) {
    this.templateId = templateId;
    this.DAL = new StatsDAL(templateId);
  }
  getDeliveryStats() {
    return this.DAL.getDeliveryStats();
  }
  setDeliveryStats() {
    return this.DAL.setDeliveryStats();
  }
}

module.exports = Stats;
