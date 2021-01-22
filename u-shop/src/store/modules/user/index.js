import { userList,userCount } from '../../../util/axios'
const state = {
    userlist: [],
    size: 2,
    page: 1,
    countNum: 0
}

const getters = {
    getUserList(state) {
        return state.userlist
    },
    getUserSize(state){
        return state.size
    },
    getUserCount(state){
        return state.countNum
    }
}

const mutations = {
    USERLIST(state, plyload) {
        state.userlist = plyload
    },
    COUNT(state, plyload){
        state.countNum = plyload
    },
    CHANGE_PAGE(state,plyload){
        state.page = plyload
    }
}

const actions = {
    getUserListAction(plyload) {
        userList({
            size: plyload.state.size,
            page: plyload.state.page
        }).then(res => {
            if (res.data.code == 200) {
                let list = res.data.list ? res.data.list : []
                plyload.commit('USERLIST', list)
                if(plyload.state.page != 1 && list.length == 0){
                    plyload.dispatch('changePageAction',plyload.state.page - 1)
                }
            }
        }).catch(err => {
            console.log(err);
        })
    },
    getUserCountAction(payload){
        userCount().then(res=>{
            if(res.data.code == 200){
                payload.commit('COUNT',res.data.list[0].total)
            }
        }).catch(err=>{
            console.log(err);
        })
    },
    changePageAction(context,plyload){
        //触发mutaitons去修改state中的page
        context.commit('CHANGE_PAGE',plyload)
        //当页码切换之后，重新调取接口并传入新的参数
        context.dispatch('getUserListAction')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}