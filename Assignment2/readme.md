# QR Code Attendance System

A Telegram bot that automates attendance tracking using QR codes on IIT Kanpur ID cards.

The bot accepts a photo of a student's ID card, decodes the QR code, extracts the roll number, verifies that it belongs to the registered range, and records attendance. Duplicate attendance entries are detected automatically. Attendance data is stored locally and can be viewed or exported through bot commands.

## Features

* QR code scanning from uploaded images
* Automatic roll number extraction
* Roll number validation
* Attendance recording with timestamps
* Duplicate attendance detection
* Attendance report generation
* CSV export of attendance records

## Tech Stack

* Node.js
* Telegram Bot API
* Jimp
* jsQR
* dotenv

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Create a file named `.env` in the project root and add:

```env
BOT_TOKEN=your_telegram_bot_token
```

### 4. Obtain a Telegram Bot Token

1. Open Telegram.
2. Search for **@BotFather**.
3. Run `/newbot`.
4. Follow the instructions to create a bot.
5. Copy the generated token into your `.env` file.

### 5. Start the bot

```bash
node bot.js
```

## Commands

| Command   | Description                      |
| --------- | -------------------------------- |
| `/start`  | Display welcome message          |
| `/report` | Show attendance statistics       |
| `/export` | Export attendance records as CSV |

## Data Storage

Attendance records are stored locally in a JSON file. Generated attendance reports can also be exported as CSV files.

## Notes

The following files are intentionally excluded from version control:

```gitignore
node_modules/
.env
attendance.json
attendance.csv
```

This prevents sensitive credentials and generated attendance data from being uploaded to the repository.
