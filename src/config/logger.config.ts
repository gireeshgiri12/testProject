import { version, name } from './../../package.json';
// import { getLogger } from 'node-aop';
import { hostname } from 'os';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

// export const logger = getLogger(hostname(), name, version, 'debug');
