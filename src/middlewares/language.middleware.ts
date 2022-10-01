/*
 * File: laguage.middleware.ts
 * Project: 
 * File Created: Friday, 8th May 2020 2:22:22 pm
 * Author: Mailari (mailari.hulihond@altorumleren.com)
 * -----
 * Last Modified: Friday, 8th May 2020 2:23:38 pm
 * Modified By: al032 (you@you.you>)
 * -----
 * Copyright 2017 - 2020 Your Company, Altorum Leren
 */

import { Request, Response, NextFunction } from 'express';

export enum LanguageSupport {
  english = 'en'
}

export function languageCheckUp(req: Request, _res: Response, next: NextFunction) {
  const language = req.headers['content-language'];
  const language_support_in_systems: string[] = [...Object.values(LanguageSupport)];
  if (language) {
    if (!language_support_in_systems.includes(language)) req.headers['content-language'] = LanguageSupport.english;
  } else {
    req.headers['content-language'] = LanguageSupport.english;
  }
  next();
}
