<template>
<div>
    <p class="Page-Title">现场照片上传</p>
      <el-row>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      
        <el-col :span="8" >
          <el-form-item label='企业设备：'>
            <el-select v-model="formInline.deviceName" placeholder="请选择设备名称">
              <el-option 
                :label="dev.deviceName"
                :value="dev.deviceName"
                v-for="(dev,index) in device"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col  :span="10">
        </el-col>
     
    </el-form>
       </el-row>
	<hr>

<el-upload 
  class="upload-demo"
  drag
  list-type="picture"
  action="https://jsonplaceholder.typicode.com/posts/"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>


</div>


</template>

<script>
export default {
 data() {
    return {
      // 请求参数
      formInline: {

        enterpriseName: null,

      },
    };
 }
}
</script>

<style scoped>
.Page-Title {
  line-height: 60px;
  text-decoration: center;
  font-size: 20px;
  font-weight: 500;
}
.Area {
  display: flex;
  flex-direction: row;
}

</style>