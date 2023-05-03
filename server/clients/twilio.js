const twilio = require('twilio');

const twilioConstants = require('../constants/twilio');
const ErrorResponse = require('../responses/error');

class TwilioClient {
  constructor(client) {
    this.client = client;
  }

  async createTotpFactor(userId, userName) {
    try {
      return this.client.verify.v2.services(twilioConstants.serviceSid)
        .entities(userId)
        .newFactors
        .create({
          friendlyName: userName,
          factorType: 'totp',
        });
    } catch (err) {
      throw new ErrorResponse('twilio', 400, 'Unable to create TOTP configuration for the user.');
    }
  }

  async verifyTotpFactor(userId, factorSid, token) {
    try {
      return this.client.verify.v2.services(twilioConstants.serviceSid)
        .entities(userId)
        .factors(factorSid)
        .update({ authPayload: token });
    } catch (err) {
      throw new ErrorResponse('twilio', 400, 'Unable to verify TOTP configuration for the user.');
    }
  }

  async validateTotpChallenge(userId, factorSid, token) {
    try {
      return this.client.verify.v2.services(twilioConstants.serviceSid)
        .entities(userId)
        .challenges
        .create({
          authPayload: token,
          factorSid,
        });
    } catch (err) {
      throw new ErrorResponse('twilio', 401, 'Invalid one-time password.');
    }
  }
}

module.exports = new TwilioClient(twilio(twilioConstants.accountSid, twilioConstants.authToken));
