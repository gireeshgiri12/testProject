import express from 'express';
import { App } from './app';
import { handleExceptions } from 'exception-handler';

import dotenv from 'dotenv';
import { logger } from './config/logger.config';
dotenv.config({ path: '.env' });

const appInstance: App = new App();

appInstance
  .databaseConnection()
  .then(() => {
    const app: express.Application = appInstance.app;

    // Setting up the port for the server
    const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    app.use(handleExceptions); // Exception Handling middleware

    // Firing up the server
    app.listen(port, () => {
      logger.info(`Server is running ❤️ at localhost :${port}`);
    });
  })
  .catch((error) => {
    logger.error(error);
  });
