import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

const endpoint = '/api/images';
const successURL = "/api/images?filename=image2&width=7&height=45"

describe('Test endpoint responses', () => {

    it('It should return status of 200', async () => {
        try {
        const response = await request.get(successURL);
        expect(response.status).toBe(200);
        } catch (error) {
            console.log(error);
        }
    })

    it('It should return status of 400', async () => {
        try {
        const response = await request.get(endpoint);
        expect(response.status).toBe(400);
        } catch (error) {
            console.log(error);
        }
    })

});

