<template>
  <div class>
    <el-breadcrumb>
      <el-breadcrumb-item>规则设置/薪酬标准维护</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <h3>文件导入：</h3>
    <div class="btn">
      <div>
        <span>模板下载：</span>
        <el-button
          class="pull-right right-10"
          icon="el-icon-download"
          type="primary"
          size="mini"
          @click="downloadFile('档案模板')"
        >模板下载</el-button>
        <!-- <input type="button" value="导出" class="ui_input_btn01" @click="daochule()" /> -->
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
          :limit="1"
          :http-request="uploadFile"
        >
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
    <div class="search">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="d1">
          <el-form-item label="姓名：" class="d2" prop="name">
            <el-input v-model="ruleForm.name" class="el-input"></el-input>
          </el-form-item>
         <el-form-item label="职级" class="d2" prop="roleId">
                        <el-select  v-model="ruleForm.roleId" placeholder="请选择职级" @change="supRes(ruleForm.roleId)">
                       <el-option label="主管" value="3"></el-option>
                       <el-option label="员工" value="4"></el-option>
                        </el-select>
         </el-form-item>
          <el-form-item label="岗位" class="d2" prop="station">
                        <el-select  v-model="ruleForm.station" placeholder="请选择岗位">
                        <!-- <el-option :label=item.station1 :value=item.station  v-for='item in station' :key="item.id"></el-option> -->
                         <el-option v-for="item in options" :value=item.id :label=item.station :key="item.id"></el-option>
                        </el-select>
          </el-form-item>
        </div>

        <div class="d1-1">
          <div class="d2-1">
             <el-form-item prop="statisticsDate" label="统计期:"> 
            <el-date-picker
              v-model="ruleForm.statisticsDate"
              type="month"
              placeholder="选择月"
              value-format="yyyy-MM"
            ></el-date-picker>
            </el-form-item>
          </div>
          <div class="d2-1">
            <el-button type="primary" class="rgt" @click="getUser()">查询</el-button>
            <el-button  @click="clear()">清空条件</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <h3>结果列表：</h3>
    <div class="sn-btn">
      <span>共搜索到{{userlist.length}}条数据</span>
      <el-button type="danger" size="small" @click="delGroup()">批量删除</el-button>
    </div>

    <!-- 列表 -->
    <div>
      <el-table
        :data="showTable"
        highlight-current-row
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column type="index" width="50" label="序号"></el-table-column>

        <el-table-column property="name" label="姓名" width="120"></el-table-column>

        <el-table-column property="identityCard" label="身份证" width="200"></el-table-column>

        <el-table-column label="职级" property="role"></el-table-column>

        <!-- <el-table-column property="department" label="部门/团队"></el-table-column> -->

        <el-table-column property="station" label="岗位"></el-table-column>

        

        

        <el-table-column property="fixedSalary" label="月绩效工资（元）"></el-table-column>

        <el-table-column property="performanceSalary" label="月固定工资（元）"></el-table-column>

        <el-table-column property="statisticsDate" label="统计期"></el-table-column>
        <!-- <el-table-column  label="状态">
                 <template slot-scope="scope" > 
                     {{scope.row}}
                     </template > 

        </el-table-column>-->

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

      <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%">
        <el-form :model="listRow" label-width="150px" class="demo-ruleForm" :rules="rules">
          <el-form-item label="姓名">
            <el-input v-model="listRow.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="identityCard">
            <el-input v-model="listRow.identityCard"></el-input>
          </el-form-item>
          <!-- <el-form-item label="部门/团队">
            <el-select placeholder="请选择部门" v-model="listRow.department">
              <el-option label="理赔部" value="理赔部"></el-option>
           
            </el-select>
          </el-form-item> -->
          <el-form-item label="职级">
            <el-select placeholder="请选择职级" v-model="listRow.role" @change="supRes(listRow.role)" >
              <el-option label="超级管理员" value="1"></el-option>
              <el-option label="理赔负责人" value="2"></el-option>
              <el-option label="主管" value="3"></el-option>
              <el-option label="员工" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位">
            <el-select placeholder="请选择岗位" v-model="listRow.station">
              <el-option :label=item.station :value=item.id  v-for='item in station' :key="item.id"></el-option>
            
            </el-select>
          </el-form-item>
          
          <el-form-item label="月绩效工资（元）">
            <el-input v-model="listRow.fixedSalary"></el-input>
          </el-form-item>
          <el-form-item label="月固定工资（元）">
            <el-input v-model="listRow.performanceSalary"></el-input>
          </el-form-item>
          <el-form-item label="统计期">
            <el-input v-model="listRow.statisticsDate"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="determine()">确 定</el-button>
        </span>
      </el-dialog>
      <div class="rg">
        <el-pagination
          background
          layout="prev, pager, next, sizes, total, jumper"
          :page-sizes="[2, 3, 4, 5]"
          :page-size="pagesize"
          :total="userlist.length"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  created() {
    //获取表格数据
    this.getUser();
  },
  data() {
    var checkIdentityCard = (rule, value, cb) => {
      const regTel = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (regTel.test(value)) {
        return cb();
      }
      cb(new Error("请输入合格的身份证"));
    };
    return {
      //验证修改表单的规则
      rules: {
        identityCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { validator: checkIdentityCard, trigger: "blur" }
        ]
      },
      //返回的岗位
      station:[],
      options:[],
      //批量删除选中的id
      sels: [],
      delarr: [],
      //编辑开关
      dialogVisible: false,
      //当前修改行的数据
      listRow: {},
      //表格数据
      userlist: [],
      total1: "",
      currentPage: 1,
      pagesize: 3,
      //查询数据
      ruleForm: {
        station: "",
        name: "",
        rank: "",
        statisticsDate: ""
      },
      //查询时间段
     
    };
  },
  computed: {
    //showTable计算属性通过slice方法计算表格当前应显示的数据
    showTable() {
      return this.userlist.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    }
  },
  methods: {

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
       //清除查询条件
    clear(){
         this.$refs.ruleForm.resetFields();
        this.getUser()

    },


    //获取岗位
    // getStation(){
    //   this.axios.get('getSubStation/ByRole').then(res=>{
    //     console.log(res.data.data)
    //     this.station=res.data.data
    //   })
    // },
      //角色的联动
      // supRes(val){
      //   console.log(val)
      //   // let data={roleId:val}
      //   this.axios.get('getStationByRoleId',{ params: {
      //         roleId: val
      //       }}).then(res=>{
      //     console.log(res.data.data)
      //     this.options=res.data.data
      //   })
        
      // },
    //批量删除

    handleSelectionChange(val) {
    
      this.sels = val;
    },
    delGroup() {
      const length = this.sels.length;

      for (let i = 0; i < length; i++) {
        this.delarr.push(this.sels[i].id);
        console.log(this.delarr);
      }
      var ids = this.delarr.join();
      console.log(ids);
      console.log(this.delarr);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.axios
          .delete("batchDelete/SalaryStandardByIds", {
            params: {
              ids: ids
            }
          })
          .then(res => {
            if (res.data.code !== 1) {
              console.log(res.meta);
              return this.$message.error("删除失败");
            }
            this.$message.success("删除成功");
            this.getUser();
          });
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
      this.axios
        .delete(
          "delete/SalaryStandardById",
          {
            params: {
              id: id
            }
          },
          {
            //  headers: {"Access-Control-Allow-Origin":'*'},
          }
        )
        .then(res => {
          if (res.data.code!==1) {
            console.log(res.meta);
            return this.$message.error("删除失败");
          }
          this.$message.success("删除成功");
          this.getUser();
        });
    },
    //获取表格数据
    getUser() {
      this.axios
        .get("getSalaryStandard", { params: this.ruleForm })
        .then(res => {
          //   console.log(res.data.data[1].role)
          if(res.data.code==0){
            this.userlist=[]
          }else{
            let data = res.data.data;
          for (var i = 0; i < data.length; i++) {
            if (data[i].role == 1) {
              data[i].role = "超级管理员";
            } else if (data[i].role == 2) {
              data[i].role = "理赔负责人";
            } else if (data[i].role == 3) {
              data[i].role = "主管";
            } else if (data[i].role == 4) {
              data[i].role = "员工";
            }
          }

          for (var i = 0; i < data.length; i++) {
            if (data[i].station == 1) {
              data[i].station = "定损中心(福田)";
            } else if (data[i].station == 2) {
              data[i].station = "定损中心(福田)";
            } else if (data[i].station == 3) {
              data[i].station = "定损中心(罗湖)";
            } else if (data[i].station == 4) {
              data[i].station = "定损中心(罗湖)";
            }else if (data[i].station == 5) {
              data[i].station = "定损中心(南山)";
            } else if (data[i].station == 6) {
              data[i].station = "定损中心(南山)";
            } else if (data[i].station == 7) {
              data[i].station = "定损中心(宝安)";
            }else if (data[i].station == 8) {
              data[i].station = "定损中心(宝安)";
            } else if (data[i].station == 9) {
              data[i].station = "定损中心(龙岗)";
            } else if (data[i].station == 10) {
              data[i].station = "定损中心(龙岗)";
            }else if (data[i].station == 11) {
              data[i].station = "定损中心(龙岗/光明)";
            } else if (data[i].station == 12) {
              data[i].station = "定损中心(龙岗/光明)";
            } else if (data[i].station == 13) {
              data[i].station = "定损中心(龙岗/观澜)";
            }else if (data[i].station == 14) {
              data[i].station = "定损中心(龙岗/观澜)";
            } else if (data[i].station == 15) {
              data[i].station = "视频查勘中心";
            } else if (data[i].station == 16) {
              data[i].station = "视频查勘中心";
            }else if (data[i].station == 17) {
              data[i].station = "视频定损中心";
            } else if (data[i].station == 18) {
              data[i].station = "视频定损中心";
            } else if (data[i].station == 19) {
              data[i].station = "核价报价岗";
            }else if (data[i].station == 20) {
              data[i].station = "核价报价岗";
            } else if (data[i].station == 21) {
              data[i].station = "通赔岗";
            } else if (data[i].station == 22) {
              data[i].station = "通赔岗";
            }else if (data[i].station == 23) {
              data[i].station = "非车险财产大案理赔岗";
            } else if (data[i].station == 24) {
              data[i].station = "非车险财产大案理赔岗";
            } else if (data[i].station == 25) {
              data[i].station = "非车险财产小案理赔岗";
            }else if (data[i].station == 26) {
              data[i].station = "非车险财产小案理赔岗";
            } else if (data[i].station == 27) {
              data[i].station = "核损岗";
            } else if (data[i].station == 28) {
              data[i].station = "大案运营岗";
            }else if (data[i].station == 29) {
              data[i].station = "核损岗";
            } else if (data[i].station == 30) {
              data[i].station = "核赔岗";
            } else if (data[i].station == 31) {
              data[i].station = "核赔岗";
            }else if (data[i].station == 32) {
              data[i].station = "理算中心";
            } else if (data[i].station == 33) {
              data[i].station = "车险人伤理赔岗";
            } else if (data[i].station == 34) {
              data[i].station = "车险人伤医疗审核岗";
            }else if (data[i].station == 35) {
              data[i].station = "非门诊车险人伤调查岗";
            } else if (data[i].station == 36) {
              data[i].station = "门诊车险人伤调查岗";
            } else if (data[i].station == 37) {
              data[i].station = "雇主险意外险健康险理赔岗";
            }else if (data[i].station == 38) {
              data[i].station = "雇主险意外险健康险核赔岗";
            } else if (data[i].station == 39) {
              data[i].station = "雇主险意外险健康险大案理赔岗";
            } else if (data[i].station == 40) {
              data[i].station = "雇主险意外险健康险小案理赔岗";
            }else if (data[i].station == 41) {
              data[i].station = "诉讼追偿岗";
            } else if (data[i].station == 42) {
              data[i].station = "诉讼岗";
            } else if (data[i].station == 43) {
              data[i].station = "追偿岗";
            }else if (data[i].station == 44) {
              data[i].station = "稽核岗";
            } else if (data[i].station == 45) {
              data[i].station = "反欺诈调查岗";
            } else if (data[i].station == 46) {
              data[i].station = "稽核岗";
            }
          }
          this.userlist = data;

          }

          
          console.log(this.userlist)
        });
    },
    //编辑

    edit(index, row) {
      this.dialogVisible = true;
      console.log(index);
      console.log(row);
      this.listRow = row;
    },
    
    //确认编辑
    determine() {
      this.dialogVisible = false;
       console.log(this.listRow);
       let tmp = JSON.stringify(this.listRow );//将对象转换为json字符串形式
        //  console.log(tmp)
           let obj = JSON.parse(tmp);
     
     
    
      if(obj.role=="员工"){
        obj.role=4
      }else if(obj.role=="主管"){
        obj.role=3
      }
      if(obj.role==3&&obj.station=="定损中心(福田)"){
        obj.station=1
      }else if(obj.role==4&&obj.station=="定损中心(福田)"){
        obj.station=2
      }else if(obj.role==3&&obj.station=="定损中心(罗湖)"){
        obj.station=3
      }else if(obj.role==4&&obj.station=="定损中心(罗湖)"){
        obj.station=4
      }else if(obj.role==3&&obj.station=="定损中心(南山)"){
        obj.station=5
      }else if(obj.role==4&&obj.station=="定损中心(南山)"){
        obj.station=6
      }else if(obj.role==3&&obj.station=="定损中心(宝安)"){
        obj.station=7
      }else if(obj.role==4&&obj.station=="定损中心(宝安)"){
        obj.station=8
      }else if(obj.role==3&&obj.station=="定损中心(龙岗)"){
        obj.station=9
      }else if(obj.role==4&&obj.station=="定损中心(龙岗)"){
        obj.station=10
      }else if(obj.role==3&&obj.station=="定损中心(松岗/光明)"){
        obj.station=11
      }else if(obj.role==4&&obj.station=="定损中心(松岗/光明)"){
        obj.station=12
      }else if(obj.role==3&&obj.station=="定损中心(龙华/观澜)"){
        obj.station=13
      }else if(obj.role==4&&obj.station=="定损中心(龙华/观澜)"){
        obj.station=14
      }else if(obj.role==3&&obj.station=="视频查勘中心"){
        obj.station=15
      }else if(obj.role==4&&obj.station=="视频查勘中心"){
        obj.station=16
      }else if(obj.role==3&&obj.station=="视频定损中心"){
        obj.station=17
      }else if(obj.role==4&&obj.station=="视频定损中心"){
        obj.station=18
      }else if(obj.role==3&&obj.station=="核价报价岗"){
        obj.station=19
      }else if(obj.role==4&&obj.station=="核价报价岗"){
        obj.station=20
      }else if(obj.role==3&&obj.station=="通赔岗"){
        obj.station=21
      }else if(obj.role==4&&obj.station=="通赔岗"){
        obj.station=22
      }else if(obj.role==3&&obj.station=="非车险财产大案理赔岗"){
        obj.station=23
      }else if(obj.role==4&&obj.station=="非车险财产大案理赔岗"){
        obj.station=24
      }else if(obj.role==3&&obj.station=="非车险财产小案理赔岗"){
        obj.station=25
      }else if(obj.role==4&&obj.station=="非车险财产小案理赔岗"){
        obj.station=26
      }else if(obj.role==3&&obj.station=="核损岗"){
        obj.station=27
      }else if(obj.role==4&&obj.station=="大案运营岗"){
        obj.station=28
      }else if(obj.role==4&&obj.station=="核损岗"){
        obj.station=29
      }else if(obj.role==3&&obj.station=="核赔岗"){
        obj.station=30
      }else if(obj.role==4&&obj.station=="核赔岗"){
        obj.station=31
      }else if(obj.role==4&&obj.station=="理算中心"){
        obj.station=32
      }else if(obj.role==3&&obj.station=="车险人伤理赔岗"){
        obj.station=33
      }else if(obj.role==4&&obj.station=="车险人伤医疗审核岗"){
        obj.station=34
      }else if(obj.role==4&&obj.station=="非门诊车险人伤调查岗"){
        obj.station=35
      }else if(obj.role==4&&obj.station=="门诊车险人伤调查岗"){
        obj.station=36
      }else if(obj.role==3&&obj.station=="雇主险意外险健康险理赔岗"){
        obj.station=37
      }else if(obj.role==4&&obj.station=="雇主险意外险健康险核赔岗"){
        obj.station=38
      }else if(obj.role==4&&obj.station=="雇主险意外险健康险大案理赔岗"){
        obj.station=39
      }else if(obj.role==4&&obj.station=="雇主险意外险健康险小案理赔岗"){
        obj.station=40
      }else if(obj.role==3&&obj.station=="诉讼追偿岗"){
        obj.station=41
      }else if(obj.role==4&&obj.station=="诉讼岗"){
        obj.station=42
      }else if(obj.role==4&&obj.station=="追偿岗"){
        obj.station=43
      }else if(obj.role==3&&obj.station=="稽核科"){
        obj.station=44
      }else if(obj.role==4&&obj.station=="反欺诈调查岗"){
        obj.station=45
      }else if(obj.role==4&&obj.station=="稽核岗"){
        obj.station=46
      }
       console.log(obj)

      this.axios
        .put("update/SalaryStandard", JSON.stringify(obj), {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
        .then(res => {
          if (res.data.code !== 1) {
            console.log(res.meta);
            return this.$message.error("修改失败");
          }
          this.$message.success("修改成功");
          this.getUser();
          console.log(res.data);
        });
    },
    //分页
    handleCurrentChange(cpage) {
      this.currpage = cpage;
      console.log(cpage);
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
      console.log(psize);
    },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },

    // 模板下载
    downloadFile() {
     
      this.axios
        .get("downloadExcel", {
          responseType: "blob"
        })
        .then(res => {
          // 处理返回的文件流
          const content = res.data.data;
          console.log(content);
          const blob = new Blob([res.data], {
            type: "application/vnd.ms-excel"
          });
          console.log(blob);

          const fileName = "薪酬标准.xls";

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
          // } else {
          // // IE10+下载
          // navigator.msSaveBlob(blob, fileName);
          // }
        });
    },


    //文件上传

    uploadFile(item) {
      let fileObj = item.file;
      console.log(fileObj);
      const form = new FormData();
      form.append("multipartFile", fileObj);
      console.log(form);
      this.axios({
        method: "post",
        url: "uploadExcel",
        data: form,
        contentType: "multipart/form-data",
        processData: false,
        contentType: false
      }).then(res => {
        console.log(res);
        if(res.data.code==1){
            this.$message.success("上传成功");
            this. getUser()
        }else{
          this.$message.error("上传失败")
        }
      });
    }
  }
};
</script>
 
<style scoped lang = "scss">
.btn {
  background-color: #dcdcdc;
  border-radius: 5px;
  padding: 10px;
  > div {
    margin-top: 20px;
    margin-left: 100px;
  }
}
.search {
  padding: 10px;
  background-color: #dcdcdc;
  border-radius: 5px;
}
.d2 {
  float: left;
}
.el-input {
  width: 300px;
}

.d1 {
  height: 100px;
}
.d1-1 {
  height: 100px;
}
.d2-1 {
  float: left;
  margin-left: 10px;
}
.d3 {
  margin-left: 20px;
}
.rgt {
  margin-left: 30px;
}
.rg {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row-reverse;
  margin-top: 30px;
}

.el-upload-dragger {
  width: 10px;
}
.sn-btn {
  display: flex;
  justify-content: space-between;
}
</style>