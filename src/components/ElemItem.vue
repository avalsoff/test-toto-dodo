<template>
  <li class="elem">   
    <span class="line line--horizontal"></span>
    <div class="elem__body">{{ index }}</div>

    <!-- <ModalEdit

    >
    </ModalEdit> -->
  </li>
</template>

<script>
  import ModalEdit from '@/components/ModalEdit'

  export default {
    components: {
      ModalEdit
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
      // title: {
      //   type: String,
      //   required: true,
      //   validator(value) {
      //     return Boolean( value.trim() )
      //   }
      // },
      // manager: {
      //   type: String,
      //   required: true,
      //   validator(value) {
      //     return Boolean( value.trim() )
      //   }
      // },
      // time: {
      //   type: String,
      //   required: true
      // }
    },
  }
</script>

<style lang="scss">
  .elem {
    width: 33.333333%;
    display: flex;
    align-items: center;
    &__body {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      border: 1px solid #000;
    }
  }
</style>
