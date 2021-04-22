<template>
	<div>
		<div class="person-style-showLimit">
			<i class="el-icon-warning person-style-showLimit-icon" />
			<span>
				已选
				<span class="person-style-showLimit-num">{{ number }}</span>
				条数据
			</span>
			<span class="person-style-showLimit-cancel" @click="cancel">取消</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'mTableLength',
	props: {
		number: {
			type: Number,
			default: 0
		}
	},
	setup(props, { emit }) {
		const cancel = () => {
			emit('cancel')
		}

		return {
			cancel
		}
	}
})
</script>

<style scoped lang="scss">
.person-style-showLimit {
	height: 38px;
	background-color: rgba(255, 161, 0, 0.05);
	font-size: 14px;
	padding: 8px 15px;
	border-radius: 4px;
	font-variant: tabular-nums;
	line-height: 1.5;
	list-style: none;
	font-feature-settings: 'tnum';
	color: #3e4d5c;
	margin-bottom: 10px;

	.person-style-showLimit-icon {
		color: #ffa100;
		margin-right: 10px;
	}
	.person-style-showLimit-num {
		color: #ffa100;
	}
	.person-style-showLimit-cancel {
		cursor: pointer;
		margin-left: 24px;
		color: #9bacb9;
	}
}
</style>
