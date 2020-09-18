import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import testMock from './test/testmock';

const base = '';
const mock = new MockAdapter(axios);

// 拦截请求，返回响应
mock.onPost(`${base}/api/user/login`).reply(testMock.loginTest);
