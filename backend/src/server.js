const env = require("./config/env");

const app = require("./app");

const PORT = env.port || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`LookAtLocal API running on port ${PORT}`);
});

module.exports = server;