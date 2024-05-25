<template>
  <b-form-group
    :label="label"
    :label-for="labelFor"
    :state="state"
    :description="description"
    :feedback="feedback"
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
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
    feedback: String,
    state: Boolean,
    detailType: String,
    fieldKey: String,
    disabled: Boolean,
  },
  computed: {
    inputValue: {
      get() {
        return this.$store.state.checkout[`${this.detailType}Details`][
          this.fieldKey
        ];
      },
      set(value) {
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
