const state = {
    todos: [
        {
            id: 1,
            title: 'Todo One',
            desc: 'First task'
        },
        {
            id: 2, 
            title: 'Todo Two',
            desc: 'second task'
        }
    ],
    iterator: 0,
}

const getters = {
    countTodos: (state) => {
        return state.todos.length
    }
}

 const mutations = {
    newTodo: (state, todo) => state.todos.push(todo),
    removeTodo: (state, todo) => state.todos.splice(todo, 1),
    iterator: (state) => state.iterator += 1,
}

 export default {
    state,
    getters,
    mutations
 }