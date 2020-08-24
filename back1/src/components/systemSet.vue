<template>
 <div class="">
     <!-- 面包屑导航 -->
    <el-breadcrumb>
        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <h3> 人员架构</h3>
    <div>
     <el-button type="primary" @click="dialogVisible = true">添加</el-button>
     <el-dialog
                title="添加用户"
                :visible.sync="dialogVisible"
                width="30%"
                @close="addDialogClosed"
               >
                   <el-form  status-icon :model="userForm" ref="addFormRef" :rules="rules" label-width="100px" class="demo-ruleForm"   >
                        <!-- <el-form-item label="部门/团队" prop="department" >
                          <el-select placeholder="请选择部门" v-model="userForm.department">
                                <el-option label="部门1" value="部门1"></el-option>
                                <el-option label="部门2" value="部门2"></el-option>
                          </el-select>
                        </el-form-item> -->
                    <el-form-item label="职级"  prop="role">
                        <el-select placeholder="请选择职级" v-model="userForm.role" @change="supRes(userForm.role)">
                            <el-option label="超级管理员" value="1"></el-option>
                            <el-option label="理赔负责人" value="2"></el-option>
                             <el-option label="主管" value="3"></el-option>
                            <el-option label="员工" value="4"></el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="岗位" prop="station">
                        <el-select placeholder="请选择岗位" v-model="userForm.station1">
                            <el-option v-for="item in options" :value=item.id :label=item.station :key="item.id"></el-option>
                           
                      </el-select>
                    </el-form-item>
                    
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="userForm.name" ></el-input>
                    </el-form-item>
                     <el-form-item label="年龄" prop="age" >
                        <el-input v-model="userForm.age" ></el-input>
                    </el-form-item>
                   
                    <el-form-item label="身份证" prop="identityCard">
                        <el-input v-model="userForm.identityCard"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="tel">
                        <el-input v-model="userForm.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" prop="account">
                        <el-input v-model="userForm.account"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="userForm.password"></el-input>
                    </el-form-item>
        
                  </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addUser()">确 定</el-button>
                </span>
     </el-dialog>   

    </div>
   
       <div class="tree-user">
          <div class="tree">
         <el-tree
          :data="data1"
          :props="defaultProps"
          :load="loadNode"
          lazy
          accordion
          @node-click="userList">
         </el-tree>
        </div>

        <div class="user">
        
            <el-form  status-icon :model="user" ref="formRef" :rules="rules" label-width="100px" class="demo-ruleForm"   >
                    <!-- <el-form-item label="部门/团队" prop="department" >
                       <el-select placeholder="请选择部门" v-model="user.department">
                            <el-option label="部门1" value="部门1"></el-option>
                            <el-option label="部门2" value="部门2"></el-option>
                      </el-select>
                    </el-form-item> -->
                    <el-form-item label="职级"  prop="role">
                        <el-select placeholder="请选择职级" v-model="user.role"  @change="supRes(user.role)">
                            <el-option label="超级管理员" value="1"></el-option>
                            <el-option label="理赔负责人" value="2"></el-option>
                             <el-option label="主管" value="3"></el-option>
                            <el-option label="员工" value="4"></el-option>
                      </el-select>
                    </el-form-item>
                     <el-form-item label="岗位" prop="station">
                        <el-select placeholder="请选择岗位" v-model="user.station1">
                            <el-option v-for="item in options" :value=item.id :label=item.station :key="item.id"></el-option>
                           
                      </el-select>
                    </el-form-item>
                    
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="user.name" ></el-input>
                    </el-form-item>
                     <el-form-item label="年龄" prop="age" >
                        <el-input v-model="user.age" ></el-input>
                    </el-form-item>
                   
                    <el-form-item label="身份证" prop="identityCard">
                        <el-input v-model="user.identityCard"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="tel">
                        <el-input v-model="user.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" prop="account">
                        <el-input v-model="user.account"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="user.password"></el-input>
                    </el-form-item>
        
                </el-form>
                <div class="btn">
                   <el-button type="primary" round @click="update()">修改</el-button>
                  <el-button type="danger" round @click="remove(user.id)">删除</el-button>
                </div>
         
        </div>
       </div>
    
       
 </div>
 
</template>
 
<script>
export default {
  created(){
   this.getUser()
    this.getStation()//获取岗位
  },
 data () {
   //验证手机的规则
   var checkTel=(rule,value,cb)=>{
     const regTel=/^[1][3,4,5,7,8][0-9]{9}$/
     if(regTel.test(value)){
       return cb()
     }
     cb(new Error("请输入合格的手机号"))
   }
   //验证身份证的规则
   var checkIdentityCard=(rule,value,cb)=>{
     const regTel= /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
     if(regTel.test(value)){
       return cb()
     }
     cb(new Error("请输入合格的身份证"))
   }
 return {
   //返回的岗位
    expands: [],
     //岗位
     station:[],
     options:[],

    user:{},
    options:[],
     userForm:{
          account:'', //账号
          password:'',//密码
          name:'',//姓名
          identityCard:'', //身份证
          age:'',//年龄
          tel:'', //电话
          station:'',//岗位
          role:'',//角色
     },

       list:[],
      dialogVisible: false,
      data1:[],
        defaultProps: {
          children: 'childNodes',
          label: 'station',
           isLeaf: 'leaf'
         },
        //添加表单的验证
        rules:{
          department:[
            { required: true, message: '请选择部门', trigger: 'change'}
          ],
          // station:[
          //   {required: true, message: '请选择岗位', trigger: 'change'}
          // ],
          role:[
            {required: true, message: '请选择角色', trigger: 'change'}
          ],
          name:[
             { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          age:[
            { required: true, message: '请输入年龄', trigger: 'blur' },
           
          ],
          tel:[
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: checkTel, trigger: 'blur' }
          ],
          identityCard:[
             { required: true, message: '请输入身份证号', trigger: 'blur' },
            { validator: checkIdentityCard, trigger: 'blur' }
          ],
          account:[
             { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password:[
             { required: true, message: '请输入用密码', trigger: 'blur' },
              { min:6, max: 16, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
 }
 },
 methods: {
   //监听对话框关闭事件
     addDialogClosed(){
    this.$refs.addFormRef.resetFields();
     },
     //角色的联动
      supRes(val){
        console.log(val)
        this.roleId=val
        console.log(this.roleId)
        // let data={roleId:val}
        this.axios.get('getStationByRoleId',{params: {
              roleId: val
            }}).then(res=>{
          console.log(res.data.data)
          this.options=res.data.data
          console.log(this.options)
        })

        
      },
      //获取岗位
    getStation(){
        this.axios.get('getSubStation/ByRole').then(res=>{
               console.log(res.data.data)
            this.station=res.data.data
        })
    },


     userList(data){
       console.log(data)
       if(data.name!=undefined){
        this.user=data
       }
       console.log(this.user)
       if(this.user.role==1){
         this.user.role="超级管理员"
       }else if(this.user.role==2){
          this.user.role="理赔负责人"
       }else if(this.user.role==3){
          this.user.role="主管"
       }else if(this.user.role==4){
          this.user.role="员工"
       }
     },
     //修改员工
     update(){
       console.log(this.user)
       let userList=this.user
      //  userList.station=userList.station1
      // 
      if(userList.role=="超级管理员"){
        userList.role1=1
      }else if(userList.role=="理赔负责人"){
         userList.role1=2
      }else if(userList.role=="主管"){
         userList.role1=3
      }else if(userList.role=="员工"){
         userList.role1=4
      }else{
        userList.role1=userList.role
      }
      // console.log(userList)
       if(userList.station1=="定损中心(福田)"&&userList.role1==3){
         userList.station2=1
       }else if(userList.station1=="定损中心(福田)"&&userList.role1==4){
          userList.station2=2
       }else if(userList.station1=="定损中心(罗湖)"&&userList.role1==3){
          userList.station2=3
       }else if(userList.station1=="定损中心(罗湖)"&&userList.role1==4){
         userList.station2=4
       }else if(userList.station1=="定损中心(南山)"&&userList.role1==3){
          userList.station2=5
       }else if(userList.station1=="定损中心(南山)"&&userList.role1==4){
         userList.station2=6
       }else if(userList.station1=="定损中心(宝安)"&&userList.role1==3){
          userList.station2=7
       }else if(userList.station1=="定损中心(宝安)"&&userList.role1==4){
         userList.station2=8
       }else if(userList.station1=="定损中心(龙岗)"&&userList.role1==3){
          userList.station2=9
       }else if(userList.station1=="定损中心(龙岗)"&&userList.role1==4){
         userList.station2=10
       }else if(userList.station1=="定损中心(龙岗/光明)"&&userList.role1==3){
          userList.station2=11
       }else if(userList.station1=="定损中心(龙岗/光明)"&&userList.role1==4){
         userList.station2=12
       }else if(userList.station1=="定损中心(龙岗/观澜)"&&userList.role1==3){
          userList.station2=13
       }else if(userList.station1=="定损中心(龙岗/观澜)"&&userList.role1==4){
         userList.station2=14
       }else if(userList.station1=="视频查勘中心"&&userList.role1==3){
          userList.station2=15
       }else if(userList.station1=="视频查勘中心"&&userList.role1==4){
         userList.station2=16
       }else if(userList.station1=="视频定损中心"&&userList.role1==3){
          userList.station2=17
       }else if(userList.station1=="视频定损中心"&&userList.role1==4){
         userList.station2=18
       }else if(userList.station1=="核价报价岗"&&userList.role1==3){
          userList.station2=19
       }else if(userList.station1=="核价报价岗"&&userList.role1==4){
         userList.station2=20
       }else if(userList.station1=="通赔岗"&&userList.role1==3){
          userList.station2=21
       }else if(userList.station1=="通赔岗"&&userList.role1==4){
         userList.station2=22
       }else if(userList.station1=="非车险财产大案理赔岗"&&userList.role1==3){
          userList.station2=23
       }else if(userList.station1=="非车险财产大案理赔岗"&&userList.role1==4){
         userList.station2=24
       }else if(userList.station1=="非车险财产小案理赔岗"&&userList.role1==3){
          userList.station2=25
       }else if(userList.station1=="非车险财产小案理赔岗"&&userList.role1==4){
         userList.station2=26
       }else if(userList.station1=="核损岗"&&userList.role1==3){
          userList.station2=27
       }else if(userList.station1=="大案运营岗"&&userList.role1==4){
         userList.station2=28
       }else if(userList.station1=="核损岗"&&userList.role1==4){
          userList.station2=29
       }else if(userList.station1=="核赔岗"&&userList.role1==3){
         userList.station2=30
       }else if(userList.station1=="核赔岗"&&userList.role1==4){
          userList.station2=31
       }else if(userList.station1=="理算中心"&&userList.role1==4){
         userList.station2=32
       }else if(userList.station1=="车险人伤理赔岗"&&userList.role1==3){
          userList.station2=33
       }else if(userList.station1=="车险人伤医疗审核岗"&&userList.role1==4){
         userList.station2=34
       }else if(userList.station1=="非门诊车险人伤调查岗"&&userList.role1==4){
         userList.station2=35
       }else if(userList.station1=="门诊车险人伤调查岗"&&userList.role1==4){
         userList.station2=36
       }else if(userList.station1=="雇主险意外险健康险理赔岗"&&userList.role1==3){
         userList.station2=37
       }else if(userList.station1=="雇主险意外险健康险核赔岗"&&userList.role1==4){
         userList.station2=38
       }else if(userList.station1=="雇主险意外险健康险大案理赔岗"&&userList.role1==4){
         userList.station2=39
       }else if(userList.station1=="雇主险意外险健康险小案理赔岗"&&userList.role1==4){
         userList.station2=40
       }else if(userList.station1=="诉讼追偿岗"&&userList.role1==3){
         userList.station2=41
       }else if(userList.station1=="诉讼岗"&&userList.role1==4){
         userList.station2=42
       }else if(userList.station1=="追偿岗"&&userList.role1==4){
         userList.station2=43
       }else if(userList.station1=="稽核科"&&userList.role1==3){
         userList.station2=44
       }else if(userList.station1=="反欺诈调查岗"&&userList.role1==4){
         userList.station2=45
       }else if(userList.station1=="稽核岗"&&userList.role1==4){
         userList.station2=46
       }else{
         userList.station2=userList.station1
       }
       console.log(userList)
       let obj={
         name:userList.name,
         role:userList.role1,
         station:userList.station2,
         age:userList.age,
         identityCard:userList.identityCard,
         tel:userList.tel,
         account:userList.account,
         password:userList.password,
         id:userList.id,
         department:userList.department

       }
       console.log(obj)
     
      this.axios.put('updateUser',JSON.stringify(obj), {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }).then(res => {
          if (res.data.code !==1) {
            console.log(res.meta);
            return this.$message.error("修改失败");
          }
          this.$message.success("修改成功");
          console.log(res.data);
        });

     },
     //删除员工
     
     async remove(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => {
        return err;
      });
      console.log(confirmResult);
      if (confirmResult !== "confirm") {
        return this.$message.info("取消删除");
      }
      this.axios.delete("deleteUserById",{params: {id: id}})
        .then(res => {
          if (res.data.code !==1) {
            console.log(res.meta);
            return this.$message.error("删除失败");
          }
          this.$message.success("删除成功");
           this.$refs.formRef.resetFields();
           this. loadchildnode1()
          
        });
    },
      //获取一级岗位
      getUser(resolve){
        this.axios.get('/getLeaderStation').then(res=>{
          console.log(res.data)
          let obj=res.data.data
           this.data1=obj
          //  console.log(data1)
          //  return resolve(obj)
        })
       
      },
      //赖加载
      loadNode(node, resolve){
        // console.log(node.level)
        // console.log(resolve)
        // if(node.level==0){
        //   this.getUser(resolve)
        // }
        if(node.level==1){
          this.loadchildnode(node, resolve);
        }
        if(node.level==2){
           this.loadchildnode1(node, resolve);
        }

      },
      //获取2级岗位
      loadchildnode(node,resolve){
        // console.log(node.data.id)
        this.axios.get('/getEmpStation',{params:{stationId:node.data.id}}).then(res=>{
          // console.log(res.data.data)
          if(res.data.data.claimUserList!=null){
            let obj=res.data.data.claimUserList[0]
             let tmp = JSON.stringify(obj.station);//将对象转换为json字符串形式
           let result = JSON.parse(tmp);
           console.log(result)
           if(result==1){
                   result="定损中心(福田)"
                 }else if(result==2){
                  result="定损中心(福田)"
                }else if(result==3){
                   result="定损中心(罗湖)"
                }else if(result==4){
                   result="定损中心(罗湖）"
                }else if(result==5){
                   result="定损中心(南山)"
                }else if(result==6){
                   result="定损中心(南山)"
                }else if(result==7){
                  result="定损中心(宝安)"
                }else if(result==8){
                   result="定损中心(宝安)"
                }else if(result==9){
                   result="定损中心(龙岗)"
                }else if(result==10){
                  result="定损中心(龙岗)"
                }else if(result==11){
                   result="定损中心(龙岗/光明)"
                }else if(result==12){
                   result="定损中心(龙岗/光明)"
                }else if(result==13){
                   result=">定损中心(龙岗/观澜）"
                }else if(result==14){
                   result=">定损中心(龙岗/观澜)"
                }else if(result==15){
                   result="视频查勘中心"
                }else if(result==16){
                  result="视频查勘中心"
                }else if(result==17){
                  result="视频定损中心"
                }else if(result==18){
                   result="视频定损中心"
                }else if(result==19){
                   result="核价报价岗"
                }else if(result==20){
                   result="核价报价岗"
                }else if(result==21){
                  result="通赔岗"
                }else if(result==22){
                  result="通赔岗"
                }else if(result==23){
                  result="非车险财产大案理赔岗"
                }else if(result==24){
                  result="非车险财产大案理赔岗"
                }else if(result==25){
                  result="非车险财产小案理赔岗"
                }else if(result==26){
                  result="非车险财产小案理赔岗"
                }else if(result==27){
                  result="核损岗"
                }else if(result==28){
                  result="大案运营岗"
                }else if(result==29){
                  result="核损岗"
                }else if(result==30){
                  result="核赔岗"
                }else if(result==31){
                  result="核赔岗"
                }else if(result==32){
                  result="理算中心"
                }else if(result==33){
                  result="车险人伤理赔岗"
                }
                else if(result==34){
                  result="车险人伤医疗审核岗"
                }else if(result==35){
                  result="非门诊车险人伤调查岗"
                }else if(result==36){
                  result="门诊车险人伤调查岗"
                }else if(result==37){
                  result="雇主险意外险健康险理赔岗"
                }else if(result==38){
                  result="雇主险意外险健康险核赔岗"
                }else if(result==39){
                  result="雇主险意外险健康险大案理赔岗"
                }else if(result==40){
                  result="雇主险意外险健康险小案理赔岗"
                }else if(result==41){
                  result="诉讼追偿岗"
                }else if(result==42){
                  result="诉讼岗"
                }else if(result==43){
                  result="追偿岗"
                }else if(result==44){
                  result="稽核科"
                }else if(result==45){
                  result="反欺诈调查岗"
                }else if(result==46){
                  result="稽核岗"
                }
           obj.station1=result
          
          obj.station=obj.name
          
          obj.leaf=true
          // console.log(obj)
          let data=res.data.data.lpStationList
          data.unshift(obj)
          console.log(data)
         return resolve(res.data.data.lpStationList);

          }else{
             return resolve(res.data.data.lpStationList);
          }
          
        })
      },
      //获取2级岗位下的员工
       loadchildnode1(node,resolve){
         console.log(node.data.id)
         this.axios.get('getEmployees',{params:{stationId:node.data.id}}).then(res=>{
          //  console.log(res.data.data)
           let user1=res.data.data
           console.log(user1)
            let tmp = JSON.stringify(user1);//将对象转换为json字符串形式
           let result = JSON.parse(tmp);
           for(var i=0;i<result.length;i++){
             result[i].station1=JSON.parse(JSON.stringify(result[i].station))
             result[i].station=result[i].name
             result[i].leaf=true 
             if (result[i].station1==1){
               result[i].station1=="定损中心(福田)"
                 }else if( result[i].station1==2){
                      result[i].station1="定损中心(福田)"
                  }else if( result[i].station1==3){
                      result[i].station1="定损中心(罗湖)"
                }else if( result[i].station1==4){
                      result[i].station1="定损中心(罗湖）"
                }else if( result[i].station1==5){
                        result[i].station1="定损中心(南山)"
                }else if( result[i].station1==6){
                     result[i].station1="定损中心(南山)"
                }else if( result[i].station1==7){
                     result[i].station1="定损中心(宝安)"
                }else if( result[i].station1==8){
                 result[i].station1="定损中心(宝安)"
                }else if( result[i].station1==9){
                   result[i].station1="定损中心(龙岗)"
                }else if( result[i].station1==10){
                   result[i].station1="定损中心(龙岗)"
                }else if( result[i].station1==11){
                  result[i].station1="定损中心(龙岗/光明)"
                }else if( result[i].station1==12){
                   result[i].station1="定损中心(龙岗/光明)"
                }else if( result[i].station1==13){
                     result[i].station1=">定损中心(龙岗/观澜)）"
                }else if( result[i].station1==14){
                    result[i].station1=">定损中心(龙岗/观澜)"
                }else if( result[i].station1==15){
                     result[i].station1="视频查勘中心"
                }else if( result[i].station1==16){
                     result[i].station1="视频查勘中心"
                }else if( result[i].station1==17){
                   result[i].station1="视频定损中心"
                }else if( result[i].station1==18){
                  result[i].station1="视频定损中心"
                }else if( result[i].station1==19){
                     result[i].station1="核价报价岗"
                }else if( result[i].station1==20){
                   result[i].station1="核价报价岗"
                }else if( result[i].station1==21){
                   result[i].station1="通赔岗"
                }else if( result[i].station1==22){
                   result[i].station1="通赔岗"
                }else if( result[i].station1==23){
                   result[i].station1="非车险财产大案理赔岗"
                }else if( result[i].station1==24){
                   result[i].station1="非车险财产大案理赔岗"
                }else if( result[i].station1==25){
                   result[i].station1="非车险财产小案理赔岗"
                }else if( result[i].station1==26){
                   result[i].station1="非车险财产小案理赔岗"
                }else if( result[i].station1==27){
                   result[i].station1="核损岗"
                }else if( result[i].station1==28){
                   result[i].station1="大案运营岗"
                }else if( result[i].station1==29){
                   result[i].station1="核损岗"
                }else if( result[i].station1==30){
                   result[i].station1="核赔岗"
                }else if( result[i].station1==31){
                   result[i].station1="核赔岗"
                }else if( result[i].station1==32){
                   result[i].station1="理算中心"
                }else if( result[i].station1==33){
                   result[i].station1="车险人伤理赔岗"
                }
                else if( result[i].station1==34){
                   result[i].station1="车险人伤医疗审核岗"
                }else if( result[i].station1==35){
                   result[i].station1="非门诊车险人伤调查岗"
                }else if( result[i].station1==36){
                   result[i].station1="门诊车险人伤调查岗"
                }else if( result[i].station1==37){
                   result[i].station1="雇主险意外险健康险理赔岗"
                }else if( result[i].station1==38){
                   result[i].station1="雇主险意外险健康险核赔岗"
                }else if( result[i].station1==39){
                   result[i].station1="雇主险意外险健康险大案理赔岗"
                }else if(result==40){
                  result="雇主险意外险健康险小案理赔岗"
                }else if( result[i].station1==41){
                   result[i].station1="诉讼追偿岗"
                }else if( result[i].station1==42){
                   result[i].station1="诉讼岗"
                }else if( result[i].station1==43){
                   result[i].station1="追偿岗"
                }else if( result[i].station1==44){
                   result[i].station1="稽核岗"
                }else if( result[i].station1==45){
                   result[i].station1="反欺诈调查岗"
                }else if( result[i].station1==46){
                   result[i].station1="稽核岗"
                }
           }
           
           console.log(result)
           return resolve(result)
         })
       },
      //添加用户
      addUser(){
          this.dialogVisible = false;
      
       this.$refs.addFormRef.validate(valid=>{
         console.log(valid)
         if(!valid) return
          // this.dialogVisible=false
          console.log(this.userForm)
        let user=this.userForm

         for(var i=0; i<user.length;i++){
           if(user.role="超级管理员"){
             user.role=1
           }else if(user.role="理赔负责人"){
             user.role=2
           }else if(user.role="主管"){
             user.role=3
           }else if(user.role="员工"){
             user.role=4
           }
         }
       
        user.station=user.station1
         console.log(user)
        this.axios.post('addUser',user,{
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }}).then(res=>{
          console.log(res.data)
           
           if(res.data.code==1){
              this.$message.success("添加成功");
              this.dialogVisible=false
           }else{
             this.$message.error("添加失败");
           }
        })

       })
      },
      //角色的联动
      supRes(val){
        console.log(val)
        // let data={roleId:val}
        this.axios.get('getStationByRoleId',{  params: {
              roleId: val
            }}).then(res=>{
          console.log(res.data.data)
          this.options=res.data.data
          console.log(this.options)
          
        })

        
      },
      sup(id){
        console.log(id)
        // console.log(this.userForm.station)
      },



 

      rowClick(row, event, column) {
      Array.prototype.remove = function (val) {
      let index = this.indexOf(val);
      if (index > -1) {
      this.splice(index, 1);
     }
    };
 
    if (this.expands.indexOf(row.id) < 0) {
     this.expands.push(row.id);
    } else {
     this.expands.remove(row.id);
    }
 
   }
    }
}
</script>
 
<style scoped lang = "scss">
.d-flex{
    display: flex;

}
.box-card{
    width: 500px;
    .demo-ruleForm{
        width: 400px;
    }
}
 .card2{
     margin-left:50px ;
 }
 .tree-user{
   display: flex;
 }
 .tree{
   width: 500px;
   border: 1px solid wheat;
 }
 .user{
   width: 500px;
   border: 1px solid wheat;
   margin-left: 50px;
 }
 
</style>