<template>
	<div :class="{ hidden: hidden }" class="pagination-container">
		<el-pagination
			:background="background"
			:current-page.sync="currentPage"
			:page-size.sync="pageSize"
			:layout="layout"
			:page-sizes="pageSizes"
			:total="total"
			v-bind="$attrs"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent,computed } from 'vue'
import { scrollTo } from '/@/utils/scroll-to'

export default defineComponent({
	name: 'Pagination',
	props: {
		total: {
			type: Number,
			required: true
		},
		page: {
			type: Number,
			default: 1
		},
		limit: {
			type: Number,
			default: 20
		},
		pageSizes: {
			type: Object,
			default: () => [10, 20, 30, 50]
		},
		layout: {
			type: String,
			default: 'total, sizes, prev, pager, next, jumper'
		},
		background: {
			type: Boolean,
			default: true
		},
		autoScroll: {
			type: Boolean,
			default: true
		},
		hidden: {
			type: Boolean,
			default: false
		},
	},
	setup(props, { emit }) {
		const currentPage = computed({
			get: () => props.page,
			set: value => emit('update:page', value)
		})

		const pageSize = computed({
			get: () => props.limit,
			set: value => emit('update:limit', value)
		})

		const handleSizeChange = (value: number) => {
		  emit('pagination', { page: currentPage, limit: value })
		  if (props.autoScroll) {
		    scrollTo(0, 800)
		  }
		}

		const handleCurrentChange = (value: number) => {
		  emit('pagination', { page: value, limit: pageSize })
		  if (props.autoScroll) {
		    scrollTo(0, 800)
		  }
		}

		return {
			currentPage,
			pageSize,
			handleSizeChange,
			handleCurrentChange
		}
	}
})
</script>

<style lang="scss" scoped>
.pagination-container {
	display: flex;
	justify-content: flex-end;
	background: #fff;
	padding: 20px 16px 0px 16px;
}

.pagination-container.hidden {
	display: none;
}
</style>
