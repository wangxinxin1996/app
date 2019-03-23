<template>
	 <el-table-column
      prop="change"
      fixed="right"
      label="操作">
      <template slot-scope="scope">
	    <el-button
	      @click.native.prevent="deleteRow(scope.$index, Usermessage)"
	      type="text"
	      size="small">
	      {{operation}}
	    </el-button>
      </template>
    </el-table-column>

</template>

<script>
	export default{
		name:"Operation",
		props:{
			operation:String
		}
	}
</script>

<style>
</style>