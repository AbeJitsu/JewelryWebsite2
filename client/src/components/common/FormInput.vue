<!-- /Users/abiezerreyes/Documents/JewelryWebsite2/client/src/components/common/FormInput.vue -->
<template>
  <b-form-group
    :label="label"
    :label-for="labelFor"
    :label-cols-sm="labelColSm"
    :label-align-sm="labelAlignSm"
    :label-size="labelSize"
    :content-cols-sm="contentColSm"
    :label-class="labelClass"
    :description="description"
    :feedback="feedback"
    :state="state"
  >
    <b-form-input
      :id="labelFor"
      :type="type"
      v-model="inputValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :state="state"
    ></b-form-input>
    <b-form-invalid-feedback v-if="feedback" :state="state">{{
      feedback
    }}</b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
export default {
  props: {
    label: String,
    labelFor: String,
    labelColSm: String,
    contentColSm: String,
    labelAlignSm: String,
    labelSize: String,
    labelClass: String,
    placeholder: String,
    type: {
      type: String,
      default: "text",
    },
    feedback: String,
    state: {
      type: Boolean,
      default: null,
    },
    detailType: String, // 'shipping' or 'billing'
    fieldKey: String,
    disabled: Boolean,
  },
  computed: {
    inputValue: {
      get() {
        // Directly access the state based on the detailType and fieldKey
        return this.$store.state.checkout[`${this.detailType}Details`][
          this.fieldKey
        ];
      },
      set(value) {
        // Dispatch the generic updateDetail action to update the Vuex state
        this.$store.dispatch("checkout/updateDetail", {
          detailType: this.detailType,
          field: this.fieldKey,
          value,
        });
      },
    },
  },
};
</script>
