import StudentService from '@/services/StudentService';

export default {
  state: {
    students: [],
  },
  getters: {
    students(state) {
      return state.students;
    },
  },
  actions: {
    async getStudents(context) {
      try {
        const studentService = new StudentService();
        const students = await studentService.getAll();
        context.commit('setStudents', students);
      } catch (error) {
        console.error(error);
      }
    },
  },
  mutations: {
    setStudents(state, students) {
      state.students = students;
    },
  },
};
