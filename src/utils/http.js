import axios from 'axios';
import Axios from 'axios';
axios.defaults.baseURL='';
axios.defaults.timeout=3000;

axios.interceptors.request.use(config => {
// Do something before request is sent
let token = localStorage.getItem("token")?localStorage.getItem("token"):"";
config.headers.Authorization = token;
return config;
},error => {
// Do something with request error
return Promise.reject(error);
});


//
axios.interceptors.response.use(response => {
// Do something before response is sent
return response.data;
},error => {
// Do something with response error
return Promise.reject(error);
});

//get请求方法的封装
//返回一个promise函数
function get (url,params={}){
    return new Promise ((res,rej)=>{
        axios({
            method:"get",
            url,
            params
        }).then(data=>{
            res(data);
        }).catch(err=>{
            rej(err);
        })
    })
}

//post请求封装
//返回一个promise函数
function post (url,data={}){
    return new Promise((res,rej)=>{
        axios({
            method:"post",
            url,
            data
        }).then(data=>{
            res(data);
        }).catch(err=>{
            rej(err);
        })
    })
}

// 封装包含上传内容的方法
// @url:上传地址
// @data:上传数据
function upload(url,data={}){
    return new Promise((res,rej)=>{
        let form = new FormData();
        for(var key in data){
            form.append(key,data[key]);
        }
        axios({
            method:'post',
            url,
            data:form,
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then(data=>{
            res(data);
        }).catch(err=>{
            rej(err)
        })
    })
}

export default{
    get,
    post,
    upload
}