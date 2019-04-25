<template>
  <div id="DeleteUser">
    <AdminHead @getUserList="getUserList"></AdminHead>
    <el-button
      type="primary"
      size="small"
      icon="search"
      class="left"
      @click="onMoreCreateUser()"
    >删除用户</el-button>
    <el-button type="primary" size="small" icon="search" @click="onMoreCreateUser()">批量删除</el-button>
    <el-table :data="Usermessage" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange()"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="countName" label="账号">
        <template slot-scope="scope">
          <span>{{ scope.row.countName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="password" label="密码">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="identity" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.identity }}</span>
        </template>
      </el-table-column>
        <el-table-column prop="userName" label="区域">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent=" (scope.$index, Usermessage)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AdminHead from "../components/AdminHead";
import Operation from "../components/Operation";
export default {
  name: "DeleteUser",
  components: {
    AdminHead,
    Operation
  },
  data() {
    return {
      dialogVisible: false,
      user: {
        userName: "",
        password: "",
        identity: "",
        countName: ""
      },
      Usermessage: []
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    getUserList(users) {
      var len = users.length;
      var identitys = users.identity;
      let user = users;
      for (var i = 0; i < len; i++) {
        var identitys = users[i].identity;
        switch (identitys) {
          case "admin":
            user[i].identity = "管理员";
            break;
          case "sysAdmin":
            user[i].identity = "系统管理员";
            break;
          default:
            break;
        }
      }
      this.Usermessage = user;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    }
   
  },
   deleteRow(index, rows) {
      rows.splice(index, 1);
       dialogVisible = true;
    }
};
</script>

<style scoped>
</style>