const ERRNO = require('./errno')

function sendData (ctx, data) {
  ctx.body = {
    errno: ERRNO.SUCCESS,
    errmsg: 'ok',
    data,
  };
}

function handleError (ctx, e) {
  logError(ctx, {
    errno: ERRNO.GENERAL_ERROR,
    errmsg: e.message,
    name: e.name,
    stack: e.stack,
  })
  ctx.body = {
    errno: ERRNO.GENERAL_ERROR,
    errmsg: e.message,
  };
}

module.exports = {
  sendData,
  handleError,
}