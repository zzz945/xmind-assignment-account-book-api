/**
 * cross中间件，为了支持跨域
 */
async function cross(ctx, next) {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, ticket');
  ctx.set('Access-Control-Allow-Method', 'POST,GET,OPTIONS');
  ctx.set('Access-Control-Expose-Headers', 'Content-Disposition, Access-Token, Uid');
  await next();
}

module.exports = cross;