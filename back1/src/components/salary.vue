<template>
  <div class>
    <el-breadcrumb>
      <el-breadcrumb-item>工资薪酬结果</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <h3>工资薪酬结果查询</h3>
    <div>
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">
        <div >
          <el-form-item label="姓名:" prop="name">
            <el-input v-model="ruleForm.name" class="el-input"></el-input>
          </el-form-item>
        </div>
        <div >

            <el-form-item label="岗位:" prop="station">
            <el-select v-model="ruleForm.station" placeholder="请选择岗位">
            <el-option
                :label="item.station"
                :value="item.id"
                v-for="item in station"
                :key="item.id"
            ></el-option>
            </el-select>
        </el-form-item>
            
          
        </div>

        <div class="sta">
          <el-form-item prop="statisticsDate" label="统计期:">
            <!-- <span>统计期:</span> -->
            <el-date-picker
              v-model="ruleForm.statisticsDate"
              type="month"
              placeholder="选择日期"
              value-format="yyyy-MM"
              @change="dateChange"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="btn">
          <el-button type="primary" class="rgt" @click=" getMySalary()">查询</el-button>
          <el-button @click="clear()">清空条件</el-button>
        </div>
      </el-form>
    </div>
    <h3>结果列表</h3>
    <p>共搜索到{{userlist.length}}条数据</p>
    <!-- 列表 -->
    <div>
      <el-table :data="showTable" highlight-current-row style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column type="index" width="100" label="序号"></el-table-column>

        <el-table-column property="name" label="姓名" width="120"></el-table-column>

        <el-table-column property="identityCard" label="身份证" width="200"></el-table-column>

        <el-table-column property="station" label="岗位">
          <template slot-scope="scope">
            <span v-if="scope.row.station==1">定损中心(福田)</span>
            <span v-if="scope.row.station==2">定损中心(福田)</span>
            <span v-if="scope.row.station==3">定损中心(罗湖)</span>
            <span v-if="scope.row.station==4">定损中心(罗湖)</span>
            <span v-if="scope.row.station==5">定损中心(南山)</span>
            <span v-if="scope.row.station==6">定损中心(南山)</span>
            <span v-if="scope.row.station==7">定损中心(宝安)</span>
            <span v-if="scope.row.station==8">定损中心(宝安)</span>
            <span v-if="scope.row.station==9">定损中心(龙岗)</span>
            <span v-if="scope.row.station==10">定损中心(龙岗)</span>
            <span v-if="scope.row.station==11">定损中心(龙岗/光明)</span>
            <span v-if="scope.row.station==12">定损中心(龙岗/光明)</span>
            <span v-if="scope.row.station==13">定损中心(龙岗/观澜)</span>
            <span v-if="scope.row.station==14">定损中心(龙岗/观澜)</span>
            <span v-if="scope.row.station==15">视频查勘中心</span>
            <span v-if="scope.row.station==16">视频查勘中心</span>
            <span v-if="scope.row.station==17">视频定损中心</span>
            <span v-if="scope.row.station==18">视频定损中心</span>
            <span v-if="scope.row.station==19">核价报价岗</span>
            <span v-if="scope.row.station==20">核价报价岗</span>
            <span v-if="scope.row.station==21">通赔岗</span>
            <span v-if="scope.row.station==22">通赔岗</span>
            <span v-if="scope.row.station==23">非车险财产大案理赔岗</span>
            <span v-if="scope.row.station==24">非车险财产大案理赔岗</span>
            <span v-if="scope.row.station==25">非车险财产小案理赔岗</span>
            <span v-if="scope.row.station==26">非车险财产小案理赔岗</span>
            <span v-if="scope.row.station==27">核损岗</span>
            <span v-if="scope.row.station==28">大案运营岗</span>
            <span v-if="scope.row.station==29">核损岗</span>
            <span v-if="scope.row.station==30">核赔岗</span>
            <span v-if="scope.row.station==31">核赔岗</span>
            <span v-if="scope.row.station==32">理算中心</span>
            <span v-if="scope.row.station==33">车险人伤理赔岗</span>
            <span v-if="scope.row.station==34">车险人伤医疗审核岗</span>
            <span v-if="scope.row.station==35">非门诊车险人伤调查岗</span>
            <span v-if="scope.row.station==36">门诊车险人伤调查岗</span>
            <span v-if="scope.row.station==37">雇主险意外险健康险理赔岗</span>
            <span v-if="scope.row.station==38">雇主险意外险健康险核赔岗</span>
            <span v-if="scope.row.station==39">雇主险意外险健康险大案理赔岗</span>
            <span v-if="scope.row.station==40">雇主险意外险健康险小案理赔岗</span>
            <span v-if="scope.row.station==41">诉讼追偿岗</span>
            <span v-if="scope.row.station==42">诉讼岗</span>
            <span v-if="scope.row.station==43">追偿岗</span>
            <span v-if="scope.row.station==44">稽核岗</span>
            <span v-if="scope.row.station==45">反欺诈调查岗</span>
            <span v-if="scope.row.station==46">稽核岗</span>
          </template>
        </el-table-column>

        <!-- <el-table-column property="gw"  label="岗位">  </el-table-column> -->

        <el-table-column property="performanceSalary" label="月绩效工资（元）"></el-table-column>

        <el-table-column property="fixedSalary" label="月固定工资（元）"></el-table-column>

        <el-table-column property="salary" label="月总工资（元）"></el-table-column>

        <el-table-column property="statisticsDate" label="月份"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 查看按钮 -->
            <el-button @click="getDetails(scope.row.identityCard)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
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

    <!-- 查看详情 -->
    <el-dialog title="薪酬详情" :visible.sync="dialogVisible" width="70%">
      <h3>人员信息</h3>
      <div class="dialog">
        <div>
          <span style="display:inline-block;width:100px;text-align:right;">姓名:</span>
          <input v-model="list.name" readonly type="text" class="inp-rg" />
        </div>
        <div>
          <span style="display:inline-block;width:100px;text-align:right;">团队:</span>
          <input v-model="list.department" readonly type="text" class="inp-rg" />
        </div>
        <div>
          <span style="display:inline-block;width:100px;text-align:right;">身份证:</span>
          <input v-model="list.identityCard" readonly type="text" class="inp-rg" />
        </div>
        <div>
          <span style="display:inline-block;width:100px;text-align:right;">岗位:</span>
          <input v-model="list.station" readonly type="text" class="inp-rg" />
        </div>
        <div>
          <span style="display:inline-block;width:100px;text-align:right;">业务条线</span>
          <input v-model="list.name" readonly type="text" class="inp-rg" />
        </div>
        <div>
          <span style="display:inline-block;width:100px;text-align:right;">备注</span>
          <input v-model="list.name" readonly type="text" class="inp-rg" />
        </div>
      </div>
      <h3>工资明细</h3>
      <el-table style="width: 100%" :data="tabelList">
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>

        <el-table-column prop="statisticsDate" label="月份" align="center"></el-table-column>

        <el-table-column prop="performanceSalary" label="月绩效工资（元)" align="center"></el-table-column>

        <el-table-column prop="fixedSalary" label="月固定工资（元）" align="center"></el-table-column>

        <el-table-column prop="salary" label="月工资（元）" align="center"></el-table-column>

        <el-table-column prop="salaryMakeup" label="工资构成" align="center"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
export default {
  created() {
    this.getMySalary();
    this.getStation(); //获取岗位
    this.fetchData();
  },
  data() {
    return {
      tabelList: [],
      //查看详情数据
      list: "",
      //岗位
      station: [],
      //表格数据
      userlist: [],
      total1: "",
      currentPage: 1,
      pagesize: 3,
      //查询数据
      ruleForm: {
        name: "",
        statisticsDate: "",
        station: ""
      },
      dialogVisible: false
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
    fetchData() {
      var date = new Date();
      var nian = date.getFullYear(); //获取完整的年份(4位)
      var yue = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      if (yue < 10) {
        //小于10加0
        yue = "0" + yue;
      }
      console.log(nian, yue);
      this.ruleForm.statisticsDate = nian + "-" + yue;
      console.log(this.ruleForm.statisticsDate);
    },
    //查询时间
    dateChange(statisticsDate) {
      this.ruleForm.statisticsDate = statisticsDate;
      console.log(this.ruleForm.statisticsDate);
    },
    //清除查询条件
    clear() {
      this.$refs.ruleForm.resetFields();
      this.getMySalary();
    },

    //  获取表格数据
    getMySalary() {
      console.log(this.ruleForm);
      this.axios.get("get/mySalary", { params: this.ruleForm }).then(res => {
        console.log(res.data.data);

        if (res.data.code == 0) {
          this.userlist = [];
        } else {
          this.userlist = res.data.data;
        }
      });
    },
    //获取岗位
    getStation() {
      this.axios.get("getSubStation/ByRole").then(res => {
        console.log(res.data.data);

        this.station = res.data.data;
      });
    },

    //  查看详情数据
    getDetails(identityCard) {
      console.log(identityCard);
      this.dialogVisible = true;

      this.axios
        .get("getDetails", {
          params: {
            identityCard: identityCard
          }
        })
        .then(res => {
          console.log(res.data.data);
          let result = res.data.data[0];
          this.tabelList = res.data.data;
          console.log(this.tabelList);

          if (result.station == 1) {
                result.station = "定损中心(福田)";
            } else if (result.station == 2) {
                result.station = "定损中心(福田)";
            } else if (result.station == 3) {
                result.station = "定损中心(罗湖)";
            } else if (result.station == 4) {
                result.station = "定损中心(罗湖）";
            } else if (result.station == 5) {
                result.station = "定损中心(南山)";
            } else if (result.station == 6) {
                result.station = "定损中心(南山)";
            } else if (result.station == 7) {
                result.station = "定损中心(宝安)";
            } else if (result.station == 8) {
                result.station = "定损中心(宝安)";
            } else if (result.station == 9) {
                result.station = "定损中心(龙岗)";
            } else if (result.station == 10) {
                result.station = "定损中心(龙岗)";
            } else if (result.station == 11) {
                result.station = "定损中心(龙岗/光明)";
            } else if (result.station == 12) {
                result.station = "定损中心(龙岗/光明)";
            } else if (result.station == 13) {
                result.station = ">定损中心(龙岗/观澜）";
            } else if (result.station == 14) {
                result.station = ">定损中心(龙岗/观澜)";
            } else if (result.station == 15) {
                result.station = "视频查勘中心";
            } else if (result.station == 16) {
                result.station = "视频查勘中心";
            } else if (result.station == 17) {
                result.station = "视频定损中心";
            } else if (result.station == 18) {
                result.station = "视频定损中心";
            } else if (result.station == 19) {
                result.station = "核价报价岗";
            } else if (result.station == 20) {
                result.station = "核价报价岗";
            } else if (result.station == 21) {
                result.station = "通赔岗";
            } else if (result.station == 22) {
                result.station = "通赔岗";
            } else if (result.station == 23) {
                result.station = "非车险财产大案理赔岗";
            } else if (result.station == 24) {
                result.station = "非车险财产大案理赔岗";
            } else if (result == 25) {
                result.station = "非车险财产小案理赔岗";
            } else if (result.station == 26) {
                result.station = "非车险财产小案理赔岗";
            } else if (result.station == 27) {
                result.station = "核损岗";
            } else if (result.station == 28) {
                result.station = "大案运营岗";
            } else if (result.station == 29) {
                result.station = "核损岗";
            } else if (result.station == 30) {
                result.station = "核赔岗";
            } else if (result.station == 31) {
                result.station = "核赔岗";
            } else if (result.station == 32) {
                result.station = "理算中心";
            } else if (result.station == 33) {
                result.station = "车险人伤理赔岗";
            } else if (result.station == 34) {
                result.station = "车险人伤医疗审核岗";
            } else if (result.station == 35) {
                result.station = "非门诊车险人伤调查岗";
            } else if (result.station == 36) {
                result.station = "门诊车险人伤调查岗";
            } else if (result.station == 37) {
                result.station = "雇主险意外险健康险理赔岗";
            } else if (result.station == 38) {
                result.station = "雇主险意外险健康险核赔岗";
            } else if (result.station == 39) {
                result.station = "雇主险意外险健康险大案理赔岗";
            } else if (result.station == 40) {
                result.station = "雇主险意外险健康险小案理赔岗";
            } else if (result.station == 41) {
                result.station = "诉讼追偿岗";
            } else if (result.station == 42) {
                result.station = "诉讼岗";
            } else if (result.station == 43) {
                result.station = "追偿岗";
            } else if (result.station == 44) {
                result.station = "稽核科";
            } else if (result.station == 45) {
                result.station = "反欺诈调查岗";
            } else if (result.station == 46) {
                result.station = "稽核岗";
          }
          this.list = result;
        });
    }
  }
};
</script>
 
<style scoped lang = "scss">
.el-input {
  width: 300px;
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
.inp-rg {
  margin-left: 10px;
  height: 30px;
}
.dialog {
  background-color: #c0c0c0;
  height: 200px;
  padding: 30px;
  > div {
    float: left;
    margin-top: 30px;
  }
}

.btn{
    /* border:1px solid red; */
    margin-left:30px
}
</style>