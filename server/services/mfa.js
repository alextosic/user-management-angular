const mfaRepository = require('../database/repositories/mfa');
const twilioClient = require('../clients/twilio');

class MfaService {
  constructor(repository, client) {
    this.repository = repository;
    this.client = client;
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

  async verifyTotp(totpId, userId, factorSid, verificationCode) {
    await this.client.verifyTotpFactor(userId, factorSid, verificationCode);
    return this.repository.updateById(totpId, { verified: true });
  }

  async validateTotpChallenge(userId, factorSid, verificationCode) {
    return this.client.validateTotpChallenge(userId, factorSid, verificationCode);
  }

  async removeMfa(mfaId) {
    return this.repository.deleteById(mfaId);
  }
}

module.exports = new MfaService(mfaRepository, twilioClient);
