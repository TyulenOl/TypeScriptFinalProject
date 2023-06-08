<template>
  <div class="checkbox-group">
    <input class="checkbox-group__input" @input="(event) => $emit('update:checked', event.target.checked)"
           type="checkbox"
           :checked="checked"
           :id="fieldId"
    />
    <label :for="fieldId">{{ label.charAt(0).toUpperCase() + label.slice(1) }}</label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Checkbox",
  props: {
    label: {type: String},
    fieldId: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
    },
  },
});
</script>

<style scoped>
.checkbox-group {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-group > * {
  cursor: pointer;
}

.checkbox-group__input[type="checkbox"] {
  width: 1.5em;
  height: 1.5em;
  margin-right: 0.65rem;
}

.checkbox-group:not(:last-child) {
  margin-bottom: 8px;
}
</style>