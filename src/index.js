const { Sequelize } = require('sequelize');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

let server;
const sequelize = new Sequelize({
  dialect: 'postgres',
  dialectOptions: {
    ssl: config.env === 'production', // Enable SSL in production
  },
  host: config.sequelize.host,
  port: config.sequelize.port,
  database: config.sequelize.database,
  username: config.sequelize.user,
  password: config.sequelize.password,
});

sequelize
  .authenticate()
  .then(async () => {
    logger.info('Connected to PostgreSQL');
    await sequelize.sync();
    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
    process.on('SIGINT', () => {
      server.close(() => {
        logger.info('Server closed');
        sequelize
          .close()
          .then(() => {
            logger.info('PostgreSQL connection closed');
            process.exit(0);
          })
          .catch((err) => {
            logger.error('Error closing PostgreSQL connection:', err);
            process.exit(1);
          });
      });
    });
  })
  .catch((err) => {
    logger.error('Error connecting to PostgreSQL:', err);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
