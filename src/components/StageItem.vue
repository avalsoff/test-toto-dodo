<template>
  <div class="stage-item" :class="{'stage-item--opened': isOpened}">
    <dt @click="toggleAccordion" class="stage-item__header">
      <small class="stage-item__index">Этап {{ index }}:</small>
      <h3 class="stage-item__title">{{ title }}</h3>
      <!-- TODO: Make dynamic -->
      <p class="stage-item__time">05:00</p>      
    </dt>
    <dd ref="panel" class="stage-item__body">
      <div class="text">
        s;lkdfj;askldjfkl j
      </div>
    </dd>
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
        required: true,
        validator(value) {
          return Boolean( value.trim() )
        }
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

    &__body {
      max-height: 0;
      display: block;
      width: 100%;
      overflow: hidden;
      transition: max-height 0.2s ease-out;
      background: #fafafa;
      margin: 0;

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

  .text {
    padding: 50px 25px;
  }
</style>
