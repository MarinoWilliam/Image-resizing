import supertest from 'supertest';
import app from '../index';
import fs from 'fs';
import path from 'node:path';


const request = supertest(app);

const endpoint = '/api/images';
const successURL = "/api/images?filename=image2&width=70&height=45"

describe('Test endpoint responses', () => {

    it('Should return status of 200', async () => {
        try {
        const response = await request.get(successURL);
        expect(response.status).toBe(200);
        } catch (error) {
            console.log(error);
        }
    })

    it('Should return status of 400', async () => {
        try {
        const response = await request.get(endpoint);
        expect(response.status).toBe(400);
        } catch (error) {
            console.log(error);
        }
    })

    it('Should check if the file exists', async () => {
        try {
            const filePath =path.join(
                __dirname,
                `../../thumb/image2-70-45.jpg`
                );
            //if (fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
            //}
            await request.get(successURL);
            expect(fs.existsSync(filePath)).toBeTrue()
        } catch (error) {
            console.log(error);
        }
    })

});

