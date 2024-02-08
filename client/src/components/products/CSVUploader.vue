// CSVUploader.vue component to upload CSV file
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
    fileChanged() {
      this.$emit("file-selected", this.selectedFile);
    },
  },
};
</script>
