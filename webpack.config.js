function buildConfig(env) {
  return require('./build/' + env + '.js');
}

module.exports = buildConfig;