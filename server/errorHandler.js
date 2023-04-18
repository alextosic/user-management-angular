const errorHandler = () => (err, req, res, next) => {
  console.dir(err);

  return res.status(err.status || 500).json({
    message: err.message,
    data: err.data,
  });
};

module.exports = errorHandler;
