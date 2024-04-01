<!-- >Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/form/FormInput.vue -->

<template>
  <b-form-group
    :label="label"
    :label-for="labelFor"
  >
    <b-form-input
      :id="labelFor"
      v-model="modelValue"
      :placeholder="placeholder"
      :required="required"
      :type="type"
    ></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  props: {
    label: String,
    labelFor: String,
    placeholder: String,
    modelValue: {
      type: [String, Number],
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'text',  // Can be 'text', 'email', 'password', etc.
    },
  },
  emits: ['update:modelValue'],
};
</script>
