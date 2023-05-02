const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware(["/api"], {
      target: "http://ws.bus.go.kr",
      changeOrigin: true,
      //   ws: true,
      //   router: {
      //     "": "",
      //   },
    })
  );
};
