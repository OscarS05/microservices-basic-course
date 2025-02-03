// Description: This file contains the configuration without .env only by the course.
module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3001,
    },
    post: {
        port: process.env.POST_PORT || 3003,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQLHOST || 'localhost',
        user: process.env.MYSQLUSER || 'user',
        password: process.env.MYSQLPASSWORD || 'user_password',
        database: process.env.MYSQLDATABASE || 'my_database',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3002,
    },
    cacheService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3004,
    },
    redis: {
        host: process.env.REDIS_HOST || 'redis-15212.c325.us-east-1-4.ec2.redns.redis-cloud.com',
        port: process.env.REDIS_PORT || '15212',
        password: process.env.REDIS_PASS || '0yWFf23C7dVmj7xMdovYc0sFGlROUhlL',
    }
};