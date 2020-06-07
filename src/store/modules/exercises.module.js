import RestService from '@/services/RestService';
import ExerciseService from '@/services/ExerciseService';
import StudentService from '@/services/StudentService';

export default {
  state: {
    exercises: [],
    studentScores: [],
    students: [],
  },

  getters: {
    studentScores(state) {
      return state.studentScores;
    },
    exercises(state) {
      return state.exercises;
    },
    students(state) {
      return state.students;
    },
  },
  actions: {
    async getStudentScores({ commit }) {
      try {
        const restService = new RestService('student-scores');
        const scores = await restService.getAll();
        commit('setStudentScores', scores);
      } catch (error) {
        console.error(error);
      }
    },
    async getExercises({ commit }) {
      const exerciseService = new ExerciseService();
      const exercises = await exerciseService.getAll();
      commit('setExercises', exercises);
    },
    async getStudents({ commit }) {
      try {
        const studentService = new StudentService();
        const students = await studentService.getAll();
        commit('setStudents', students);
      } catch (error) {
        console.error(error);
      }
    },
    updateStudentScores({ commit }, payload) {
      commit('mutateStudentScores', payload);
    },
  },
  mutations: {
    setStudentScores(state, scores) {
      state.studentScores = scores;
    },
    setExercises(state, exercises) {
      state.exercises = exercises;
    },
    setStudents(state, students) {
      state.students = students;
    },
    mutateStudentScores(state, payload) {
      state.studentScores[payload.FI] = payload.USI;
    },
  },
};
