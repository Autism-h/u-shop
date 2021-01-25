import axios from 'axios'
import router from '../../router'

let http = axios.create({
    baseURL:'/api'
})

//请求拦截
http.interceptors.request.use(req=>{
    //从存储中取出来token
    let token = sessionStorage.getItem('loginInfo') ? JSON.parse(sessionStorage.getItem('loginInfo')).token : ''
    //在请求头中添加token令牌
    req.headers.authorization = token
    return req
})

//响应拦截  一般用于全局拦截错误
http.interceptors.response.use(res=>{
    if(res.data.code == 500){
        router.push('/login')
    }else if(res.data.code == 403){
        router.push('/login')
    }else{
        return res
    }
})


export default http