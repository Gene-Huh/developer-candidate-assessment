import RestService from '@/services/RestService';
import ExerciseService from '@/services/ExerciseService';

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
        const scores = await restService.getAll();
        context.commit('setStudentScores', scores);
      } catch(error){
        console.error(error);
      }
    },
    async getExercises(context){
      const exerciseService = new ExerciseService();
      const exercises = await exerciseService.getAll();
      context.commit('setExercises', exercises);
    }
  },
  mutations: {
    setStudentScores(state, scores){
      state.studentScores = scores;
    },
    setExercises(state, exercises){
      state.exercises = exercises;
    }
  }
};