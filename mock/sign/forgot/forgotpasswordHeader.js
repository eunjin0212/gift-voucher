const email = JSON.parse(request.body).email;
const formatEmail =
/^([0-9a-z!#$%&'*\\+\-/=?^_`{|}~]+(?:\.[0-9a-z!#$%&'*\\+\-/=?^_`{|}~]+)*)@([0-9a-z]+(?:-[0-9a-z]+)*(?:\.[0-9a-z]+)*)$/.test(
  email
);

module.exports = 
    formatEmail
      ? 'HTTP/1.1 200 OK'
      : 'HTTP/1.1 401 Unauthorized';
