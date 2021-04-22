export const allRoutes = [
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