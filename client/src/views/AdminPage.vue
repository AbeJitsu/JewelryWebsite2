<!-- /Users/abiezerreyes/Projects/JewelryWebsite2/client/src/views/AdminPage.vue -->

<template>
  <div v-if="isAdmin">
    <div class="info-container">
      <h1 class="section-title">Upload CSV File and Quantities</h1>
      <div class="file-input">
        <label>Select Regular CSV</label>
        <CSVUploader @file-selected="handleRegularFileSelected" />
      </div>
      <div class="file-input">
        <label>Select Premiere CSV</label>
        <CSVUploader @file-selected="handlePremiereFileSelected" />
      </div>
      <b-form-checkbox
        v-model="regularCSVSelected"
        disabled
        class="checkbox-align"
      >
        Regular CSV File Selected
      </b-form-checkbox>
      <b-form-checkbox
        v-model="premiereCSVSelected"
        disabled
        class="checkbox-align"
      >
        Premiere CSV File Selected
      </b-form-checkbox>
      <b-alert v-if="uploading" variant="info" show>
        Uploading, please wait...
      </b-alert>
      <b-alert
        v-if="uploadMessage"
        :variant="uploadSuccess ? 'success' : 'danger'"
        show
      >
        {{ uploadMessage }}
      </b-alert>
      <div class="button-group">
        <b-button
          @click="processUpload"
          variant="primary"
          :disabled="!regularCSVSelected || !premiereCSVSelected || uploading"
        >
          Upload All
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import CSVUploader from "@/components/admin/CSVUploader.vue";
import { uploadCSVFiles } from "@/api/clientProductService";

export default {
  components: {
    CSVUploader,
  },
  data() {
    return {
      regularFile: null,
      premiereFile: null,
      regularCSVSelected: false,
      premiereCSVSelected: false,
      uploading: false,
      uploadMessage: "",
      uploadSuccess: false,
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters["user/isAdmin"];
    },
  },
  methods: {
    handleRegularFileSelected(file) {
      this.regularFile = file;
      this.regularCSVSelected = true;
    },
    handlePremiereFileSelected(file) {
      this.premiereFile = file;
      this.premiereCSVSelected = true;
    },
    async processUpload() {
      if (!this.regularFile || !this.premiereFile) {
        this.uploadMessage = "Please provide both CSV files.";
        this.uploadSuccess = false;
        return;
      }

      const formData = new FormData();
      formData.append("regular", this.regularFile);
      formData.append("premiere", this.premiereFile);

      this.uploading = true;
      this.uploadMessage = "";
      this.uploadSuccess = false;

      try {
        await uploadCSVFiles(formData);
        this.uploadMessage = "Upload successful!";
        this.uploadSuccess = true;
      } catch (error) {
        this.uploadMessage = `Error uploading data: ${error.message}`;
        this.uploadSuccess = false;
      } finally {
        this.uploading = false;
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/styles/sharedStyles.css";

.info-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.file-input {
  margin-bottom: 1rem;
}

.section-title {
  margin-bottom: 1rem;
}

.checkbox-align {
  display: block;
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  justify-content: center;
}

.primary-button {
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.primary-button:hover {
  background-color: #43a047;
}

.b-alert {
  margin-top: 1rem;
}
</style>
