<template>
	<div>
		<span v-for="item in selectedList" :key="item[option['id']]" :class="selected === item[option['id']] ? 'selected' : ''" class="span" @click="radioSelect(item)">
			{{ item[option['name']] }}
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Radio',
	props: {
		selected: {
			type: Number,
			default: 0
		},
		selectedList: {
			type: Object,
			default: () => []
		},
		option: {
			type: Object,
			default: { id: 'id', name: 'name' }
		}
	},
	setup(props, { emit }) {
		const radioSelect = (obj: any) => {
			emit('update:selected', obj[props.option.id])
			emit('selectInfo', obj)
		}

		return {
			radioSelect
		}
	}
})
</script>

<style scoped lang="scss">
.span {
	color: #8d8d91;
	font-size: 14px;
	float: left;
	padding: 0 15px;
	margin: 15px 0;
	&:hover {
		color: var(--color-primary);
		cursor: pointer;
	}
}
.selected {
	color: var(--color-primary);
}
</style>
