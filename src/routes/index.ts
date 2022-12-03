import express, { Request } from 'express';
const router = express.Router();
import path from 'node:path';
import fs from 'fs';
import {resize} from '../resize';

const getquery = (
    req: Request
): { filename: string; width: number; height: number } => {
    const { filename, width, height } = req.query;
    if (typeof(filename)==='undefined') {
        throw 'no file name' 
    }
    if (typeof(width)==='undefined') {
        throw 'no width'
    }
    if (typeof(height)==='undefined') {
        throw 'no height'
    }
    if (isNaN(parseInt(width as string))) {
        throw 'Width should be a number';
    }
    if (isNaN(parseInt(height as string))) {
        throw 'Height should be a number';
    }
    const stringFilename = filename as string;
    const widthNumber = parseInt(width as string);
    const heightNumber = parseInt(height as string);
    if (widthNumber <= 0) {
        throw 'Width should be bigger than zero';
    }
    if (heightNumber <= 0) {
        throw 'Height should be bigger than zero';
    }
    if ((width as string).length != widthNumber.toString().length) {
        throw 'Width should be a number';
    }
    if ((height as string).length != heightNumber.toString().length) {
        throw 'Height should be a number';
    }
    return {
        filename: stringFilename,
        width: widthNumber,
        height: heightNumber,
    };
};

router.get(
    '/images',
    async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            const { filename, width, height } = getquery(req);

            const originalPath = path.join(
                __dirname,
                '/..',
                `/../full/${filename}.jpg`
            );
            const thumb =path.join(
                __dirname,
                '/..',
                `/../thumb`
                );
            if (!fs.existsSync(thumb)) {
                fs.mkdirSync(thumb);
            }
            if (!fs.existsSync(originalPath)) {
                throw 'There is no image with this name';
            }

            const finalPath = path.join(
                __dirname,
                '/..',
                `/../thumb/${filename}-${width}-${height}.jpg`
            );
            if (!fs.existsSync(finalPath)) {
                await resize(filename, width, height);
            }
            const img = fs.readFileSync(finalPath);
            res.writeHead(200);
            res.end(img, 'binary');
        } catch (err) {
            next(err);
        }
    }
);

router.use(
    async (
        err: express.ErrorRequestHandler,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        res.status(400)
        res.send(err);
    }
);
export default router;
