<template>
	<div class="system-user-container">
		<el-card shadow="hover">
			<div class="system-user-search mb10">
				<div>
					<el-button
						v-if="tableData.data.lenght > 0 && tableData.data[0].pId !== 0"
						type="info"
						icon="el-icon-refresh-left"
						@click="showTableByPid(tableData.data[0].pId)"
					>
						返回上级
					</el-button>
					<el-button type="success" icon="el-icon-plus" @click="addType">新增分类</el-button>
					<el-button :disabled="multipleSelection.length === 0" type="danger" icon="el-icon-delete" @click="delType">批量删除</el-button>
				</div>
				<div>
					<el-input v-model="filtering.input" placeholder="请输入分类名称" prefix-icon="el-icon-search" style="max-width: 180px"></el-input>
					<el-button type="primary" class="ml10">查询</el-button>
				</div>
			</div>
			<mTableLength :number="multipleSelection.length" @cancel="cancel"></mTableLength>
			<el-table
				ref="multipleTable"
				:data="tableData.data"
				stripe
				style="width: 100%"
				:header-cell-style="{ color: '#7f8da6', backgroundColor: '#F5F6F8' }"
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55" fixed="left" />
				<el-table-column label="分类名称" show-overflow-tooltip>
					<template #default="scope">
						<div class="flex-ac">
							<el-image class="system-user-photo" :src="scope.row.b" :preview-src-list="[scope.row.b]"></el-image>
							<div class="ml5">{{ scope.row.a }}</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="c" label="分类级别" show-overflow-tooltip></el-table-column>
				<el-table-column prop="d" label="商品数量" show-overflow-tooltip></el-table-column>
				<el-table-column label="是否显示" show-overflow-tooltip>
					<template #default="scope">
						<el-switch v-model="scope.row.e" :active-value="1" :inactive-value="2" @change="editTypeStatus(scope.row)"></el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="f" label="排序" show-overflow-tooltip></el-table-column>
				<el-table-column prop="path" label="操作" width="300" fixed="right">
					<template #default="scope">
						<el-button size="mini" @click="editType(scope.row)" icon="el-icon-edit" type="primary"></el-button>
						<el-button size="mini" @click="onRowDel(scope.row)" icon="el-icon-delete" type="danger"></el-button>
						<el-button size="mini" @click="addNextType(scope.row)" type="success">新增子级</el-button>
						<el-button size="mini" @click="showTableByPid(scope.row.id)" type="warning">查看子级</el-button>
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
import { useRouter } from 'vue-router'
import Pagination from '/@/components/Pagination/index.vue'
import mTableLength from '/@/components/mTableLength/index.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { defaultGoodData } from '/@/api/good'
import Base64 from '/@/utils/base64'

export default {
	name: 'systemUser',
	components: { Pagination, mTableLength },
	setup() {
		const router = useRouter()

		const refs: any = reactive({
			multipleTable: null
		})

		const state: any = reactive({
			form: JSON.parse(JSON.stringify(defaultGoodData)),
			filtering: {
				input1: '',
				pId: 0
			},
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					pageNum: 1,
					pageSize: 10
				}
			},
			multipleSelection: []
		})
		// 初始化表格数据
		const initTableData = () => {
			const data: Array<object> = []
			for (let i = 0; i < 20; i++) {
				data.push({
					a: (Math.round(Math.random() * 20901) + 19968).toString(16),
					b: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1633081619,2004077072&fm=26&gp=0.jpg',
					c: `00${i + 1}`,
					d: Math.round(Math.random() * 10 + 1),
					e: Math.round(Math.random() * 1 + 1),
					f: Math.round(Math.random() * 10 + 1)
				})
			}
			state.tableData.data = data
			state.tableData.total = state.tableData.data.length
		}
		// 添加
		const addType = () => {
			router.push({
				path: '/good/operationGoodType',
				query: {
					info: Base64.encode({
						pId: 0,
						type: 'add'
					})
				}
			})
		}
		// 编辑
		const editType = (row: object) => {
			router.push({
				path: '/good/operationGoodType',
				query: {
					info: Base64.encode({
						pId: row.id,
						type: 'edit'
					})
				}
			})
		}
		// 多行删除
		const delType = () => {
			ElMessageBox.confirm('此操作将删除选中所有商品类别, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				ElMessage.success('删除成功！')
				initTableData()
			})
			console.log(state.multipleSelection)
		}
		// 当前行删除
		const onRowDel = (row: object) => {
			ElMessageBox.confirm('此操作将删除该商品类别, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				ElMessage.success('删除成功！')
				initTableData()
			})
			console.log(row)
		}
		// 当前行编辑显示状态，这个编辑已经实现物理改变，不需要重新获取表格数据
		const editTypeStatus = (row: object) => {
			state.form = row
			console.log(state.form)
			console.log('触发')
		}
		// 新增子级
		const addNextType = (row: object) => {
			console.log(row)
			router.push({
				path: '/good/operationGoodType',
				query: {
					info: Base64.encode({
						pId: row.id,
						type: 'addSon'
					})
				}
			})
		}
		// 查看子级
		const showTableByPid = (pId: number) => {
			state.filtering.pId = pId
			initTableData()
		}
		const getList = val => {
			state.tableData.param.pageNum = val.page
			state.tableData.param.pageSize = val.limit
			initTableData()
		}
		const handleSelectionChange = val => {
			state.multipleSelection = val
		}
		const cancel = () => {
			refs.multipleTable.clearSelection()
		}
		// 页面加载时
		onMounted(() => {
			initTableData()
		})
		return {
			addType,
			editType,
			delType,
			onRowDel,
			editTypeStatus,
			addNextType,
			showTableByPid,
			getList,
			handleSelectionChange,
			cancel,
			...toRefs(refs),
			...toRefs(state)
		}
	}
}
</script>

<style scoped lang="scss">
.system-user-container {
	.system-user-search {
		display: flex;
		justify-content: space-between;
	}
	.system-user-photo {
		width: 40px;
		height: 40px;
	}
}
</style>
