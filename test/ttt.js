import { v4 as uuidv4 } from 'uuid';
import base64url from 'base64url'
import { customAlphabet } from 'nanoid'

function generateShortUUID() {
  const uuid = uuidv4(); // 生成UUID v4
  const encodedUUID = base64url(uuid); // 使用Base64编码UUID
  return encodedUUID;
}

// 生成短UUID并打印
const shortUUID = generateShortUUID();
console.log('短UUID:', shortUUID);





function genShortUUID(length = 8) {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const nanoid = customAlphabet(alphabet, length);
  return nanoid();
}

// 生成更短的UUID并打印（长度为8）
const shortUUID2 = genShortUUID();
console.log('更短的UUID:', shortUUID2);