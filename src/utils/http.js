import axios from "axios"
import qs from "qs"
import { errorAlert } from "./alert"
import store from "../store"
import router from "../router"
import Vue from "vue"
//开发环境 8080
let baseUrl="/aa"
Vue.prototype.$imgPre="http://localhost:3000"


//生产环境打包
// let baseUrl=''
// Vue.prototype.$imgPre=""


//响应拦截
axios.interceptors.response.use(res => {
    console.log("本次请求地址是：" + res.config.url);
    
    if (res.data.code !== 200) {
        errorAlert(res.data.msg)
    }

    if(res.data.msg==="登录已过期或访问权限受限"){
       
        store.dispatch("changeUser",{})
      
        router.push("/login")
    }
    return res
})
//请求拦截
axios.interceptors.request.use(req=>{
    if(req.url!=baseUrl+"/api/userlogin"){
    req.headers.authorization=store.state.userInfo.token;
}
return req
})



//======================菜单接口=====================
export const reqMenuAdd=(form)=>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:"post",
        data:qs.stringify(form)
    })
}

export const reqMenuList=()=>{
    return axios({
        url:baseUrl+"/api/menulist",
        method:"get",
        params:{
            istree:true
        }
    })
}

export const reqMenuDel=(id)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}

export const reqMenuDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

export const reqMenuUpdate=(form)=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(form)
    })
}


//角色添加
export const reqRoleAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:"post",
        data:qs.stringify(user)
    })
}
//角色列表
export const reqRoleList=()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:"get",
    })
}
//角色管理删除
export const reqRoleDel=(id)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}

//修改
export const reqRoleUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:qs.stringify(user)
    })
}
//详情
export const reqRoleDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

// =====================管理员接口===============

export const reqUserAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:"post",
        data:qs.stringify(user)
        
    })
}
//分页 p={size:查询条数 page:页码数}
export const reqUserList=(p)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
        params:p
    })
}

//详情
export const reqUserDetail=(uid)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params:{
            uid
        }
    })
}

//删除
export const reqUserDel=(uid)=>{
    return axios({
        url:baseUrl+"/api/userdelete",
        method:"post",
         data:qs.stringify({
             uid:uid
         })
    })
}
//修改
export const reqUserUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(user)
    })
}

//总数
export const reqUserCount=()=>{
    return axios({
        url:baseUrl+"/api/usercount",
        method:"get"
    })
}

// ===============登录接口================

export const reqLogin=(user)=>{
    return axios({
        url:baseUrl+"/api/userlogin",
        method:"post",
        data:qs.stringify(user)
    })
}

//==============会员管理==============
//会员列表
export const reqMemberList=()=>{
    return axios({
        url:baseUrl+"/api/memberlist",
        method:"get"
    })
}
//会员获取
export const reqMemberDetail=(uid)=>{
    return axios({
        url:baseUrl+"/api/memberinfo",
        method:"get",
        params:{
            uid:uid
        }
    })
}
//会员修改
export const reqMemberUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/memberedit",
        method:"post",
        data:qs.stringify(user)
    })
}

//=============商品分类=============
//添加
export const reqcateAdd=(user)=>{
    let d=new FormData()
    for(let i in user){
        d.append(i,user[i])
    }
    
    return axios({
        url:baseUrl+"/api/cateadd",
        method:"post",
        data:d
    })
}
//列表
export const reqcateList=(p)=>{
    return axios({
        url:baseUrl+"/api/catelist",
        method:"get",
        params:p
    })
}

//删除
export const reqcateDel=id=>{
    return axios({
        url:baseUrl+"/api/catedelete",
        method:"post",
        data: qs.stringify({
            id: id
        })
    })
}
//详情
export const reqcateDetail=id=>{
    return axios({
        url:baseUrl+"/api/cateinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

//修改
export const reqcateUpdate=(cate)=>{
    let d=new FormData()
    for(let i in cate){
        d.append(i,cate[i])
    }
    return axios({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data:d
    })
}

//================商品规格================
//添加 
export const reqspecsAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/specsadd",
        method:"post",
        data:qs.stringify(user)
    })
}
//总数
export const reqspecsCount=()=>{
    return axios({
        url:baseUrl+"/api/specscount",
        method:"get"
    })
}
//列表
export const reqspecsList=(p)=>{
    return axios({
        url:baseUrl+"/api/specslist",
        method:"get",
        params:p
    })
}
//详情
export const reqspecsDetail=id=>{
    return axios({
        url:baseUrl+"/api/specsinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
//修改
export const reqspecsUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/specsedit",
        method:"post",
        data:qs.stringify(user)
    })
}
//删除
export const reqspecsDel=(id)=>{
    return axios({
        url:baseUrl+"/api/specsdelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}
//===============轮播图接口======================
//添加
export const reqbannerAdd=(user)=>{
    console.log(user)
    let d=new FormData()
    for(let i in user){
        d.append(i,user[i])
    }
    return axios({
        url:baseUrl+"/api/banneradd",
        method:"post",
        data:d
    })
}
//列表
export const reqbannerList=()=>{
    return axios({
        url:baseUrl+"/api/bannerlist",
        method:"get"
    })
}
//详情
export const reqbannerDetail=id=>{
    return axios({
        url:baseUrl+"/api/bannerinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
//修改
export const reqbannerUpdate=(banner)=>{
    let d=new FormData()
    for(let i in banner){
        d.append(i,banner[i])
    }
    return axios({
        url:baseUrl+"/api/banneredit",
        method:"post",
        data:d
    })
}
//删除
export const reqbannerDel=id=>{
    return axios({
        url:baseUrl+"/api/bannerdelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}

//=================商品管理接口==================

//商品添加
export const reqgoodsAdd=(user)=>{
    let d=new FormData()
   for(let i in user){
       d.append(i,user[i])
   }
    return axios({
        url:baseUrl+"/api/goodsadd",
        method:"post",
        data:d
    })
}
//商品总数
export const reqgoodsCount=()=>{
    return axios({
        url:baseUrl+"/api/goodscount",
        method:"get"
    })
}
//商品列表
export const reqgoodsList=(p)=>{
    return axios({
        url:baseUrl+"/api/goodslist",
        method:"get",
        params:p
    })
}

//商品详情
export const reqgoodsDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/goodsinfo",
        method:"get",
        params:{
            id:id
        }
    })
}
//商品修改
export const reqgoodsUpdate=(user)=>{
    let d=new FormData()
    for(let i in user){
        d.append(i,user[i])
    }
    return axios({
        url:baseUrl+"/api/goodsedit",
        method:"post",
        data:d
    })
}
//商品删除
export const reqgoodsDel=id=>{
    return axios({
        url:baseUrl+"/api/goodsdelete",
        method:"post",
        data:qs.stringify({
            id:id
        })
    })
}

//=================商品秒杀================
//秒杀添加
export const reqseckAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/seckadd",
        method:"post",
        data:qs.stringify(user)
    })
}

//秒杀列表
export const reqseckList=()=>{
    return axios({
        url:baseUrl+"/api/secklist",
        method:"get"
    })
}

//秒杀详情
export const reqseckDetail=id=>{
    return axios({
        url:baseUrl+"/api/seckinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

//秒杀修改
export const reqseckUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/seckedit",
        method:"post",
        data:qs.stringify(user)
    })
}

//秒杀删除
export const reqseckDel=id=>{
    return axios({
        url:baseUrl+"/api/seckdelete",
        method:"post",
        data:{
            id:id
        }
    })
}