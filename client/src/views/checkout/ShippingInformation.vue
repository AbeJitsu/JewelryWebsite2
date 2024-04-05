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
          @input="updateShippingDetail('firstName', shippingDetails.firstName)"
        />

        <!-- Last Name Input -->
        <FormInput
          label="Last Name"
          label-for="last-name"
          placeholder="Enter your last name"
          v-model="shippingDetails.lastName"
          required
          @input="updateShippingDetail('lastName', shippingDetails.lastName)"
        />

        <!-- Address Input -->
        <FormInput
          label="Address"
          label-for="shipping-address"
          placeholder="Enter your shipping address"
          v-model="shippingDetails.address"
          required
          @input="updateShippingDetail('address', shippingDetails.address)"
        />

        <!-- Checkbox for Apartment/Suite Information -->
        <div class="checkbox-align">
          <b-form-checkbox
            id="has-apartment"
            v-model="shippingDetails.hasApartment"
            @change="
              updateShippingDetail('hasApartment', shippingDetails.hasApartment)
            "
          >
            Includes Apt, Unit, or Ste.
          </b-form-checkbox>
        </div>

        <!-- Conditionally Render Apartment/Suite Input -->
        <div v-if="shippingDetails.hasApartment">
          <FormInput
            label="Apt, Unit, or Suite"
            label-for="shipping-apartment"
            placeholder="Apt, Unit, or Suite (Optional)"
            v-model="shippingDetails.apartment"
            @input="
              updateShippingDetail('apartment', shippingDetails.apartment)
            "
          />
        </div>

        <!-- City Input -->
        <FormInput
          label="City"
          label-for="shipping-city"
          placeholder="Enter your city"
          v-model="shippingDetails.city"
          required
          @input="updateShippingDetail('city', shippingDetails.city)"
        />

        <!-- State Input -->
        <FormInput
          label="State"
          label-for="shipping-state"
          placeholder="Enter your state"
          v-model="shippingDetails.state"
          required
          @input="updateShippingDetail('state', shippingDetails.state)"
        />

        <!-- ZIP Code Input -->
        <FormInput
          label="ZIP Code"
          label-for="shipping-zip"
          placeholder="Enter your ZIP code"
          v-model="shippingDetails.zip"
          required
          @input="updateShippingDetail('zip', shippingDetails.zip)"
        />
      </b-form>
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/form/FormInput.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    FormInput,
  },
  computed: {
    ...mapState("checkout", ["shippingDetails"]),
  },
  methods: {
    ...mapActions("checkout", [
      "updateShippingFirstName",
      "updateShippingLastName",
      "updateShippingAddress",
      "updateShippingApartment",
      "updateShippingCity",
      "updateShippingState",
      "updateShippingZip",
    ]),
    updateShippingDetail(field, value) {
      // Dynamically call the respective Vuex action based on the field being updated
      const actionMap = {
        firstName: "updateShippingFirstName",
        lastName: "updateShippingLastName",
        address: "updateShippingAddress",
        apartment: "updateShippingApartment",
        city: "updateShippingCity",
        state: "updateShippingState",
        zip: "updateShippingZip",
      };
      this[actionMap[field]](value);
    },
    onSubmitShipping() {
      console.log(
        "Form submitted with current shipping details:",
        this.shippingDetails
      );
    },
  },
  created() {
    const storedData = localStorage.getItem("shippingDetails");
    if (storedData) {
      this.$store.commit(
        "checkout/updateShippingDetails",
        JSON.parse(storedData)
      );
    }
  },
};
</script>

<style scoped>
@import "@/assets/sharedStyles.css";

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
