const env = require('./config/env')

const app = require("./app");

const PORT = env.port || 5000;

const server = app.listen(PORT, () => {
  console.log(`LookAtLocal API running on http://localhost:${PORT}`);
});

module.exports = server;
