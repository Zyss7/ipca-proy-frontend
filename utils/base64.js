export const toB64 = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64');

export const fromB64 = (b64) => JSON.parse(Buffer.from(b64, 'base64').toString());
