export function dynamicImport(component: string) {
	const dynamicViewsModules = import.meta.glob('../../views/**/*.{vue,tsx}')
	const keys = Object.keys(dynamicViewsModules)

	const matchKeys = keys.filter(key => {
		const k = key.replace('../../views', '')
		return k.startsWith(`${component}`) || k.startsWith(`/${component}`)
	})

	if (matchKeys.length === 1) {
		const matchKey = matchKeys[0]
		return dynamicViewsModules[matchKey]
	}
	if (matchKeys.length > 1) {
		console.warn(
			'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
		)
		return
	}
	return null
}


export function generateRoutes(routes: any, pUrl = '', level = 1) {
	return routes.reduce((prev: any, curr: any) => {
		// 如果是菜单项则注册进来
		const { id, pId, url, icon, name, list } = curr
		// 如果是一级菜单没有子菜单，则挂在在app路由下面
		if (level === 1 && pId === 0 && list.length === 0) {
			prev.push({
				path: `/${url}`,
				component: dynamicImport(`/pages/${url}/index.vue`),
				name: url,
				meta: {
					title: name,
					isLink: '',
					isHide: false, //是否隐藏
					isKeepAlive: true, //是否缓存
					isAffix: url === 'home' ? true : false, //是否固定，固定则不显示关闭按钮
					isIframe: false,
					isMenu: true,
					isViewRouter: false,
					icon: icon
				}
			})
		} else {
			prev.push({
				path: list.length > 0 ? `/${url}` : `/${pUrl}/${url}`,
				component: list.length > 0 ? dynamicImport('/layout/routerView/parent.vue') : dynamicImport(`/pages/${pUrl}/${url}/index.vue`),
				name: url,
				redirect: list.length > 0 ? `/${url}/${list[0].url}` : undefined,
				meta: {
					title: name,
					isLink: '',
					isHide: false, //是否隐藏
					isKeepAlive: true, //是否缓存
					isAffix: url === 'home' ? true : false, //是否固定，固定则不显示关闭按钮
					isIframe: false,
					isMenu: true,
					isViewRouter: false,
					icon: icon
				},
				children: list.length > 0 ? generateRoutes(list, url, level + 1) : []
			})
		}
		return prev
	}, [])
}
