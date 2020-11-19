import {reqbannerList} from "../../utils/http"
const state = {
    list:[]
}

const mutations = {
    changeList(state,arr){
        state.list=arr
    }
}

const actions = {
    reqList(context){
        reqbannerList().then(res=>{
            console.log(res);
            let list = res.data.list ? res.data.list : []
            context.commit("changeList",list)
        })
    }
}

const getters = {
    list(state){
        return state.list
    }
}

export default {
    state, mutations, getters, actions,
    namespaced: true
}