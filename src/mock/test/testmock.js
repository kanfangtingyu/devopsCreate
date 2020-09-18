const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
  },
];
export default {
  loginTest: (config) => {
    const { username, password } = JSON.parse(config.data);
    console.log(username, password);
    return new Promise((resolve) => {
      let user = null;
      setTimeout(() => {
        const hasUser = LoginUsers.some((u) => {
          if (u.username === username && u.password === password) {
            user = JSON.parse(JSON.stringify(u));
            user.password = undefined;
            return true;
          }
          return false;
        });

        if (hasUser) {
          resolve([200, { code: 200, msg: '请求成功', user }]);
        } else {
          resolve([200, { code: 500, msg: '账号或密码错误' }]);
        }
      }, 1000);
    });
  },
};
