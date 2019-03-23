<template>
	<div class="login">
		<section class="form_container">
			<div class="manage_tip">
				<span class="title">餐厨油烟监测系统</span>
			</div>
			<el-form :model="loginUser" ref="loginForm" class="loginForm" label-width="60px">
				<el-form-item label="账号" prop="email">
					<el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登 录</el-button>
				</el-form-item>
				
				<!--<div class="tiparea">
                    <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
                </div>-->
			</el-form>
		</section>
	</div>
</template>

<script>
	import jwt_decode from "jwt-decode";
	import qs from "qs";

	export default {
		name: "login",
		data() {
			return {
				loginUser: {
					email: "",
					password: ""
				},
				//    rules: {
				//      email: [
				//        {
				//          type: "email",
				//          required: true,
				//          message: "邮箱格式不正确",
				//          trigger: "change"
				//        }
				//      ],
				password: [{
						required: true,
						message: "密码不能为空",
						trigger: "blur"
					},
					{
						min: 6,
						max: 30,
						message: "长度在 6 到 30 个字符",
						trigger: "blur"
					}
				]
				//    }
			};
		},
		methods: {
			submitForm(formName) {
				    this.$refs[formName].validate(valid => {
				      if (valid) {
				        this.$axios.post("/api/users/login", this.loginUser).then(res => {
				          // 登录成功
				          const { token } = res.data;
				          localStorage.setItem("eleToken", token);
				
				          // 解析token
				          const decode = jwt_decode(token);
				
				          // 存储数据
				          this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
				          this.$store.dispatch("setUser", decode);
				
				          // 页面跳转
				          this.$router.push("/aindex");
				        });
				      } else {
				        console.log("error submit!!");
				        return false;
				      }
				    });

//				this.$axios.post("/api/user/login", qs.stringify({
//						countName: 123456,
//						password: 888
//					}))
//					.then(res => {
//						console.log(res);
//						
//					}).catch(err => {
//						console.log("err");
//					})
//					this.$router.push('/aindex');
			},
			isEmpty(value) {
				return(
					value === undefined ||
					value === null ||
					(typeof value === "object" && Object.keys(value).length === 0) ||
					(typeof value === "string" && value.trim().length === 0)
				);
			}
		}
	};
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