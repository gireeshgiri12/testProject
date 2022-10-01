import { NextFunction, Request, Response } from 'express';
import os from 'os';
export class GeneralController {
  public static async getHealthInfo(_req: Request, res: Response, _next: NextFunction) {
    try {
    // comment
      res.json({
        status: 'Server is running',
        version: process.env.npm_package_version,
        hostname: os.hostname() ? os.hostname() : 'Not correctly readable hostname',
        name: 'Payment Microservice'
      });
    } catch (error) {
      res.status(500).json();
    }
  }
}
