<template>
	<div class="system-user-container">
		<el-card shadow="hover">
			<span>今日新增：123</span>
			<span class="ml20">邀请用户：100</span>
			<span class="ml20">累计用户：4566</span>
		</el-card>
		<el-card shadow="hover" class="filtering">
			<div class="filtering-list-flex">
				<div class="filtering-list-title">用户昵称</div>
				<div class="filtering-list-item"><el-input v-model="filtering.input1" style="max-width: 180px" placeholder="请输入用户名称"></el-input></div>
			</div>
			<div class="filtering-list-flex">
				<div class="filtering-list-title">用户id</div>
				<div class="filtering-list-item"><el-input v-model="filtering.input2" style="max-width: 180px" placeholder="请输入用户id"></el-input></div>
			</div>
			<div class="filtering-list-flex">
				<div class="filtering-list-title">注册时间</div>
				<div class="filtering-list-item">
					<el-date-picker v-model="filtering.pickData[0]" placeholder="请输入开始时间" type="date" />
					<span class="ml5 mr5">~</span>
					<el-date-picker v-model="filtering.pickData[1]" placeholder="请输入结束时间" type="date" />
				</div>
			</div>
			<div class="form-search-footer mt20">
				<el-button :loading="tableData.loading" type="primary" @click="formFind">查询</el-button>
				<el-button @click="formReset">重置</el-button>
			</div>
		</el-card>
		<el-card shadow="hover" class="mt5">
			<el-table v-loading="tableData.loading" :data="tableData.data" stripe highlight-current-row :header-cell-style="{ color: '#7f8da6', backgroundColor: '#F5F6F8' }">
				<el-table-column prop="id" label="ID" show-overflow-tooltip></el-table-column>
				<el-table-column prop="openid" label="openid" show-overflow-tooltip></el-table-column>
				<el-table-column prop="name" label="用户名" show-overflow-tooltip></el-table-column>
				<el-table-column prop="phone" label="手机" show-overflow-tooltip></el-table-column>

				<el-table-column prop="auth" label="实名认证" show-overflow-tooltip></el-table-column>
				<el-table-column prop="dlqx" label="代理权限" show-overflow-tooltip>
					<template #default="scope">
						<span>{{ filterdlqx(scope.row.dlqx) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="ddjl" label="订单记录" show-overflow-tooltip></el-table-column>
				<el-table-column prop="address" label="收货地址" show-overflow-tooltip></el-table-column>

				<el-table-column prop="money1" label="零钱" show-overflow-tooltip>
					<template #default="scope">
						<span>{{ filterMoney(scope.row.money1) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="money2" label="累计消费" show-overflow-tooltip>
					<template #default="scope">
						<span>{{ filterMoney(scope.row.money2) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="money3" label="累计红包" show-overflow-tooltip>
					<template #default="scope">
						<span>{{ filterMoney(scope.row.money3) }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="money4" label="累计提现" show-overflow-tooltip>
					<template #default="scope">
						<span>{{ filterMoney(scope.row.money4) }}</span>
					</template>
				</el-table-column>

				<el-table-column prop="path" label="操作" width="90" fixed="right">
					<template #default="scope">
						<el-button size="mini" type="text" @click="frozen(scope.row)">冻结</el-button>
						<el-button size="mini" type="text" @click="thaw(scope.row)">解冻</el-button>
					</template>
				</el-table-column>
			</el-table>
			<pagination
				v-show="tableData.total > 0"
				:total="tableData.total"
				v-model:page="tableData.param.pageNum"
				v-model:limit="tableData.param.pageSize"
				@pagination="getList"
			/>
		</el-card>
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted } from 'vue'
import Pagination from '/@/components/Pagination/index.vue'
import { yesOrNo } from '/@/dictionaries/overall'
import { statusFilter, verifyNumberComma } from '/@/utils/toolsValidate'
import { ElMessageBox, ElMessage } from 'element-plus'

export default {
	name: 'systemUser',
	components: { Pagination },
	setup() {
		const state: any = reactive({
			filtering: {
				input1: '',
				input2: '',
				pickData: []
			},
			tableData: {
				data: [],
				loading: false,
				total: 0,
				param: {
					pageNum: 1,
					pageSize: 10
				}
			}
		})
		// 初始化表格数据
		const initTableData = () => {
			state.tableData.loading = true
			const data: Array<object> = []
			for (let i = 0; i < 19; i++) {
				data.push({
					id: `id00${i + 1}`,
					openid: `openid00${i + 1}`,
					name: (Math.round(Math.random() * 20901) + 19968).toString(16),
					phone: Math.floor(Math.random() * 10000000000),
					auth: 'auth' + Math.floor(Math.random() * 10000000000).toString(),
					dlqx: Math.round(Math.random() * 1 + 1),
					ddjl: Math.round(Math.random() * 30 + 1),
					address: '北京朝阳区',
					money1: Math.round(Math.random() * 3000 + 100),
					money2: Math.round(Math.random() * 3000 + 100),
					money3: Math.round(Math.random() * 3000 + 100),
					money4: Math.round(Math.random() * 3000 + 100)
				})
			}
			state.tableData.data = data
			state.tableData.total = state.tableData.data.length
			state.tableData.loading = false
		}
		const filterdlqx = (val: Number) => {
			return statusFilter(val, yesOrNo)
		}
		const filterMoney = (money: Number) => {
			return verifyNumberComma(money)
		}
		// 冻结
		const frozen = (row: object) => {
			ElMessageBox.confirm('此操作将冻结该用户, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				ElMessage.success('冻结成功！')
			})
		}
		// 解冻
		const thaw = (row: object) => {
			ElMessageBox.confirm('此操作将解冻该用户, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				ElMessage.success('解冻成功！')
			})
		}
		const getList = val => {
			state.tableData.param.pageNum = val.page
			state.tableData.param.pageSize = val.limit
			initTableData()
		}
		const formFind = () => {
			console.log(state.filtering)
			initTableData()
		}
		const formReset = () => {
			state.filtering.input1 = ''
			state.filtering.input2 = ''
			state.filtering.pickData = []
		}
		// 页面加载时
		onMounted(() => {
			initTableData()
		})
		return {
			filterdlqx,
			filterMoney,
			frozen,
			thaw,
			getList,
			formFind,
			formReset,
			...toRefs(state)
		}
	}
}
</script>

<style scoped lang="scss"></style>
