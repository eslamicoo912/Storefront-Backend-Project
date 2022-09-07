"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var validateToken = function (req, res, next) {
    try {
        var authHead = req.headers.authorization;
        var token = authHead ? authHead.split(' ')[1] : '';
        var decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        res.locals.userData = decoded;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.validateToken = validateToken;
