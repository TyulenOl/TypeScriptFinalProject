<template>
  <div class="categories_wrapper">
    <div class="categories-group">
      <span class="categories-group__text">Категории:</span>
      <checkbox v-for="option in options"
                :checked="chosenCategories.includes(option)"
                @update:checked="check($event, option)"
                :fieldId="option"
                :label="option" :key="option"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import checkbox from "@/UI/Checkbox.vue";

export default defineComponent({
  name: "Categories",
  components: {
    checkbox
  },
  emits: ["update:chosenCategories"],
  props: {
    chosenCategories: {type: Array as PropType<string[]>, required: true},
    options: {type: Array as PropType<string[]>, required: true}
  },
  setup(props, context) {
    const check = (checked: boolean, category: string): void => {
      let updatedValue = [...props.chosenCategories];

      if (checked) {
        updatedValue.push(category);
      } else {
        updatedValue.splice(updatedValue.indexOf(category), 1);
      }

      context.emit("update:chosenCategories", updatedValue);
    };

    return {
      check
    };
  }
});
</script>

<style scoped>
.categories_wrapper {
  display: inline-block;
}

.categories-group {
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 1px 3px -2px #9098a9;
  padding: 16px;
  width: auto;
}

.categories-group__text {
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #1A1F16;
  margin-bottom: 8px;
}
</style>