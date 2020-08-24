<template>
  <div class="div1">
    <el-breadcrumb>
      <el-breadcrumb-item>个人绩效考核报表</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <div class="time">
      <h3>个人绩效考核报表</h3>
      <div class="block">
        <el-date-picker
         v-model="ruleForm.statisticsDate" 
         type="month" 
         placeholder="选择月" 
         value-format="yyyy-MM"
         @change="dateChange"></el-date-picker>
         <!-- {{ruleForm.statisticsDate}} -->
      </div>
    </div>
     <div class="section-2">
         <div class="indicators">
       
       <div class="d2" v-for=" (item,index) in list" :key="index">
          <p>{{item.name}}</p>
          <p>{{item.num}}</p>
          <!-- <p>+{{item.num1}}同比上周</p> -->
      </div>
    </div>
    <div class="yir" v-if="list.length >3" @click="changeFoldState">
      <span>{{brandFold?'展开':'收起'}}</span>
    </div>

     </div>
     <h4>分省库指标</h4>
   
    <div class="provinces">
        <div  v-for=" (item,index) in list2" :key="index">
            
             <p class="bold1">{{item.name}} </p>
             <p class="bold2">{{item.num}}</p>
             
             <span @click="details(item.name)">详情</span>
            
        
        </div>
    </div>

    <h4>主观评价指标</h4>
    <div class="subjective">
        <div  v-for=" (item,index) in list1 " :key="index">
           <p class="bold1">{{item.name}}</p>
           <p class="bold2">{{item.num}}</p>
        </div>
    </div>
   
  </div>
 
</template>
 
<script>
export default {
  created(){
    
    this.fetchData()
    this.getLsit()
  },
  data() {
    return {
      //选择的时间
      tableList:[],
      lists:[
        {xz:'TradeCode21',bah:'123456789',bdh:'123456',time:'2020-05-01'},
        {xz:'TradeCode21',bah:'123456789',bdh:'123456',time:'2020-05-01'},
        {xz:'TradeCode21',bah:'123456789',bdh:'123456',time:'2020-05-01'},
        {xz:'TradeCode21',bah:'123456789',bdh:'123456',time:'2020-05-01'},
        {xz:'TradeCode21',bah:'123456789',bdh:'123456',time:'2020-05-01'},
        {xz:'TradeCode21',bah:'123456789',bdh:'123456',time:'2020-05-01'},
        ],
    
      ruleForm:{
         statisticsDate: ""
      },
     
      brandFold: true,
  
      list: [],
      list1:[],
      list2:[],
      vue:'sss'
    };
  },

  methods: {
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
    changeFoldState() {
      this.brandFold = !this.brandFold;
    },
    getLsit(){
      
      console.log(this.ruleForm.statisticsDate)
      this.axios.get('getPerson/ReportForm',{params:this.ruleForm}).then(res=>{
        console.log(res.data.data)

        //非分省库指标
       let list=res.data.data.noFenShengIndex
        // console.log(this.list)
        let obj=[]
        for(var key in list){
          console.log(key)
          obj.push({name:key,num:list[key]})
        }
        console.log(obj)
        this.list=obj

       // 主观评价
      let list1=res.data.data.evaluationIndex
      let obj1=[]
      for(var key in list1){
          console.log(key)
          obj1.push({name:key,num:list1[key]})
        }
        console.log(obj1)
        this.list1=obj1

      //分省库指标
         let list2=res.data.data.fenShengIndex
      let obj2=[]
      for(var key in list2){
          console.log(key)
          obj2.push({name:key,num:list2[key]})
        }
        console.log(obj2)
        this.list2=obj2
      })
     

     
    
    },
    //详情
    details(indexName){
      console.log(indexName)
      this.axios.get('get/detailsList',{params:{indexName:indexName,statisticsDate:this.ruleForm.statisticsDate}}).then(res=>{
        console.log(res.data)
      })
      this.$router.push({
        path:'/details',
        query:this.lists
      })

    }

    
  },
  computed: {

    //展开--收起
    showdetailList: {
      get: function() {
        if (this.brandFold) {
          if (this.list.length < 5) {
            return this.list;
          }
          let newArr = [];
          for (var i = 0; i < 4; i++) {
            let item = this.list[i];
            newArr.push(item);
          }
          return newArr;
        }
        return this.list;
      },
      set: function(val) {
        this.showdetailList = val;
      }
    }
  }
};
</script>
 
<style scoped lang = "scss">
.time {
  display: flex;
  justify-content: space-between;
  /* border:1px solid red ; */
  .block {
    cursor: pointer;
  }
}
.section-2{
   display: flex;
   width: 1390px;
}
.indicators {
  width: 1200px;
  display: flex;
  border: 1px solid LightGrey;
  float: left;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px;
  /* background-color: #f5f5f5; */
   
   .d1 {
  display: flex;
  border: 1px solid LightGrey;
  margin-left: 20px;
  width: 352px;
  height: 150px;
  margin-top: 10px;
  align-items: center;
 
  .d1-div {
    margin-left: 30px;
  }
 }
 .d2 {
  width: 165px;
  height: 150px;
  border: 1px solid LightGrey;
  margin-left: 20px;
  text-align: center;
  margin-top: 10px;
 }
}


.yir {
   width: 100px;
   height: 50px;
  cursor: pointer;
  span{
    color: royalblue;
  }
  
}
.provinces{
   width: 1200px;
   /* border: 1px solid red; */
   display: flex;
   flex-wrap:wrap;
   
   /* justify-content:space-around; */
   div{
     width: 260px;
     height: 150px;
     border: 1px solid LightGrey;
     margin-left: 30px;
     margin-top: 20px;
     text-align: center;
     /* align-items: center; */
   
      
      span{
         /* margin-left: 50px; */
         color: 	#00BFFF;
         cursor: pointer;
      }
      
   }
  
}
.bold1{
  font-weight: bold;
  color:		DimGray;
}
.bold2{
  font-size: 20px;
}
.subjective{
   width: 1200px;
   display: flex;
   flex-wrap:wrap;
   div{
     width: 260px;
     height: 150px;
    border: 1px solid LightGrey;
     margin-left: 30px;
     margin-top: 20px;
     text-align: center;
   }
}

</style>