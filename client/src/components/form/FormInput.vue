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
        v-model="inputValue"
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
    placeholder: String,
    required: Boolean,
    type: { type: String, default: "text" },
    labelColsSm: { type: [String, Number], default: 3 },
    contentColsSm: { type: [String, Number], default: 9 },
    labelAlignSm: { type: String, default: "right" },
    labelSize: String,
    validState: { type: Boolean, default: null },
    feedback: String,
    disabled: Boolean,
    detailType: String, // 'shipping' or 'billing'
    fieldKey: String,
  },
  computed: {
    inputValue: {
      get() {
        // Directly access the state based on the detailType and fieldKey
        return this.$store.state.checkout[this.detailType + "Details"][
          this.fieldKey
        ];
      },
      set(value) {
        // Dispatch the generic updateDetail action to update the Vuex state
        this.$store.dispatch("checkout/updateDetail", {
          detailType: this.detailType,
          field: this.fieldKey,
          value: value,
        });
      },
    },
  },
};
</script>
