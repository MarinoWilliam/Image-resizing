import express, { Request } from 'express';
const router = express.Router();
import sharp from 'sharp';
import path from 'node:path';
import fs from 'fs';

const getquery = (
    req: Request
): { filename: string; width: number; height: number } => {
    const { filename, width, height } = req.query;
    const stringFilename = filename as string;
    const widthNumber = parseInt(width as string);
    const heightNumber = parseInt(height as string);
    return {
        filename: stringFilename,
        width: widthNumber,
        height: heightNumber,
    };
};

const resize = (
    filename: string,
    width: number,
    height: number
): Promise<string> => {
    const finalPath = path.join(
        __dirname,
        '/..',
        `/../thumb/${filename}${width}${height}.jpg`
    );
    return sharp(path.join(__dirname, '/..', `/../full/${filename}.jpg`))
        .resize(width, height)
        .jpeg({ mozjpeg: true })
        .toFile(finalPath)
        .then(() => {
            console.log('done');
            return finalPath;
        });
};
router.get('/images', async (req, res) => {
    const { filename, width, height } = getquery(req);
    const finalPath = path.join(
        __dirname,
        '/..',
        `/../thumb/${filename}${width}${height}.jpg`
    );
    if (!fs.existsSync(finalPath)) {
        console.log('Directory does not exist!');
        await resize(filename, width, height);
    }
    console.log(finalPath);
    const img = fs.readFileSync(finalPath);
    res.writeHead(200);
    res.end(img, 'binary');
});

export default router;
