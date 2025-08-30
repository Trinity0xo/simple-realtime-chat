import utils from "../lib/utils.js";

const errorMiddleware = (error, req, res, next) => {
  const status = typeof error.statusCode == "number" ? error.statusCode : 500;
  const message = error.message ? error.message : "internal server error";

  if (status === 422 && req.file && req.file.filename) {
    utils.deleteFile(req.file.filename);
  } else if (status === 422 && req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      if (file.filename) {
        utils.deleteFile(file.filename);
      }
    });
  }

  res.status(status).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
