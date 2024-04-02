<template>
  <div>
    <h2 class="section-title">Shipping Information</h2>
    <div class="info-container">
      <b-form @submit.prevent="onSubmitShipping">
        <!-- First Name Input -->
        <FormInput
          label="First Name"
          label-for="first-name"
          placeholder="Enter your first name"
          v-model="shippingDetails.firstName"
          required
          @input="updateLocalStorage"
        />

        <!-- Last Name Input -->
        <FormInput
          label="Last Name"
          label-for="last-name"
          placeholder="Enter your last name"
          v-model="shippingDetails.lastName"
          required
          @input="updateLocalStorage"
        />

        <!-- Address Input -->
        <FormInput
          label="Address"
          label-for="shipping-address"
          placeholder="Enter your shipping address"
          v-model="shippingDetails.address"
          required
          @input="updateLocalStorage"
        />

        <!-- Checkbox for Apartment/Suite Information -->
        <div class="checkbox-align">
          <b-form-checkbox
            id="has-apartment"
            v-model="hasApartment"
            @change="updateLocalStorage"
          >
            I have an Apt, Unit, or Suite #
          </b-form-checkbox>
        </div>

        <!-- Conditionally Render Apartment/Suite Input -->
        <div v-if="hasApartment">
          <FormInput
            label="Apt, Unit, or Suite"
            label-for="shipping-apartment"
            placeholder="Apt, Unit, or Suite (Optional)"
            v-model="shippingDetails.apartment"
            @input="updateLocalStorage"
          />
        </div>

        <!-- City Input -->
        <FormInput
          label="City"
          label-for="shipping-city"
          placeholder="Enter your city"
          v-model="shippingDetails.city"
          required
          @input="updateLocalStorage"
        />

        <!-- State Input -->
        <FormInput
          label="State"
          label-for="shipping-state"
          placeholder="Enter your state"
          v-model="shippingDetails.state"
          required
          @input="updateLocalStorage"
        />

        <!-- ZIP Code Input -->
        <FormInput
          label="ZIP Code"
          label-for="shipping-zip"
          placeholder="Enter your ZIP code"
          v-model="shippingDetails.zip"
          required
          @input="updateLocalStorage"
        />
      </b-form>
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/form/FormInput.vue";

export default {
  components: {
    FormInput,
  },
  data() {
    return {
      hasApartment: false,
      shippingDetails: {
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
      },
    };
  },
  mounted() {
    this.loadFromLocalStorage();
  },
  methods: {
    updateLocalStorage() {
      localStorage.setItem(
        "shippingDetails",
        JSON.stringify(this.shippingDetails)
      );
    },
    loadFromLocalStorage() {
      const storedData = localStorage.getItem("shippingDetails");
      if (storedData) {
        this.shippingDetails = JSON.parse(storedData);
      }
    },
    onSubmitShipping() {
      this.$emit("updateShippingDetails", this.shippingDetails);
      // Additional logic for form submission
    },
  },
};
</script>

<style scoped>
@import "@/assets/sharedStyles.css";
/* .section-title {
  margin-bottom: 20px;
  margin-left: 25%;
  font-size: 24px;
  color: #333;
} */

.shipping-details-container,
.billing-info-container {
  background: #ffefef;
  border-radius: 1rem;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 2rem;
}

.form-group {
  display: flex;
  /* justify-content: flex-start; */
  align-items: center;
  margin: 1rem;
  white-space: nowrap;
}

.form-group label {
  margin: 1rem;
  white-space: nowrap;
  text-align: right;
  min-width: 20rem;
}
/* 
b-form-input {
  flex-grow: 1;
}

b-form-checkbox {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex-grow: 1;
}

b-button {
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
}

b-button:hover {
  background-color: #003974;
} */

.checkbox-align {
  margin-left: 33%; /* Adjust as needed for alignment */
}
</style>
/Users/abiezerreyes/Projects/JewelryWebsite2/client/src/views/checkout/ShippingInformation.vue
