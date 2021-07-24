import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: '',
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    setInputValue (state, value) {
      state.inputValue = value
    },
    addItem (state, title) {
      const obj = {
        id: state.nextId,
        info: title,
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    removeListItem (state, id) {
      const arr = state.list.filter(item => {
        return item.id !== id
      })
      state.list = arr
    },
    editListCheckboxState (state, params) {
      state.list.forEach(item => {
        if (item.id === params.id) {
          item.done = params.state
        }
      })
    },
    clearListSuccess (state) {
      state.list = state.list.filter(item => {
        return !item.done
      })
    },
    changeViewKey (state, key) {
      state.viewKey = key
    }
  },
  actions: {
    async getList (context) {
      const { data } = await axios.get('/list.json')
      context.commit('initList', data)
    }
  },
  getters: {
    total: state => {
      return state.list.filter(item => { return !item.done }).length
    },
    viewInfor: state => {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'unfinished') {
        return state.list.filter(item => { return !item.done })
      }
      if (state.viewKey === 'accomplish') {
        return state.list.filter(item => { return item.done })
      }
      return state.list
    }
  },
  modules: {
  }
})
