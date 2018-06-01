/* eslint-disable class-methods-use-this */
class Sequelize {
  constructor(model) {
    this.model = model;
  }

  find(condition = {}, projection = [], options = {}) {
    return new Promise((resolve, reject) => {
      const params = Object.assign(
        { raw: true },
        { attributes: projection },
        { where: condition },
        options);
      this.model.findAll(params).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  incrementOrCreate(find, values) {
    return new Promise((resolve, reject) => {
      this.findOne(find).then((result) => {
        if (result) {
          return [this.increment(result, values), false];
        }
        return [this.create(Object.assign(find, values)), true];
      }).then(([result, isCreated]) => {
        if (isCreated) {
          return resolve(this.increment(result, values));
        }
        return resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  create(values) {
    return new Promise((resolve, reject) => {
      this.create(values).then((created) => {
        resolve(created);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  increment(instance, values) {
    return new Promise((resolve, reject) => {
      instance.increment(values).then((incremented) => {
        resolve(incremented);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  findOne(condition, projection = [], options = {}) {
    return new Promise((resolve, reject) => {
      const params = Object.assign(
        { attributes: projection },
        { where: condition },
        options);
      this.model.findOne(params).then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = Sequelize;
