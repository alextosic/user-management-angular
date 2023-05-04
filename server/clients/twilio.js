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
      throw new ErrorResponse('twilio', 400, 'Unable to add TOTP authentication for this user.');
    }
  }

  async verifyTotpFactor(userId, factorSid, verificationCode) {
    try {
      const verifyResponse = await this.client.verify.v2.services(twilioConstants.serviceSid)
        .entities(userId)
        .factors(factorSid)
        .update({ authPayload: verificationCode });

      if (verifyResponse.status !== 'verified') {
        throw new Error();
      }

      return verifyResponse;
    } catch (err) {
      throw new ErrorResponse('twilio', 400, 'Invalid one-time password.');
    }
  }

  async validateTotpChallenge(userId, factorSid, verificationCode) {
    try {
      const validateResponse = await this.client.verify.v2.services(twilioConstants.serviceSid)
        .entities(userId)
        .challenges
        .create({
          authPayload: verificationCode,
          factorSid,
        });

      if (validateResponse.status !== 'approved') {
        throw new Error();
      }

      return validateResponse;
    } catch (err) {
      throw new ErrorResponse('twilio', 400, 'Invalid one-time password.');
    }
  }
}

module.exports = new TwilioClient(twilio(twilioConstants.accountSid, twilioConstants.authToken));
