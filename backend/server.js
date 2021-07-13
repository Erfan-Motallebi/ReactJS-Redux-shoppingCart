const { createServer } = require("http");
const app = require("./app");

const server = createServer(app);

server.listen("5000", "localhost", (err) => {
  if (!err) {
    console.info("Serve at http://localhost:5000");
  } else {
    console.error(err);
  }
});
