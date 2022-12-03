import sharp from 'sharp';
import path from 'node:path';


export const resize = (
    filename: string,
    width: number,
    height: number
): Promise<string> => {
    const finalPath = path.join(
        __dirname,
        `/../thumb/${filename}-${width}-${height}.jpg`
    );
    return sharp(path.join(__dirname, `/../full/${filename}.jpg`))
        .resize(width, height)
        .jpeg({ mozjpeg: true })
        .toFile(finalPath)
        .then(() => {
            return finalPath;
        });
};


