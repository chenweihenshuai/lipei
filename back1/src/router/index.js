import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from  '@/components/Home'

import myPerformance from  '@/components/myPerformance'
   
import systemSet from  '@/components/systemSet'//系统设置

import salary from  '@/components/salary'//工资薪资
 
import depPerformance from '@/components/depPerformance'//部门
import examSet from '@/components/examSet'//考核规则维护
import salaySet from '@/components/salaySet'//薪酬标准维护
import indexSet from '@/components/indexSet'//非分省库指标维护
import evaluateSet from '@/components/evaluateSet'// 主观评价指标维护
import teamPerformance from '@/components/teamPerformance'// 团队
import details from  '@/components/details'// 团队


Vue.use(Router)

const router= new Router({
  routes: [
    {path:'/',redirect:'/Login'},
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      redirect:'/myPerformance',
      children:[
        {path:'/myPerformance',name:'myPerformance',component:myPerformance},//首页
       
        {path:'/systemSet',name:'systemSet',component:systemSet}, //系统设置
       
        {path:'/salary',name:'salary',component:salary}, //工资薪资
        
        {path:'/depPerformance',name:'depPerformance',component:depPerformance},//部门
      
        {path:'/examSet',name:'examSet',component:examSet},  //考核规则维护
        
        {path:'/salaySet',name:'salaySet',component:salaySet},//薪酬标准维护
       
        {path:'/indexSet',name:'indexSet',component:indexSet}, //非分省库指标维护
       
        {path:'/evaluateSet',name:'evaluateSet',component:evaluateSet}, // 主观评价指标维护

        {path:'/teamPerformance',name:'teamPerformance',component:teamPerformance}, // 主观评价指标维护

        {path:'/details',name:'details',component:details} // 主观评价指标维护
      
    ]
    },
    
  ]
})
//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path==='/login') return next();
  //获取token
  const tokenStr=window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
} )

export default router