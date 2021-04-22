<template>
	<div>
		<div class="goBack" :style="IStyle" @click="goBack()"><i class="el-icon-back" /></div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'GoBack',
	props: {
		IStyle: {
			type: Object,
			default: () => ({})
		}
	},
	setup(props, { emit }) {
		const goBack = () => {
			emit('back')
		}

		return {
			goBack
		}
	}
})
</script>

<style lang="scss" scoped>
.goBack {
	position: absolute;
	left: 15px;
	top: 15px;
	background-color: #fff;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
	cursor: pointer;
	z-index: 5;
	color: #409eff;
}
</style>
