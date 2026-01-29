const crypto = require('crypto');

const encryptedMessage = '2ZfSO2LkHxWkPHKtVaYt2Q==:Tw5ZS1Z5V94W1/3x5itOjw==';
const [ivBase64, encryptedBase64] = encryptedMessage.split(':');
const key = crypto.createHash('sha256').update('Ali787898$').digest();

const iv = Buffer.from(ivBase64, 'base64');
const encrypted = Buffer.from(encryptedBase64, 'base64');

const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
let decrypted = decipher.update(encrypted, undefined, 'utf8');
decrypted += decipher.final('utf8');

console.log('Decrypted Password:', decrypted);
