import RestService from '@/services/RestService';

export default {
  state: {
    exercises: [],
    studentScores: []
  },
  getters: {
    studentScores(state){
      return state.studentScores;
    },
    exercises(state){
      return state.exercises;
    }
  },
  actions: {
    async getStudentScores(context){
      try{
        const restService = new RestService('student-scores');
        const data = await restService.getAll();
        context.commit('setStudentScores', data);
      } catch(error){
        console.error(error);
      }
    },
    setExercises(context, exercises){
      context.commit('setExercises', exercises);
    }
  },
  mutations: {
    setStudentScores(state, scores){
      state.studentScores = scores;
    },
    setExercises(state, exercises){
      state.exercises = exercises
    }
  }
};