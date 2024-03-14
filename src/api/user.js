import request from '@/utils/request'
// 用户登录、注册的接口
 export const userRegisterService = ({ username, password, repassword,phone,location,department }) =>
request.post('/api/reg', { username, password, repassword,phone,location,department })