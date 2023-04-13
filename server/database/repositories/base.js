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
      throw new ErrorResponse({
        type: 'database',
        status: 500,
        message: 'Database error.',
      });
    }
  }

  async findOne(query, options, include) {
    try {
      return this.model.findOne(query, null, options).populate(include);
    } catch (err) {
      throw new ErrorResponse({
        type: 'database',
        status: 500,
        message: 'Database error.',
      });
    }
  }

  async updateOne(query, data) {
    try {
      return this.model.updateOne(query, data);
    } catch (err) {
      throw new ErrorResponse({
        type: 'database',
        status: 500,
        message: 'Database error.',
      });
    }
  }

  async deleteOne(query) {
    try {
      return this.model.deleteOne(query);
    } catch (err) {
      throw new ErrorResponse({
        type: 'database',
        status: 500,
        message: 'Database error.',
      });
    }
  }
}

module.exports = BaseRepository;
