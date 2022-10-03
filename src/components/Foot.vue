<script>
import { computed, onMounted, ref, watch } from "vue-demi";
export default {
  setup() {
    return {

    };
  },
};
</script>

<template>
  <div class="dfoot"></div>
</template>

<style lang="scss" scoped>
.dfoot {
  height: 20px;
  background: #aaa;

  &.heightFixed {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
