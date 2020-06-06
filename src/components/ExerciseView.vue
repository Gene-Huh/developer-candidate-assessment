<template>
  <div v-if="isLoaded">
    <div
      tag="div"
      class="student"
      :class="{ stripe: i % 2 === 0 }"
      v-for="(student, i) in studentsWithScore"
      :key="student.id"
    >
      <img :src="student.avatar" />
      <span>{{ student.name }}</span>
      <span class="score">{{ student.score }}</span>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['students', 'studentScores', 'isLoaded']),
    studentsWithScore() {
      const exerciseId = this.$route.params.id;
      const combinedArr = this.students.map((student) => {
        const filteredStudentScores = this.studentScores.filter((entry) => {
          return entry.exerciseId == exerciseId;
        });
        return {
          studentId: student.id,
          name: student.name,
          score: (filteredStudentScores.find(score => score.studentId == student.id)).score,
          avatar: student.avatar
        };
      });
      const exerciseAverage = combinedArr.reduce((total, student)=>
      total + student.score, 0);
      this.$emit('loaded', {
        title: this.$route.params.name,
        totalAverage: exerciseAverage / combinedArr.length,
      });
      return combinedArr;
    },
  },
  async created() {
    this.$emit('loaded', {title: this.$route.params.name, totalAverage: 1});
    store.dispatch('getStudents');
    store.dispatch('getStudentScores');
  },
};
</script>

<style scoped>
.student {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #add8e6;
  width: 100%;
  font-weight: 600;
  cursor: pointer;
}

.student:hover {
  background-color: rgba(1, 141, 255, 0.1);
}

.stripe {
  background-color: #f5f5f5;
}
img {
  height: 40px;
  width: auto;
  border-radius: 5px;
}
.score {
  display: block;
  margin-right: 15px;
}
</style>
