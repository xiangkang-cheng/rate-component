<template>
  <div id="app">
    <my-rate
    :value='4'
    show-score
    />
    <my-rate
    :value='3.5'
    show-score
    read-only
    />
    <my-rate
    :value='4'
    show-text
    @change="scoreChange"
    />
  </div>
</template>
<script>
import MyRate from '../../src/index';
import Vue from 'vue';
import '../../asset/stylesheet/rate.css';
Vue.use(MyRate);
export default {
  name: 'App',
  methods: {
    scoreChange(value) {
      console.log(value);
    }
  }
};
</script>
