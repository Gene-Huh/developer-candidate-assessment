<template>
  <div>
    <h1>{{title}}</h1>
    <h3 v-if="totalAverage">Total Average: {{ totalAverage.toFixed(2) }}</h3>
    <card class="exercises">
      <exercises-list v-on:loaded="updateAverageTotal" />
    </card>
  </div>
</template>

<script>
import Card from '@/components/ui/Card';
import ExercisesList from '@/components/ExercisesList';

export default {
  components: { Card, ExercisesList },
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
.exercises {
  width: 100%;
}
</style>
