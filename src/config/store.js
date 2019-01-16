import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modoListaUsuario: true,
    usuario: -1
  },
  mutations: {
    setModoListaUsuario(state, usuario){
      state.modoListaUsuario = !state.modoListaUsuario
      if (usuario)
        state.usuario = usuario
      else
        state.usuario = null
    }
  },
  actions: {

  }
})
