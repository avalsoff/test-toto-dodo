<template>
  <div class="constructor">
    <StageItem
      v-for="stage in stages"
      :key="stage.id"
      :index="stage.index"
      :title="stage.title"
      :id="stage.id"
    />
    <button role="button">Добавить стадию</button>
  </div>
</template>

<script>
import StageItem from '@/components/StageItem.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    StageItem
  },
  computed: {
    ...mapGetters([
      'stages'
    ]),
  },
  data () {
    return {
      // stages: [
      //   {
      //     id: 0,
      //     index: 1,
      //     title: 'Привет 1'
      //   },
      //   {
      //     id: 1,
      //     index: 2,
      //     title: 'Привет 2'
      //   },
      //   {
      //     id: 2,
      //     index: 3,
      //     title: 'Привет 3'
      //   },
      //   {
      //     id: 3,
      //     index: 4,
      //     title: 'Привет 4'
      //   }
      // ]
    }
  }
}
</script>
