<template>
  <div>
    <h1>Upload CSV File</h1>
    <b-form-file
      v-model="selectedFile"
      :state="Boolean(selectedFile)"
      placeholder="Choose a file..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <b-button @click="uploadCsvData" variant="primary" class="mt-3"
      >Upload</b-button
    >
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedFile: null, // To hold the selected file
    };
  },
  methods: {
    uploadCsvData() {
      if (!this.selectedFile) {
        alert("Please select a file first.");
        return;
      }

      const formData = new FormData();
      formData.append("file", this.selectedFile);

      axios
        .post("/api/upload-csv", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Handle success
          console.log("File uploaded successfully", response.data);
          // Optionally, update Vuex store or local component state with response data
        })
        .catch((error) => {
          // Handle error
          console.error("Error uploading file", error);
        });
    },
  },
};
</script>
