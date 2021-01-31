import {MemberList} from  '../../../util/axios'
const state = {
    memberList:[]
}

const getters = {
    getMemberList(state){
        return state.memberList
    }
}

const mutations = {
    MEMBER_LIST(state,plyload){
        state.memberList = plyload
    }
}

const actions = {
    getMemberListAction({commit}){
        MemberList().then(res=>{
            if(res.data.code == 200){
                commit('MEMBER_LIST',res.data.list)
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