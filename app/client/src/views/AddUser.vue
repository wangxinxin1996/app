<template>
	<!--
    	添加管理员，或者系统管理员
    -->
	<div id="AddUser">
		<AdminHead></AdminHead>
		<el-form>
			<el-form-item>
				<el-button type="primary" size="small" icon="search" @click='onCreateUser()'>新建用户</el-button>
				<el-button type="primary" size="small" icon="search" @click='onMoreCreateUser()'>批量导入</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="Usermessage" stripe style="width: 100%">
			<el-table-column prop="Number" label="账号">
			</el-table-column>
			<el-table-column prop="Name" label="姓名">
			</el-table-column>
			<el-table-column prop="Password" label="密码">
			</el-table-column>
			<el-table-column prop="Type" label="类型">
			</el-table-column>
			<Operation :operation="'修改'"> </Operation>
		</el-table>
	</div>
</template>
<script>
	import AdminHead from "../components/AdminHead"
	import Operation from "../components/Operation"

	export default {
		name: "AddUser",
		components: {
			AdminHead,
			Operation
		},
		data() {
			return {
				formInline: {
					userNo: '',
					name: ''
				},
				Usermessage: [{
					Number: "1",
					Name: "王",
					Password: "12345",
					Type: "管理员"
				}]
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},

			deleteRow(index, rows) {
				rows.splice(index, 1);
			}
		}
	}
</script>

<style scoped>

</style>