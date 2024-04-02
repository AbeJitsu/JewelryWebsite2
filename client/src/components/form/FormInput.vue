<!-- >Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/form/FormInput.vue -->

<template>
  <b-form-group
    :label="label"
    :label-for="labelFor"
    :label-cols-sm="labelColsSm"
    :label-align-sm="labelAlignSm"
    :label-size="labelSize"
  >
    <b-col :sm="contentColsSm">
      <b-form-input
        :id="labelFor"
        :value="inputValue"  
        @input="updateValue"
        :placeholder="placeholder"
        :required="required"
        :type="type"
        :state="validState"
        :disabled="disabled"
      ></b-form-input>
      <b-form-invalid-feedback v-if="feedback">
        {{ feedback }}
      </b-form-invalid-feedback>
    </b-col>
  </b-form-group>
</template>

<script>
export default {
  props: {
    label: String,
    labelFor: String,
    modelValue: {
      type: [String, Number],
      default: "",
    },
    placeholder: String,
    required: Boolean,
    type: {
      type: String,
      default: "text",
    },
    labelColsSm: {
      type: [String, Number],
      default: 3,
    },
    contentColsSm: {
      type: [String, Number],
      default: 9,
    },
    labelAlignSm: {
      type: String,
      default: "left",
    },
    labelSize: String,
    validState: {
      type: Boolean,
      default: null,
    },
    feedback: String,
    disabled: Boolean,
  },
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  methods: {
    updateValue(value) {
      this.$emit('update:modelValue', value);
    },
  },
  emits: ["update:modelValue"],
};
</script>
