<template>
	<div class="Ahead">
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="企业区域:">
				<el-input v-model="formInline.user" placeholder="重庆市" :disabled="true">重庆市</el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="formInline.user" placeholder="重庆市" :disabled="true">重庆市</el-input>
			</el-form-item>
			<el-form-item>
				<el-select v-model="formInline.region" placeholder="请选择区县">
					<el-option label="巴南区" value="banan"></el-option>
					<el-option label="渝中区" value="yuzhong"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="企业名称|设备：">
				<el-select v-model="formInline.region" placeholder="请选择企业名称">
					<el-option label="巴南区" value="banan"></el-option>
					<el-option label="渝中区" value="yuzhong"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-select v-model="formInline.region" placeholder="请选择设备名称">
					<el-option label="巴南区" value="banan"></el-option>
					<el-option label="渝中区" value="yuzhong"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="企业快查:">
				<el-input v-model="formInline.user" placeholder="企业关键字"></el-input>
			</el-form-item>
			<el-form-item label="数据状态：" class="right">
				<el-radio-group v-model="formInline.resource">
					<el-radio label="全部"></el-radio>
					<el-radio label="正常"></el-radio>
					<el-radio label="超标"></el-radio>
					<el-radio label="离线"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item class="right">
				<el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: "arealtime",
		data() {
			return {
				formInline: {
					user: '',
					region: '',
					resource: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}
</script>

<style scoped>
	
.right{
	position: relative;
	right:-35%;
}
</style>