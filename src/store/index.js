import vue from 'vue';
import vuex from 'vuex';
import http from '../utils/http';
import router from "./../router"
import { Message } from 'element-ui';

vue.use(vuex);

export default new vuex.Store({
    state:{
        //如果有token说明已经登录
        token:localStorage.getItem("token")?localStorage.getItem("token"):"",
        //登录成功获取用户的信息
        info:localStorage.getItem("info")?JSON.parse(localStorage.getItem("info")):{},
    },
    mutations:{
        setinfo(state,pal){
            //设置token和info用户信息保存在locastorage中
            localStorage.setItem("token",pal.token);
            localStorage.setItem("info",JSON.stringify(pal.info));
            state.token = pal.token;
            state.info = pal.info;
        },
        clearinfo(state){
            //清空localstorage里的用户信息
            localStorage.clear();
            state.token='';
            state.info = {};
        }
    },
    actions:{
        login(context,pay){
            http.post("/api/userlogin",pay).then(res=>{
                if(res.code == 200){
                    context.commit("setinfo",{token:res.list.token,info:res.list});
                    router.replace("/");
                }else{
                    Message.error(res.msg)
                }
            })
        }
    }
})