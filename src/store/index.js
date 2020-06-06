import Vue from 'vue';
import Vuex from 'vuex';
import ExercisesModule from '@/store/modules/exercises.module';
import StudentsModule from '@/store/modules/students.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ExercisesModule,
    StudentsModule
  }
});
