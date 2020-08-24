<template>
  <div class>
    <el-breadcrumb>
      <el-breadcrumb-item>规则设置/考核规则维护</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />

    <div>
      <el-form :model="form1" label-width="100px"  ref="ruleForm1">
        <div class="el-faolt">
          <el-form-item label="规则标题" prop="ruleTitle">
            <el-input v-model="form1.ruleTitle"></el-input>

          </el-form-item>
           <el-form-item label="职级"  prop="role">
          <el-select placeholder="请选择职级" v-model="form1.role" @change="supRes(form1.role)">
              <el-option label="超级管理员" value="1"></el-option>
              <el-option label="理赔负责人" value="2"></el-option>
              <el-option label="主管" value="3"></el-option>
              <el-option label="员工" value="4"></el-option>
          </el-select>
         </el-form-item>
        <el-form-item label="岗位" prop="station">
          <el-select placeholder="请选择岗位" v-model="form1.station" >
              <el-option :label=item.station :value=item.id  v-for='item in options' :key="item.id" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
           <el-button type="primary" @click="getAll()">查询</el-button>
           <el-button type="primary" @click="ruleAdd()">添加</el-button>

        </el-form-item>
        </div>

      </el-form>

    </div>
    <h3>规则列表：</h3>
   
    <p>共搜索到{{item.length}}条数据</p>
    <!-- <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="规则标题：">
              <span>{{props.row.ruleTitle }}</span>
            </el-form-item>
            <el-form-item label="负责人：">
              <span>{{ props.row.dutyPerson}}</span>
            </el-form-item>
            <el-form-item label="规则类型：">
              <span>{{ props.row.ruleType}}</span>
            </el-form-item>
            <el-form-item label="规则描述：">
              <span>{{ props.row.ruleDesc}}</span>
            </el-form-item>
            <el-form-item label="指示比例">
              <span v-for="(item, index) in obj " :key="index">
                {{item.name}}---{{item.num}}
                <br />
              </span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="规则标题" prop="ruleTitle"></el-table-column>
      <el-table-column label="负责人" prop="dutyPerson"></el-table-column>
    </el-table> -->

    <div class="rule" v-for="(item,index) in showTable" :key="index" >
       <div class="rule-haed" >
         <div class="rule-tilte">
           <div class="rule-i" v-show="showPrise!==index" @click="getInfo(index,item)">
             <!-- 展开 -->
              <i class= " el-icon-caret-right " ></i>
              
              
           </div >
           <!-- 收起 -->
           <div class="rule-i" v-show="showPrise===index" @click=" msgClose(index,item)" >
                <i class="el-icon-caret-bottom" ></i>
           </div>
            
           <div class="rule-d1">规则标题:{{item.ruleTitle}}</div>
           <div class="rule-d2">责任人:{{item.dutyPerson}}</div>

         </div>
         <!-- <img src="../assets/img/sanjiao.png" alt="" class="[rotate?  'el-icon-arrow-left go' : ' el-icon-arrow-left aa' ]"  @click="showHide(index)"> -->
        <div class="rule-btn">
          <!-- 编辑 -->
          
          <!-- 删除 -->
          <el-button type="danger" icon="el-icon-delete" circle align=right @click="del(index)"></el-button>
        </div>    
       </div>
 
       <div class="dis" v-show="showPrise===index" >
         <div class="d1">
           
               <p class="p1">规则标题: <span>{{rule.ruleTitle}}</span></p>
               <p class="p2">负责人: <span>{{rule.dutyPerson}}</span></p>
         
         </div>
         <div class="d1">
         <p class="p1">规则类型：<span>{{rule.ruleType}}</span></p>
         <p class="p2">规则描述: <span>{{rule.ruleDesc}}</span></p>
        </div>
        <div class="d1">
         <p class="p1">职级：<span>{{rule.role1}}</span></p>
         <p class="p2">岗位: <span>{{rule.station1}}</span></p>
        </div>
        <div class="d2">
         <p>指标类型：</p>
          <p v-for="(item,index) of zb" :key="index">
            <span>{{item.contactType}}</span>---------- <span>{{item.number}}</span>
          </p>
        </div>
         
           <div class="d2">
             
               <el-button type="primary" @click="put(index)">修改规则</el-button>
           </div>
          

       
       </div>
      
    </div>


     <div class="rg">
          <el-pagination background 
			layout="prev, pager, next, sizes, total, jumper"
			:page-sizes="[2, 3, 4, 5]"
			:page-size="pagesize"
			:total="item.length"
			@current-change="handleCurrentChange"  
			@size-change="handleSizeChange"
			>
		 </el-pagination>
       </div>

       <!-- 添加框 -->
       <el-dialog title="添加规则" :visible.sync="dialogVisible" width="1000px">
          <el-form :model="form" label-width="100px" class="add-form" ref="ruleForm">
             <div class="el-faolt">
                  <el-form-item label="规则标题" prop="ruleTitle" >
                    <el-input v-model="form.ruleTitle" style="width:300px"></el-input>
                  </el-form-item>
                    <el-form-item label="责任人" prop="dutyPerson">
                      <el-input v-model="form.dutyPerson" style="width:300px"></el-input>
                    </el-form-item>
                </div>
                <div class="el-faolt">
                <el-form-item label="规则描述" prop="ruleDesc">
                  <el-input v-model="form.ruleDesc" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="规则类型" prop="ruleType">
                  <el-select v-model="form.ruleType" placeholder="请选择规则类型">
                    <el-option label="规则一" value="规则一"></el-option>
                    <el-option label="规则二" value="规则二"></el-option>
                  </el-select>
                </el-form-item>
                </div>
                
                <div class="el-faolt">
                  <el-form-item label="职级"  prop="role">
                    <el-select placeholder="请选择职级" v-model="form.role" @change="supRes(form.role)">
                        <el-option label="超级管理员" value="1"></el-option>
                        <el-option label="理赔负责人" value="2"></el-option>
                        <el-option label="主管" value="3"></el-option>
                        <el-option label="员工" value="4"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="岗位" prop="station">
                    <el-select placeholder="请选择岗位" v-model="form.station" @change="sup(form.station)">
                        <el-option :label=item.station :value=item.id  v-for='item in options' :key="item.id" ></el-option>
                    </el-select>
                  </el-form-item>

                </div>
             
                <div class="zb-num" v-for="(v,i) in list" :key="i"  >
                  
                    <div>
                      <el-form-item label="指标">
                        <el-select placeholder="请选择指标"  v-model="list[i].contactType" >
                          <el-option :label=key  v-for='(value,key) in options12' :key="key" :value="key"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item label="数量"  >
                        <el-input v-model="list[i].number" style="width:300px"></el-input>
                      </el-form-item>
                    

                    </div>
                    <div class="del-btn">
                          <!-- <el-button type="danger" icon="el-icon-delete" circle @click="deleteNode(i)"></el-button> -->
                          <el-button type="danger"  @click="deleteNode(i)" round>删除</el-button>
                    </div>
                    
                    
                </div>

                <el-form-item>
                  <el-button class="add" type="primary" plain @click="add()">添加指标</el-button>
                </el-form-item>
                
             </el-form>
             <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="add1()">确 定</el-button>
                </span>

       </el-dialog>
       <!-- 修改框 -->
       <el-dialog title="修改规则" :visible.sync="dialogVisible1" width="1000px">
          <el-form :model="rule" label-width="100px" class="add-form" ref="ruleForm">
             <div class="el-faolt">
                  <el-form-item label="规则标题" prop="ruleTitle" >
                    <el-input v-model="rule.ruleTitle" style="width:300px" :disabled="true"></el-input>
                  </el-form-item>
                    <el-form-item label="责任人" prop="dutyPerson">
                      <el-input v-model="rule.dutyPerson" style="width:300px"></el-input>
                    </el-form-item>
                </div>
                <div class="el-faolt">
                <el-form-item label="规则描述" prop="ruleDesc">
                  <el-input v-model="rule.ruleDesc" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="规则类型" prop="ruleType">
                  <el-select v-model="rule.ruleType" placeholder="请选择规则类型">
                    <el-option label="规则一" value="规则一"></el-option>
                    <el-option label="规则二" value="规则二"></el-option>
                  </el-select>
                </el-form-item>
                </div>
                
                <div class="el-faolt">
                  <el-form-item label="职级"  prop="role">
                    <el-select placeholder="请选择职级" v-model="rule.role1" @change="supRes(rule.role)">
                        <el-option label="超级管理员" value=" "></el-option>
                        <el-option label="理赔负责人" value="2"></el-option>
                        <el-option label="主管" value="3"></el-option>
                        <el-option label="员工" value="4"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="岗位" prop="station">
                    <el-select placeholder="请选择岗位" v-model="rule.station1" @change="sup1(rule.station1)">
                        <el-option :label=item.station :value=item.id  v-for='item in options' :key="item.id" ></el-option>
                    </el-select>
                  </el-form-item>

                </div>
                <div  v-show="xs">
                  <div v-for="(item,index) of zb" :key="index">
                  
                   <el-form-item label="指标"  prop="role"  >
                    <el-select placeholder="请选择指标" v-model="item.contactType" @change="supRes(form.role1)">
                        <el-option :label=key  v-for='(value,key) in options2' :key="key" :value="key"></el-option>
                    </el-select>
                     <el-input v-model="item.number" style="width:300px"></el-input>

                  </el-form-item> 
                 
                 
                </div>
                 <div>
                 <el-button class="add" type="primary" plain @click="add3()"> 添加指标</el-button>

                 </div>

                </div>
                


                  
                  <div v-show="yc">
                    <div class="zb-num" v-for="(v,i) in list1" :key="'zb-num'+i"   >
                  
                    <div>
                      <el-form-item label="指标">
                        <el-select placeholder="请选择指标"  v-model="list1[i].contactType" >
                          <el-option :label=key  v-for='(value,key) in options13' :key="key" :value="key"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>

                    <div>
                      <el-form-item label="数量"  >
                        <el-input v-model="list1[i].number" style="width:300px"></el-input>
                      </el-form-item>
                    </div>
                   
                    
                    
                    
                </div>
                <el-form-item>
                     <el-button class="add" type="primary" plain @click="add2()"> 添加指标</el-button>
                   </el-form-item>

                  </div>

                   

                
             </el-form>
             
             <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="put1()">确 定</el-button>
                </span>

       </el-dialog>
    
     <!-- <el-button type="primary" plain @click="add1()">保存</el-button> -->

    
     <div>


   </div>

  </div>
</template>
 
<script>
export default {
  created(){
    this. getAll()
  },
  computed: {
    selection: {
      get: function() {
        var that = this;
        return this.YX.filter(function(item) {
          return item.text == that.selected;
          console.log(item);
        })[0].ZY;
      }
    }
  },
  data() {
    return {
      //获取的规则表
       rule:'',
       rotate: true,
       rotate1:false,
       xs: true,
       yc:false,
       showPrise:-1,
      item:[],
      //添加页面的开关
      dialogVisible:false,
      //修改页面的开关
       dialogVisible1:false,

     
      text:'',
      items: [],
      tableData: [],
      //添加规则的表单
      form: {
         ruleTitle:'',//规则标题
         dutyPerson:'',//责任人
         ruleDesc:'',//规则描述
         ruleType:'',//规则类型
         role:'',//角色
         station:'',//岗位
         zb:'',
         num:''
        
      
      },
      //查询规则的表单
      form1:{
        ruleTitle:'',
        role:'',
        station:'',

         },

      obj:'',
      zb1:[],
      zb:[],//指标名称
      num:[],//指标对应的数
      options:[],//岗位
      options1:[],//指标
      options12:[],
      options2:[],
      options13:[],

       total1: "",
       currentPage:1,
       pagesize:2,
      userlist: [],
      list:[
        {contactType: '', number: ''}
      ],
      list1:[{contactType: '', number: ''}]
     
    };
  
  },
   computed: {
  //showTable计算属性通过slice方法计算表格当前应显示的数据
    showTable() {
      return this.item.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    }
  },
    methods:{
      //展开更多
      getInfo(index,item){
        
         console.log(item)
                  this.showPrise=index
                  item.showPrise=!item.showPrise
                  console.log(item)
                  // console.log( this.item[index].ruleTitle)
                  this.axios.get('getInfo/byTitle',{params:{ruleTitle:this.item[index].ruleTitle}}).then(res=>{
                    console.log(res.data)
                    if(res.data.code==1){
                       let obj=res.data.data
                      if(obj.role==1){
                       obj.role1="超级管理员"
                       }else if(obj.role==2){
                       obj.role1="理赔负责人"
                       }else if(obj.role==3){
                       obj.role1="主管"
                       }else if(obj.role==4){
                       obj.role1="员工"
                     }

                    if(obj.station==1){
                      obj.station1="定损中心(福田)"
                        } else if (obj.station == 2) {
                          obj.station1 = "定损中心(福田)";
                        } else if (obj.station == 3) {
                          obj.station1 = "定损中心(罗湖)";
                        } else if (obj.station == 4) {
                          obj.station1 = "定损中心(罗湖)";
                        }else if (obj.station == 5) {
                          obj.station1 = "定损中心(南山)";
                        } else if (obj.station == 6) {
                          obj.station1 = "定损中心(南山)";
                        } else if (obj.station == 7) {
                          obj.station1 = "定损中心(宝安)";
                        }else if (obj.station == 8) {
                          obj.station1 = "定损中心(宝安)";
                        } else if (obj.station == 9) {
                          obj.station1 = "定损中心(龙岗)";
                        } else if (obj.station == 10) {
                          obj.station1 = "定损中心(龙岗)";
                        }else if (obj.station == 11) {
                          obj.station1 = "定损中心(龙岗/光明)";
                        } else if (obj.station == 12) {
                          obj.station1 = "定损中心(龙岗/光明)";
                        } else if (obj.station == 13) {
                         obj.station1 = "定损中心(龙岗/观澜)";
                        }else if (obj.station == 14) {
                          obj.station1 = "定损中心(龙岗/观澜)";
                        } else if (obj.station == 15) {
                          obj.station1 = "视频查勘中心";
                        } else if (obj.station == 16) {
                          obj.station1 = "视频查勘中心";
                        }else if (obj.station == 17) {
                          obj.station1 = "视频定损中心";
                        } else if (obj.station == 18) {
                          obj.station1 = "视频定损中心";
                        } else if (obj.station == 19) {
                          obj.station1 = "核价报价岗";
                        }else if (obj.station == 20) {
                          obj.station1 = "核价报价岗";
                        } else if (obj.station == 21) {
                          obj.station1 = "通赔岗";
                        } else if (obj.station == 22) {
                          obj.station1 = "通赔岗";
                        }else if (obj.station == 23) {
                          obj.station1 = "非车险财产大案理赔岗";
                        } else if (obj.station == 24) {
                          obj.station1= "非车险财产大案理赔岗";
                        } else if (obj.station == 25) {
                          obj.station1 = "非车险财产小案理赔岗";
                        }else if (obj.station == 26) {
                          obj.station1 = "非车险财产小案理赔岗";
                        } else if (obj.station == 27) {
                          obj.station1 = "核损岗";
                        } else if (obj.station == 28) {
                          obj.station1 = "大案运营岗";
                        }else if (obj.station == 29) {
                          obj.station1 = "核损岗";
                        } else if (obj.station == 30) {
                          obj.station1 = "核赔岗";
                        } else if (obj.station == 31) {
                          obj.station1 = "核赔岗";
                        }else if (obj.station == 32) {
                          obj.station1 = "理算中心";
                        } else if (obj.station == 33) {
                          obj.station1 = "车险人伤理赔岗";
                        } else if (obj.station == 34) {
                          obj.station1 = "车险人伤医疗审核岗";
                        }else if (obj.station == 35) {
                          obj.station1 = "非门诊车险人伤调查岗";
                        } else if (obj.station == 36) {
                          obj.station1 = "门诊车险人伤调查岗";
                        } else if (obj.station == 37) {
                          obj.station1 = "雇主险意外险健康险理赔岗";
                        }else if (obj.station == 38) {
                          obj.station1 = "雇主险意外险健康险核赔岗";
                        } else if (obj.station == 39) {
                          obj.station1 = "雇主险意外险健康险大案理赔岗";
                        } else if (obj.station == 40) {
                          obj.station1 = "雇主险意外险健康险小案理赔岗";
                        }else if (obj.station == 41) {
                          obj.station1 = "诉讼追偿岗";
                        } else if (obj.station == 42) {
                          obj.station1 = "诉讼岗";
                        } else if (obj.station == 43) {
                          obj.station1 = "追偿岗";
                        }else if (obj.station == 44) {
                          obj.station1 = "稽核岗";
                        } else if (obj.station == 45) {
                          obj.station1 = "反欺诈调查岗";
                        } else if (obj.station == 46) {
                          obj.station1 = "稽核岗";
                    }
                     this.rule=obj
                     console.log(this.rule)
                     let data=obj.indexValue
                     for(var i in data){
                       console.log(i)
                       this.zb.push({contactType: i, number: data[i]})
                     }
                     console.log(this.zb)


                    }else{
                      let obj=[]
                    }
                   
                   
                    
                    
                  })
                  // this.item[index].ruleTitle
          },
          //收起
          msgClose(index,item){
            this.rotate1=false
            this.rotate=true
            this.showPrise=!index
             item.showPrise=false
             this.zb=[]
          },
      
//分页
       handleCurrentChange(cpage) {
                    this.currpage = cpage;
                    console.log(cpage)
				},
	   handleSizeChange(psize) {
                    this.pagesize = psize;
                    console.log(psize)
                },
    handleSelectionChange(val) {
                    console.log(val)
                },
         handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },


    //获取规则
    getAll(){
      let obj={
        roleId:this.form1.role,
        stationId:this.form1.station,
        ruleTitle:this.form1.ruleTitle
      }
      console.log(obj)
      this.axios.get('getAll/ruleTitle',{params:obj}).then(res=>{
        console.log(res.data)
        this.item=res.data.data
        for(var i=0;i<this.item.length;i++){
            this.item[i].showPrise=false
       
        }
         console.log(this.item)
       
      })
    },
    //打开添加规则框

    ruleAdd(){
       this.dialogVisible=true

     },
     //打开修改规则框
     put(index){
        this.dialogVisible1=true
        console.log(this.rule)
        console.log(this.zb)

       this.axios.get('getIndexName/ByStationId',{params:{
          stationId:this.rule.station,
          roleId:this.rule.role
       }}).then(res=>{
         if(res.data.code==1){
           console.log(res.data.data)
        
        this.options1=Object.keys(res.data.data)
        this.options2=res.data.data
        console.log(this.options1)
        console.log(this.options2)

         }else{
           this.options2=[]
           this.options1=[]

         }
         
      

       })
     

     },
     add3(){
       this.zb.push( {contactType: '', number: ''})
     },
     //确定修改
     put1(){
       
       this.dialogVisible1=false
       console.log(this.rule)
       let tmp = JSON.stringify(this.rule);//将对象转换为json字符串形式
        //  console.log(tmp)
           let obj = JSON.parse(tmp);
             if(obj.role1==="员工"){
        obj.role1=4
      }else if(obj.role1==="主管"){
        obj.role1=3
      }
      console.log(obj.role)
      
      if(obj.role1==3&&obj.station=="定损中心(福田)"){
        obj.station=1
        }else if(obj.role1==4&&obj.station1=="定损中心（福田）"){
          obj.station1=2
        }else if(obj.role1==3&&obj.station1=="定损中心(罗湖)"){
          obj.station1=3
        }else if(obj.role1==4&&obj.station1=="定损中心(罗湖)"){
          obj.station1=4
        }else if(obj.role1==3&&obj.station1=="定损中心(南山)"){
          obj.station1=5
        }else if(obj.role1==4&&obj.station1=="定损中心(南山)"){
          obj.station1=6
        }else if(obj.role1==3&&obj.station1=="定损中心(宝安)"){
          obj.station1=7
        }else if(obj.role1==4&&obj.station1=="定损中心(宝安)"){
          obj.station1=8
        }else if(obj.role1==3&&obj.station1=="定损中心(龙岗)"){
          obj.station1=9
        }else if(obj.role1==4&&obj.station1=="定损中心(龙岗)"){
          obj.station1=10
        }else if(obj.role1==3&&obj.station1=="定损中心(松岗/光明)"){
          obj.station1=11
        }else if(obj.role1==4&&obj.station1=="定损中心(松岗/光明)"){
          obj.station1=12
        }else if(obj.role1==3&&obj.station1=="定损中心(龙华/观澜)"){
          obj.station1=13
        }else if(obj.role1==4&&obj.station1=="定损中心(龙华/观澜)"){
          obj.station1=14
        }else if(obj.role1==3&&obj.station1=="视频查勘中心"){
          obj.station1=15
        }else if(obj.role1==4&&obj.station1=="视频查勘中心"){
          obj.station1=16
        }else if(obj.role1==3&&obj.station1=="视频定损中心"){
          obj.station1=17
        }else if(obj.role1==4&&obj.station1=="视频定损中心"){
          obj.station1=18
        }else if(obj.role1==3&&obj.station1=="核价报价岗"){
          obj.station1=19
        }else if(obj.role1==4&&obj.station1=="核价报价岗"){
          obj.station1=20
        }else if(obj.role1==3&&obj.station1=="通赔岗"){
          obj.station1=21
        }else if(obj.role1==4&&obj.station1=="通赔岗"){
          obj.station1=22
        }else if(obj.role1==3&&obj.station1=="非车险财产大案理赔岗"){
          obj.station1=23
        }else if(obj.role1==4&&obj.station1=="非车险财产大案理赔岗"){
          obj.station1=24
        }else if(obj.role1==3&&obj.station1=="非车险财产小案理赔岗"){
          obj.station1=25
        }else if(obj.role1==4&&obj.station1=="非车险财产小案理赔岗"){
          obj.station1=26
        }else if(obj.role1==3&&obj.station1=="核损岗"){
          obj.station1=27
        }else if(obj.role1==4&&obj.station1=="大案运营岗"){
          obj.station1=28
        }else if(obj.role1==4&&obj.station1=="核损岗"){
          obj.station1=29
        }else if(obj.role1==3&&obj.station1=="核赔岗"){
          obj.station1=30
        }else if(obj.role1==4&&obj.station1=="核赔岗"){
          obj.station1=31
        }else if(obj.role1==4&&obj.station1=="理算中心"){
          obj.station1=32
        }else if(obj.role1==3&&obj.station1=="车险人伤理赔岗"){
          obj.station1=33
        }else if(obj.role1==4&&obj.station1=="车险人伤医疗审核岗"){
          obj.station1=34
        }else if(obj.role1==4&&obj.station1=="非门诊车险人伤调查岗"){
          obj.station1=35
        }else if(obj.role1==4&&obj.station1=="门诊车险人伤调查岗"){
          obj.station1=36
        }else if(obj.role1==3&&obj.station1=="雇主险意外险健康险理赔岗"){
          obj.station1=37
        }else if(obj.role1==4&&obj.station1=="雇主险意外险健康险核赔岗"){
          obj.station1=38
        }else if(obj.role1==4&&obj.station1=="雇主险意外险健康险大案理赔岗"){
          obj.station1=39
        }else if(obj.role1==4&&obj.station1=="雇主险意外险健康险小案理赔岗"){
          obj.station1=40
        }else if(obj.role1==3&&obj.station1=="诉讼追偿岗"){
          obj.station1=41
        }else if(obj.role1==4&&obj.station1=="诉讼岗"){
          obj.station1=42
        }else if(obj.role1==4&&obj.station1=="追偿岗"){
          obj.station1=43
        }else if(obj.role1==3&&obj.station1=="稽核科"){
          obj.station1=44
        }else if(obj.role1==4&&obj.station1=="反欺诈调查岗"){
          obj.station1=45
        }else if(obj.role1==4&&obj.station1=="稽核岗"){
          obj.station1=46
      }
      console.log(obj)

      let m=new Map()
        for(var i=0;i<this.zb.length;i++){
           m.set(this.zb[i].contactType,this.zb[i].number)
        }
        console.log(m)
        let obj2={}
        for(let[k,v] of m){
          obj2[k]=v
        }
        console.log(obj2)
        console.log(this.list1)

         let m1=new Map()
        for(var i=0;i<this.list1.length;i++){
           m1.set(this.list1[i].contactType,this.list1[i].number)
        }
        console.log(m1)
        let obj3={}
        for(let[k,v] of m1){
          obj3[k]=v
        }
        console.log(obj3)
        
        
        let lpExamRuleVo={
          // indexValue:obj2,
          role:obj.role1,
          station:obj.station1,
          ruleTitle:obj.ruleTitle,
          dutyPerson:obj.dutyPerson,
          ruleType:obj.ruleType,
          ruleDesc:obj.ruleDesc
        }
        if(obj.role1==obj.role&&obj.station1==obj.station){
          lpExamRuleVo.indexValue=obj2
        }else{
           lpExamRuleVo.indexValue=obj3
           this.axios.delete("deleteInfo/byTitle",{params: {ruleTitle:obj.ruleTitle}}).then(res=>{
             console.log(res.data.data)

           })

        }
        
        console.log(lpExamRuleVo)
        console.log(this.rule.role==lpExamRuleVo.role)
       
           this.axios.post('insert/examRules',JSON.stringify(lpExamRuleVo),{
                      headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                      }
                    }).then(res=>{
                      console.log(res.data)
                    if(res.data.code==1){
                        this.$message.success("修改成功");
                        this.zb=[]
                        this. getInfo()
                       
                        
                    }else{
                      this.$message.error("修改失败");
                    }
                    })

        
          
         
        // });
    
        // }
       

        
     },

      //确认添加
      add1(){
        //  let obj=[]
        //  for(let index in this.list){
        //   obj.push({name:this.zb[index],num:this.num[index]})
        // }
        // console.log(obj)
        let m=new Map()
        for(var i=0;i<this.list.length;i++){
           m.set(this.list[i].contactType,this.list[i].number)
        }
        console.log(m)
        let obj2={}
        for(let[k,v] of m){
          obj2[k]=v
        }
        console.log(obj2)
        this.obj=this.list
        let obj1=[]
        console.log(this.form)
         let _tmp = JSON.stringify(this.form);//将对象转换为json字符串形式
         let lpExamRuleVo = JSON.parse(_tmp);//将转换而来的字符串转换为原生js对象
         lpExamRuleVo.indexValue=obj2
         console.log(lpExamRuleVo)
         console.log(JSON.stringify(lpExamRuleVo))
         this.axios.get('isRepeat/RuleTitle',{params:{ruleTitle:lpExamRuleVo.ruleTitle}}).then(res=>{
          if(res.data.code==1){

                  this.axios.post('insert/examRules',JSON.stringify(lpExamRuleVo),{
                      headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                      }
                    }).then(res=>{
                      console.log(res.data)
                    if(res.data.code==1){
                        this.$message.success("添加成功");
                        
                    }else{
                      this.$message.error("添加失败");
                    }
                    })
                    
                     this.$refs.ruleForm.resetFields();
                        this.list=[{contactType: '', number: ''}]
                        this.dialogVisible=false
          }else{
            this.$message.error("添加失败，规则标题重复");
          }
         })
        
  
        
       
        
      },

      //根据标题删除规则
     async del(index) {
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
       this.axios.delete("deleteInfo/byTitle",{params: {ruleTitle:this.item[index].ruleTitle}})
        .then(res => {
          if (res.data.code !== 1) {
           
            return this.$message.error("删除失败");
          }
          this.$message.success("删除成功");
        this.getAll()
        });
    },

      //添加指标
      add(){
      
      this.list.push({contactType: '', number: ''})
       
      },
      add2(){
        console.log(1)
        this.list1.push({contactType: '', number: ''})
      },
      deleteNode(i){
        this.list.splice(i,1)
      },
      onAdd() {
      this.items.push('')
    },

        //角色的联动
      supRes(val){
        console.log(val)
        // let data={roleId:val}
        this.axios.get('getStationByRoleId',{ params: {
              roleId: val
            }}).then(res=>{
          console.log(res.data.data)
          this.options=res.data.data
        })
        
      },
      sup(id){
        console.log(id)
       this.axios.get('getIndexName/ByStationId',{params:{
         stationId:id,
          roleId:this.form.role
       }}).then(res=>{
         console.log(res.data.data)
        // this.options1=res.data.data
        // console.log(this.options1)
        this.options1=Object.keys(res.data.data)
        this.options12=res.data.data
        console.log(this.options1)
        console.log(this.options12)
      

       })
      },
      sup1(id){
       
           this.xs=false
           this.yc=true
           this.axios.get('getIndexName/ByStationId',{params:{
         stationId:id,
          roleId:this.rule.role1
       }}).then(res=>{
         console.log(res.data.data)
        // this.options1=res.data.data
        // console.log(this.options1)
        // this.options1=Object.keys(res.data.data)
        let arr=res.data.data
        // console.log(this.options1)
        console.log(arr)
        this.options13=arr
      

       })
           
        
          
        console.log(this.rule.station1==id)
        console.log(this.rule)
        let tmp={
          field1:this.rule.role1,
          station:this.rule.station1

        }
        console.log(tmp)
         let _tmp = JSON.stringify(tmp);//将对象转换为json字符串形式
         let obj= JSON.parse(_tmp);//将转换而来的字符串转换为原生js对象

      //    if(obj.field1==3&&obj.station=="定损中心(福田)"){
      //   obj.station=1
      // }else if(obj.field1==4&&obj.station=="定损中心（福田）"){
      //   obj.station=2
      // }else if(obj.field1==3&&obj.station=="定损中心(罗湖)"){
      //   obj.station=3
      // }else if(obj.field1==4&&obj.station=="定损中心(罗湖)"){
      //   obj.station=4
      // }else if(obj.field1==3&&obj.station=="定损中心(南山)"){
      //   obj.station=5
      // }else if(obj.field1==4&&obj.station=="定损中心(南山)"){
      //   obj.station=6
      // }else if(obj.field1==3&&obj.station=="定损中心(宝安)"){
      //   obj.station=7
      // }else if(obj.field1==4&&obj.station=="定损中心(宝安)"){
      //   obj.station=8
      // }else if(obj.field1==3&&obj.station=="定损中心(龙岗)"){
      //   obj.station=9
      // }else if(obj.field1==4&&obj.station=="定损中心(龙岗)"){
      //   obj.station=10
      // }else if(obj.field1==3&&obj.station=="定损中心(松岗/光明)"){
      //   obj.station=11
      // }else if(obj.field1==4&&obj.station=="定损中心(松岗/光明)"){
      //   obj.station=12
      // }else if(obj.field1==3&&obj.station=="定损中心(龙华/观澜)"){
      //   obj.station=13
      // }else if(obj.field1==4&&obj.station=="定损中心(龙华/观澜)"){
      //   obj.station=14
      // }else if(obj.field1==3&&obj.station=="视频查勘中心"){
      //   obj.station=15
      // }else if(obj.field1==4&&obj.station=="视频查勘中心"){
      //   obj.station=16
      // }else if(obj.field1==3&&obj.station=="视频定损中心"){
      //   obj.station=17
      // }else if(obj.field1==4&&obj.station=="视频定损中心"){
      //   obj.station=18
      // }else if(obj.field1==3&&obj.station=="核价报价岗"){
      //   obj.station=19
      // }else if(obj.field1==4&&obj.station=="核价报价岗"){
      //   obj.station=20
      // }else if(obj.field1==3&&obj.station=="通赔岗"){
      //   obj.station=21
      // }else if(obj.field1==4&&obj.station=="通赔岗"){
      //   obj.station=22
      // }else if(obj.field1==3&&obj.station=="非车险财产大案理赔岗"){
      //   obj.station=23
      // }else if(obj.field1==4&&obj.station=="非车险财产大案理赔岗"){
      //   obj.station=24
      // }else if(obj.field1==3&&obj.station=="非车险财产小案理赔岗"){
      //   obj.station=25
      // }else if(obj.field1==4&&obj.station=="非车险财产小案理赔岗"){
      //   obj.station=26
      // }else if(obj.field1==3&&obj.station=="核损岗"){
      //   obj.station=27
      // }else if(obj.field1==4&&obj.station=="大案运营岗"){
      //   obj.station=28
      // }else if(obj.field1==4&&obj.station=="核损岗"){
      //   obj.station=29
      // }else if(obj.field1==3&&obj.station=="核赔岗"){
      //   obj.station=30
      // }else if(obj.field1==4&&obj.station=="核赔岗"){
      //   obj.station=31
      // }else if(obj.field1==4&&obj.station=="理算中心"){
      //   obj.station=32
      // }else if(obj.field1==3&&obj.station=="车险人伤理赔岗"){
      //   obj.station=33
      // }else if(obj.field1==4&&obj.station=="车险人伤医疗审核岗"){
      //   obj.station=34
      // }else if(obj.field1==4&&obj.station=="非门诊车险人伤调查岗"){
      //   obj.station=35
      // }else if(obj.field1==4&&obj.station=="门诊车险人伤调查岗"){
      //   obj.station=36
      // }else if(obj.field1==3&&obj.station=="雇主险意外险健康险理赔岗"){
      //   obj.station=37
      // }else if(obj.field1==4&&obj.station=="雇主险意外险健康险核赔岗"){
      //   obj.station=38
      // }else if(obj.field1==4&&obj.station=="雇主险意外险健康险大案理赔岗"){
      //   obj.station=39
      // }else if(obj.field1==4&&obj.station=="雇主险意外险健康险小案理赔岗"){
      //   obj.station=40
      // }else if(obj.field1==3&&obj.station=="诉讼追偿岗"){
      //   obj.station=41
      // }else if(obj.field1==4&&obj.station=="诉讼岗"){
      //   obj.station=42
      // }else if(obj.field1==4&&obj.station=="追偿岗"){
      //   obj.station=43
      // }else if(obj.field1==3&&obj.station=="稽核科"){
      //   obj.station=44
      // }else if(obj.field1==4&&obj.station=="反欺诈调查岗"){
      //   obj.station=45
      // }else if(obj.field1==4&&obj.station=="稽核岗"){
      //   obj.station=46
      // }
        
      //    let obj1={
      //      stationId:obj.station,
      //     roleId:obj.field1
      //    }
      //    console.log(obj1)
        
      
      }

    }
};
</script>
 
<style scoped lang = "scss">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.add-form {
  background-color: #f8f8ff;
  margin-top: 30px;
  padding: 10px;
  /* border: 1px solid rebeccapurple; */
}
.el-faolt{
/* border: 1px solid rebeccapurple; */
display: flex;
}
.rg{
   
    /* border: 1px solid red; */
     display: flex;
     flex-direction:row-reverse;
     margin-top: 30px;
}
.zb-num{
  display: flex;
  flex-wrap:wrap;
}

.del-btn{
  margin-left: 50px;
  
}
.rule{
  background-color: #F5F5F5;
  margin-top: 10px;
 
}
.rule-haed{
  display: flex;
  justify-content:space-between;
  height: 50px;
  
}
.rule-i{
  float: left;
  width: 20px;
  height: 20px;
  line-height: 50px;
  cursor:pointer
}
.rule-d1{
  float: left;
  width: 300px;
  margin-left: 10px;
  line-height: 50px;
}
.rule-d2{
  float: left;
  margin-left: 150px;
  line-height: 50px;
}
.rule-btn{
  line-height: 50px;
}
.dis{
  padding: 20px;
}
.dis>.d1{
  height:50px;
  margin-left: 30px;
}
.dis>.d2{
  margin-left: 30px;
}
.p1,.p2{
  float: left;
  margin-top: 10px;
  width: 300px;
 
}
.p2{
  margin-left: 150px;
}


  
  
</style>