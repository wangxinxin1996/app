<template>
	<div class="Radio">
		<div class="content Title">数据状态:</div>
		<div class="content">
			<el-radio-group v-model="radio2">
				<el-radio :label="2">正常</el-radio>
				<el-radio :label="3">超标</el-radio>
				<el-radio :label="4">离线</el-radio>
			</el-radio-group>
		</div>

	</div>
</template>

<script>
	export default {
		name: "arealtime",
		data() {

			return {
				radio2: 1
			};
		}
	}
</script>

<style>
	.Radio {
		display: flex;
		flex-direction: row;
		justify-content:flex-end;
		margin-top: -50px;
	}
	.content{
		height: 20px;
		
	}
	.Title{
		text-align: center;
		padding-right: 10px;
	}
</style>