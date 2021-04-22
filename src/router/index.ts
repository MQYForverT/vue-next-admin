import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { store } from '/@/store/index.ts'
import { getSession, clearSession } from '/@/utils/storage.ts'
import { NextLoading } from '/@/utils/loading.ts'
import { getUserInfo } from '/@/api/login'
import Base64 from '/@/utils/base64'
import { getRealRoutes } from './helps/formatRoutes'
import { allRoutes } from './helps/allRoutes'
import goodRoutes from './modules/goodComponents'

// 白名单
const whiteList = ['/login']

// 定义静态路由
export const staticRoutes: Array<RouteRecordRaw> = [
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

export const viewRouters: Array<RouteRecordRaw> = [
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
export const dynamicRoutes = allRoutes

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
	routes: staticRoutes,
	scrollBehavior() {
		return { top: 0 }
	}
})

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
	console.log(setFilterRouteEnd())
	setFilterRouteEnd().forEach((route: any) => {
		if (!route.path.startsWith('/fun')) router.addRoute((route as unknown) as RouteRecordRaw)
	})
}

//比对后的路由表，进行重新赋值
export function setFilterRouteEnd() {
	let filterRouteEnd: any = formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes))
	return filterRouteEnd
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

//8.添加 keepAlive 缓存
// 缓存多级嵌套数组处理后的一维数组(tagsView、菜单搜索中使用：未过滤隐藏的(isHide))
export function setCacheTagsViewRoutes() {
	// 添加到 vuex setTagsViewRoutes 中
	store.dispatch('tagsViewRoutes/setTagsViewRoutes', formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes))[0].children)
}

const getPageTitle = to => {
	if (to.meta.title) {
		const pageName = `${to.meta.title} - ${store.state.themeConfig.themeConfig.globalTitle}`
		return pageName
	}
	return store.state.themeConfig.themeConfig.globalTitle
}

// 路由加载前
router.beforeEach(async (to, from, next) => {
	console.log('全部路由1：', router.getRoutes())
	NProgress.configure({ showSpinner: false })
	if (to.meta.title) NProgress.start()
	const token = getSession('token')

	if (!token) {
		if (whiteList.indexOf(to.path) !== -1) {
			// 在免费登录白名单中，直接进入
			next()
		} else {
			// 其他没有访问权限的页面将被重定向到登录页面。
			next('/login')
			NProgress.done()
		}
	} else {
		if (to.path === '/login') {
			// 如果已登录，则重定向到主页
			next('/home')
			NProgress.done()
		} else {
			if (store.state.routesList.routesList.length === 0) {
				resetRoute()
				await store.dispatch('routesList/setRoutesList')

				//Enable static import. If this option is enabled, please go to file: / / / D / Vue work / real-time shopping / SRC / store / modules/ routesList.ts Note the relevant code in the file
				// setAddRoute()

				router.addRoute(pathMatch) // 添加404界面
				setCacheTagsViewRoutes() // 添加 keepAlive 缓存

				next({ ...to, replace: true })
			} else {
				next()
			}
		}
	}
})

// 路由加载后
router.afterEach(to => {
	NProgress.done()
	NextLoading.done()
	document.title = getPageTitle(to)
})

// 导出路由
export default router
