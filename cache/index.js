const redis = require("redis");

/*  It assigns the exported object from that file to the `cacheConfig` constant, 
which can then be used to access the configuration values such as the Redis port and host. */
const cacheConfig = require("../config/cache.config");

/* The code is creating a Redis client instance. */
const cacheClient = redis.createClient({
  host: cacheConfig.HOST,
  port: cacheConfig.PORT,
});

/* The code is setting up an event listener for the "connect" event of the Redis client. */
cacheClient.on("connect", () => {
  console.log("Client has connected to Redis...");
});

/* The code sets up an event listener for the "ready" event of the Redis client. */
cacheClient.on("ready", () => {
  console.log("Client is now connected to Redis and ready to be used...");
});

/* The code sets up an event listener for the "error" event of the Redis client. */
cacheClient.on("error", (err) => {
  console.log("An error occurred with Redis:", err.message);
});

/* The code sets up an event listener for the "end" event of the Redis client. */
cacheClient.on("end", () => {
  console.log("Client has been disconnected from Redis.");
});

/* The code sets up an event listener for the "SIGINT" signal,
which is sent to a process when the user presses Ctrl+C in the terminal. */
process.on("SIGINT", () => {
  client.quit();
  console.log(
    "Client has been closed and disconnected from Redis due to SIGINT."
  );
});

module.exports = cacheClient;
