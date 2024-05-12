const { defineConfig } = require('@vue/cli-service');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  devServer: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        pathRewrite: { '^/auth': '' },
      },
    },
  },
};
