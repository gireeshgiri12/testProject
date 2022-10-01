/*
 * File: database.ts
 * Project:
 * descriptions: ....
 * File Created: Thursday, 30th January 2020 4:58:32 pm
 * Author: Kunal Adhikari (kunal.adhikari@altorumleren.com)
 * -----
 * Last Modified: Thursday, 7th May 2020 9:43:32 am
 * Modified By: Mohammad Asif sk<mohammad.asif@altorumleren.com>
 * -----
 * Copyright 2019 - 2020 altorum leren, Altorum leren pvt ltd
 */
import Redis from 'ioredis';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const db = new Redis({
  host: process.env.REDIS_HOST,
  db: parseInt(process.env.REDIS_DB as string),
  port: parseInt(process.env.REDIS_PORT as string)
});
