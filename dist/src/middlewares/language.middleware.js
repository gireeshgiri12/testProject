"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageCheckUp = exports.LanguageSupport = void 0;
var LanguageSupport;
(function (LanguageSupport) {
    LanguageSupport["english"] = "en";
})(LanguageSupport = exports.LanguageSupport || (exports.LanguageSupport = {}));
function languageCheckUp(req, _res, next) {
    const language = req.headers['content-language'];
    const language_support_in_systems = [...Object.values(LanguageSupport)];
    if (language) {
        if (!language_support_in_systems.includes(language))
            req.headers['content-language'] = LanguageSupport.english;
    }
    else {
        req.headers['content-language'] = LanguageSupport.english;
    }
    next();
}
exports.languageCheckUp = languageCheckUp;
//# sourceMappingURL=language.middleware.js.map