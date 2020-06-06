import StudentService from '@/services/StudentService';

export default {
  state: {
    students: [],
  },
  actions: {
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
    setStudents(state, students) {
      state.students = students;
    },
  },
  getters: {
    students(state) {
      return state.students;
    },
    isLoaded(state) {
      return !!state.students.length;
    }
  },
};
