<template>
	<div class="upload-container">
		<el-upload
			ref="upload"
			class="avatar-uploader"
			:action="tempUrl"
			:headers="headerObj"
			:limit="limit"
			:multiple="false"
			:file-List="imageUrl"
			:on-exceed="handleOnExceed"
			:on-preview="handlePictureCardPreview"
			:on-success="handleImageSuccess"
			:before-upload="beforeAvatarUpload"
			:on-error="handleError"
			:on-remove="handleRemove"
			list-type="picture-card"
		>
			<i class="el-icon-plus" />
		</el-upload>
		<el-dialog v-model="dialogVisible" title="预览图片" append-to-body width="769px"><img style="width:100%" :src="dialogImageUrl" alt="" /></el-dialog>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, reactive, toRefs, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { uploadFile } from '/@/api/baseService'
import { getSession } from '/@/utils/storage.ts'
import { useStore } from '/@/store/index.ts'
// 引入image-conversion
import * as imageConversion from 'image-conversion'

export default defineComponent({
	name: 'UploadImage',
	props: {
		fileUrl: {
			type: String,
			default: ''
		},
		limit: {
			type: Number,
			default: 1
		},
		abv: {
			type: Object,
			default: ()=>({})
		}
	},
	setup(props, { emit }) {
		const store = useStore()

		const refs: any = reactive({
			upload: null
		})

		const state: any = reactive({
			tempUrl: `${import.meta.env.VITE_BASE_API}/${import.meta.env.VITE_PROJECT_NAME}${uploadFile}`,
			headerObj: { Authorization: getSession('token') },
			dialogVisible: false,
			dialogImageUrl: ''
		})
		
		const imageUrl = computed(() => {
			if (props.limit > 1) {
				if (props.fileUrl) {
					const imgList = []
					props.fileUrl.split(',').forEach(res => {
						const img = {
							name: '',
							url: ''
						}
						img.name = res
						img.url = store.state.baseServices.baseServices.img_base_url + res
						imgList.push(img)
					})
					return imgList
				} else {
					return []
				}
			} else {
				return props.fileUrl ? [{ name: props.fileUrl, url: store.state.baseServices.baseServices.img_base_url + props.fileUrl }] : []
			}
		})

		const emitInput = (value: string) => {
			emit('input', value)
		}

		// 上传成功
		const handleImageSuccess = (res: any, file: any, fileList: []) => {
			const imgList = []
			fileList.forEach(res => {
				if (res.status === 'success') {
					if (res.response) {
						const { response = {} } = res
						const { datas = {} } = response
						const { face = '' } = datas
						imgList.push(face)
					} else {
						imgList.push(res.name)
					}
				}
			})
			emitInput(imgList.toString())
		}

		// 上传失败
		const handleError = () => {
			ElMessage.error('上传失败')
		}

		// 预览
		const handlePictureCardPreview = (file: any) => {
			console.log(file.url)
			state.dialogImageUrl = file.url
			state.dialogVisible = true
		}

		// 上传限制的钩子
		const handleOnExceed = () => {
			ElMessage.error(`只能上传${props.limit}个`)
		}

		// 删除
		const handleRemove = (file: any, fileList: []) => {
			const imgList = []
			fileList.forEach(res => {
				if (res.response) {
					const { response = {} } = res
					const { datas = {} } = response
					const { face = '' } = datas
					imgList.push(face)
				} else {
					imgList.push(res.name)
				}
			})
			emitInput(imgList.toString())
		}

		const beforeAvatarUpload = (file: any) => {
			var imgType = ['image/png', 'image/jpeg', 'image/jpg']
			const isJPG = file.type
			var isImg = false
			imgType.forEach(e => {
				if (isJPG === e) {
					isImg = true
				}
			})
			if (!isImg) {
				ElMessage.error('上传图片只能是jpg,png,jpeg格式!')
				return false
			} else {
				return new Promise(resolve => {
					const isLt2M = file.size / 1024 > 20 // 判定图片大小是否大于400kb
					if (isLt2M) {
						// 如果大于400
						imageConversion.compressAccurately(file, 400).then(res => {
							resolve(res)
						})
					} else {
						resolve(file)
					}
				})
			}
		}

		onBeforeUnmount(() => {
			console.log(refs.upload)
			// refs.upload.abort(null)
		})

		return {
			imageUrl,
			handleImageSuccess,
			handleError,
			handlePictureCardPreview,
			handleOnExceed,
			handleRemove,
			beforeAvatarUpload,
			...toRefs(refs),
			...toRefs(state)
		}
	}
})
</script>

<style lang="scss" scoped>
:deep(.avatar-uploader .el-upload) {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	width: 150px;
}
.avatar {
	width: 150px;
	height: 150px;
	display: block;
}

:deep(.el-upload-list--picture-card) {
	width: 150px;
}

:deep(.el-dialog__header) {
	border-bottom: none !important;
}
</style>
