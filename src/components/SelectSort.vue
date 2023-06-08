<template>
  <lable class="select-container" for="select">
    <select id="select" class="sort-select" required="required" :value="currentSortType" @change="changeSorting">
      <option class="sort-select__option" disabled value="" selected="selected">Выберите</option>
      <option class="sort-select__option" v-for="option in options" :key="option.value" :value="option.value">
        {{ option.name }}
      </option>
    </select>
    <svg class="arrow">
      <polyline points="1 1 5 5 9 1"/>
    </svg>
  </lable>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {ISortOption} from "@/interfaces/sortOption";

export default defineComponent({
  name: "SelectSort",
  props: {
    currentSortType: {type: String, required: true},
    options: {
      type: Array as PropType<ISortOption[]>, required: true
    }
  },
  setup(props, context) {
    function changeSorting(event: Event): void {
      context.emit('update:currentSortType', (event.target as HTMLInputElement).value);
    }

    return {
      changeSorting
    };
  }
})
;
</script>

<style scoped>

.select-container {
  position: relative;
  display: inline-block;
  min-width: 150px;
  margin-bottom: 16px;
}

.arrow {
  position: absolute;
  right: 12px;
  top: calc(50% - 3px);
  width: 10px;
  height: 6px;
  stroke-width: 2px;
  stroke: #9098a9;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  pointer-events: none;
}

.sort-select {
  -webkit-appearance: none;
  padding: 7px 40px 7px 12px;
  width: 100%;
  border: 1px solid #e8eaed;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 1px 3px -2px #9098a9;
  cursor: pointer;
  font-family: inherit;
  font-size: 16px;
  transition: all 150ms ease;
}

.sort-select:required:invalid {
  color: #5a667f;
}

.sort-select:focus {
  outline: none;
  border-color: #02D693;
  box-shadow: 0 0 0 2px rgba(18, 128, 93, 0.2);
}

.sort-select:hover + .arrow {
  stroke: #02D693;
}

.sort-select__option {
  color: #1A1F16;
}

.sort-select__option[value=""][disabled] {
  display: none;
}
</style>