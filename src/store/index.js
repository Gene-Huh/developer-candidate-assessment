import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    exercises: [],
  },
  actions: {
  },
  getters: {
    exercises(state){
      return state.exercises;
    }
  },
  mutations: {
    setExercises(state, exercises){
      state.exercises = exercises;
    }
  },
});
