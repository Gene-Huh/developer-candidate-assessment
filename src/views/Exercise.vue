<template>
  <div>
    <h1>{{ title }}</h1>
    <h3 v-if="totalAverage">Total Average: {{ totalAverage.toFixed(2) }}</h3>
    <card class="students">
      <exercise-view v-on:loaded="updateAverageTotal" />
    </card>
  </div>
</template>

<script>
import Card from '@/components/ui/Card';
import ExerciseView from '@/components/ExerciseView';

export default {
  components: { Card, ExerciseView },
  data() {
    return {
      title: '',
      totalAverage: null,
    };
  },
  methods: {
    updateAverageTotal(payload) {
      this.totalAverage = payload.totalAverage;
      this.title = payload.title;
    },
  },
};
</script>

<style scoped>
.students {
  width: 100%;
}
</style>
