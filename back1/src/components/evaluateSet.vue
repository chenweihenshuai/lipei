<template>
 <div class="">
    <el-breadcrumb>
        <el-breadcrumb-item>非分省库指标录入 / 主观评价指标维护</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <h3>文件导入：</h3>
    <div class="btn">
        <div>
            <span>模板下载：</span><el-button
            class="pull-right right-10"
            icon="el-icon-download"
            type="primary"
            size="mini"
            @click="downloadFile('档案模板')"
    >模板下载</el-button>
        </div>
        <div>
            <span>文件上传：</span>
            <el-upload
            class="image-uploader"
            :multiple="false"
            :auto-upload="true"
            list-type="text"
            :show-file-list="true"
            :drag="true"
            action
            :http-request="uploadFile">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>

          <div class="el-upload__tip" slot="tip">一次只能上传一个文件，仅限text格式，单文件不超过1MB</div>
        </el-upload>
         
        </div>

    </div>
    <h3>导入结果查询：</h3>
    <div class="search" >
        <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm" >
          
                 <div class="d1">
                    <el-form-item label="姓名:"  class="d2" prop="name">
                      <el-input v-model="ruleForm.name" class="el-input" ></el-input>
                    </el-form-item> 
                          <!-- <el-form-item label="职级" class="d2">
                        <el-select  v-model="ruleForm.td" placeholder="请选择团队">
                        <el-option label="岗位一" value="shanghai"></el-option>
                        <el-option label="岗位二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item> -->
                     <el-form-item label="职级:" class="d2" prop="role">
                        <el-select  v-model="ruleForm.role" placeholder="请选择职级" @change="supRes(ruleForm.role)">
                       <el-option label="主管" value="3"></el-option>
                       <el-option label="员工" value="4"></el-option>
                        </el-select>
         </el-form-item>
          <el-form-item label="岗位:" class="d2" prop="station">
                        <el-select  v-model="ruleForm.station" placeholder="请选择岗位">
                        <!-- <el-option :label=item.station1 :value=item.station  v-for='item in station' :key="item.id"></el-option> -->
                         <el-option v-for="item in options" :value=item.id :label=item.station :key="item.id"></el-option>
                        </el-select>
          </el-form-item>
                 </div>
                   
                   <div class="d1-1">
                    <div class="d2-1" >
                      <el-form-item prop="statisticsDate" label="统计期:">
                        
                       <el-date-picker 
                            v-model="ruleForm.statisticsDate"
                            type="month"
                            placeholder="选择日期"
                            value-format="yyyy-MM"
                           @change="dateChange">
                     </el-date-picker>
                      </el-form-item>
                     
                    </div>
                    <div  class="d2-1">
                         <el-button type="primary"  class="rgt" @click="getEvaluation()">查询</el-button>
                         <el-button @click="clear()">清空条件</el-button>
                    </div>
                   </div>
                   
                    
       </el-form>

    </div>
    <h3>结果列表：</h3>
    <p>共搜索到{{userlist.length}}条数据</p>
    <!-- 列表 -->
    <div>
       <el-table :data="showTable" highlight-current-row style="width: 100%">
        
          
           <el-table-column type="selection" width="55"> </el-table-column>
          
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            
            <el-table-column property="name" label="姓名" width="120"> </el-table-column>
           
            <el-table-column property="field1" label="职级"> </el-table-column>
           
            <el-table-column property="station" label="岗位" width="200">
              
             </el-table-column>

             <el-table-column property="identityCard" label="身份证"  width="200"> </el-table-column>
           
            <el-table-column property="business" label="业务条线"></el-table-column>
           
           
           
            <el-table-column property="indexEvaluational" label="工作上级满意度"> </el-table-column>

            <el-table-column property="indexRiskManage" label="制度流程建设与风险管控"> </el-table-column>
           
            <el-table-column property="statisticsDate" label="统计期"> </el-table-column>
           
           <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="edit(scope.$index,scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" circle @click="remove(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>


        <!-- 编辑模态框 -->

      <el-dialog title="编辑" :visible.sync="dialogVisible" width="700px">
        <el-form :model="listRow" label-width="200px" class="demo-ruleForm"  :rules="rules">
          <el-form-item label="姓名">
            <el-input v-model="listRow.name" ></el-input>
          </el-form-item>
          
         <el-form-item label="职级">
            <el-select placeholder="请选择职级" v-model="listRow.field1" @change="supRes(listRow.field1)" :disabled="true" >
              <el-option label="超级管理员" value="1"></el-option>
              <el-option label="理赔负责人" value="2"></el-option>
              <el-option label="主管" value="3"></el-option>
              <el-option label="员工" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位">
            <el-select placeholder="请选择岗位" v-model="listRow.station" :disabled="true">
              <el-option :label=item.station :value=item.id  v-for='item in options' :key="item.id" ></el-option>
            
            </el-select>
          </el-form-item>
          <el-form-item label="身份证" prop="identityCard">
            <el-input v-model="listRow.identityCard" :disabled="true"></el-input>
          </el-form-item>
         
         
          <el-form-item label="业务线条">
            <el-input v-model="listRow.business"></el-input>
          </el-form-item>
          <el-form-item label="上级工作满意度">
            <el-input v-model="listRow.indexEvaluational"></el-input>
          </el-form-item>
          <el-form-item label="制度流程建设与风险管控">
            <el-input v-model="listRow.indexRiskManage"></el-input>
          </el-form-item>
          <!-- <el-form-item label="统计期">
            <el-input v-model="listRow.statisticsDate"></el-input>
          </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"  @click="determine()" >确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分页 -->
       <div class="rg">
          <el-pagination background 
			layout="prev, pager, next, sizes, total, jumper"
			:page-sizes="[2, 3, 4, 5]"
			:page-size="pagesize"
			:total="userlist.length"
			@current-change="handleCurrentChange"  
			@size-change="handleSizeChange"
			>
		 </el-pagination>
       </div>
       
    </div>


    <!-- 编辑弹出框 -->


    
 
 </div>
</template>
 
<script>
export default {
     created(){
        this.getEvaluation(),
        this.fetchData()
  
         },
 data () {

     var checkIdentityCard = (rule, value, cb) => {
      const regTel = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (regTel.test(value)) {
        return cb();
      }
      cb(new Error("请输入合格的身份证"));
    };
    return {
    
      time:'',
        //评价信息表格数据
        userlist:[],
            total1: "",
            currentPage:1,
            pagesize:3,
        //查询数据
        ruleForm:{
           role:'',
           station:'',
            name:'',
           statisticsDate:''
        },
          //验证修改表单身份证的规则
      rules: {
        identityCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { validator: checkIdentityCard, trigger: "blur" }
        ]
      },

         //编辑开关
         dialogVisible: false,
        //当前修改行的数据
        listRow: {},
        //岗位
        station:[],
        options:[]
        
        
        
    }
 },
//   methods: {
      
//     },
 computed: {
  //showTable计算属性通过slice方法计算表格当前应显示的数据
    showTable() {
      return this.userlist.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    }
  },
  methods:{
    //  handleCurrentChange(cpage) {
    //                 this.currpage = cpage;
    //                 console.log(cpage)
		// 		},
	handleSizeChange(psize) {
                    this.pagesize = psize;
                    console.log(psize)
                },
    handleSelectionChange(val) {
                    console.log(val)
                },
         handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      console.log(currentPage)
    },
    //设置当前时间
    fetchData(){
      var date = new Date();
          var nian =date .getFullYear(); //获取完整的年份(4位)
          var yue=date .getMonth()+1; //获取当前月份(0-11,0代表1月)
          if(yue<10){   //小于10加0
            yue='0'+yue
          }
          console.log(nian,yue)
          this.ruleForm.statisticsDate=nian+'-'+yue
          console.log(this.ruleForm.statisticsDate)
    },
    //查询时间
    dateChange(statisticsDate){
     this.ruleForm.statisticsDate=statisticsDate
     console.log(this.ruleForm.statisticsDate)

    },
    //清除查询条件
    clear(){
        this.$refs.ruleForm.resetFields();
        this.getEvaluation()

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
    //获取评价列表信息
    getEvaluation(){ 
      
        console.log(this.ruleForm)

        this.axios.get('getEvaluation',{ params: this.ruleForm }).then(res=>{
            console.log(res.data.data)
            // this.userlist=res.data.data
            // this.station=res.data.data.lpStationList
            
           if(res.data.code==0){
             this.userlist=[]
           }else{
             let arrList =res.data.data
            
               for(var i=0; i<arrList.length;i++){
                      if(arrList[i].station==1){
                      arrList[i].station="定损中心(福田)"
                    }else if(arrList[i].station==2){
                      arrList[i].station="定损中心(福田)"
                    }else if(arrList[i].station==3){
                      arrList[i].station="定损中心(罗湖)"
                    }else if(arrList[i].station==4){
                      arrList[i].station="定损中心(罗湖）"
                    }else if(arrList[i].station==5){
                      arrList[i].station="定损中心(南山)"
                    }else if(arrList[i].station==6){
                      arrList[i].station="定损中心(南山)"
                    }else if(arrList[i].station==7){
                      arrList[i].station="定损中心(宝安)"
                    }else if(arrList[i].station==8){
                      arrList[i].station="定损中心(宝安)"
                    }else if(arrList[i].station==9){
                      arrList[i].station="定损中心(龙岗)"
                    }else if(arrList[i].station==10){
                      arrList[i].station="定损中心(龙岗)"
                    }else if(arrList[i].station==11){
                      arrList[i].station="定损中心(龙岗/光明)"
                    }else if(arrList[i].station==12){
                      arrList[i].station="定损中心(龙岗/光明)"
                    }else if(arrList[i].station==13){
                      arrList[i].station=">定损中心(龙岗/观澜)）"
                    }else if(arrList[i].station==14){
                      arrList[i].station=">定损中心(龙岗/观澜)"
                    }else if(arrList[i].station==15){
                      arrList[i].station="视频查勘中心"
                    }else if(arrList[i].station==16){
                      arrList[i].station="视频查勘中心"
                    }else if(arrList[i].station==17){
                      arrList[i].station="视频定损中心"
                    }else if(arrList[i].station==18){
                      arrList[i].station="视频定损中心"
                    }else if(arrList[i].station==19){
                      arrList[i].station="核价报价岗"
                    }else if(arrList[i].station==20){
                      arrList[i].station="核价报价岗"
                    }else if(arrList[i].station==21){
                      arrList[i].station="通赔岗"
                    }else if(arrList[i].station==22){
                      arrList[i].station1="通赔岗"
                    }else if(arrList[i].station==23){
                      arrList[i].station="非车险财产大案理赔岗"
                    }else if(arrList[i].station==24){
                      arrList[i].station="非车险财产大案理赔岗"
                    }else if(arrList[i].station==25){
                      arrList[i].station="非车险财产小案理赔岗"
                    }else if(arrList[i].station==26){
                      arrList[i].station="非车险财产小案理赔岗"
                    }else if(arrList[i].station==27){
                      arrList[i].station="核损岗"
                    }else if(arrList[i].station==28){
                      arrList[i].station="大案运营岗"
                    }else if(arrList[i].station==29){
                      arrList[i].station="核损岗"
                    }else if(arrList[i].station==30){
                      arrList[i].station="核赔岗"
                    }else if(arrList[i].station==31){
                      arrList[i].station="核赔岗"
                    }else if(arrList[i].station==32){
                      arrList[i].station="理算中心"
                    }else if(arrList[i].station==33){
                      arrList[i].station="车险人伤理赔岗"
                    }
                    else if(arrList[i].station==34){
                      arrList[i].station="车险人伤医疗审核岗"
                    }else if(arrList[i].station==35){
                      arrList[i].station="非门诊车险人伤调查岗"
                    }else if(arrList[i].station==36){
                      arrList[i].station="门诊车险人伤调查岗"
                    }else if(arrList[i].station==37){
                      arrList[i].station="雇主险意外险健康险理赔岗"
                    }else if(arrList[i].station==38){
                      arrList[i].station="雇主险意外险健康险核赔岗"
                    }else if(arrList[i].station==39){
                      arrList[i].station="雇主险意外险健康险大案理赔岗"
                    }else if(arrList[i].station==40){
                      arrList[i].station="雇主险意外险健康险小案理赔岗"
                    }else if(arrList[i].station==41){
                      arrList[i].station="诉讼追偿岗"
                    }else if(arrList[i].station==42){
                      arrList[i].station="诉讼岗"
                    }else if(arrList[i].station==43){
                      arrList[i].station="追偿岗"
                    }else if(arrList[i].station==44){
                      arrList[i].station="稽核岗"
                    }else if(arrList[i].station==45){
                      arrList[i].station="反欺诈调查岗"
                    }else if(arrList[i].station==46){
                      arrList[i].station1="稽核岗"
                    }
            }
            for(var i=0;i<arrList.length;i++){
             if( arrList[i].field1==1){
               arrList[i].field1="超级管理员"
             }else if( arrList[i].field1==2){
               arrList[i].field1="理赔负责人"
             }else if( arrList[i].field1==3){
               arrList[i].field1="主管"
             }else if( arrList[i].field1==4){
               arrList[i].field1="员工"
             }
            }
            this.userlist=arrList
            console.log(this.userlist)
           }
          
          

        })
    },


     //编辑

    edit(index, row) {
      this.dialogVisible = true;
      console.log(index);
      console.log(row);
      this.listRow = row;
    },
    //确认编辑
    determine(){
        this.dialogVisible = false;
         let tmp = JSON.stringify(this.listRow);//将对象转换为json字符串形式
        //  console.log(tmp)
           let obj = JSON.parse(tmp);
           if(obj.field1=="员工"){
        obj.field1=4
      }else if(obj.field1=="主管"){
        obj.field1=3
      }
      if(obj.field1==3&&obj.station=="定损中心(福田)"){
        obj.station=1
      }else if(obj.field1==4&&obj.station=="定损中心（福田）"){
        obj.station=2
      }else if(obj.field1==3&&obj.station=="定损中心(罗湖)"){
        obj.station=3
      }else if(obj.field1==4&&obj.station=="定损中心(罗湖)"){
        obj.station=4
      }else if(obj.field1==3&&obj.station=="定损中心(南山)"){
        obj.station=5
      }else if(obj.field1==4&&obj.station=="定损中心(南山)"){
        obj.station=6
      }else if(obj.field1==3&&obj.station=="定损中心(宝安)"){
        obj.station=7
      }else if(obj.field1==4&&obj.station=="定损中心(宝安)"){
        obj.station=8
      }else if(obj.field1==3&&obj.station=="定损中心(龙岗)"){
        obj.station=9
      }else if(obj.field1==4&&obj.station=="定损中心(龙岗)"){
        obj.station=10
      }else if(obj.field1==3&&obj.station=="定损中心(松岗/光明)"){
        obj.station=11
      }else if(obj.field1==4&&obj.station=="定损中心(松岗/光明)"){
        obj.station=12
      }else if(obj.field1==3&&obj.station=="定损中心(龙华/观澜)"){
        obj.station=13
      }else if(obj.field1==4&&obj.station=="定损中心(龙华/观澜)"){
        obj.station=14
      }else if(obj.field1==3&&obj.station=="视频查勘中心"){
        obj.station=15
      }else if(obj.field1==4&&obj.station=="视频查勘中心"){
        obj.station=16
      }else if(obj.field1==3&&obj.station=="视频定损中心"){
        obj.station=17
      }else if(obj.field1==4&&obj.station=="视频定损中心"){
        obj.station=18
      }else if(obj.field1==3&&obj.station=="核价报价岗"){
        obj.station=19
      }else if(obj.field1==4&&obj.station=="核价报价岗"){
        obj.station=20
      }else if(obj.field1==3&&obj.station=="通赔岗"){
        obj.station=21
      }else if(obj.field1==4&&obj.station=="通赔岗"){
        obj.station=22
      }else if(obj.field1==3&&obj.station=="非车险财产大案理赔岗"){
        obj.station=23
      }else if(obj.field1==4&&obj.station=="非车险财产大案理赔岗"){
        obj.station=24
      }else if(obj.field1==3&&obj.station=="非车险财产小案理赔岗"){
        obj.station=25
      }else if(obj.field1==4&&obj.station=="非车险财产小案理赔岗"){
        obj.station=26
      }else if(obj.field1==3&&obj.station=="核损岗"){
        obj.station=27
      }else if(obj.field1==4&&obj.station=="大案运营岗"){
        obj.station=28
      }else if(obj.field1==4&&obj.station=="核损岗"){
        obj.station=29
      }else if(obj.field1==3&&obj.station=="核赔岗"){
        obj.station=30
      }else if(obj.field1==4&&obj.station=="核赔岗"){
        obj.station=31
      }else if(obj.field1==4&&obj.station=="理算中心"){
        obj.station=32
      }else if(obj.field1==3&&obj.station=="车险人伤理赔岗"){
        obj.station=33
      }else if(obj.field1==4&&obj.station=="车险人伤医疗审核岗"){
        obj.station=34
      }else if(obj.field1==4&&obj.station=="非门诊车险人伤调查岗"){
        obj.station=35
      }else if(obj.field1==4&&obj.station=="门诊车险人伤调查岗"){
        obj.station=36
      }else if(obj.field1==3&&obj.station=="雇主险意外险健康险理赔岗"){
        obj.station=37
      }else if(obj.field1==4&&obj.station=="雇主险意外险健康险核赔岗"){
        obj.station=38
      }else if(obj.field1==4&&obj.station=="雇主险意外险健康险大案理赔岗"){
        obj.station=39
      }else if(obj.field1==4&&obj.station=="雇主险意外险健康险小案理赔岗"){
        obj.station=40
      }else if(obj.field1==3&&obj.station=="诉讼追偿岗"){
        obj.station=41
      }else if(obj.field1==4&&obj.station=="诉讼岗"){
        obj.station=42
      }else if(obj.field1==4&&obj.station=="追偿岗"){
        obj.station=43
      }else if(obj.field1==3&&obj.station=="稽核科"){
        obj.station=44
      }else if(obj.field1==4&&obj.station=="反欺诈调查岗"){
        obj.station=45
      }else if(obj.field1==4&&obj.station=="稽核岗"){
        obj.station=46
      }
      
        console.log(obj)

        this.axios.put("update/Evaluation",JSON.stringify(obj),{
            headers:{
                 "Content-Type": "application/json;charset=UTF-8"
            }
        }) .then(res => {
          if (res.data.code !== 1) {
            console.log(res.meta);
            return this.$message.error("修改失败");
          }
          this.$message.success("修改成功");
         this.getEvaluation()
          console.log(res.status);
        });
    },



    //删除
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
      this.axios.delete("delete/EvaluationById",{params: {id: id}})
        .then(res => {
          if (res.data.code !== 1) {
            console.log(res.meta);
            return this.$message.error("删除失败");
          }
          this.$message.success("删除成功");
        this.getEvaluation()
        });
    },


    // 模板下载
    downloadFile(name) {
       
    
      this.axios
        .get("downloadEvaluationExcel",{ responseType: "blob"} )
        .then(res => {
          // 处理返回的文件流
          const content = res.data.data;
          console.log(content);
          const blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
          });
          console.log(blob);

        var date =
            new Date().getFullYear() +
            "" +
            (new Date().getMonth() + 1) +
            "" +
            new Date().getDate();
            const fileName = date + name + ".xls";

          //  if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          console.log(elink);
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
         
        });
    },



    //上传文件
    uploadFile(item) {
      let fileObj = item.file;
      console.log(fileObj);
      const form = new FormData();
      form.append("multipartFile", fileObj);
      console.log(form);
      this.axios({
        method: "post",
        url: "uploadEvaluationExcel",
        data: form,
        contentType: "multipart/form-data",
        processData: false,
        contentType: false
      }).then(res => {
        console.log(res.data);
        this.userlistHed=res.data.data
        if(res.data.code==1){
            this.$message.success("上传成功");
            this. getEvaluation()


        }
      });
    }




  


 }
}
</script>
 
<style scoped lang = "scss">
.btn{
    background-color: #DCDCDC;
    border-radius: 5px;
    padding: 10px;
    >div{
        margin-top: 20px;
        margin-left: 100px;
    }
}
.search{
    padding: 10px;
    background-color: #DCDCDC;
    border-radius: 5px;
}
.d2{
   
    float: left;
}
.el-input{
    width: 300px;
}

.d1{
    height: 100px;
}
.d1-1{
    height: 100px;
    
}
.d2-1{
    float: left;
    margin-left: 10px;
     
}
.d3{
    margin-left: 20px;
}
.rgt{
    margin-left: 30px;
}
.rg{
   
    /* border: 1px solid red; */
     display: flex;
     flex-direction:row-reverse;
     margin-top: 30px;
}


</style>