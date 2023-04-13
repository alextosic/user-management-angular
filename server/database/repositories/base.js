const ErrorResponse = require('../../responses/error');

class BaseRepository {
  private model;

  constructor(model) {
    this.model = model;
  }

  async find(query, options, include) {
    try {
      return this.model.find(query, null, options).populate(include);
    } catch (err) {
      throw new ErrorResponse('database', 500, 'Database error.');
    }
  }

  async findOne(query, options, include) {
    try {
      return this.model.findOne(query, null, options).populate(include);
    } catch (err) {
      throw new ErrorResponse('database', 500, 'Database error.', err.message);
    }
  }

  async create(data) {
    try {
      return this.model.create(data);
    } catch (err) {
      throw new ErrorResponse('database', 500, 'Database error.', err.message);
    }
  }

  async updateOne(query, data) {
    try {
      return this.model.updateOne(query, data);
    } catch (err) {
      throw new ErrorResponse('database', 500, 'Database error.', err.message);
    }
  }

  async deleteOne(query) {
    try {
      return this.model.deleteOne(query);
    } catch (err) {
      throw new ErrorResponse('database', 500, 'Database error.', err.message);
    }
  }
}

module.exports = BaseRepository;
