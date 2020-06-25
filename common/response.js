function sendData (ctx, data) {
  ctx.body = {
    errno: 0,
    errmsg: 'ok',
    data,
  };
}

module.exports = {
  sendData
}