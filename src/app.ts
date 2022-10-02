/*
 * File: app.ts
 * Project: src
 * File Created: Tuesday, 24th December 2019 12:26:05 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Wednesday, 26th February 2020 5:27:42 pm
 * Modified By: Adithya Sreyaj<adithya@altorumleren.com>
 * -----
 */

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import { connect } from 'mongoose';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
// import { logger } from './config/logger.config';
// import { LoggerStream, requestLogger } from 'node-aop';
import { languageCheckUp } from './middlewares/language.middleware';
import { GeneralController } from './api/controllers/health.controller';
import { verifyRequestHeader } from './middlewares/request.middleware';
import { EmployeeRoutes } from './api/routes/employee.routes'
import { EmployeeDetailsRoutes } from './api/routes/employeeDetails.routes'

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.configureServer();
    // logger.info('creating app instance');
    this.app.route('/payment/api/v1/health').get(GeneralController.getHealthInfo);
    this.app.use('/emp/api/v1/', EmployeeRoutes.register());
    this.app.use('/emp/api/v1/', EmployeeDetailsRoutes.register());
  }

  // Configure the server options
  private configureServer() {
    this.app.use(compression(), helmet(), cors(), languageCheckUp, verifyRequestHeader, json({ limit: '50mb' }), urlencoded({ extended: false }), cookieParser());
    this.app.use(
      morgan(
        'Input Request:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" req-Id: :req[x-requested-with] :status :res[content-length] ":referrer" ":user-agent"',
        {
          // stream: new LoggerStream("error"),
          skip: (req: express.Request, _res: express.Response) => {
            return req.url.includes('metrics');
          }
        }
      )
    );
  }

  async databaseConnection() {
    try {
      await connect(process.env.MONGODB_URI, {});
      // logger.debug('Database connection successful');
      console.log("Database connection successful")
    } catch (error) {
      // logger.error(error.message);
      process.exit();
    }
  }
}
