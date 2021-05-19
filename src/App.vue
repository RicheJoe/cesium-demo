<template> <viewer /> </template>

<script>
import viewer from './components/view';
export default {
  name: 'App',
  components: { viewer },
};
</script>

<style>
html,
body {
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
}
</style>
