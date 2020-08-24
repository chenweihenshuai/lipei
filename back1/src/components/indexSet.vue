<template>
  <div class>
    <el-breadcrumb>
      <el-breadcrumb-item>非分省库指标录入 / 非分省库指标维护</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <h3>文件导入：</h3>
    <div class="btn">
      <div>
        <span>模板下载：</span>
        <span class>数据来源:</span>
        <el-select placeholder="请选择角色" v-model="userForm.roleId" @change="supRes(userForm.roleId)">
          <el-option label="主管" value="3"></el-option>
          <el-option label="员工" value="4"></el-option>
        </el-select>
        <el-select placeholder="请选择岗位" v-model="userForm.stationId" @change="sup(userForm.station)">
          <el-option v-for="item in options" :value="item.id" :label="item.station" :key="item.id"></el-option>
          <!-- <el-option v-for="item in options" :value=item.id :label=item.station :key="item.id"></el-option> -->
        </el-select>
        <el-button
          class="pull-right right-10"
          icon="el-icon-download"
          type="primary"
          size="mini"
          @click="downloadFile('指标模板')"
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
          :limit="10"
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
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="d1">
          <el-form-item label="姓名：" class="d2" prop="name">
            <el-input v-model="ruleForm.name" class="el-input"></el-input>
          </el-form-item>
          <el-form-item label="职级" class="d2" prop="roleId">
            <el-select
              v-model="ruleForm.roleId"
              placeholder="请选择职级"
              @change="supRes(ruleForm.roleId)"
            >
              <el-option label="主管" value="3"></el-option>
              <el-option label="员工" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位" class="d2" prop="stationId">
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
        </div>

        <div class="d1-1">
          <div class="d2-1">
            <el-form-item prop="statisticsDate" label="统计期:">
              <el-date-picker
                v-model="ruleForm.statisticsDate"
                type="month"
                placeholder="选择日期"
                value-format="yyyy-MM"
                @change="dateChange"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="d2-1">
            <el-button type="primary" class="rgt" @click="getAll(2)">查询</el-button>
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
        <!-- <el-table-column   :label=item width="200" v-for="(item,index) in userlistHed"  :key= 'index'></el-table-column> -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>

        <el-table-column property="name" label="姓名" width="80"></el-table-column>

        <el-table-column property="businessline" label="业务线条" width="100"></el-table-column>
        <el-table-column property="identitycard" label="身份证" width="200"></el-table-column>
        <el-table-column property="station1" label="岗位" width="200"></el-table-column>

        <template v-for="(col,index) in titleData">
          <el-table-column
            :show-overflow-tooltip="true"
            :prop="col.data"
            :label="col.name"
            :key="index"
            width="200px"
          ></el-table-column>
        </template>
        <el-table-column property="statistics" label="统计期" width="100"></el-table-column>
        <el-table-column property="location" label="地区" width="100" v-if="stationId<14"></el-table-column>

        <el-table-column property="address" label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="edit(scope.$index,scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="remove(scope.row.id,scope.row.station)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑页面 -->
      <el-dialog title="编辑" :visible.sync="dialogVisible" width="600px">
        <el-form :model="listRow" label-width="150px" class="demo-ruleForm" :rules="rules">
          <el-form-item label="姓名">
            <el-input v-model="listRow.name"></el-input>
          </el-form-item>

          <el-form-item label="业务线条">
            <el-input v-model="listRow.businessline"></el-input>
          </el-form-item>
          <el-form-item :label="col.name" v-for="(col,index) in titleData" :key="index">
            <el-input v-model="listRow[col.data]"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="determine(listRow.id,listRow.station)">确 定</el-button>
        </span>
      </el-dialog>

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
  </div>
</template>
 
<script>
export default {
  created() {
    //  this.getStation()
    this.fetchData();
    this.getAll();
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
      //表格数据
      userlist: [],
      titleData: [],
      obj: [],
      userlistHed: [],
      total1: "",
      currentPage: 1,
      pagesize: 3,
      

      //默认查询数据
      ruleForm: {
        roleId: "3",
        stationId: "定损中心(福田)",
        name: "",
        statisticsDate: ""
      },
      // 数据来源的角色和岗位
      userForm: {
        roleId: "",
        stationId: ""
      },
      //返回岗位
      station: [],
      // //下载模板的角色id
      roleId: "3",
      // //下载模板的岗位id
      stationId: "1",
      options: [],
      dialogVisible: false,
      //当前修改行的数据
      listRow: {},
      //验证修改表单身份证的规则
      rules: {
        identityCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { validator: checkIdentityCard, trigger: "blur" }
        ]
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
    handleCurrentChange(cpage) {
      this.currpage = cpage;
      console.log(cpage);
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
      console.log(psize);
    },
    handleSelectionChange(val) {
      console.log(val);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
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
      let timedate = nian + "-" + yue;
      this.ruleForm.statisticsDate = timedate;

      console.log(this.ruleForm.statisticsDate);
    },
    //选择查询时间
    dateChange(statisticsDate) {
      this.ruleForm.statisticsDate = statisticsDate;
      console.log(this.ruleForm.statisticsDate);
    },
    //清除查询条件
    clear() {
      this.$refs.ruleForm.resetFields();
      this.getAll();
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
      this.getAll();
    },

    //获取表格数据

    getAll() {
      // console.log(this.ruleForm)
      var arr = this.ruleForm;
      console.log(arr);
      let tmp = JSON.stringify(arr); //将对象转换为json字符串形式
      //  console.log(tmp)
      let obj = JSON.parse(tmp);

      console.log(obj);

      if (obj.roleId == 3 && obj.stationId == "定损中心(福田)") {
        obj.stationId = 1;
      } else if (obj.roleId == 4 && obj.stationId == "定损中心(福田)") {
        obj.stationId = 2;
      }
      console.log(obj.statisticsDate);
      this.axios("getAll", { params: obj }).then(res => {
        // console.log(this.ruleForm)
        console.log(res.data.data.date);
        if (res.data.code == 0) {
          this.userlist = [];
        } else {
          let arrList = res.data.data.date;
          for (var i = 0; i < arrList.length; i++) {
            if (arrList[i].station == 1) {
              arrList[i].station1 = "定损中心（福田）";
            } else if (arrList[i].station == 2) {
              arrList[i].station1 = "定损中心（福田）";
            } else if (arrList[i].station == 3) {
              arrList[i].station1 = "定损中心(罗湖)";
            } else if (arrList[i].station == 4) {
              arrList[i].station1 = "定损中心(罗湖）";
            } else if (arrList[i].station == 5) {
              arrList[i].station1 = "定损中心(南山)";
            } else if (arrList[i].station == 6) {
              arrList[i].station1 = "定损中心(南山)";
            } else if (arrList[i].station == 7) {
              arrList[i].station1 = "定损中心(宝安)";
            } else if (arrList[i].station == 8) {
              arrList[i].station1 = "定损中心(宝安)";
            } else if (arrList[i].station == 9) {
              arrList[i].station1 = "定损中心(龙岗)";
            } else if (arrList[i].station == 10) {
              arrList[i].station1 = "定损中心(龙岗)";
            } else if (arrList[i].station == 11) {
              arrList[i].station1 = "定损中心(龙岗/光明)";
            } else if (arrList[i].station == 12) {
              arrList[i].station1 = "定损中心(龙岗/光明)";
            } else if (arrList[i].station == 13) {
              arrList[i].station1 = ">定损中心(龙岗/观澜)）";
            } else if (arrList[i].station == 14) {
              arrList[i].station1 = ">定损中心(龙岗/观澜)";
            } else if (arrList[i].station == 15) {
              arrList[i].station1 = "视频查勘中心";
            } else if (arrList[i].station == 16) {
              arrList[i].station1 = "视频查勘中心";
            } else if (arrList[i].station == 17) {
              arrList[i].station1 = "视频定损中心";
            } else if (arrList[i].station == 18) {
              arrList[i].station1 = "视频定损中心";
            } else if (arrList[i].station == 19) {
              arrList[i].station1 = "核价报价岗";
            } else if (arrList[i].station == 20) {
              arrList[i].station1 = "核价报价岗";
            } else if (arrList[i].station == 21) {
              arrList[i].station1 = "通赔岗";
            } else if (arrList[i].station == 22) {
              arrList[i].station1 = "通赔岗";
            } else if (arrList[i].station == 23) {
              arrList[i].station1 = "非车险财产大案理赔岗";
            } else if (arrList[i].station == 24) {
              arrList[i].station1 = "非车险财产大案理赔岗";
            } else if (arrList[i].station == 25) {
              arrList[i].station1 = "非车险财产小案理赔岗";
            } else if (arrList[i].station == 26) {
              arrList[i].station1 = "非车险财产小案理赔岗";
            } else if (arrList[i].station == 27) {
              arrList[i].station1 = "核损岗";
            } else if (arrList[i].station == 28) {
              arrList[i].station1 = "大案运营岗";
            } else if (arrList[i].station == 29) {
              arrList[i].station1 = "核损岗";
            } else if (arrList[i].station == 30) {
              arrList[i].station1 = "核赔岗";
            } else if (arrList[i].station == 31) {
              arrList[i].station1 = "核赔岗";
            } else if (arrList[i].station == 32) {
              arrList[i].station1 = "理算中心";
            } else if (arrList[i].station == 33) {
              arrList[i].station1 = "车险人伤理赔岗";
            } else if (arrList[i].station == 34) {
              arrList[i].station1 = "车险人伤医疗审核岗";
            } else if (arrList[i].station == 35) {
              arrList[i].station1 = "非门诊车险人伤调查岗";
            } else if (arrList[i].station == 36) {
              arrList[i].station1 = "门诊车险人伤调查岗";
            } else if (arrList[i].station == 37) {
              arrList[i].station1 = "雇主险意外险健康险理赔岗";
            } else if (arrList[i].station == 38) {
              arrList[i].station1 = "雇主险意外险健康险核赔岗";
            } else if (arrList[i].station == 39) {
              arrList[i].station1 = "雇主险意外险健康险大案理赔岗";
            } else if (arrList[i].station == 40) {
              arrList[i].station1 = "雇主险意外险健康险小案理赔岗";
            } else if (arrList[i].station == 41) {
              arrList[i].station1 = "诉讼追偿岗";
            } else if (arrList[i].station == 42) {
              arrList[i].station1 = "诉讼岗";
            } else if (arrList[i].station == 43) {
              arrList[i].station1 = "追偿岗";
            } else if (arrList[i].station == 44) {
              arrList[i].station1 = "稽核岗";
            } else if (arrList[i].station == 45) {
              arrList[i].station1 = "反欺诈调查岗";
            } else if (arrList[i].station == 46) {
              arrList[i].station1 = "稽核岗";
            }
          }
          console.log(arrList);
          this.userlist = arrList;
          console.log(this.userlist);
          let index = res.data.data.index;
          let obj = [];
          //获取属性
          for (var key in this.userlist[0]) {
            //  console.log(key)
            obj.push(key);
          }

          //  console.log(obj)
          //获取包含index的属性
          let obj1 = [];
          for (var i = 0; i < obj.length; i++) {
            if (obj[i].indexOf("index") > -1) {
              obj1.push(obj[i]);
            }
          }
          //  console.log(obj1)
          let arr = res.data.data.index;
          //符合要求的数组格式
          let arr1 = [];
          for (let index in arr) {
            arr1.push({ data: obj1[index], name: arr[index] });
          }

          //  console.log(arr1)

          this.titleData = arr1;
        
        }
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
    determine(id, stationId) {
      this.dialogVisible = false;
      this.listRow.roleId = this.roleId;
      let object = this.listRow;

      // console.log(object)
      let url = `updateNofenUser?id=${id}&stationId=${stationId}&roleId=${object.roleId}`;
      // console.log(url)

      this.axios
        .put(url, JSON.stringify(object), {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
        .then(res => {
          if (res.data.code !== 1) {
            // console.log(res.meta);
            return this.$message.error("修改失败");
          } else {
            this.$message.success("修改成功");
            this.getAll();
          }

          // console.log(res.status);
        });
    },

    //删除

    async remove(id, station) {
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
        .delete("deleteById", {
          params: { id: id, stationId: station, roleId: this.ruleForm.roleId }
        })
        .then(res => {
          if (res.data.code !== 1) {
            console.log(res.meta);
            return this.$message.error("删除失败");
          }
          this.$message.success("删除成功");
          this.getAll();
        });
    },

    // 模板下载
    downloadFile(name) {
      console.log(this.userForm.roleId);
      console.log(this.userForm.stationId);

      this.axios
        .get("downLoad/index/excel", {
          params: {
            roleId: this.userForm.roleId,
            stationId: this.userForm.stationId
          },
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
          // } else {
          // // IE10+下载
          // navigator.msSaveBlob(blob, fileName);
          // }
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
        url: "upload/noFenIndex/excel",
        data: form,
        contentType: "multipart/form-data",
        processData: false,
        contentType: false
      }).then(res => {
        console.log(res.data);
        this.userlistHed = res.data.data;
        if (res.data.code == 1) {
          this.$message.success("上传成功");
          this.getAll();
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
</style>