import { Module } from 'vuex'
import { getbaseData } from '/@/api/baseService'

const baseServicesModule: Module<BaseServicesState, RootStateTypes> = {
	namespaced: true,
	state: {
		baseServices: {}
	},
	mutations: {
		// 设置用户信息
		setBaseServices(state: any, data: object) {
			state.baseServices = data
		}
	},
	actions: {
		// 设置用户信息
		async setBaseData({ commit }) {
			 const { datas } = await getbaseData({})
			 // 存储用户信息到浏览器缓存
			 commit('setBaseServices',  datas[0]);
		}
	}
}

export default baseServicesModule
