const crypto = require('crypto');

const password = 'Ali787898$';
const key = crypto.createHash('sha256').update('Ali787898$').digest();
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
let encrypted = cipher.update(password, 'utf8', 'base64');
encrypted += cipher.final('base64');

const encryptedMessage = iv.toString('base64') + ':' + encrypted;

console.log('Encrypted Message:', encryptedMessage);
