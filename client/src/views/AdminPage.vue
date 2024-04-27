<!-- // /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/components/admin/CSVUploader.vue -->
<template>
  <div v-if="isAdmin">
    <h1>Upload CSV File and Quantities</h1>
    <div class="uploader-container">
      <CSVUploader @file-selected="handleFileSelected" />
      <ProductQtyUpdater @quantities-updated="handleQuantityUpdate" />
      <b-form-checkbox v-model="isFileSelected" disabled
        >CSV File Selected</b-form-checkbox
      >
      <b-form-checkbox v-model="areQuantitiesEntered" disabled
        >Quantities Entered</b-form-checkbox
      >
      <b-alert v-if="uploading" variant="info" show
        >Uploading, please wait...</b-alert
      >
      <b-alert
        v-if="uploadMessage"
        :variant="uploadSuccess ? 'success' : 'danger'"
        show
      >
        {{ uploadMessage }}
      </b-alert>
      <b-button
        @click="processUpload"
        variant="primary"
        class="mt-3"
        :disabled="!isFileSelected || !areQuantitiesEntered || uploading"
      >
        Upload All
      </b-button>
    </div>
  </div>
  <div v-else>
    <h1>Unauthorized Access</h1>
    <p>You do not have permission to view this page.</p>
  </div>
</template>

<script>
import CSVUploader from "@/components/admin/CSVUploader.vue";

import ProductQtyUpdater from "@/components/admin/ProductQtyUpdater.vue";
import axios from "axios";
import store from "@/store"; // Ensure you're importing the Vuex store

export default {
  components: {
    CSVUploader,
    ProductQtyUpdater,
  },
  data() {
    return {
      selectedFile: null,
      productQuantities: {},
      canUpload: false,
      uploading: false,
      uploadMessage: "",
      uploadSuccess: false,
      isFileSelected: false,
      areQuantitiesEntered: false,
    };
  },
  computed: {
    isAdmin() {
      return store.getters["user/isAdmin"]; // Ensure you have an isAdmin getter in your store
    },
  },
  methods: {
    handleFileSelected(file) {
      console.log("File Selected:", file ? file.name : "No file");
      if (file) {
        this.selectedFile = file;
        this.isFileSelected = true;
        console.log(
          "Before calling checkCanUpload - Selected file:",
          this.selectedFile
        );
        console.log(
          "Before calling checkCanUpload - Is file selected:",
          this.isFileSelected
        );
        this.checkCanUpload();
      } else {
        // Handling for no file selected
      }
    },

    handleQuantityUpdate(quantities) {
      if (Object.keys(quantities).length > 0) {
        this.areQuantitiesEntered = true;
        this.productQuantities = quantities;
        console.log(
          "Before calling checkCanUpload - Quantities:",
          this.productQuantities
        );
        console.log(
          "Before calling checkCanUpload - Are quantities entered:",
          this.areQuantitiesEntered
        );
        this.checkCanUpload();
      }
    },

    checkCanUpload() {
      // Log current state for debugging
      console.log(
        "Selected file:",
        this.selectedFile ? this.selectedFile.name : "None"
      );
      console.log("Quantities:", this.productQuantities);

      // Actual logic to determine if upload is possible
      const conditionsMet =
        this.selectedFile !== null &&
        Object.keys(this.productQuantities).length > 0;

      // Update canUpload based on actual conditions or manual override for testing
      // Remove or comment out the manual override when done testing
      this.canUpload = conditionsMet; // or true for manual override
      console.log("Conditions met:", conditionsMet);
      console.log("Updated canUpload to:", this.canUpload);
    },

    processUpload() {
      if (
        !this.selectedFile ||
        Object.keys(this.productQuantities).length === 0
      ) {
        this.uploadMessage = "Please provide both a CSV file and quantities.";
        this.uploadSuccess = false;
        return;
      }
      this.uploading = true;
      let formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.append("quantities", JSON.stringify(this.productQuantities));

      axios
        .post("http://127.0.0.1:3000/api/upload-csv", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.uploadMessage = "Upload successful!";
          this.uploadSuccess = true;
        })
        .catch((error) => {
          this.uploadMessage = `Error uploading data: ${error.message}`;
          this.uploadSuccess = false;
        })
        .finally(() => {
          this.uploading = false;
        });
    },
  },
};
</script>
<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/views/AdminPage.vue -->

<style scoped>
.uploader-container {
  padding: 1rem; /* Keeps the padding around the uploader components */
  background-color: #333; /* Lightened the super dark grey to a lighter shade */
  border-radius: 8px; /* Keeps the rounded corners */
  margin-bottom: 1rem; /* Keeps the space between uploaders and the next elements */
  max-width: 55%; /* Limits the width to no more than 2/3 of the total width */
  margin-left: auto; /* Centers the uploader container */
  margin-right: auto; /* Centers the uploader container */
}

.uploader-container input,
.uploader-container textarea {
  width: 100%; /* Ensures input and textarea elements take the full width of their container */
  background-color: #4d4d4d; /* Lightens the background color for input and textarea */
  color: #fff; /* Keeps text color white for contrast */
  border: 1px solid #ff6b81; /* Keeps the border color to match the theme */
  border-radius: 4px; /* Keeps the rounded corners for input and textarea */
}

.uploader-container input::placeholder,
.uploader-container textarea::placeholder {
  color: #ff8c99; /* Keeps the lighter pink for placeholder text */
}

.uploader-container button {
  background-color: #ff6b81; /* Keeps the button color to match the theme */
  color: #fff; /* Keeps the button text color */
  border: none; /* Keeps the button without a border */
  border-radius: 20px; /* Keeps the rounded button edges */
  padding: 0.5rem 1rem; /* Keeps padding inside the button */
  transition: background-color 0.3s ease; /* Keeps the smooth background color transition */
}

.uploader-container button:hover {
  background-color: #ff8c99; /* Keeps the lighter pink on hover */
}

button:hover {
  background-color: #f0f0f0; /* Change as needed */
  transition: background-color 0.3s ease;
}
</style>
