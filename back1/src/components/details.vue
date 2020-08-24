<template>
 <div class="">
     <el-breadcrumb>
      <el-breadcrumb-item>个人绩效考核报表</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm" >
      
       <div class="d1">
          <el-form-item label="日期" class="d2">
            <el-date-picker 
              v-model="statisticsDate1"
              type="month"
              placeholder="选择日期"
              value-format="yyyy-MM"
              @change="dateChange">
            </el-date-picker>
          </el-form-item>

       </div>

    </el-form>

    <div>
      <el-table
      :data="lists"
      style="width: 100%">
      <el-table-column
        prop="xz"
        label="险种"
        width="180">
      </el-table-column>
      <el-table-column
        prop="bah"
        label="报案号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="bdh"
        label="保单号">
      </el-table-column>
      <el-table-column
        prop="time"
        label="报案时间">
      </el-table-column>
    </el-table>
    </div>

 
 </div>
</template>
 
<script>
export default {
  created(){
    //  this.fetchData()
    this.getAll()
  },
 data () {
 return {
   obj:[],
    lists:[
        {xz:'TradeCode21',bah:'123456789',bdh:'123456',time:'2020-05-01'},
        {xz:'TradeCode21',bah:'123456789',bdh:'123456',time:'2020-05-01'},
        {xz:'TradeCode21',bah:'123456789',bdh:'123456',time:'2020-05-01'},
        {xz:'TradeCode21',bah:'123456789',bdh:'123456',time:'2020-05-01'},
        {xz:'TradeCode21',bah:'123456789',bdh:'123456',time:'2020-05-01'},
        {xz:'TradeCode21',bah:'123456789',bdh:'123456',time:'2020-05-01'},
        ],
   
   ruleForm:{},
    statisticsDate1:''
  

  
 }
 },
 methods:{
   
    //查询时间
    dateChange(statisticsDate){
     this.statisticsDate=statisticsDate
     console.log(this.statisticsDate)

    },
   getAll(){
 

   }
   
 }
}
</script>
 
<style scoped lang = "scss">
.d1{
  height: 100px;
}
.d2{
  float: left;
}
 
</style>