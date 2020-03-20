<template>
    <div>
        <h3>{{name}}</h3>

        <div class="add">
            <form @submit.prevent="onSubmit">
                <input type="text" v-model="todoObj.title" placeholder="Add Todo..">
                <input type="text" v-model="todoObj.desc" placeholder="Add Todo Desc..">
                <input type="submit" value="Submit">
            </form>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            name: "Add Todo",
            todoObj: {
                title: '',
                desc: '',
            }
        }
    },
    methods: {
        ...mapMutations(['newTodo']),
        onSubmit() {
            this.newTodo(this.todoObj)
            this.todoObj = {}
        }
    }

}
</script>

<style scoped>
    div h3 {
        font-size: 25px;
    }

    form {
        display: flex;
    }

    input[type="text"] {
        flex: 10;
        padding: 10px;
        border: 1px solid #41b883;
        outline: 0;
    }

    input[type="submit"] {
        flex: 2;
        background:#41b883;
        color: #fff;
        border: 1px solid #41b883;
        cursor: pointer;

    }

</style>