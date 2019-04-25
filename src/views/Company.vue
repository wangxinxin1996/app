<template>
  <div>
    <el-container>
      <el-header style="margin-top:50px">
        <el-button type="primary" @click="Companymess">企业信息</el-button>
        <el-button type="primary" @click="Equipmentmess">设备信息</el-button>
        <el-button type="primary">导出</el-button>
        <hr>
      </el-header>
      <el-main v-if="CompanyIsshow">
        <div class="center">
          <el-form>
            <table border="10">
              <tr>
                <td>企业编码：</td>
                <td>
                  <el-input v-model="input" placeholder="152364" :disabled="isDisabled"></el-input>
                </td>
                <td>企业名称：</td>
                <td>
                  <el-input v-model="input" placeholder="152364" :disabled="isDisabled"></el-input>
                </td>
              </tr>
              <tr>
                <td>区域：</td>
                <td>
                  <el-input v-model="input" placeholder="152364" :disabled="isDisabled"></el-input>
                </td>
                <td>街道：</td>
                <td>
                  <el-input v-model="input" placeholder="152364" :disabled="isDisabled"></el-input>
                </td>
              </tr>
              <tr>
                <td>地址：</td>
                <td>
                  <el-input v-model="input" placeholder="152364" :disabled="isDisabled"></el-input>
                </td>
                <td>电话：</td>
                <td>
                  <el-input v-model="input" placeholder="152364" :disabled="isDisabled"></el-input>
                </td>
              </tr>
              <tr>
                <td>负责人：</td>
                <td>
                  <el-input v-model="input" placeholder="152364" :disabled="isDisabled"></el-input>
                </td>
                <td>负责人电话：</td>
                <td>
                  <el-input v-model="input" placeholder="152364" :disabled="isDisabled"></el-input>
                </td>
              </tr>
              <tr>
                <td>经度：</td>
                <td>
                  <el-input v-model="input" placeholder="152364" :disabled="isDisabled"></el-input>
                </td>
                <td>纬度：</td>
                <td>
                  <el-input v-model="input" placeholder="152364" :disabled="isDisabled"></el-input>
                </td>
              </tr>
              <tr>
                <td>企业类型：</td>
                <td>
                  <el-input v-model="input" placeholder="152364" :disabled="isDisabled">111</el-input>
                </td>
                <td>是否删除：</td>
                <td>
                  <el-input v-model="input" placeholder="未删除" :disabled="isDisabled"></el-input>
                </td>
              </tr>
              <tr>
                <td>优先级：</td>
                <td>
                  <el-input v-model="input" placeholder="A" :disabled="isDisabled"></el-input>
                </td>
              </tr>
              <tr>
                <td>企业介绍:</td>
                <td>
                  <el-input
                    type="textarea"
                    placeholder="152364"
                    :disabled="isDisabled"
                    :autosize="{ minRows: 2, maxRows: 4}"
                  ></el-input>
                </td>
                <td></td>
                <td>
                  <el-button type="primary" @click="Cancel" v-if="IsCancel">取消</el-button>
                  <el-button type="primary" @click="Alter" v-if="Isalter">修改</el-button>
                  <el-button type="primary" @click="Back" v-if="Isalter">返回</el-button>
                  <el-button type="primary" @click="onSubmit" v-if="IsCancel">保存修改</el-button>
                </td>
              </tr>
            </table>
          </el-form>
        </div>
      </el-main>
      <el-main v-if="EquipmentmessIsshow">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" label="设备编号"></el-table-column>
          <el-table-column prop="name" label="设备名称"></el-table-column>
          <el-table-column prop="address" label="MN号"></el-table-column>
          <el-table-column prop="address" label="上报间隔时间(min)"></el-table-column>
          <el-table-column prop="address" label="经度"></el-table-column>
           <el-table-column prop="address" label="纬度"></el-table-column>
            <el-table-column prop="address" label="出场编号"></el-table-column>
             <el-table-column prop="address" label="物联卡号"></el-table-column>
            <el-table-column prop="address" label="软件版本号"></el-table-column>
        </el-table>
         <el-button type="primary" @click="add">添加设备</el-button>
         <el-button type="primary" @click="Back" v-if="Isalter">返回</el-button>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      CompanyIsshow: true,
      EquipmentmessIsshow: false,
      isDisabled: true,
      Isalter: true,
      IsCancel: false,
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    };
  },
  methods: {
    Equipmentmess() {
      console.log(1);
      this.CompanyIsshow = false;
      this.EquipmentmessIsshow = true;
    },
    Companymess() {
      console.log(1);
      this.CompanyIsshow = true;
      this.EquipmentmessIsshow = false;
    },
    Alter() {
      this.isDisabled = false;
      this.Isalter = false;
      this.IsCancel = true;
    },
    Cancel() {
      this.isDisabled = true;
      this.Isalter = true;
      this.IsCancel = false;
    },
    Back(){
      this.$router.push({path:"/companymessage"})
    },
    onSubmit() {}
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

