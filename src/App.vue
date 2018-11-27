<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html {
  box-sizing: border-box;
  height: 100%;
}

*, *::before, *::after {
  box-sizing: inherit;
}

body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 15px;
}
</style>
