import request from '/@/utils/request.ts'

import { IGoodData } from '/@/entity/good'

export const defaultGoodData: IGoodData = {
	pId: 0, //父id
	name: '', //名称
	order: 0, //排序
	state: 1, //状态，1：可用，2：不可用
	ms: '', //描述
	tp: '' //描述，最多一张
}

/* export const getUserInfo = (data: any): any =>
	request({
		url: '/auth/login',
		method: 'post',
		params: data
	}) */
