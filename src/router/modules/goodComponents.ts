import { RouteRecordRaw } from 'vue-router'

const goodRoutes: RouteRecordRaw = {
	path: '/good/operationGoodType',
	name: 'operationGoodType',
	component: () => import('/@/views/pages/good/goodType/router/index.vue'),
	meta: {
		title: '添加分类',
		isLink: '',
		isHide: false,
		isKeepAlive: false,
		isAffix: false,
		isIframe: false,
		isMenu: false,
		isViewRouter: true
	}
}

export default goodRoutes
