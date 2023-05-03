const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  serviceSid: process.env.TWILIO_SERVICE_SID,
};
