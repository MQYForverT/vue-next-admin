import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { store } from '/@/store/index.ts'
import { getSession, clearSession } from '/@/utils/storage.ts'
import { NextLoading } from '/@/utils/loading.ts'
import { getUserInfo } from '/@/api/login'
import Base64 from '/@/utils/base64'

import goodRoutes from './modules/goodComponents'

// 定义静态路由
const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import('/@/views/login/index.vue'),
		meta: {
			title: '登陆'
		}
	},
	{
		path: '/404',
		name: 'notFound',
		component: () => import('/@/views/error/404.vue'),
		meta: {
			title: '找不到此页面'
		}
	},
	{
		path: '/401',
		name: 'noPower',
		component: () => import('/@/views/error/401.vue'),
		meta: {
			title: '没有权限'
		}
	}
]

const viewRouters: Array<RouteRecordRaw> = [
	goodRoutes,
	{
		path: '/personal',
		name: 'personal',
		component: () => import('/@/views/personal/index.vue'),
		meta: {
			title: '个人中心',
			isLink: '', //是否内嵌地址
			isHide: false, //存在该路由
			isKeepAlive: true, //是否缓存
			isAffix: false, //是否可以关闭
			isIframe: false, //点击为iframe页面
			isMenu: false, //存在该路由，但不显示在菜单中
			isViewRouter: false, //是否页面路由，如果是，则不显示在菜单中，也不显示在tagView中
			icon: 'iconfont icon-gerenzhongxin'
		}
	}
]

// 定义动态路由
export const dynamicRoutes = [
	{
		path: '/',
		name: '/',
		component: () => import('/@/views/layout/index.vue'),
		redirect: '/home',
		meta: {
			isKeepAlive: true
		},
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('/@/views/pages/home/index.vue'),
				meta: {
					title: '首页',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: true,
					isIframe: false,
					isMenu: true,
					isViewRouter: false,
					icon: 'iconfont icon-shouye'
				}
			},
			{
				path: '/system',
				name: 'system',
				component: () => import('/@/views/layout/routerView/parent.vue'),
				redirect: '/system/menu',
				meta: {
					title: '系统设置',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					isMenu: true,
					isViewRouter: false,
					icon: 'iconfont icon-xitongshezhi'
				},
				children: [
					{
						path: '/system/menu',
						name: 'systemMenu',
						component: () => import('/@/views/pages/system/menu/index.vue'),
						meta: {
							title: '菜单管理',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'iconfont icon-caidan'
						}
					}
				]
			},
			{
				path: '/member',
				name: 'member',
				component: () => import('/@/views/pages/member/index.vue'),
				meta: {
					title: '会员管理',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					isMenu: true,
					isViewRouter: false,
					icon: 'iconfont icon-icon-'
				}
			},
			{
				path: '/good',
				name: 'good',
				component: () => import('/@/views/layout/routerView/parent.vue'),
				redirect: '/good/goodList',
				meta: {
					title: '商品管理',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					isMenu: true,
					isViewRouter: false,
					icon: 'iconfont el-icon-sell'
				},
				children: [
					{
						path: '/good/goodList',
						name: 'goodList',
						component: () => import('/@/views/pages/good/goodList/index.vue'),
						meta: {
							title: '商品列表',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'iconfont icon-caidan'
						}
					},
					{
						path: '/good/goodType',
						name: 'goodType',
						component: () => import('/@/views/pages/good/goodType/index.vue'),
						meta: {
							title: '商品分类',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'iconfont icon-ico'
						}
					}
				]
			},
			{
				path: '/fun',
				name: 'funIndex',
				component: () => import('/@/views/layout/routerView/parent.vue'),
				redirect: '/fun/tagsView',
				meta: {
					title: '功能',
					isLink: '',
					isHide: false,
					isKeepAlive: true,
					isAffix: false,
					isIframe: false,
					isMenu: true,
					isViewRouter: false,
					icon: 'iconfont icon-crew_feature'
				},
				children: [
					{
						path: '/fun/chart',
						name: 'chartIndex',
						component: () => import('/@/views/fun/chart/index.vue'),
						meta: {
							title: '大数据图表',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'iconfont icon-ico_shuju'
						}
					},
					{
						path: '/fun/filtering',
						name: 'filtering',
						component: () => import('/@/views/fun/filtering/index.vue'),
						meta: {
							title: '过滤筛选组件',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'el-icon-sell'
						}
					},
					{
						path: '/fun/iocnfont',
						name: 'iocnfont',
						component: () => import('/@/views/fun/iocnfont/index.vue'),
						meta: {
							title: 'iconfont 字体图标',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'el-icon-present'
						}
					},
					{
						path: '/fun/element',
						name: 'element',
						component: () => import('/@/views/fun/element/index.vue'),
						meta: {
							title: 'element 字体图标',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'el-icon-platform-eleme'
						}
					},
					{
						path: '/fun/awesome',
						name: 'awesome',
						component: () => import('/@/views/fun/awesome/index.vue'),
						meta: {
							title: 'awesome 字体图标',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'el-icon-set-up'
						}
					},
					{
						path: '/fun/waterfall',
						name: 'waterfall',
						component: () => import('/@/views/fun/waterfall/index.vue'),
						meta: {
							title: '瀑布屏',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'iconfont icon-zidingyibuju'
						}
					},
					{
						path: '/fun/tagsView',
						name: 'funTagsView',
						component: () => import('/@/views/fun/tagsView/index.vue'),
						meta: {
							title: 'tagsView 操作',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'el-icon-thumb'
						}
					},
					{
						path: '/fun/countup',
						name: 'countup',
						component: () => import('/@/views/fun/countup/index.vue'),
						meta: {
							title: 'countup 数字滚动',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'el-icon-odometer'
						}
					},
					{
						path: '/fun/echartsTree',
						name: 'echartsTree',
						component: () => import('/@/views/fun/tree/index.vue'),
						meta: {
							title: 'echartsTree 树图',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'el-icon-connection'
						}
					},
					{
						path: '/fun/selector',
						name: 'selector',
						component: () => import('/@/views/fun/selector/index.vue'),
						meta: {
							title: '图标选择器',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'iconfont icon-xuanzeqi'
						}
					},
					{
						path: '/fun/wangEditor',
						name: 'wangEditor',
						component: () => import('/@/views/fun/wangEditor/index.vue'),
						meta: {
							title: 'wangEditor 编辑器',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'iconfont icon-fuwenbenkuang'
						}
					},
					{
						path: '/fun/cropper',
						name: 'cropper',
						component: () => import('/@/views/fun/cropper/index.vue'),
						meta: {
							title: 'cropper 图片裁剪',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'iconfont icon-caijian'
						}
					},
					{
						path: '/fun/mindMap',
						name: 'mindMap',
						component: () => import('/@/views/fun/mindMap/index.vue'),
						meta: {
							title: 'G6 思维导图',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'iconfont icon-siweidaotu'
						}
					},
					{
						path: '/fun/qrcode',
						name: 'qrcode',
						component: () => import('/@/views/fun/qrcode/index.vue'),
						meta: {
							title: 'qrcode 二维码生成',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'iconfont icon-ico'
						}
					},
					{
						path: '/fun/echartsMap',
						name: 'echartsMap',
						component: () => import('/@/views/fun/echartsMap/index.vue'),
						meta: {
							title: '地理坐标/地图',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'iconfont icon-ditu'
						}
					},
					{
						path: '/fun/tools',
						name: 'tools',
						component: () => import('/@/views/fun/tools/index.vue'),
						meta: {
							title: '工具类集合',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'iconfont icon-gongju'
						}
					},
					{
						path: '/fun/printJs',
						name: 'printJs',
						component: () => import('/@/views/fun/printJs/index.vue'),
						meta: {
							title: '页面打印',
							isLink: '',
							isHide: false,
							isKeepAlive: true,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'el-icon-printer'
						}
					},
					{
						path: '/fun/link',
						name: 'layoutLinkView',
						component: () => import('/@/views/layout/routerView/parent.vue'),
						meta: {
							title: '外链',
							isLink: 'https://element-plus.gitee.io/#/zh-CN/component/installation',
							isHide: false,
							isKeepAlive: false,
							isAffix: false,
							isIframe: false,
							isMenu: true,
							isViewRouter: false,
							icon: 'iconfont icon-caozuo-wailian'
						}
					},
					{
						path: '/fun/iframes',
						name: 'layoutIfameView',
						component: () => import('/@/views/layout/routerView/parent.vue'),
						meta: {
							title: '内嵌 iframe',
							isLink: 'https://gitee.com/',
							isHide: false,
							isKeepAlive: false,
							isAffix: false,
							isIframe: true,
							isMenu: true,
							isViewRouter: false,
							icon: 'iconfont icon-neiqianshujuchucun'
						}
					}
				]
			}
		]
	}
]

// 定义404界面
const pathMatch = {
	path: '/:path(.*)*',
	redirect: '/404'
}

// 获取目录下的 .vue 全部文件，参考 vite：import.meta.glob
const dynamicViewsModules = import.meta.glob('../views/**/*.{vue,tsx}')

// 添加静态路由
const router = createRouter({
	history: createWebHashHistory(),
	routes: staticRoutes
})

//1.获取接口菜单
//后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
export function getBackEndControlRoutes(callback: any) {
	const token = getSession('token')
	if (!token) return false
	store.dispatch('userInfos/setUserInfos')
	const auth = store.state.userInfos.userInfos // 模拟 admin 与 test

	const authInfo = {
		account: auth.account,
		password: Base64.decode(auth.password)
	}

	getUserInfo(authInfo).then((res: any) => {
		// 获得基础服务地址
		store.dispatch('baseServices/setBaseData')
		
		const datas = [
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
		const realRoutes = getRealRoutes(datas)

		callback(realRoutes)
	})
}

export const getRealRoutes = (menu: object[]) => {
	const res = []
	menu.forEach(route => {
		const r: any = { ...route }
		let r2 = []
		// 不同的规则有不同的处理方式
		if (r.pId === 0 && r.list.length === 0) {
			r2 = getRoute1(r)
		} else {
			r2 = getRoute2(r)
		}

		res.push(r2)
	})
	// 清理数组
	return cleanRouter(res)
}

// 清除掉不是对象的
const cleanRouter = (router: any[]) => {
	return router.filter(x => typeof x === 'object')
}

const getRoute1 = (menu: object) => {
	const res: any = {}
	const r: any = { ...menu }

	res.path = `/${r.url}`
	res.name = r.url
	res.component = `/pages/${r.url}/index.vue`
	res.meta = {
		title: r.name,
		isLink: '',
		isHide: false, //是否隐藏
		isKeepAlive: true, //是否缓存
		isAffix: r.url === 'home' ? true : false, //是否固定，固定则不显示关闭按钮
		isIframe: false,
		isMenu: true,
		isViewRouter: false,
		icon: r.icon
	}
	return res
}

const getRoute2 = (menu: object) => {
	const res: any = {}
	const r: any = { ...menu }

	res.path = `/${r.url}`
	res.name = r.url
	res.component = '/layout/routerView/parent.vue'
	res.redirect = `/${r.url}/${r.list[0].url}`
	res.meta = {
		title: r.name,
		isLink: '',
		isHide: false, //是否隐藏
		isKeepAlive: true, //是否缓存
		isAffix: r.url === 'home' ? true : false, //是否固定，固定则不显示关闭按钮
		isIframe: false,
		isMenu: true,
		isViewRouter: false,
		icon: r.icon
	}

	//遍历二级数组
	res.children = []
	for (const x of r.list) {
		let obj: any = {
			path: `/${r.url}/${x.url}`,
			name: x.url,
			// 动态路由需要使用require
			component: `/pages/${r.url}/${x.url}/index.vue`,
			// 静态路由才使用import
			meta: {
				title: x.name,
				isLink: '',
				isHide: false, //是否隐藏
				isKeepAlive: true, //是否缓存
				isAffix: x.url === 'home' ? true : false, //是否固定，固定则不显示关闭按钮
				isIframe: false,
				icon: x.icon
			}
		}
		res.children.push(obj)
	}
	res.children = cleanRouter(res.children)

	return res
}

//2.把后台返回的菜单信息初始化
// 后端控制路由，模拟执行路由数据初始化
export function setBackEndControlRoutesFun(res: any, callback?: any) {
	//初始化
	initBackEndControlRoutesFun(res)
	window.location.href = window.location.href // 防止页面刷新时，出现空白或404
	if (callback) callback(res)
}

//3.初始话函数
// 后端控制路由，模拟执行路由数据初始化 ok
const initBackEndControlRoutesFun = (res: any) => {
	NextLoading.start()
	const oldRoutes = JSON.parse(JSON.stringify(res))
	store.dispatch('requestOldRoutes/setBackEndControlRoutes', oldRoutes)

	//后端返回的路由 和 页面路由一起添加
	dynamicRoutes[0].children = [...backEndRouter(res), ...viewRouters]
	resetRoute() // 删除/重置路由
	router.addRoute(pathMatch) // 添加404界面
	setAddRoute() // 添加动态路由
	setMenu() // 设置菜单
	setCacheTagsViewRoutes() // 添加 keepAlive 缓存
}

// 4.后端控制路由，后端路由 component 转换
export function backEndRouter(routes: any) {
	if (!routes) return
	return routes.map((item: any) => {
		const { component } = item
		const { children } = item
		if (component) item.component = dynamicImport(dynamicViewsModules, component as string) //只返回匹配到的一个
		children && backEndRouter(children)
		return item
	})
}

// 4.5.后端控制路由，后端路由 component 转换函数
export function dynamicImport(dynamicViewsModules: Record<string, () => Promise<{ [key: string]: any }>>, component: string) {
	const keys = Object.keys(dynamicViewsModules)
	const matchKeys = keys.filter(key => {
		const k = key.replace('../views', '')
		return k.startsWith(`${component}`) || k.startsWith(`/${component}`)
	})
	if (matchKeys.length === 1) {
		const matchKey = matchKeys[0]
		return dynamicViewsModules[matchKey]
	}
	if (matchKeys.length > 1) {
		console.warn('Do not create files that do not end with. Vue')
		return false
	}
}

//5.删除/重置路由
// 删除/重置路由
export function resetRoute() {
	setFilterRouteEnd().forEach((route: any) => {
		const { name } = route
		router.hasRoute(name) && router.removeRoute(name)
	})
}

//6.添加动态路由
export function setAddRoute() {
	setFilterRouteEnd().forEach((route: any) => {
		router.addRoute((route as unknown) as RouteRecordRaw)
	})
}

//7.设置菜单
// 获取当前用户的路由表，用于左侧菜单/横向菜单的显示
export function setMenu() {
	store.dispatch('routesList/setRoutesList', dynamicRoutes[0].children)
}

//8.添加 keepAlive 缓存
// 缓存多级嵌套数组处理后的一维数组(tagsView、菜单搜索中使用：未过滤隐藏的(isHide))
export function setCacheTagsViewRoutes() {
	// 添加到 vuex setTagsViewRoutes 中
	store.dispatch('tagsViewRoutes/setTagsViewRoutes', formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes))[0].children)
}

//比对后的路由表，进行重新赋值
export function setFilterRouteEnd() {
	let filterRouteEnd: any = formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes))
	filterRouteEnd[0].children = filterRouteEnd[0].children
	return filterRouteEnd
}

// 多级嵌套数组处理成一维数组
export function formatFlatteningRoutes(arr: any) {
	if (arr.length < 0) return false
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].children) {
			arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1))
		}
	}
	return arr
}

// 多级嵌套数组处理后的一维数组，再处理成 `定义动态路由` 的格式
// 只保留二级：也就是二级以上全部处理成只有二级，keep-alive 支持二级缓存
// isKeepAlive 处理 `name` 值，进行缓存。顶级关闭，全部不缓存
export function formatTwoStageRoutes(arr: any) {
	if (arr.length < 0) return false
	const newArr: any = []
	const cacheList: Array<string> = []
	arr.forEach((v: any) => {
		if (v.path === '/') {
			newArr.push({ component: v.component, name: v.name, path: v.path, redirect: v.redirect, meta: v.meta, children: [] })
		} else {
			newArr[0].children.push({ ...v })
			if (newArr[0].meta.isKeepAlive && v.meta.isKeepAlive) {
				cacheList.push(v.name)
				store.dispatch('keepAliveNames/setCacheKeepAlive', cacheList)
			}
		}
	})
	return newArr
}

// 在菜单页面动态添加菜单时（刷新菜单）
export function setBackEndControlRefreshRoutes() {
	getBackEndControlRoutes((res: any) => {
		initBackEndControlRoutesFun(res)
	})
}

// 初始化方法，防止刷新时丢失
export function initAllFun() {
	NextLoading.start()
	const token = getSession('token')
	if (!token) return false
	store.dispatch('userInfos/setUserInfos') // 触发初始化用户信息
	store.dispatch('baseServices/setBaseData')
	setAddRoute() // 添加动态路由
	router.addRoute(pathMatch) // 添加404界面
	setMenu() // 过滤权限菜单
	setCacheTagsViewRoutes() // 添加 keepAlive 缓存
}

// 初始化方法执行
const requestRoutes = store.state.themeConfig.themeConfig.isRequestRoutes

if (!requestRoutes) initAllFun()
// 后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
if (requestRoutes)
	getBackEndControlRoutes((res: any) => {
		setBackEndControlRoutesFun(res)
	})

// 路由加载前
router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} - ${store.state.themeConfig.themeConfig.globalTitle}` || store.state.themeConfig.themeConfig.globalTitle
	NProgress.configure({ showSpinner: false })
	if (to.meta.title) NProgress.start()
	const token = getSession('token')
	if (to.path === '/login' && !token) {
		next()
		NProgress.done()
	} else {
		if (!token) {
			next('/login')
			clearSession()
			resetRoute()
			NProgress.done()
		} else if (token && to.path === '/login') {
			next('/home')
			NProgress.done()
		} else {
			next()
		}
	}
})

// 路由加载后
router.afterEach(() => {
	NProgress.done()
	NextLoading.done()
})

// 导出路由
export default router
