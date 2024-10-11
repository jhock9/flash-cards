const morgan = require("morgan");
const logger = require("./winston");

const stream = {
  // Use the http severity
  write: (message) => logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  // Options: in this case, I overwrote the stream and the skip logic.
  { stream, skip }
);

// Export to server.js
module.exports = morganMiddleware;
