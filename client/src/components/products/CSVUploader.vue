<template>
  <div>
    <b-form-file
      v-model="selectedFile"
      :state="Boolean(selectedFile)"
      placeholder="Choose a CSV file..."
      drop-placeholder="Drop file here..."
      @change="fileChanged"
    ></b-form-file>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    fileChanged(event) {
      const file = event.target.files[0];
      if (file) {
        const orderNumberMatch = file.name.match(/order-(\d+)\.csv/);
        const orderNumber = orderNumberMatch ? orderNumberMatch[1] : null;
        this.$emit("file-selected", { file, orderNumber });
      } else {
        // Optionally handle the case where no file is selected
        console.log("No file selected");
      }
    },
  },
};
</script>

<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/products/CSVUploader.vue -->
