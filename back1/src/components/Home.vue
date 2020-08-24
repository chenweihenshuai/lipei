<template>
   
       <el-container class="home-container">
         
           <!-- 头部 -->
        <el-header class="user">
          
          <div>
            <img src="../assets/img/logo.png" alt="">
            <span>理赔绩效考核系统</span>
          </div>
             <el-dropdown>
                  <el-button type="primary">
                  个人中心<i class="el-icon-arrow-down el-icon--right"></i>
                 </el-button>
                  <el-dropdown-menu slot="dropdown">
                   <div class="card">

                       <div>
                        <span>员工:</span><span class="mag-r">{{user.name}}</span>
                      </div>
                      <div>
                        <span>部门:</span><span class="mag-r">理赔部</span>
                      </div>

                     <div>
                        <span>角色:</span>
                        <span v-if="user.role==1">超级管理员</span>
                        <span v-if="user.role==2">理赔负责人</span>
                        <span v-if="user.role==3">主管</span>
                        <span v-if="user.role==4">员工</span>
                     </div>

                     <div>
                        <span>岗位:</span>
                        <span v-if="user.station==1">定损中心(福田)</span>
                        <span v-if="user.station==2">定损中心(福田)</span>
                        <span v-if="user.station==3">定损中心(罗湖)</span>
                        <span v-if="user.station==4">定损中心(罗湖)</span>
                        <span v-if="user.station==5">定损中心(南山)</span>
                        <span v-if="user.station==6">定损中心(南山)</span>
                        <span v-if="user.station==7">定损中心(宝安)</span>
                        <span v-if="user.station==8">定损中心(宝安)</span>
                        <span v-if="user.station==9">定损中心(龙岗)</span>
                        <span v-if="user.station==10">定损中心(龙岗)</span>
                        <span v-if="user.station==11">定损中心(龙岗/光明)</span>
                        <span v-if="user.station==12">定损中心(龙岗/光明)</span>
                        <span v-if="user.station==13">定损中心(龙岗/观澜)</span>
                        <span v-if="user.station==14">定损中心(龙岗观澜)</span>
                        <span v-if="user.station==15">视频查勘中心</span>
                        <span v-if="user.station==16">视频查勘中心</span>
                        <span v-if="user.station==17">视频定损中心</span>
                        <span v-if="user.station==18">视频定损中心</span>
                        <span v-if="user.station==19">核价报价岗</span>
                        <span v-if="user.station==20">核价报价岗</span>
                        <span v-if="user.station==21">通赔岗</span>
                        <span v-if="user.station==22">通赔岗</span>
                        <span v-if="user.station==23">非车险财产大案理赔岗</span>
                        <span v-if="user.station==24">非车险财产大案理赔岗</span>
                        <span v-if="user.station==25">非车险财产小案理赔岗</span>
                        <span v-if="user.station==26">非车险财产小案理赔岗</span>
                        <span v-if="user.station==27">核损岗</span>
                        <span v-if="user.station==28">大案运营岗</span>
                        <span v-if="user.station==29">核损岗</span>
                        <span v-if="user.station==30">核赔岗</span>
                        <span v-if="user.station==31">核赔岗</span>
                        <span v-if="user.station==32">理算中心</span>
                        <span v-if="user.station==33">车险人伤理赔岗</span>
                        <span v-if="user.station==34">车险人伤医疗审核岗</span>
                        <span v-if="user.station==35">非门诊车险人伤调查岗</span>
                        <span v-if="user.station==36">门诊车险人伤调查岗</span>
                        <span v-if="user.station==37">雇主险意外险健康险理赔岗</span>
                        <span v-if="user.station==38">雇主险意外险健康险核赔岗</span>
                        <span v-if="user.station==39">雇主险意外险健康险大案理赔岗</span>
                        <span v-if="user.station==40">雇主险意外险健康险小案理赔岗</span>
                        <span v-if="user.station==41">诉讼追偿岗</span>
                        <span v-if="user.station==42">诉讼岗</span>
                        <span v-if="user.station==43">追偿岗</span>
                        <span v-if="user.station==44">稽核岗</span>
                        <span v-if="user.station==45">反欺诈调查岗</span>
                        <span v-if="user.station==46">稽核岗</span>
                     </div>
                     
                    
                     <hr>
                     <div>
                        <el-button type="success" plain size="small" @click="out()">退出</el-button>
                        <el-button type="info" plain size="small"  @click="dialogVisible = true">修改密码</el-button>
                     </div>
                   </div>
                </el-dropdown-menu>
              </el-dropdown>
        </el-header>
        <el-container>
            <!-- 左侧 -->
          <el-aside :width="isCollapse? '60px':'200px'">
            <div class="toggle-btn" >|||</div>
              <el-menu
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :collapse-transition="false"
                :unique-opened="true"
                :router="true"
                >
                <!-- 没有子菜单的情况 -->
                <el-menu-item :index="item.path" v-for="item in menuList1" :key="item.path" >
                      <i class="el-icon-menu"></i>
                      <span slot="title">{{item.menuName}}</span>
                </el-menu-item>

                <!-- 有子菜单的情况 -->
                   <!-- 一级菜单 -->
                <el-submenu :index="''+item.id"   v-for="item  in menuList2" :key="item.path" >
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{item.menuName}}</span>
                  </template>
               <!-- 二级菜单 -->
                  <el-menu-item :index="subItem.path"  v-for="subItem in item.children" :key="subItem.path">
                    <template slot="title">{{subItem.menuName}}</template>
                    
                  </el-menu-item>
                
                </el-submenu> 
            </el-menu>
          </el-aside>
          <!-- 右侧 -->
          <el-main>

               <!-- 修改密码模态框 -->
            <el-dialog title="修改密码"
             :visible.sync="dialogVisible"
              width="50%">
                <el-form :rules="rules"  label-width="80px" :model="password1" ref="ref" >
                      <el-form-item label="原密码:" prop="oldpswd">
                        <el-input  v-model="password1.oldpswd" ></el-input>
                      </el-form-item>
                      <!-- 密码 -->
                      <el-form-item label="新密码:"  prop="newpswd">
                        <el-input  type="password" v-model="password1.newpswd"></el-input>
                      </el-form-item>
                          <!-- 按钮 -->
                      <el-form-item class="btns">
                      <el-button type="primary" @click="dialogVisible = false">取消 </el-button>
                        <el-button type="info" @click="preserve()"> 保存 </el-button>
                    </el-form-item>
                </el-form>
  
            </el-dialog>

            <router-view></router-view>
          </el-main>
        </el-container>
       
</el-container>
  
</template>
 
<script>
export default {
  created(){
    this.verify()
    // this.getMenu()
 
  },
 data () {
 return {
   //导航菜单
   path:{},
   menuList1:[],//没有子菜单
   menuList2:[],//有子菜单
   //用户信息
   user:'',
   userlist:'',
   isCollapse:false,
   dialogVisible:false,
   password1:{
       oldpswd:'',
       newpswd:'',
   },
   //密码验证规则
   rules:{
     oldpswd:[
        { message: '请输入原来密码', trigger: 'blur' },
        { min: 3, max: 11, message: '长度在 6 到 16 个字符', trigger: 'blur' }
     ],
      newpswd:[
        { message: '请输入原来密码', trigger: 'blur' },
        { min: 3, max: 11, message: '长度在 6 到 16 个字符', trigger: 'blur' }
     ]
   }
   }
 },
 methods:{
  // 退出按钮功能
     out(){
       window.sessionStorage.clear()
       this.menuList2=[]
       this.menuList1=[]
       
       this.$router.push("/Login")
     },

     //获取导航菜单
     verify(){  
       this.axios.get('/verify',{ withCredentials: true}).then(res=>{
         console.log(res.data)
         this.user=res.data.data
         if(res.data.code==1){
           this.axios.get('/getMenu').then(res=>{
             console.log(res.data)
               let obj=res.data.data
                let obj1=[]//没有子菜单
                let obj2=[]//有子菜单
                //筛选是否有子菜单
                for(var i=0; i<obj.length;i++){
                  if(obj[i].children.length==0){
                    obj1.push(obj[i])
                  }else{
                    obj2.push(obj[i])
                  }
                }
                console.log(obj1,obj2)
                this.menuList1=obj1
                this.menuList2=obj2
           })
         }
       })
      
    
     },
     //修改密码按钮
     preserve(){
      this.$refs.ref.validate(valid=>{
            console.log(valid)
            if(!valid) return;
          })
          if(this.user.password==this.password1.oldpswd){
            // console.log(this.password1.newpswd)
            this.user.password=this.password1.newpswd
            console.log(this.user.password)
            this.dialogVisible=false
             console.log(this.user)

             this.axios.put("/changePassword",JSON.stringify(this.user),{
                headers:{
                 "Content-Type": "application/json;charset=UTF-8"
            }
             }).then(res=>{

              console.log(res)
              if(res.data.code==1){
                 this.$message.success(res.data.data);
                  // this.$router.push('/Login')
                  

              }else{
           this.$message.error(res.data.data);
           }
             })
          }else{
             this.$message.error("原密码不对");

          }
            
         
      // }

     }
 }

}
</script>
 
<style scoped lang = "scss">
.home-container{
    height: 100%;
   
}
 .el-header {
    background-color: #B3C0D1;
  
  }
  
  .el-aside {
    background-color: #D3DCE6;
    .el-menu{
      border-right: none;
    }
   
  }
  
  .el-main {
    background-color: #E9EEF3;
   
  }
  .user{
    background-color: #D3D3D3;
    display: flex;
    justify-content: space-between;
     /* text-align: center; */
     align-items: center;
     div{
       display: flex;
       align-items: center;
     }
    img{
      width: 200px;
      height: 50px;
      border-radius: 50px;
    }
    span{
      color: white;
      font-size: 22px;
      font-weight: bold;
      margin-left: 50px;
     
    }
  }
  .toggle-btn{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
  .card{
    width: 300px;
    height: 260px;
    /* border: 1px solid red; */
    div{
      height: 45px;
      margin-left: 30px;
       /* border: 1px solid rebeccapurple; */
       .mag-r{
         margin-right: 0;
       }
       span{
         vertical-align: middle;
         height: 45px;
         display: inline-block;
         line-height: 45px;

       }

    }
  }
</style>