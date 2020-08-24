
<template>
<div class="login-container">
   
    <div class="login-box">
        <h2>理赔绩效考核系统</h2>
        <div class="logo">
           <img src="../assets/img/hhh.png" alt="">
        </div>
            <!-- 用户名 -->
            <el-form class="login-form" ref="ref" :model="loginForm"  label-width="80px" :rules="loginFormRules">
                <el-form-item label="用户名" prop="account">
                  <el-input v-model="loginForm.account" ></el-input>
                </el-form-item>
             

                <!-- 密码 -->

                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                     <!-- 按钮 -->
               <el-form-item class="btns">
                 <el-button type="primary" @click="login"> 登录 </el-button>
                  <el-button type="info" @click="reset"> 重置 </el-button>
               </el-form-item>
            </el-form>
    </div>
</div>

</template>
<script>
export default {
  name: "login",
  data() {
    return {
    loginForm:{
        account:'123456',
        password:'123456'
    },

    //表单验证规则
    loginFormRules:{
        account:[
            {  message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' 
            }],
            password:[
               
            {  message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 100, message: '长度在 3 到 10 个字符', trigger: 'blur' 
            }
            ]
    }
     
    };
  },
  created(){
    //   this.setList()
  },
  methods:{
    //重置用户名和密码
      reset(){
          console.log(this)
          this.$refs.ref.resetFields()
      },
      // 登陆请求
      login(){
          this.$refs.ref.validate(valid=>{
            console.log(valid)
            if(!valid) return;

          })
          //  console.log(this.loginForm)
           let data={
              account:this.loginForm.account,
              password:this.loginForm.password
           }
         
           this.axios.get('/login',{
            params:data
           }).then(res=>{
              console.log(res)
              
             if(res.data.code==1){
               console.log(res.data)
               //把token存储在本地
                window.sessionStorage.setItem('token',res.data.data)
              this.$router.push('/Home')
              // window.history.go(0);
              
            
             }else{
                 this.$message.error('登录失败')
             }
          })
       
      },
    
  }

};
</script>
<style scoped  lang="scss">
.login-container{
    background-color: 	#6495ED;
    height: 100%;
}
  .login-box {
    width: 480px; 
    height: 300px;
    background-color: white;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)

  }
h2{
    position: absolute;
    left: 50%;
    top:-150px;
    transform: translate(-50%,-50%)


}
  .logo{
     width: 150px;
     height: 150px;
     border: 1px solid #eee;
     border-radius: 50%;
     /* padding: 10px; */
     box-shadow: 0 0 10px #ddd;
     position: absolute;
     left: 50%;
     transform: translate(-50%,-50%)
  }
  .logo>img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
  }
  .btns{
      display: flex;
      justify-content: flex-end
  }
  .login-form{
      position: absolute;
      bottom: 0;
      width: 80%;
      margin-left:5%; 
  }
</style>

