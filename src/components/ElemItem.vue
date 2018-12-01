<template>
  <li class="elem">   
    <span class="line line--horizontal"></span>
    <div @click="$emit('editElem')" title="Редактировать элемент" class="elem__body"></div>
  </li>
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
      },
      manager: {
        type: String,
        required: true,
        validator(value) {
          return Boolean( value.trim() )
        }
      },
      time: {
        type: Number,
        required: true
      }
    },
    data() {
      return {

      }
    },
  }
</script>

<style lang="scss">
  .elem {
    width: 33.333333%;
    display: flex;
    align-items: center;

    &__body {
      cursor: pointer;
      border-radius: 50%;
      width: 33px;
      height: 33px;
      border: 1px solid $accent;
      background: $accent;
      background-image: url('../assets/server.svg');
      background-size: 21px;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
</style>
