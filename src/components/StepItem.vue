<template>
  <div class="step-item">
    <div class="step-item__header">
      <p class="step-item__index">
        Шаг № {{ index }}
      </p>
      <span class="line line--horizontal"></span>
      <p class="step-item__title">
        {{ title }}
      </p>
      <span class="line line--horizontal"></span>
    </div>
    <div class="step-item__controls">
      <button title="Добавить элемент" type="button" class="step-item__add-elem"></button>
    </div>
    <div class="step-item__body">
      <span class="line line--horizontal"></span>
      <ul class="step-item__elems">
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      // StepItem
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
      }
    },
  }
</script>

<style lang="scss">
  .step-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 489px;
    }

    &__index,
    &__title {
      position: relative;
      border: 1px solid rgba(#2c3e50, .25);
      border-radius: 30px;
      background: #fff;
      padding: 7px 15px;
      margin: 0;
    }

    &__add-elem {      
      background: url('../assets/add.svg');
      background-size: cover;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      left: 35px;
      top: 16px;
    }

    &__body {

    }

    &__elems {
      display: flex;
      align-items: center;
      list-style-type: none;
      margin: 0;
      padding: 0;
      width: 400px;
    }
  }

  .line {
    width: 1px;
    height: 1px;
    background: rgba(#2c3e50, .25);
    flex-grow: 1;
  }
</style>
