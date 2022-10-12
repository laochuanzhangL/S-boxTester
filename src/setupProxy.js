const { createProxyMiddleware } = require("http-proxy-middleware")
module.exports = (app) => {
    app.use(
        createProxyMiddleware(
            "/api", { 
            target: "http://42.192.236.76:9921/",
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/api': ''
            }
        })
    )
}

