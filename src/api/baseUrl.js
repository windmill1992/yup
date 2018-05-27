
let base = process.env.NODE_ENV === 'development' ? '/api': "http://192.168.1.200:7080";

export const baseUrl = base;