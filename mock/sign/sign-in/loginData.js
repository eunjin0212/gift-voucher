const admin = {
  loginId: "share",
  loginPwd: "asdfasdf",
};

module.exports = {
  connected:
    JSON.parse(request.body).loginId === admin.loginId &&
    JSON.parse(request.body).password === admin.password
      ? true
      : false,

};
