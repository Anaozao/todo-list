"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapStatusHTTP = exports.http = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
exports.http = {
    BAD_REQUEST: 400,
    SUCCESSFUL: 200,
    CREATED: 201,
    UNAUTHORIZED: 401,
    INVALID_VALUE: 409,
    NOT_FOUND: 404,
};
const mapStatusHTTP = (status) => exports.http[status] || 500;
exports.mapStatusHTTP = mapStatusHTTP;
//# sourceMappingURL=mapStatusHTTP.js.map