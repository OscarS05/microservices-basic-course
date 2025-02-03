const { createClient } = require('redis');
const config = require('../config');

const client = createClient({
    username: 'default',
    password: config.redis.password,
    socket: {
        host: config.redis.host,
        port: config.redis.port
    }
});

client.on('error', err => console.log('Redis Client Error', err));

(async () => {
    try {
        await client.connect();
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
})();

async function list(table) {
    const value = await client.get(table);
    return JSON.parse(value);
}

async function get(table, id) {
    return list(table + '_' + id);
}

async function upsert(table, data) {
    let key = table;
    if (data && data.id) {
      key += '_' + data.id;
    }
    await client.set(key, JSON.stringify(data), { EX: 10 });
    return true;
}

module.exports = { list, get, upsert }