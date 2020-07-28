const winston = require('winston');

const levelDetails = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
};

// Logger configuration
const logConfiguration = {
  levels: levelDetails,
  transports: [
    new winston.transports.Console(),

    new winston.transports.File({
      level: 'info',
      filename: './logs/info.log'
    }),

    new winston.transports.File({
      level: 'warn',
      filename: './logs/warning.log'
    }),

    new winston.transports.File({
      level: 'error',
      filename: './logs/error.log'
    })
  ]
};

// Create the logger
const logger = winston.createLogger(logConfiguration);

module.exports = logger;
