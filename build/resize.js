"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resize = void 0;
var sharp_1 = __importDefault(require("sharp"));
var node_path_1 = __importDefault(require("node:path"));
var resize = function (filename, width, height) {
    var finalPath = node_path_1.default.join(__dirname, "/../thumb/".concat(filename, "-").concat(width, "-").concat(height, ".jpg"));
    return (0, sharp_1.default)(node_path_1.default.join(__dirname, "/../full/".concat(filename, ".jpg")))
        .resize(width, height)
        .jpeg({ mozjpeg: true })
        .toFile(finalPath)
        .then(function () {
        return finalPath;
    });
};
exports.resize = resize;
