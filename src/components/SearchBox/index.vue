<template>
	<div>
		<el-input
			v-model="val"
			:placeholder="IPlaceholder"
			suffix-icon="el-icon-search"
			clearable
			v-bind="$attrs"
			:style="IStyle"
			class="input-clustom"
			@input="search($event)"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { optimizedInteraction } from '/@/utils/optimizedInteraction'

export default defineComponent({
	name: 'SearchBox',
	props: {
		IPlaceholder: {
			type: String,
			default: '请输入……'
		},
		IStyle: {
			type: Object,
			default: () => ({})
		},
		searchKey: {
			type: String,
			default: ''
		}
	},
	setup(props, { emit }) {
		const val = ref('')
	
		const search = optimizedInteraction(val => {
			emit('searchVal', val)
		}, 1000)
		
		// 页面加载时
		onMounted(() => {
			val.value = props.searchKey
		})
		
		return {
			val,
			search
		}
	}
})
</script>

<style lang="scss" scoped>
.input-clustom {
	width: 100%;
	min-width: 150px;
	height: 32px;
	border-radius: 25px;
	background-color: #eaeef4;
}

:deep(.el-input__inner) {
	border-radius: 25px;
	min-width: 150px;
	height: 32px;
	background-color: #eaeef4;
}

:deep(.el-input__inner:focus) {
	border-color: #d9e0fd;
}
</style>
