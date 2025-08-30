const validator = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      const message = error.details[0].message;
      const path = error.details[0].path;

      return res.status(422).json({
        success: false,
        error: {
          message,
          path,
        },
      });
    }

    next();
  };
};

export default validator;
