const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
} = process.env;

assert(PORT, 'Port is required');
assert(HOST, 'Host is required');

module.exports = {
  port: PORT,
  host: HOST,
  hostUrl: HOST_URL,
  twillioAccountSid: TWILIO_ACCOUNT_SID,
  twillioAuthToken: TWILIO_AUTH_TOKEN,
};
