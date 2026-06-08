const { Jimp } = require('jimp');
const jsQR = require('jsqr');

const decodeQR = async (imagePath) => {
    try{
        const image = await Jimp.read(imagePath);
        const qr = jsQR(
            image.bitmap.data,
            image.bitmap.width,
            image.bitmap.height
        );
        if(qr){
            console.log(`Decoded QR code data....`);
            return qr.data;
        }
        else{
            throw new Error('No QR code found');
        }

    }catch(error){
        console.error(`Error decoding QR code: ${error}`);
        return null;
    }
    // process.exit(0);
}

if(require.main === module){
    decodeQR('./URL QR Code.png');
}

module.exports = {
    decodeQR
}