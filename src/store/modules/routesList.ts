import { Module } from 'vuex';
import { getUserInfo } from '/@/api/login'
import Base64 from '/@/utils/base64'
import { store } from '/@/store/index.ts'
import { generateRoutes, dynamicImport } from '/@/router/helps/dynamicImport'
import { viewRouters,dynamicRoutes } from '/@/router/index.ts'
import router from '/@/router/index.ts'
import { RouteRecordRaw } from 'vue-router'

const routesListModule: Module<RoutesListState, RootStateTypes> = {
	namespaced: true,
	state: {
		routesList: [],
	},
	mutations: {
		// 设置路由，菜单中使用到
		getRoutesList(state: any, data: Array<object>) {
			state.routesList = data;
		},
	},
	actions: {
		// 设置路由，菜单中使用到
		async setRoutesList({ commit }) {
			return new Promise<void>(async (resolve) => {
				// 获得基础服务地址
				await store.dispatch('baseServices/setBaseData')
				
				store.dispatch('userInfos/setUserInfos')
				const auth = store.state.userInfos.userInfos
				const authInfo = {
					account: auth.account,
					password: Base64.decode(auth.password)
				}
				
				 const { datas } = await getUserInfo(authInfo)
				 
				 if (!datas) {
				   throw Error('Verification failed, please Login again.')
				 }
				 
				 // const { list = []} = datas.menu
				 	const list = [
				 		{
				 			id: 1,
				 			pId: 0,
				 			url: 'home',
				 			icon: 'iconfont icon-shouye',
				 			name: '首页',
				 			list: []
				 		},
				 		{
				 			id: 1,
				 			pId: 0,
				 			url: 'member',
				 			icon: 'iconfont icon-icon-',
				 			name: '会员管理',
				 			list: []
				 		},
				 		{
				 			id: 1,
				 			pId: 0,
				 			url: 'good',
				 			icon: 'el-icon-sell',
				 			name: '商品管理',
				 			list: [
				 				{
				 					id: 1,
				 					pId: 1,
				 					url: 'goodList',
				 					icon: 'iconfont icon-caidan',
				 					name: '商品列表',
				 					list: []
				 				},
				 				{
				 					id: 2,
				 					pId: 1,
				 					url: 'goodType',
				 					icon: 'iconfont icon-ico',
				 					name: '商品分类',
				 					list: []
				 				}
				 			]
				 		},
				 		{
				 			id: 1,
				 			pId: 0,
				 			url: 'system',
				 			icon: 'iconfont icon-xitongshezhi',
				 			name: '系统设置',
				 			list: [
				 				{
				 					id: 1,
				 					pId: 1,
				 					url: 'menu',
				 					icon: 'iconfont icon-caidan',
				 					name: '菜单管理',
				 					list: []
				 				}
				 			]
				 		}
				 	]
				 	//格式化路由格式
				const asyncRoutes = generateRoutes(list)
				
				const oldRoutes = JSON.parse(JSON.stringify(asyncRoutes))
				store.dispatch('requestOldRoutes/setBackEndControlRoutes', oldRoutes)
				
				const dynamicRoutes =  [...asyncRoutes, ...viewRouters]
				
				const app = [
					{
						path: '/',
						name: '/',
						component: dynamicImport('/layout/index.vue'),
						redirect: '/home',
						meta: {
							isKeepAlive: true
						},
						children: dynamicRoutes
					}
				]
				console.log('全部路由2:',app)
				
				//Turn on dynamic routing
				 app.forEach((route: any) => {
				 	router.addRoute((route as unknown) as RouteRecordRaw)
				 })
				
				commit('getRoutesList', asyncRoutes);
				
				resolve()
			})
		},
	},
};

export default routesListModule;
