import request from '/@/utils/request.ts';

export const getUserInfo = (data: any): any =>
  request({
    url: '/auth/login',
    method: 'post',
    params: data
  })

export const login = (data: any): any =>
  request({
    url: '/auth/login',
    method: 'post',
    params: data
  })

// 用户退出登录
export function signOut(params: object) {
	return request({
		url: '/user/signOut',
		method: 'post',
		data: params,
	});
}
