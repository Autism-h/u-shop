import {BannerList} from  '../../../util/axios'
const state = {
    bannerList:[]
}

const getters = {
    getBannerList(state){
        return state.bannerList
    }
}

const mutations = {
    BANNER_LIST(state,plyload){
        state.bannerList = plyload
    }
}

const actions = {
    getBannerListAction({commit}){
        BannerList().then(res=>{
            if(res.data.code == 200){
                commit('BANNER_LIST',res.data.list)
            }else{
                console.log(err,'失败');
            }
        }).catch(err=>{
            console.log(err,'失败');
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}