<template>
  <div class="stage-item">
    <small class="stage-item">Этап номер: {{ index }}</small>
    <h2 class="stage-item__title">{{ title }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      default: 'Название этапа'
    },
    steps: []
  }
}
</script>

<style>

</style>
