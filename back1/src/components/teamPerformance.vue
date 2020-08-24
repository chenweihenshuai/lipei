<template>
  <div class>
    <el-breadcrumb>
      <el-breadcrumb-item>团队指标</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <h3>员工列表</h3>
    <div class="search">
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="d1">
          <el-form-item label="姓名：" class="d2" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入姓名" class="el-input"></el-input>
          </el-form-item>
          <el-form-item label="职级" class="d2" prop="roleId" v-show="obj.role!=3">
            <el-select
              v-model="ruleForm.roleId"
              placeholder="请选择职级"
              @change="supRes(ruleForm.roleId)"
            >
              <el-option label="超级管理员" value="1"></el-option>
              <el-option label="理赔负责人" value="2"></el-option>
              <el-option label="主管" value="3"></el-option>
              <el-option label="员工" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位" class="d2" prop="stationId" v-show="obj.role!=3">
            <el-select v-model="ruleForm.stationId" placeholder="请选择岗位">
              <!-- <el-option :label=item.station1 :value=item.station  v-for='item in station' :key="item.id"></el-option> -->
              <el-option
                v-for="item in options"
                :value="item.id"
                :label="item.station"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="d2-1">
            <el-button type="primary" class="rgt" @click="getAllEmp">查询</el-button>
            <el-button @click="clear()">清空条件</el-button>
          </div>
        </div>
      </el-form>
    </div>

    <div>
      <el-table :data="showTable" highlight-current-row style="width: 100%">
        <!-- <el-table-column type="selection" width="55"> </el-table-column> -->

        <el-table-column type="index" width="100" label="序号"></el-table-column>

        <el-table-column property="name" label="姓名" width="150"></el-table-column>

        <el-table-column property="identityCard" label="身份证" width="300"></el-table-column>

        <el-table-column property="role" label="职级">
          <template slot-scope="scope">
            <span v-if="scope.row.role==1">超级管理员</span>
            <span v-if="scope.row.role==2">理赔负责人</span>
            <span v-if="scope.row.role==3">主管</span>
            <span v-if="scope.row.role==4">员工</span>
          </template>
        </el-table-column>

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

        <el-table-column property="tel" label="电话"></el-table-column>

        <el-table-column property="age" label="年龄"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="getDetails( scope.row.name,scope.row.identityCard,scope.row.role,scope.row.station)"
            >查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="rg">
        <el-pagination
          background
          layout="prev, pager, next, sizes, total, jumper"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pagesize"
          :total="userlist.length"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>

      <!-- 查看详情 -->
      <el-dialog title="详情" :visible.sync="dialogVisible" width="70%">
        <div class="block">
          <el-date-picker
            v-model="statisticsDate"
            type="month"
            placeholder="选择月"
            value-format="yyyy-MM"
            @change="dateChange"
          ></el-date-picker>
          <!-- {{ruleForm.statisticsDate}} -->
          <el-button type="primary" @click="getDetails">查询</el-button>
        </div>

        <div>
          <h3>指标详情</h3>
          <div class="team">
            <div class="d2" v-for=" (item,index) in list2" :key="index">
              <p class="p-name">{{item.name}}</p>
              <p class="p-num">{{item.num}}</p>
              <!-- <p>+{{item.num1}}同比上周</p> -->
            </div>
          </div>
        </div>
        <div>
          <h3>主观评价</h3>
          <div class="team">
            <div class="d2" v-for=" (item,index) in list1" :key="index">
              <p class="p-name">{{item.name}}</p>
              <p class="p-num">{{item.num}}</p>
              <!-- <p>+{{item.num1}}同比上周</p> -->
            </div>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
 
<script>
export default {
  created() {
    this.fetchData();
    this.getAllEmp();
    this.verify();
  },
  data() {
    return {
      obj: {}, //个人信息
      details: {}, //查询条件
      statisticsDate: "", //当前时间
      userlist: [], //员工数据
      total1: "",
      currentPage: 1,
      pagesize: 5,
      dialogVisible: false,
      options: [],
      list1: [], //主观评价
      list2: [], //个人指标
      //默认查询数据
      ruleForm: {
        roleId: "",
        stationId: "",
        name: ""
      }
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
    //获取当前个人信息
    verify() {
      this.axios.get("verify").then(res => {
        console.log(res.data.data);
        this.obj = res.data.data;
      });
    },
    //设置当前时间
    fetchData() {
      var date = new Date();
      var nian = date.getFullYear(); //获取完整的年份(4位)
      var yue = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      if (yue < 10) {
        //小于10加0
        yue = "0" + yue;
      }
      console.log(nian, yue);
      this.statisticsDate = nian + "-" + yue;
      console.log(this.statisticsDate);
    },
    //查询时间
    dateChange(statisticsDate) {
      this.statisticsDate = statisticsDate;
      console.log(this.statisticsDate);
    },
    //清空查询条件
    clear() {
      this.$refs.ruleForm.resetFields();
      this.getAllEmp();
    },
    getAllEmp() {
      this.axios.get("get/allEmp", { params: this.ruleForm }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 0) {
          this.userlist = [];
        } else {
          this.userlist = res.data.data;
        }
      });
    },
    getDetails(name, identityCard, role, station) {
      this.details.name = name;
      this.details.identityCard = identityCard;
      this.details.role = role;
      this.details.station = station;
      console.log(this.details);

      console.log(this.statisticsDate);
      this.dialogVisible = true;
      this.axios
        .get("getTeam/ReportForm", {
          params: {
            name: name,
            identityCard: identityCard,
            role: role,
            station: station,
            statisticsDate: this.statisticsDate
          }
        })
        .then(res => {
          console.log(res.data);
          let list1 = res.data.data.evaluationIndex;

          let list2 = res.data.data.noFenShengIndex;

          let obj1 = []; //主观评价

          let obj2 = []; //个人指标
          for (var key in list1) {
            console.log(key);
            obj1.push({ name: key, num: list1[key] });
          }
          console.log(obj1);
          this.list1 = obj1;
          console.log(this.list1);

          for (var key in list2) {
            console.log(key);
            obj2.push({ name: key, num: list2[key] });
          }
          console.log(obj2);
          this.list2 = obj2;
          console.log(this.list2);
          // let obj=obj1.concat(obj2)
          // console.log(obj)
        });

      // this.list1=obj1
    },

    //角色的联动
    supRes(val) {
      console.log(val);
      this.roleId = val;
      console.log(this.roleId);
      // let data={roleId:val}
      this.axios
        .get("getStationByRoleId", {
          params: {
            roleId: val
          }
        })
        .then(res => {
          console.log(res.data.data);
          this.options = res.data.data;
          console.log(this.options);
        });
    },

    sup(id) {
      console.log(id);
      // console.log(this.userForm.station)
      this.stationId = id;

      console.log(this.stationId);
      this.getAllEmp();
    },
    getDetails1() {
      console.log(this.statisticsDate);
    },
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
    }
  }
};
</script>
 
<style scoped lang = "scss">
.rg {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row-reverse;
  margin-top: 30px;
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
  margin-left: 50px;
}
.team {
  display: flex;
  flex-wrap: wrap;
  /* justify-content:space-around; */
  .d2 {
    border: 1px solid LightGrey;
    margin-left: 30px;
    width: 200px;
    height: 100px;
    text-align: center;
    .p-name,
    .p-num {
      margin-top: 10px;
    }
    .p-name {
      font-size: 16px;
    }
    .p-num {
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>