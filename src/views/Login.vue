<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">餐厨油烟监测系统</span>
            </div>
            <el-form :model="loginUser" :rules="rules" ref="loginForm" class="loginForm" label-width="60px">
                <el-form-item label="账号" prop="countName">
                    <el-input v-model="loginUser.countName" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="submitForm('loginForm')" class="submit_btn">登  录</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import qs from 'qs';
import { constants, copyFile } from 'fs';

export default {
  name: "login",
  data() {
    return {
      loginUser: {
        countName: "",
        password: ""
      },
      rules: {
        countName: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ]
      }, 
      role: {
        sysAdmin:"系统管理员",
        admin:"管理员",
        inspector:"巡检员",
        enterprise:"企业"
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
          .post("/api/login", qs.stringify(this.loginUser))
          .then(res => {
            // 登录失败        
            if(!res.data.state){
              // 暂时简单提示
              this.$message.error('密码错误！');
              this.loginUser.password = "";
              return ;
            }
            //登录成功
            const { token } = res.data.obj;
            localStorage.setItem("eleToken", token);
            // 解析token
            const decode = jwt_decode(token);
            localStorage.setItem("userId",decode.data.id);
            // console.log(decode);

            // 存储数据
            this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
            this.$store.dispatch("setUser", decode.data);
 			
            // 页面跳转
            this.pageSkip(decode.data.rolePermission.role.roleName);
          }).catch(err => {
            console.log(err);
            this.$message.error('登录出错！');
          });
        } else {
          this.$message.error('表单验证出错！');
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
    //身份验证,页面跳转
    pageSkip(roleName){
      const {sysAdmin,admin,inspector,enterprise} = this.role;
      const user = this.$store.getters.user;
      // 获取用户查询权限范围
      this.$axios.get("/api/profile/region/getEnterpriseRegionInfo",{
        params:{
          roleName:user.rolePermission.role.roleName,
          permission:user.rolePermission.permission,
          level:user.rolePermission.role.level
        }}).then(res => {
          this.$store.dispatch("setEnterpriseRegion",res.data)
      })
      //管理员跳转页面
      if(roleName.includes(admin)){
        //系统管理员
        if(roleName===sysAdmin){
          this.$router.push({name:'index',params:{roleName}});
        }else{
          this.$router.push({name:'aindex',params:{roleName}});
        }
        return;
      }

      //企业用户
      if(roleName===enterprise){
        this.$router.push({name:'cindex',params:{roleName}});
      }
    }
  }
}
</script>

<style scoped>
	.login {
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom right, #ffffff, #87cefa, #000fff, #ccccff);
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.form_container {
		width: 370px;
		height: 210px;
		border-radius: 5px;
		text-align: center;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
	}
	
	.form_container .manage_tip .title {
		font-family: "Microsoft YaHei";
		font-weight: bold;
		font-size: 26px;
		color: #fff;
	}
	
	.loginForm {
		margin-top: 20px;
		background-color: #fff;
		padding: 20px 40px 20px 20px;
		border-radius: 5px;
		box-shadow: 0px 5px 10px #cccc;
	}
	
	.submit_btn {
		width: 100%;
	}
	
	.tiparea {
		text-align: right;
		font-size: 12px;
		color: #333;
	}
	
	.tiparea p a {
		color: #409eff;
	}
</style>
