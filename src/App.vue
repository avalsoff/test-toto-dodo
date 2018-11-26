<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html {
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 15px;
}
</style>
