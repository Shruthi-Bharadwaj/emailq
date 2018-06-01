/* eslint-disable class-methods-use-this */
const StatsSerive = require('./stats.service');

class Stats {
  getDeleiveryStats(req, res, next) {
    const stats = new StatsSerive(req.query.templateId);
    stats.getDeliveryStats().then((deliveryStats) => {
      res.json({
        deliveryStats,
      });
    }).catch((err) => {
      next(err);
    });
  }
}

module.exports = new Stats();
