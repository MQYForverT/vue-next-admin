<template>
	<div style="position: relative;">
		<el-card shadow="hover">
			<GoBack @back="goBack" />
			<div class="pa40">
				<el-form ref="form" :model="formData.data" :rules="formData.rules" label-width="110px">
					<el-form-item ref="name" label="分类名称" prop="name">
						<el-input v-model.trim="formData.data.name" style="width: 70%;" maxlength="10" show-word-limit placeholder="请输入分类名称" />
					</el-form-item>
					<el-form-item ref="order" label="分类顺序" prop="order">
						<el-input v-model.trim="formData.data.order" style="width: 70%;" placeholder="顺序" @input="filterNum" />
					</el-form-item>
					<el-form-item ref="state" label="是否显示" prop="state">
						<el-radio-group v-model="formData.data.state">
							<el-radio :label="1">显示</el-radio>
							<el-radio :label="2">不显示</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item ref="tp" label="类别图标" prop="tp"><UploadImage :fileUrl="formData.data.tp" @input="getPicUrl('tp', $event)" /></el-form-item>
					<el-form-item ref="ms" label="类别描述" prop="ms">
						<el-input
							v-model.trim="formData.data.ms"
							placeholder="填写点什么吧"
							style="width: 70%;"
							type="textarea"
							:autosize="{ minRows: 3, maxRows: 10 }"
							maxlength="100"
							show-word-limit
						/>
					</el-form-item>
					<el-form-item><el-button :loading="formData.loading" type="primary" @click="onSubmit">完成</el-button></el-form-item>
				</el-form>
			</div>
		</el-card>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import GoBack from '/@/components/GoBack/index.vue'
import UploadImage from '/@/components/UploadImage/index.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { defaultGoodData } from '/@/api/good'
import scrollForm from '/@/utils/scrollForm'
import Base64 from '/@/utils/base64'
import { verifiyNumberInteger } from '/@/utils/toolsValidate'

export default defineComponent({
	name: 'goBack',
	components: { GoBack, UploadImage },
	setup() {
		const router = useRouter()
		const route = useRoute()

		const refs: any = reactive({
			form: null,
			name: null
		})

		const state: any = reactive({
			routeInfo: {},
			formData: {
				data: JSON.parse(JSON.stringify(defaultGoodData)),
				loading: false,
				rules: {
					name: [{ required: true, message: '请输入分类名称,1-10个字符', trigger: 'blur' }]
				}
			}
		})

		const goBack = () => {
			router.push({
				path: '/good/goodType',
				query: {}
			})
		}

		// 正整数
		const filterNum = (val: string) => {
			state.formData.data.order = verifiyNumberInteger(val)
		}

		// 获得图片路径
		const getPicUrl = (field, val) => {
			if (typeof val === 'string') state.formData.data[field] = val
		}

		const onSubmit = () => {
			refs.form.validate(async (valid: boolean, object: object) => {
				if (valid) {
				} else {
					scrollForm(refs, object)
				}
			})
		}

		// 页面加载时
		onMounted(() => {
			state.routeInfo = Base64.decode(route.query.info)
			console.log(state.routeInfo)
			
			//给pid赋值
			state.formData.data.pId = state.routeInfo.pId
			
			if(state.routeInfo.type==='edit'){
				const datas = {
					pId: 0, //父id
					name: '顶级分类', //名称
					order: 0, //排序
					state: 2, //状态，1：可用，2：不可用
					ms: '666', //描述
					tp: '/2021/04/21/1618966948419042.jpg' //描述，最多一张
				}
				
				state.formData.data = datas
			}
		})
		return {
			goBack,
			filterNum,
			getPicUrl,
			onSubmit,
			...toRefs(refs),
			...toRefs(state)
		}
	}
})
</script>

<style></style>
