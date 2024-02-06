<template>
  <div>
    <h1>This is the Admin page!</h1>
    <textarea v-model="csvData" placeholder="Paste CSV data here"></textarea>
    <button @click="parseCsvData">Parse CSV</button>
  </div>
</template>

<script>
import Papa from "papaparse";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      csvData: "", // To hold the text area input
    };
  },
  methods: {
    ...mapMutations(["setJewelryData"]),
    parseCsvData() {
      Papa.parse(this.csvData, {
        complete: (result) => {
          console.log(result.data); // You can replace this with your logic
          // For example, store the parsed data in Vuex or emit an event with this data
          this.$store.commit("setJewelryData", result.data); // Assuming you have a Vuex store
        },
        header: true, // Assuming your CSV has headers; adjust as needed
      });
    },
  },
};
</script>
