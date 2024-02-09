<template>
  <b-form-group
    label="Paste Product Quantities Here:"
    label-for="product-quantities"
  >
    <b-form-textarea
      id="product-quantities"
      v-model="productText"
      placeholder="Copy and paste product quantities here..."
      rows="10"
      class="mb-3"
    ></b-form-textarea>
    <b-button @click="updateProductQuantities" variant="info"
      >Update Quantities</b-button
    >
  </b-form-group>
</template>

<script>
export default {
  data() {
    return {
      productText: "",
    };
  },
  methods: {
    updateProductQuantities() {
      this.$emit("update-quantities", this.parseProductText(this.productText));
    },
    parseProductText(text) {
      const productQuantities = {};
      const lines = text.split("\n");
      lines.forEach((line) => {
        const parts = line.split("x");
        if (parts.length === 2) {
          const code = parts[0].trim().match(/[A-Za-z0-9-]+$/)[0]; // Extract code at the end of the string
          const quantity = parseInt(parts[1], 10);
          if (code && !isNaN(quantity)) {
            productQuantities[code] = quantity;
          }
        }
      });
      return productQuantities;
    },
  },
};
</script>
