const redis = require("redis");

const config = require("../config/config");

const client = redis.createClient({
  port: config.REDIS_PORT,
  host: config.REDIS_HOST,
});

client.on("connect", () => {
  console.log("Client has connected to Redis...");
});

client.on("ready", () => {
  console.log("Client is now connected to Redis and ready to be used...");
});

client.on("error", (err) => {
  console.error("An error occurred with Redis:", err.message);
});

client.on("end", () => {
  console.log("Client has been disconnected from Redis.");
});

process.on("SIGINT", () => {
  client.quit();
  console.log(
    "Client has been closed and disconnected from Redis due to SIGINT."
  );
});

module.exports = client;
