<template>
    <div>
        
        <div id="timer">
        <span id="minutes">{{ minutes }}</span>
        <span id="middle">:</span>
        <span id="seconds">{{ seconds }}</span>

            
            <div id="buttons">
                    <p>Break Timer Controls: </p>
                    <!--     Start Timer -->
                    <button 
                    id="start" 
                    class="button is-dark is-large" 
                    v-if="!timer"
                    @click="mainTimer">
                        Start
                    </button>
                    <!--     Pause Timer -->
                    <button 
                    id="stop" 
                    class="button is-dark is-large" 
                    v-if="timer"
                    @click="stopTimer">
                        Pause
                    </button>
                    <!--     Restart Timer -->
                    <button 
                    id="reset" 
                    class="button is-dark is-large" 
                    v-if="resetButton"
                    @click="resetTimer">
                    Restart
                    </button>
                    <!--     Skip Timer -->
                    <button @click="skipTime">Skip Timer</button>

                    </div>
            </div>
        <div class="todosContainer">
            <p> 
                {{`There is currently ${countTodos} tasks,`}}
                {{`You have completed ${ this.todos.iterator } tasks`}}
            </p>
            <div class="todos">
                <div v-for="(todo, index) in todos.todos" :key="index" class="todo">
                    <p>{{todo.title}}: {{todo.desc}} </p>                
                    <p>Pomos: {{todo.iterations}}</p> 
                    <button  @click="startTimer(index)">Start</button>
                    <button  @click="removeTodos(index)">Delete</button>
                </div>   
            </div>  
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {

    data() {
        return {
            completed: 0,
            //timer data
            timer: null,
            totalTime: (0.10 * 60),
            resetButton: false,
            taskIterations: 0,
        }
    },

    computed: {
        ...mapState([
            'todos',
            'completedPomo'
        ]),
        ...mapGetters([
            'countTodos'
        ]),
        //timer computed
        minutes: function() {
        const minutes = Math.floor(this.totalTime / 60);
        return this.padTime(minutes);
        },
        seconds: function() {
        const seconds = this.totalTime - (this.minutes * 60);
        return this.padTime(seconds);
        },
    },
    methods: {
        ...mapMutations([
            'removeTodo',
        ]),
        removeTodos(todo){
            this.removeTodo(todo)
            this.todos.completedPomo += 1
        },
        addPomos(index) {
        //    setTimeout(() => {
            if(this.$store.state.todos.todos[index].iterations >= 1) {
                this.$store.state.todos.todos[index].iterations++
            }else {
                this.$store.state.todos.todos[index].iterations = 1
            }

        //    }, 6000)  
        },
        //timer methods
        startTimer: function(index) {
            this.totalTime = 0.10 * 60
            this.timer = setInterval(() => this.countdown(), 1000);
            this.resetButton = true;
            this.addPomos(index)
            this.$store.commit('iterator')
            
        },
            mainTimer: function() {
            this.timer = setInterval(() => this.countdown(), 1000);
            this.resetButton = true;            
        },
        stopTimer: function() {
            clearInterval(this.timer);
            this.timer = null;
            this.resetButton = true;
        },
        resetTimer: function() {
            this.totalTime = (0.10 * 60);
            clearInterval(this.timer);
            this.timer = null;
            this.resetButton = false;
            
        },
        skipTime: function() {
            this.totalTime = 0;
            this.stopTimer()
        },
        padTime: function(time) {
            return (time < 10 ? '0' : '') + time;
        },
        countdown: function() {
            this.totalTime--;
            
            if(this.totalTime == 0) {
                this.stopTimer()
                if(this.todos.iterator % 4 == 0){
                    console.log('inside if statement' + this.todos.iterator)
                    this.totalTime = 0.50 * 60
                    console.log(this.totalTime)
                }else {
                    this.totalTime = 0.20 * 60
                }
               
            }
        }

    }
}
</script>

<style scoped>
    .todo {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin: 10px;
        border: 1px solid #ccc;
        background: #41b883;
        border-radius: 50px;
        text-align: center;
        cursor: pointer;
        
    }

    .todosContainer p {
        font-size: 25px;
        text-align: center;
    }

    .todo p {
        font-size: 25px;
    }

    .doneTodo {
        background: 'red';
    }

    button {
        background: white;
        border: none;
        border-radius: 10px;
        height: 50px;
        width: 80px;

    }

    /* timer styles */

    #timer {
    font-size: 50px;
    line-height: 1;
    margin: 40px 0;
    text-align: center;
    }

    button {
        background: white;
        border: none;
        border-radius: 10px;
        padding: 5px; 
        margin-right: 5px;  
    }

    #buttons p {
        font-size: 25px;
        display: inline;
        margin-right: 10px;
    }
</style>