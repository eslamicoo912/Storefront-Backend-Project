"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorMiddleware = function (error, req, res) {
    var status = error.status || 500;
    var message = error.message || 'error message';
    res.status(status).json({ status: status, message: message });
};
exports.default = errorMiddleware;
