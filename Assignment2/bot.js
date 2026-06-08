require('dotenv').config();
const fs = require('fs');
const os = require('os');
const path = require('path');
const { decodeQR } = require('./qr');
const { markPresent, getStats , generateCSV } = require('./attendance');
const { isRegistered, extractRollNumber } = require('./parser');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Welcome to the Attendance Bot! Please send a QR code image to mark your attendance.');
});

bot.on('photo', async (msg) => {
    try {
        const photo = msg.photo[msg.photo.length - 1];
        const fileId = photo.file_id;
        let imagePath;
        const dimagePath = path.join('./temp', fileId);
        if (!fs.existsSync(dimagePath)) {
            fs.mkdirSync(dimagePath, { recursive: true });
        }

        try{
            imagePath = await bot.downloadFile(
                fileId,
                dimagePath
            );
        }catch(error){
            throw new Error('Failed to download image from Telegram.');
        }

        const qrString = await decodeQR(imagePath);
        // console.log(`Decoded QR string: ${qrString}`);
        const rollNumber = extractRollNumber(qrString);
        // console.log(`Extracted roll number: ${rollNumber}`);

        if (!rollNumber) {
            return bot.sendMessage(
                msg.chat.id,
                'Roll number not found in the QR code. Please ensure you are scanning the correct QR code.'
            );
        }

        if (!isRegistered(rollNumber)) {
            return bot.sendMessage(
                msg.chat.id,
                `Roll number ${rollNumber} is not registered.`
            );
        }

        const result = markPresent(rollNumber);

        if (result.success) {
            bot.sendMessage(
                msg.chat.id,
                `Attendance marked for ${rollNumber}.`
            );
        } else {
            bot.sendMessage(
                msg.chat.id,
                `Already marked at ${result.timestamp}.`
            );
        }

    } catch (error) {
        console.error(error);

        bot.sendMessage(
            msg.chat.id,
            `Failed to process QR code.\nReason : ${error.message}`
        );
    }
});

bot.onText(/\/stats/, (msg) => {
    const stats = getStats();
    const message = `Total students present: ${stats.total}\nRoll numbers: ${stats.rollNumbers.join(', ')}`;
    bot.sendMessage(msg.chat.id, message);
});

bot.onText(/\/export/,async (msg)=>{
    const csvContent = generateCSV();
    fs.writeFileSync('./attendance.csv', csvContent);
    await bot.sendDocument(
        msg.chat.id,
        './attendance.csv',
        { caption: 'Attendance Data' }
    );
});

bot.onText(/\/special/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        'Open video:',
        {
            reply_markup: {
                inline_keyboard: [[
                    {
                        text: '▶ Open',
                        url: 'https://youtu.be/QDia3e12czc?si=sNxkIhmeKI3mPS6K'
                    }
                ]]
            }
        }
    );
});

