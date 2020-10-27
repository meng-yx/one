import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import shouy from '@/pages/shouy'
import cdgl from '@/pages/cdgl'
import jsgl from '@/pages/jsgl'
import glygl from '@/pages/glygl'
import spfl from '@/pages/spfl'
import spgg from '@/pages/spgg'
import spgl from '@/pages/spgl'
import lbtgl from '@/pages/lbtgl'
import hygl from '@/pages/hygl'
import mshd from '@/pages/mshd'
import login from '@/pages/login'

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      component: index,
      children:[
        {
          path:"/",
          component:shouy
        },
        {
          path:"menu",
          component:cdgl
        },
        {
          path:"role",
          component:jsgl
        },
        {
          path:"user",
          component:glygl
        },
        {
          path:"category",
          component:spfl
        },
        {
          path:"specs",
          component:spgg
        },
        {
          path:"goods",
          component:spgl
        },
        {
          path:"member",
          component:hygl
        },
        {
          path:"banner",
          component:lbtgl
        },
        {
          path:"seckill",
          component:mshd
        },
        {
            path:"",
            redirect:"/"
        }
      ]
    },
    {
      path:"/login",
      component:login
    },
    {
      path:"*",
      redirect:"/"
    }
  ]
})

// 1. @param:to:进入的路由对象
// 1. @param:离开的路由对象
// 1. @param:执行下一个导航守卫钩子(必须执行)
// 注册在路由实例上，所以导航都会触发
router.beforeEach((to,from,next)=>{
  // 登录状态
  let token = localStorage.getItem("token")?localStorage.getItem("token"):'';
  // console.log(to,from);
  // 已登录
  if(token){
    if(to.path=="/login"){
      next(false);//取消本次导航
    }else{
      next();
    }
  }else{
    // 未登录
    // next("/login")

    if(to.path=="/login"){
      next();
    }else{
      next("/login")
    }
  }
})
export default router
