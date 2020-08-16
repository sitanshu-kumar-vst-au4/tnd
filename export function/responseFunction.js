const sendReponse = (status, msg, data) => {
  return json({
    status,
    msg,
    data,
  });
};

module.exports = sendReponse;
