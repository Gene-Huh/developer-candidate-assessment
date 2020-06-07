<template>
  <div>
    <div
      tag="div"
      class="student"
      :class="{ stripe: i % 2 === 0 }"
      v-for="(student, i) in studentsWithScore"
      :key="student.studentId"
    >
      <img :src="student.avatar" />
      <span>{{ student.name }}</span>
      <span
        class="score"
        contenteditable="contenteditable"
        @blur="editScore(student.studentId, $event.target.innerText)"
        @keydown.enter="endEdit"
        >{{ student.score }}</span
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      name: 'Current Exercise',
      avg: 0,
    };
  },
  props: {},
  computed: {
    ...mapGetters(['students', 'studentScores', 'exercises']),
    studentsWithScore() {
      // A SQL JOIN method for data between 2 different entities for page render.
      // Allows to set local page info: Name and Average
      const exerciseId = this.$route.params.id;
      const filteredStudentScores = this.studentScores.filter((entry) => {
        return entry.score != null && entry.exerciseId == exerciseId;
      });
      const exerciseAverage = filteredStudentScores.reduce(
        (total, student) => total + student.score,
        0
      );
      const combinedArr = this.students.map((student) => {
        return {
          studentId: student.id,
          name: student.name,
          score: this.parseExerciseScoreForNull(filteredStudentScores, student),
          avatar: student.avatar,
        };
      });
      this.setTotalAverage(exerciseAverage, filteredStudentScores.length);
      return combinedArr;
    },
  },
  methods: {
    ...mapActions(['updateStudentScores']),
    // Adds entry for null scores before rendering
    parseExerciseScoreForNull(array, student) {
      if (array.find((score) => score.studentId == student.id)) {
        return array.find((score) => score.studentId == student.id).score;
      } else {
        return 'N/A';
      }
    },
    // Helper sets the Total Average on computed before rendering full list with nulls.
    setTotalAverage(avg, count) {
      this.avg = avg / count;
    },
    editScore(studentID, newScore) {
      const updatedScoreItem = {
        exerciseId: Number(this.$route.params.id),
        studentId: studentID,
        score: Number(newScore),
      };
      const foundIndex = this.studentScores.findIndex(
        (scoreEntry) =>
          updatedScoreItem.studentId == scoreEntry.studentId &&
          updatedScoreItem.exerciseId == scoreEntry.exerciseId
      );
      this.updateStudentScores({ FI: foundIndex, USI: updatedScoreItem });
    },
    endEdit(event) {
      event.target.blur();
    },
    setTitleAndAverage() {
      this.name = this.exercises.find(
        (ex) => ex.id == this.$route.params.id
      ).name;
      this.$emit('loaded', {
        title: this.name,
        totalAverage: this.avg,
      });
    },
  },
  updated() {
    this.setTitleAndAverage();
  },
  mounted() {
    this.setTitleAndAverage();
  }
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
