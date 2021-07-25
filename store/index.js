import firebase from '~/plugins/firebase'
// const db = firebase.firestore()
// const todoRef = db.collection('todos')
export const state = () => ({
  userUid: '',
  userName: '',
  isLogined: false,
})

export const mutations = {
  setUserUid(state, userUid) {
    state.userUid = userUid
  },
  setUserName(state, userName) {
    state.userName = userName
  },
  setIsLogined(state, isLogined) {
    state.isLogined = isLogined
  },
}

export const actions = {
  login({ commit }) {
    console.log('login action')
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const user = result.user
        console.log('success : ' + user.uid + ' : ' + user.displayName)
        commit('setUserUid', user.uid)
        commit('setUserName', user.displayName)
        commit('setIsLogined', true)
      })
      .catch(function (error) {
        var errorCode = error.code
        console.log('error : ' + errorCode)
        console.log('errorMessage : ' + error)
      })
  },
  // TODO追加メソッド
  // addTodo({ commit }, todo) {
  //   console.log(todo)
  //   todoRef
  //     .add({
  //       todo: todo.todo,
  //       limit: todo.limit,
  //     })
  //     .then(function (docRef) {
  //       console.log('Document written with ID: ', docRef.id)
  //       commit('addTodo', todo)
  //     })
  //     .catch(function (error) {
  //       console.error('Error adding document: ', error)
  //     })
  // },
}

export const getters = {
  getUserUid(state) {
    return state.userUid
  },
  getUserName(state) {
    return state.userName
  },
  getIsLogined(state) {
    return state.isLogined
  },
  // getTodos(state) {
  //   return state.todos
  // },
}
