const winston = require('winston');

// Define your severity levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

// This method set the current severity based on the current NODE_ENV 
const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'info'
}

// Define different colors for each level.
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

// Link colors defined above to the severity levels.
winston.addColors(colors)

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss:ms A' }),
  winston.format.colorize({ all: true }),
  winston.format.errors({ stack: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)

// Define which transports the logger must use to print out messages.
const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: './logs/error.log', level: 'error', }),
  new winston.transports.File({ filename: './logs/all.log' }),
]

// Create the logger instance that has to be exported and used to log messages.
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

module.exports = logger
