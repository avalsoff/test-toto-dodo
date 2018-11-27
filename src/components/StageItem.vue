<template>
  <div class="stage-item" :class="{'stage-item--opened': isOpened}">
    <dt @click="toggleAccordion" class="stage-item__header">
      <p v-if="!dragStarted" class="stage-item__index">Этап №{{ index }}</p>
      <p v-else style="width:90px"></p>
      <h3 class="stage-item__title">{{ title }}</h3>
      <!-- TODO: Make dynamic -->
      <p class="stage-item__time">05:00</p>
      <button class="handler" type="button">Drag handler</button>     
    </dt>
    <dd ref="panel" class="stage-item__body">
      <div class="stage-item__inner">
        <StepItem
          v-for="(step, index) in steps"
          :key="step.id"
          :id="step.id"
          :title="step.title"
          :index="index"
        />
      </div>
    </dd>
  </div>
</template>

<script>
  import StepItem from "@/components/StepItem.vue"

  export default {
    components: {
      StepItem
    },
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
        required: true,
        validator(value) {
          return Boolean( value.trim() )
        }
      },
      dragStarted: {
        type: Boolean,
      }
    },
    computed: {
      steps() {
        return this.$store.getters.stepsByStageId(this.id)
      }
    },
    data() {
      return {
        isOpened: false
      }
    },
    methods: {
      toggleAccordion() {
        const panel = this.$refs.panel
        if (this.isOpened) {
          panel.style.maxHeight = null
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px'
        }
        this.isOpened = !this.isOpened;
      }
    }
  };
</script>

<style lang="scss">
  .stage-item {
    width: 100%;
    margin-bottom: 10px;

    &__header {
      position: relative;
      border-radius: 8px;
      background: #e5f0f8;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding: 0 100px;
      cursor: pointer;

      &::before {
        content: url('../assets/arrow-bottom.svg');
        position: absolute;
        left: 35px;
        top: 16px;
      }
    }

    &__index,
    &__time {
      border: 1px solid #0070BA;
      border-radius: 20px;
      padding: 4px 15px;
      color: #0070BA;
      font-size: 14px;
    }

    &__body {
      max-height: 0;
      display: block;
      width: 100%;
      overflow: hidden;
      transition: max-height 0.2s ease-out;
      background: #fafafa;
      margin: 0;
    }

    &__inner {
      padding: 25px 36px;
    }

    &--opened & {

      &__header {
        border-radius: 8px 8px 0 0;  

        &::before {
          content: url('../assets/arrow-top.svg');
        }      
      }
    }
  }

  .handler {
    outline: none;
    position: absolute;
    cursor: move;
    right: 35px;
    top: 15px;
    width: 28px;
    height: 28px;
    font-size: 0;
    border: none;
    background: url('../assets/move.svg');
    background-size: cover;
  }

  .ghost {
    opacity: .55;
  }
</style>
