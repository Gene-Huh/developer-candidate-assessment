<template>
  <div>
    <router-link
      tag="div"
      class="exercise"
      :class="{ stripe: i % 2 === 0 }"
      v-for="(exercise, i) in exercisesWithScores"
      :key="exercise.exerciseId"
      :to="{ name: 'Exercise', params: { id: exercise.exerciseId, name: exercise.name } }"
    >
      <span>{{ exercise.name }}</span>
      <span>{{ exercise.averageScore.toFixed(2) }}</span>
    </router-link>
  </div>
</template>

<script>
import ExerciseService from '@/services/ExerciseService';
import store from '@/store';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      title: 'Exercises',
      exercises: [],
    };
  },
  computed: {
    ...mapGetters(['studentScores']),
    exercisesWithScores() {
      const combinedArr = this.exercises.map((exercise) => {
        const filteredStudentScores = this.studentScores.filter((entry) => {
          return entry.score != null && entry.exerciseId == exercise.id;
        });
        return {
          exerciseId: exercise.id,
          name: exercise.name,
          averageScore:
            filteredStudentScores.reduce(
              (total, object) => total + object.score,
              0
            ) / filteredStudentScores.length,
        };
      });
      const averages = combinedArr.reduce(
        (total, exercise) => total + exercise.averageScore,
        0
      );
      this.$emit('loaded', {
        title: this.title,
        totalAverage: averages / combinedArr.length,
      });
      return combinedArr;
    },
  },
  async created() {
    const exerciseService = new ExerciseService();
    const exercises = await exerciseService.getAll();
    this.exercises = exercises;
    store.dispatch('getStudentScores');
  },
};
</script>

<style scoped>
.exercise {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #add8e6;
  width: 100%;
  padding: 15px;
  font-weight: 600;
  cursor: pointer;
}

.exercise:hover {
  background-color: rgba(1, 141, 255, 0.1);
}

.stripe {
  background-color: #f5f5f5;
}
</style>
