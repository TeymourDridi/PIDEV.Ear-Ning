module.exports = (app) => {
  app.use((_, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "*");
    res.setHeader("Cross-Origin-Embedder-Policy", "*");
    next();
  });
};
