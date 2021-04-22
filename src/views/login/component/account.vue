<template>
	<el-form class="login-content-form">
		<el-form-item>
			<el-input type="text" placeholder="用户名 admin 或不输均为 test" prefix-icon="el-icon-user" v-model="ruleForm.account" clearable autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input type="password" placeholder="密码：123456" prefix-icon="el-icon-lock" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" class="login-content-submit" round @click="onSignIn" :loading="loading.signIn"><span>登 录</span></el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { initAllFun, getBackEndControlRoutes, setBackEndControlRoutesFun } from '/@/router/index.ts'
import { useStore } from '/@/store/index.ts'
import { setSession } from '/@/utils/storage.ts'
import { formatAxis } from '/@/utils/formatTime.ts'
import { login } from '/@/api/login'
import { getbaseData } from '/@/api/baseService'
import Base64 from '/@/utils/base64'

export default defineComponent({
	name: 'login',
	setup() {
		const store = useStore()
		const router = useRouter()
		const state = reactive({
			ruleForm: {
				account: 'admin',
				password: 'jxjs@0115'
			},
			loading: {
				signIn: false
			}
		})
		// 时间获取
		const currentTime = computed(() => {
			return formatAxis(new Date())
		})
		const getbaseDatas = () => {
			getbaseData({}).then(res => {
				const { datas } = res
				
				// 存储用户信息到浏览器缓存
				setSession('baseServices', datas[0])
				// 1、请注意执行顺序(存储用户信息到vuex)
				store.dispatch('baseServices/setBaseData', datas[0])
			})
		}
		// 登录
		const onSignIn = () => {
			state.loading.signIn = true

			if (!store.state.themeConfig.themeConfig.isRequestRoutes) {
				const userInfos = {
					account: state.ruleForm.account,
					password: Base64.encode(state.ruleForm.password),
					photo:
						state.ruleForm.userName === 'admin'
							? 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg'
							: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=317673774,2961727727&fm=26&gp=0.jpg',
					time: new Date().getTime()
				}

				// 存储 token 到浏览器缓存
				setSession(
					'token',
					Math.random()
						.toString(36)
						.substr(0)
				)
				// 存储用户信息到浏览器缓存
				setSession('userInfo', userInfos)
				// 1、请注意执行顺序(存储用户信息到vuex)
				store.dispatch('userInfos/setUserInfos', userInfos)

				initAllFun()
				signInSuccess()
			}
			// 模拟后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
			else {
				login(state.ruleForm)
					.then(res => {
						const userInfos = {
							account: state.ruleForm.account,
							password: Base64.encode(state.ruleForm.password),
							photo:
								state.ruleForm.account === 'admin'
									? 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg'
									: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=317673774,2961727727&fm=26&gp=0.jpg',
							time: new Date().getTime()
						}
						// 存储 token 到浏览器缓存
						const tokenInfo = res.datas.tokenInfo
						const token = tokenInfo.tokenHead + tokenInfo.token

						setSession('token', token)
						// 存储用户信息到浏览器缓存
						setSession('userInfo', userInfos)
						// 1、请注意执行顺序(存储用户信息到vuex)
						store.dispatch('userInfos/setUserInfos', userInfos)

						getbaseDatas()

						// 前端控制路由，2、请注意执行顺序
						getBackEndControlRoutes((res: any) => {
							setBackEndControlRoutesFun(res, () => {
								signInSuccess()
							})
						})
					})
					.finally(() => {
						state.loading.signIn = false
					})
			}
		}

		// 登录成功后的跳转
		const signInSuccess = () => {
			// 初始化登录成功时间问候语
			let currentTimeInfo = currentTime.value
			// 登录成功，跳到转首页
			router.push('/')
			// 登录成功提示
			setTimeout(() => {
				ElMessage.success(`${currentTimeInfo}，欢迎回来！`)
				state.loading.signIn = false
			}, 300)
		}
		return {
			currentTime,
			onSignIn,
			...toRefs(state)
		}
	}
})
</script>

<style scoped lang="scss">
.login-content-form {
	margin-top: 20px;

	.login-content-submit {
		width: 100%;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 15px;
	}
}
</style>
