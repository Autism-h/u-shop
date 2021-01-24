import { SeckList } from '../../../util/axios'
const state = {
    secklist: [],
}

const getters = {
    getSeckList(state) {
        return state.secklist
    }
}

const mutations = {
    SECKLIST(state, plyload) {
        state.secklist = plyload
    }
}

const actions = {
    getSeckListAction({commit}) {
        SeckList().then(res => {
            if (res.data.code == 200) {
                commit('SECKLIST', res.data.list)
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}