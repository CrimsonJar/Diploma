const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("running!");
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:7070",
      changeOrigin: true,
    })
  );
};
