import { Express } from "express"; // 타입 정의 불러오기
const { createProxyMiddleware } = require("http-proxy-middleware");


module.exports = (app: Express) => {
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
