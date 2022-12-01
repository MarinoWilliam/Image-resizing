import express, { Request } from 'express';
const router = express.Router();
import sharp from 'sharp';
import path from 'node:path';
import fs from 'fs';

const getquery = (
    req: Request
): { filename: string; width: number; height: number } => {
    const { filename, width, height } = req.query;
    if( isNaN(parseInt(width as string))){
        throw 'Width should be a number'
    }
    console.log(height)
    if( isNaN(parseInt(height as string))){
        throw 'Height should be a number'
    }
    const stringFilename = filename as string;
    const widthNumber = parseInt(width as string);
    const heightNumber = parseInt(height as string);
    if(widthNumber<=0){
        throw 'Width should be bigger than zero'
    }
    if(heightNumber<=0){
        throw 'Height should be bigger than zero'
    }
    if ((width as string).length!=(widthNumber.toString()).length){
        throw 'Width should be a number'
    }
    if ((height as string).length!=(heightNumber.toString()).length){
        throw 'Height should be a number'
    }
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
            return finalPath;
        });
};

router.get('/images', async (req:express.Request, res:express.Response ,next:express.NextFunction):Promise<void> => {
    try {
    const { filename, width, height } = getquery(req);
    
    const originalPath=path.join(
        __dirname,
        '/..',
        `/../full/${filename}.jpg`
    );
    if (!fs.existsSync(originalPath)) {
        throw 'There is no image with this name'
    }

    const finalPath = path.join(
        __dirname,
        '/..',
        `/../thumb/${filename}${width}${height}.jpg`
    );
    if (!fs.existsSync(finalPath)) {
        await resize(filename, width, height);
    }
    console.log(finalPath);
    const img = fs.readFileSync(finalPath);
    res.writeHead(200);
    res.end(img, 'binary');
    } catch (err) {
        next(err)
    }
    
});

router.use(async (err:express.ErrorRequestHandler,req:express.Request, res:express.Response ,next:express.NextFunction)=>{
    res.send(err)
})
export default router;
