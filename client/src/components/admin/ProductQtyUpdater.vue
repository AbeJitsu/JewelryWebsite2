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
  </b-form-group>
</template>

<script>
export default {
  data() {
    return {
      productText: "",
    };
  },
  watch: {
    productText: {
      handler(newVal) {
        const productQuantities = this.parseProductText(newVal);
        this.$emit("quantities-updated", productQuantities);
      },
      immediate: true,
    },
  },
  methods: {
    updateProductQuantities() {
      const productQuantities = this.parseProductText(this.productText);
      console.log("Quantities updated:", productQuantities);
      this.$emit("quantities-updated", productQuantities);
    },
    parseProductText(text) {
      const productQuantities = {};
      const lines = text.split("\n");
      lines.forEach((line) => {
        const [code, quantity] = line.split("x").map((part) => part.trim());
        if (code && !isNaN(parseInt(quantity, 10))) {
          productQuantities[code] = parseInt(quantity, 10);
        }
      });
      return productQuantities;
    },
  },
};
</script>

<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/products/ProductQtyUpdater.vue -->
