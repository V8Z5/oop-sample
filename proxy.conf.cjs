/**
 * @summary Forwards same-origin requests to the assignment's exact HTTP API.
 * @author Marlon Packard Viza Quispe
 */
module.exports = {
  '/api/universities/**': {
    target: 'http://universities.hipolabs.com',
    changeOrigin: true,
    pathRewrite: { '^/api/universities': '' },
    proxyTimeout: 20000,
    timeout: 25000,
  },
};
