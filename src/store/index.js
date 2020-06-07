import Vue from 'vue';
import Vuex from 'vuex';
import ExercisesModule from '@/store/modules/exercises.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ExercisesModule,
  }
});
