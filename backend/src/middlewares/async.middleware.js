const asyncMiddleware = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res);
    } catch (error) {
      next(error);
    }
  };

  // return (req, res, next) => {
  //   Promise.resolve(fn(req, res)).catch((error) => {
  //     next(error);
  //   });
  // };
};

export default asyncMiddleware;
