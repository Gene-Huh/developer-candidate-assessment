import RestService from '@/services/RestService';
import ExerciseService from '@/services/ExerciseService';
import StudentService from '@/services/StudentService';

export default {
  state: {
    exercises: [],
    studentScores: [],
    students: []
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
    async getStudentScores(context) {
      try {
        const restService = new RestService('student-scores');
        const scores = await restService.getAll();
        context.commit('setStudentScores', scores);
      } catch (error) {
        console.error(error);
      }
    },
    async getExercises(context) {
      const exerciseService = new ExerciseService();
      const exercises = await exerciseService.getAll();
      context.commit('setExercises', exercises);
    },
    async getStudents(context) {
      try {
        const studentService = new StudentService();
        const students = await studentService.getAll();
        context.commit('setStudents', students);
      } catch (error) {
        console.error(error);
      };
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
  }
};