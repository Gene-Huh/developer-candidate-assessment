<template>
  <div>
    <div
      class="exercise"
      :class="{ stripe: i % 2 === 0 }"
      v-for="(exercise, i) in exercisesWithScores"
      :key="exercise.id"
    >
      <span>{{ exercise.name }}</span>
      <span>{{ exercise.averageScore.toFixed(2) }}</span>
    </div>
  </div>
</template>

<script>
import ExerciseService from '@/services/ExerciseService';
import store from '@/store';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      exercises: [],
    };
  },
  computed: {
    ...mapGetters(['studentScores']),
    exercisesWithScores() {
      return this.exercises.map((exercise) => {
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
    },
  },
  async created() {
    const exerciseService = new ExerciseService();
    const exercises = await exerciseService.getAll();
    this.exercises = exercises;
    store.dispatch('setExercises', exercises);
    store.dispatch('getStudentScores');
  },

  // computed: {
  // exercisesWithScores() {
  //   return this.exercises.map((exercise) => {
  //     return {
  //       name: exercise.name,
  //       averageScore:
  //         exercise.scores.reduce((a, b) => a + b, 0) / exercise.scores.length,
  //     };
  //   });
  // },
  // },
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
