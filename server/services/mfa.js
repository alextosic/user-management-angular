const mfaRepository = require('../database/repositories/mfa');
const twilioClient = require('../clients/twilio');

class MfaService {
  constructor(repository, client) {
    this.repository = repository;
    this.client = client;
  }

  async getAllByUser(userId) {
    return this.repository.findByUserId(userId);
  }

  async createTotp(userId, userName) {
    const totpFactor = await this.client.createTotpFactor(userId, userName);

    return this.repository.create({
      type: 'totp',
      factorSid: totpFactor.sid,
      uri: totpFactor.binding.uri,
      user: userId,
    });
  }
}

module.exports = new MfaService(mfaRepository, twilioClient);
