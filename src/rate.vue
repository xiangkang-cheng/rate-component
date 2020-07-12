<template>
  <div
    class="rate"
  >
    <span
      v-for="(item, key) in max"
      class="rate-item"
      @click="selectValue(item)"
      :key="key"
    >
      <i
        :class='["rate-icon", classes[item - 1]]'
      >
        <i
          v-if="showDecimal(item)"
          :class='["rate-decimal", activeClass]'
          :style='{"width": decimalWidth}'
        ></i>
      </i>
    </span>
    <span
      v-if="showText || showScore"
      :class="textClass"
      >{{ text }}</span
    >
  </div>
</template>

<script>
// import '../asset/stylesheet/rate.css';
export default {
  name: 'MyRate',

  data() {
    return {
      currentValue: this.value
    };
  },

  props: {
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 5
    },
    activeClass: {
      type: String,
      default: 'icon-star-on'
    },
    disabledClass: {
      type: String,
      default: 'icon-star-off'
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    showText: {
      type: Boolean,
      default: false
    },
    showScore: {
      type: Boolean,
      default: false
    },
    textClass: {
      type: String,
      default: 'rate-text'
    },
    texts: {
      type: Array,
      default() {
        return ['极差', '失望', '一般', '满意', '惊喜'];
      }
    }
  },

  computed: {
    text() {
      let result = '';
      if (this.showScore) {
        result = this.readOnly ? this.value : this.currentValue;
      } else if (this.showText) {
        result = this.texts[Math.ceil(this.currentValue) - 1];
      }
      return result;
    },

    decimalWidth() {
      let width = '';
      if (this.readOnly) {
        width = `${this.valueDecimal}%`;
      }
      return width;
    },

    valueDecimal() {
      return this.value * 100 - Math.floor(this.value) * 100;
    },

    classes() {
      let result = [];
      let i = 0;
      let threshold = this.currentValue;
      if (
        this.currentValue !== Math.floor(this.currentValue)
      ) {
        threshold--;
      }
      for (; i < threshold; i++) {
        result.push(this.activeClass);
      }
      for (; i < this.max; i++) {
        result.push(this.disabledClass);
      }
      return result;
    }
  },

  methods: {
    // 判断是否显示小数
    showDecimal(item) {
      let showWhenreadOnly =
        this.readOnly &&
        this.valueDecimal > 0 &&
        item - 1 < this.value && // 判断在哪一个item显示小数
        item > this.value;
      return showWhenreadOnly;
    },

    selectValue(value) {
      if (this.readOnly) {
        return null;
      }
      this.currentValue = value;
      if (this.currentValue) {
        this.$emit('change', this.currentValue);
      }
    }
  }
};
</script>
