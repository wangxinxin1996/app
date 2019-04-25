<template>
  <!--
    	添加管理员，或者系统管理员
  -->
  <div id="AddUser">
    <AdminHead @getUserList="getUserList"></AdminHead>
    <el-button
      type="primary"
      size="small"
      icon="search"
      @click="dialogFormVisible=true"
      class="left"
    >新建用户</el-button>
    <el-dialog title="新建用户" :visible.sync="dialogFormVisible">
      <el-form :model="user" ref="User" :rules="rule">
        <el-row>
          <el-col :span="8">
            <el-form-item label="用户区域：" prop="countName" :label-width="formLabelWidth">
              <el-select v-model="user.countName" placeholder="请选择省市">
                <el-option label="重庆市" value="chongqing"></el-option>
                <el-option label="北京市" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="countName" :label-width="formLabelWidth">
              <el-select v-model="user.countName" placeholder="请选择城市">
                <el-option label="重庆市" value="chongqing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="countName" :label-width="formLabelWidth">
              <el-select v-model="user.countName" placeholder="请选择区县">
                <el-option label="巴南区" value="banan"></el-option>
                <el-option label="渝中区" value="yuzhong"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="账号:" prop="countName" :label-width="formLabelWidth">
          <el-input v-model="user.countName" class="input_width" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名:" prop="userName" :label-width="formLabelWidth">
          <el-input v-model="user.userName" class="input_width" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password" :label-width="formLabelWidth">
          <el-input type="password" v-model="user.password" class="input_width" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户类型:" prop="identity" :label-width="formLabelWidth">
          <el-select class="input_width" v-model="user.identity" placeholder="请选择用户类型">
            <el-option label="系统管理员" value="sysAdmin"></el-option>
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="巡检员" value="admin"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Cancel('User')">取 消</el-button>
        <el-button type="primary" @click="onSubmit('User')">新 建</el-button>
      </div>
    </el-dialog>
    <!-- <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/> -->
    <el-button type="primary" size="small" icon="search" @click="onMoreCreateUser()">批量导入</el-button>
    <el-table :data="Usermessage" stripe style="width: 100%">
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
          <span>{{scope.row.password }}</span>
        </template>
      </el-table-column>
        
      <el-table-column prop="rolePermission" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.rolePermission.role.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rolePermission" label="区域">
        <template slot-scope="scope">
          <span>{{ scope.row.rolePermission.permission }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="Modify(scope.$index, Usermessage)"
            type="text"
            size="small"
          >
            <i class="el-icon-edit"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="信息修改" :visible.sync="dialogFormVisibles">
      <el-form :model="user">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="user.countName" class="input_width" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="user.userName" class="input_width" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="user.password" class="input_width" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibles = false">取 消</el-button>
        <el-button type="primary" @click="editDo">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import AdminHead from "../components/AdminHead";
// import Operation from "../components/Operation";
import qs from "qs";
export default {
  name: "AddUser",
  components: {
    AdminHead
    // Operation
  },
  data() {
    return {
      userIndex: "",

      rule: {
        countName: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        identity: [
          { required: true, message: "请选择用户类型", trigger: "blur" }
        ],
        userName: [{ required: true, message: "用户不能为空", trigger: "blur" }]
      },
      Usermessage: [],
      dialogFormVisible: false,
      dialogFormVisibles: false,
      user: {
        userName: "",
        password: "",
        countName: "",
        rolePermission:{
          role:"",
        },
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    //获取查询到的数据
    getUserList(users) {
      console.log(users)
      this.Usermessage=users;
      // var len = users.length;
      // console.log(users);
      // var identitys = users.identity;
      // let user = users;
      // for (var i = 0; i < len; i++) {
      //   var identitys = users[i].identity;
      //   switch (identitys) {
      //     case "admin":
      //       user[i].identity = "管理员";
      //       break;
      //     case "sysAdmin":
      //       user[i].identity = "系统管理员";
      //       break;
      //     default:
      //       break;
      //   }
      // }
      // this.Usermessage = user;
    },

    onSubmit(User) {
      this.$refs[User].validate(val => {
        // 当信息不完整时点击新建提示新建失败
        if (
          (this.user.userName === "") |
          (this.user.Password === "") |
          (this.user.identity === "") |
          (this.user.countName === "")
        ) {
          alert("添加失败！");
        } else {
          this.$axios
            .post("api/profile/users/addUser", qs.stringify(this.user))
            .then(res => {
              if (val) {
                this.$refs[User].resetFields();
                this.dialogFormVisible = false;
                alert("添加成功！");
              } else {
                console.log("err");
              }
            });
        }
      });
    },
    Cancel(User) {
      //页面渲染结束之后置空
      this.$refs[User].resetFields();
      this.dialogFormVisible = false;
    },
    Modify(index, row) {
      this.userIndex = index;
      this.dialogFormVisibles = true;
    },

    editDo() {
      let index = this.userIndex;
      //根据索引，赋值到list制定的数
      this.Usermessage[index] = this.user;
      //关闭弹窗
      this.dialogFormVisibles = false;
    }
  }
};
</script>

<style scoped>
.input_width {
  width: 300px;
}
.left {
  margin-right: 10px;
}
</style>