const checkEnvVars = (envVars) => {
  Object.entries(envVars).forEach(([key, value]) => {
    if (!value) {
      throw new Error(`Environment variable: ${key} not set. Exiting...`);
    }
  });
};

module.exports = {
  checkEnvVars,
};
