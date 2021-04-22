<template>
	<div class="header-main">
		<div class="header-title"><el-page-header :content="title" @back="goBack" /></div>
		<div><slot /></div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'MyPageHeader',
	props: {
		title: {
			type: String,
			default: 'mqy'
		},
		route: {
			type: String,
			default: 'mqy'
		}
	},
	setup(props, { emit }) {
		const router = useRouter()

		const goBack = () => {
			router.push({
				path: props.route,
				query: {}
			})
		}

		return {
			goBack
		}
	}
})
</script>

<style lang="scss" scoped>
.header-main {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #e6e9ef;
	height: 64px;
	padding: 0 20px;
}
.header-title {
	-webkit-box-flex: 1;
	flex: 1;
	font-size: 16px;
	line-height: 24px;
	font-weight: 700;
	color: #252a2e;
}
</style>
