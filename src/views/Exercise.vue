<template>
  <div>
    <div class="title-block">
      <h1>{{ title }}</h1>
      <h3 v-if="totalAverage">Avg Score: {{ totalAverage.toFixed(2) }}</h3>
    </div>
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
.title-block {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
}
h1,
h2 {
  display: block;
}
</style>
