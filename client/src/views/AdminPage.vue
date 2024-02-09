// /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/views/AdminPage.vue
<template>
  <div>
    <h1>Upload CSV File and Quantities</h1>
    <div class="uploader-container">
      <CSVUploader @file-selected="handleFileSelected" />
    </div>
    <div class="uploader-container">
      <ProductQtyUpdater @update-quantities="handleQuantityUpdate" />
    </div>
    <b-button
      @click="processUpload"
      variant="primary"
      class="mt-3"
      :disabled="!canUpload"
    >
      Upload
    </b-button>
  </div>
</template>

<script>
import CSVUploader from "@/components/products/CSVUploader.vue";
import ProductQtyUpdater from "@/components/products/ProductQtyUpdater.vue";
import axios from "axios";

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
    };
  },
  methods: {
    handleFileSelected(file) {
      this.selectedFile = file;
      this.checkCanUpload();
    },
    handleQuantityUpdate(quantities) {
      this.productQuantities = quantities;
      this.checkCanUpload();
    },
    checkCanUpload() {
      this.canUpload =
        this.selectedFile && Object.keys(this.productQuantities).length > 0;
    },
    processUpload() {
      if (
        !this.selectedFile ||
        Object.keys(this.productQuantities).length === 0
      ) {
        alert("Please provide both a CSV file and quantities.");
        return;
      }

      let formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.append("quantities", JSON.stringify(this.productQuantities));

      axios
        .post("/api/upload-csv", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Upload successful", response.data);
        })
        .catch((error) => {
          console.error("Error uploading data", error);
        });
    },
  },
};
</script>

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
</style>
