<template>
  <div class="addcompany">
    <!-- <mailTable :tableData="tableData" :tableStyle="{ width:'600px' }"></mailTable> -->
    <div class="center">
      <el-form>
        <table border="10">
          <tr>
            <td>企业编码：<span style="color:red">*</span></td>
            <td>
              <el-input v-model="input"></el-input>
            </td>
            <td>企业名称：<span style="color:red">*</span></td>
            <td>
              <el-input v-model="input"></el-input>
            </td>
          </tr>
          <tr>
            <td>区域：</td>
            <td>
              <div style="display:flex">
               <el-select style="width:83px;"  placeholder="省市">
                <el-option label="重庆市" value="chongqing"></el-option>
                <el-option label="北京市" value="beijing"></el-option>
              </el-select>
               <el-select style="width:83px;margin-left:3px "  placeholder="城市">
              <el-option label="重庆市" value="chongqing"></el-option>
              </el-select>
              <el-select style="width:83px;margin-left:3px "  placeholder="区县">
                <el-option label="巴南区" value="banan"></el-option>
              <el-option label="渝中区" value="yuzhong"></el-option>
              </el-select>
              </div>
              
            </td>
            <td>街道：</td>
            <td>
              <el-input v-model="input"></el-input>
            </td>
          </tr>
          <tr>
            <td>地址：</td>
            <td>
              <el-input v-model="input"></el-input>
            </td>
            <td>电话：</td>
            <td>
              <el-input v-model="input"></el-input>
            </td>
          </tr>
          <tr>
            <td>负责人：</td>
            <td>
              <el-input v-model="input"></el-input>
            </td>
            <td>负责人电话：</td>
            <td>
              <el-input v-model="input"></el-input>
            </td>
          </tr>
          <tr>
            <td>经度：<span style="color:red">*</span></td>
            <td>
              <el-input v-model="input"></el-input>
            </td>
            <td>纬度：<span style="color:red">*</span></td>
            <td>
              <el-input v-model="input"></el-input>
            </td>
          </tr>
          <tr>
            <td>企业类型：<span style="color:red">*</span></td>
            <td>
              <el-input v-model="input"></el-input>
            </td>
            <td>是否删除：<span style="color:red">*</span></td>
            <td>
              <el-input v-model="input"></el-input>
            </td>
          </tr>
          <tr>
            <td>优先级：<span style="color:red">*</span></td>
            <td>
              <el-input v-model="input"></el-input>
            </td>
          </tr>
          <tr>
            <td>企业介绍:</td>
            <td>
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
            </td>
            <td></td>
            <td>
              <el-button type="primary" @click="onSubmit">添加</el-button>
              <el-button type="primary" @click="cancel">取消</el-button>
            </td>
          </tr>
        </table>
      </el-form>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {};
  },
  methods:{
    cancel(){
      this.$router.push({ path:'/sAddcompany'})
    }
  }

};
</script>
<style scoped>
.addcompany {
  width: 100%;
  height: 100%;
}
.center {
  display: flex;
  height: 580px;
  justify-content: center;
  align-items: center;
}
table {
  width: 650px;
}
tr {
  line-height: 50px;
  text-align: right;
}
</style>
