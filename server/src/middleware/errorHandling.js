// errorHandling.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send({
    message: err.message || 'An unexpected error occurred'
  });
};


// Users/abiezerreyes/Projects/JewelryWebsite2/server/src/middleware/errorHandling.js