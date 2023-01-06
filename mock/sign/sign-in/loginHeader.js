const admin = {
  loginId: "share",
  loginPwd: "asdfasdf",
};

module.exports =
  JSON.parse(request.body).loginId === admin.loginId &&
  JSON.parse(request.body).loginPwd === admin.loginPwd
    ? "HTTP/1.1 200 OK"
    : "HTTP/1.1 401 Unauthorized";
