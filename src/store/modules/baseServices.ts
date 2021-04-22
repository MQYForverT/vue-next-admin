import { Module } from 'vuex'
import { getSession } from '/@/utils/storage.ts';

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
		async setBaseData({ commit },data: object) {
			if (data) {
				commit('setBaseServices', data);
			} else {
				if (getSession('baseServices')) commit('setBaseServices', getSession('baseServices'));
			}
		}
	}
}

export default baseServicesModule
