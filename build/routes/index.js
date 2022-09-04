"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_route_1 = __importDefault(require("./api/users.route"));
var products_route_1 = __importDefault(require("./api/products.route"));
var routes = (0, express_1.Router)();
routes.use('/users', users_route_1.default);
routes.use('/products', products_route_1.default);
exports.default = routes;
