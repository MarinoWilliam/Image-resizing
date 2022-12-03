"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("request"));
var endpoint = 'http://localhost:3000/api/images';
var successURL = "http://localhost:3000/api/images?filename=image2&width=7&height=45";
describe('api', function () {
    it('should return 200 response code', function (done) {
        request_1.default.get(successURL, { json: true, body: {} }, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });
    it('should fail to get', function (done) {
        request_1.default.get(endpoint, { json: true, body: {} }, function (error, response) {
            expect(response.statusCode).toEqual(400);
            done();
        });
    });
});
