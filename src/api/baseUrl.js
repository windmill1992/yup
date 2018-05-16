
let base = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7080': "http://192.168.1.200:7080";

export const baseUrl = base;