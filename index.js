function Dribbble(config) {
  this.config = config;
}

Dribbble.prototype.authenticate = function(info) {
  if (info.type !== 'oauth') {
    throw new Error('type should be "oauth"');
  }
  this.token = info.token;

  return this;
};

require('./resources/buckets').patch(Dribbble);

module.exports = Dribbble;
