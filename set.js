const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEUzRmdIZDhoNmxZTDZTNis5RHpRN2xQakRxWnkvYlIwbkQyN3VNdmwzWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTXZEVXJUSHdaNmNINS9XV2ttMU1xSzUzZytyNko1akUvZExBalRxVXEzZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrQkJOeHZhRTd1UHVjeXdiOFRBaWN6M3I5NWllcnU2ZkdsQXB2ekNRczJNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2bXNkQkFRNG03eldWOU1EOFY2RjB4akJVT0cvc2RhS09vaVRlNElsU2lVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVQMmNNRXY2VGNaL1plS1JjLzRNSytkdVVhY0pHVFNFTFlJd01XNUwybE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRBTHVGZlduOGdNdUtQOTRoeGZJS2RWbmY4ZHBIYVYvU1NoaGl0Qi9DbHM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibVBPYllWUkhMeW5ZclkrN1BYK1ZteHA1aE1yL0xMS3MyMkJSajNtZXlWUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQTZMWEZoNVZBQ0hQQUN1RGdqeDViSFNRMmZWVU1vNGF4OStCK1RDL2ZsZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5yaE1NRWdaN0xIeDRhVElBcHlZbFljMEd3eWRmYUtDcm00Yk0wcXoxdkVvOWNJcEZRZlBMS2toMFA0NUJNVU5VR0NhZUVPcE92a0xlenlQWTRTMWhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzAsImFkdlNlY3JldEtleSI6IkZibFJHMm1hcm9vQ0U2Ulk3b3pPd2lCTEQwOTV6QlZQK0J2SlRZT1JaVWc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODA4NTYxMjM3MEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwN0NFRUZEODFEQkE2OEVGREFBMkNDQUQ5Qjk3NDk3QyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxNjI2OTY2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ4MDg1NjEyMzcwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjZGMjYwRjFCMzkxMjRERjY5NjdCODExNzczQzQwOEFBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTE2MjY5NzR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgwODU2MTIzNzBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNTRENUI0NDE0MThDRDU3MTJGOUY3N0U0RUQ1MkRBMjMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MTYyNjk3Nn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiMTIzTE9UVVMiLCJtZSI6eyJpZCI6IjIzNDgwODU2MTIzNzA6MjNAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyMzY1Mjk4ODkxOTk5NDoyM0BsaWQiLCJuYW1lIjoiUmF5c2NhciAyLjAifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01uM3VZOENFTHJwbnNNR0dBb2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImR3WkVGZU9kNmxUemh3MS91V3h6ZEYxT01XMjh1aUNaSHJFNSs2alBheGc9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ii80czdLWDZxaUhWTThEOXl5RzE3U3JvTXNPS0QvQjA0dnpiUzZoQ0hKcEY1MFRIbC81NytjSmxVWjNFcXRlRmZ1SS9zeGdqamZFb09CMUxlWm9KaUFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ2R0Y3Q3NqOGhzY1NScTQzU0FaSWFzeGdJVDJYcWxGUGNBM09JVGdGT1ZLSHZsa3pEUkRvakd5cFhYVlErbmtTQ3dzV2J6amF5Vkl3bVFTTlBJd3RpZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwODU2MTIzNzA6MjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWGNHUkJYam5lcFU4NGNOZjdsc2MzUmRUakZ0dkxvZ21SNnhPZnVvejJzWSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUxNjI2OTUxLCJsYXN0UHJvcEhhc2giOiJubTNCYiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQjlXIn0=',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "Rayscar",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2348085612370",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/p6uxq0.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
