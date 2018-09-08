import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        succesfullAdd: false,
    },
    getters:{
        alertState(state){
            return state.succesfullAdd
        }
    },
    mutations:{
        setAlert(state,payload){
            state.succesfullAdd=payload
        }
    },
    actions:{
        resetAlert(context,payload){
            setTimeout(()=>{context.commit('setAlert',payload)}, 3000)
        }
    },

})