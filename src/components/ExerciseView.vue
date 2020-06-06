<template>
  <div>
    <div
      tag="div"
      class="student"
      :class="{ stripe: i % 2 === 0 }"
      v-for="(student, i) in students"
      :key="student.id"
    >
      <span>{{ student.name }}</span>
      <span>{{ student.score }}</span>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['students']),
    // exercisesWithScores() {
    //   const combinedArr = this.exercises.map((exercise) => {
    //     const filteredStudentScores = this.studentScores.filter((entry) => {
    //       return entry.score != null && entry.exerciseId == exercise.id;
    //     });
    //     return {
    //       exerciseId: exercise.id,
    //       name: exercise.name,
    //       averageScore:
    //         filteredStudentScores.reduce(
    //           (total, object) => total + object.score,
    //           0
    //         ) / filteredStudentScores.length,
    //     };
    //   });
    //   const averages = combinedArr.reduce(
    //     (total, exercise) => total + exercise.averageScore,
    //     0
    //   );
    //   this.$emit('loaded', {
    //     title: this.$route.params.name,
    //     totalAverage: averages / combinedArr.length,
    //   });
    //   return combinedArr;
    // },
  },
  async created() {
    this.$emit('loaded', {title: this.$route.params.name, totalAverage: 0});
    store.dispatch('getStudents');
  },
};
</script>

<style scoped>
.student {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #add8e6;
  width: 100%;
  padding: 15px;
  font-weight: 600;
  cursor: pointer;
}

.student:hover {
  background-color: rgba(1, 141, 255, 0.1);
}

.stripe {
  background-color: #f5f5f5;
}
</style>
