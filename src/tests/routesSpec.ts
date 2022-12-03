import request from 'request';

const endpoint = 'http://localhost:3000/api/images';
const successURL = "http://localhost:3000/api/images?filename=image2&width=7&height=45"
describe('api', function () {
    it('should return 200 response code', function (done) {
        request.get(successURL, {json: true, body: {}}, function (error:Error, response:request.Response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('should fail to get', function (done) {
        request.get(endpoint, {json: true, body: {}}, function (error:Error, response:request.Response) {
            expect(response.statusCode).toEqual(400);
            done();
        });
    });
});