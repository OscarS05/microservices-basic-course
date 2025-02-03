module.exports = {
  apps : 
  [
    {
      name   : "MAIN INDEX",
      script : "./api/index.js",
      watch: true,
      ignore_watch: ["node_modules", "logs"],
    },
    { 
      name   : "MYSQL-API",
      script : "./mysql/index.js",
      watch: true,
      ignore_watch: ["node_modules", "logs"],
    },
    {
      name   : "POST-API",
      script : "./post/index.js",
      watch: true,
      ignore_watch: ["node_modules", "logs"],
    },
    {
      name   : "CACHE-API",
      script : "./cache/index.js",
      watch: true,
      ignore_watch: ["node_modules", "logs"],
    }
  ]
}
