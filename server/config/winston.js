const winston = require('winston');

// Define your severity levels
const levels = {
  error: 0,
  warn: 1,
  debug: 2,
  info: 3,
  http: 4,
}

// This method set the current severity based on the current NODE_ENV 
const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'http' : 'debug' 
}

// Define different colors for each level.
const colors = {
  error: 'red',
  warn: 'yellow',
  debug: 'magenta',
  info: 'green',
  http: 'cyan',
}

// Link colors defined above to the severity levels.
winston.addColors(colors)

// Chose the aspect of your log customizing the log format.
const { combine, timestamp, errors, prettyPrint, printf, colorize } = winston.format;

const format = combine(
  timestamp({ format: 'YYYY-MM-DD hh:mm:ss:ms A' }),
  errors({ stack: true }),
  prettyPrint(),
  printf((info) => {
    const { timestamp, level, message, stack } = info;
    const stackParts = stack ? stack.split('\n') : [];
    const fileAndLine = stackParts[1] ? stackParts[1].trim() : '';
    
    return `[${timestamp}] [${level.toUpperCase()}]: ${message} ${fileAndLine}`;
  }),
  colorize({ all: true }),
);

// Define which transports the logger must use to print out messages.
const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: './logs/error.log', level: 'error', }),
  new winston.transports.File({ filename: './logs/debug.log', level: 'debug', }),
  new winston.transports.File({ filename: './logs/all.log' }),
]

// Create the logger instance that has to be exported and used to log messages.
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

// Export to server.js, morgan.js, googleConfig.js, photoController.js, authRoutes.js, googlePhotosAPI.js, googleAuthRoutes.js, and photoDBRoutes.js
module.exports = logger;
