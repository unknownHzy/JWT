/**
 * 场景假设：
 * 用户登陆web网站，验证了用户名跟密码，登陆后根据用户的userId，生成一个session jwt，返回给前端。
 * 后续客户端发起访问的时候将这个token放在请求头的Authorization上，给网关进行验证签名。(token的secret是在配置中心配好的)
 * 那每个token都有有效期，要是快过期了怎么处理？
 *
 */
const jwt = require('jsonwebtoken');
const secret = '123456';
const options = {
  audience: 'joy', //假设是我发的，我要接收这个jwt
  jwtid: 'uuid', //一次性的token，防止重放攻击，加盐？
  subject: 'website users', // jwt所面向的用户
  issuer: '特朗普不靠谱',
  noTimestamp: false, // 将会自动生成一个jwt签发时间iat
  expiresIn: '10s', // 10s后过期token过期
  header: {
    alg: 'HS256',
    typ: 'JWT',
  }
};

/**
 * 生成token，这里生成了一个10s有效的jwt
 * @type {undefined|*}
 */
const token = jwt.sign({}, secret, options);
console.log(token);

/**
 * 验证token
 */
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg2MzEwNjcsImV4cCI6MTU3ODY0MTA2NywiYXVkIjoiam95IiwiaXNzIjoi54m55pyX5pmu5LiN6Z2g6LCxIiwic3ViIjoid2Vic2l0ZSB1c2VycyIsImp0aSI6InV1aWQifQ.3NCLDy5c7lNnRKAS8sDd_qiUA7lUSn32oUmh0liKnPE
const result = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg2MzQ1NTEsImV4cCI6MTU3ODYzNDU2MSwiYXVkIjoiam95IiwiaXNzIjoi54m55pyX5pmu5LiN6Z2g6LCxIiwic3ViIjoid2Vic2l0ZSB1c2VycyIsImp0aSI6InV1aWQifQ.tIk-wCgCVrI1P7Vrt-7LHZZTFY7OBOQ9te26iwcjWtU', secret);
console.log(result);
/*
{ iat: 1578631067,
  exp: 1578641067,
  aud: 'joy',
  iss: '特朗普不靠谱',
  sub: 'website users',
  jti: 'uuid' }*/
