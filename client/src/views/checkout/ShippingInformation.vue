<template>
   <!-- Shipping Information -->
        <h2 class="section-title">Shipping Information</h2>
        <div class="shipping-details-container">
          <b-form @submit.prevent="onSubmitShipping">
            <!-- Address Input -->
            <b-form-group
              label="Address"
              label-for="shipping-address"
              :state="getFieldState($v.shippingDetails.address)"
              invalid-feedback="Address is required"
            >
              <b-form-input
                id="shipping-address"
                v-model="$v.shippingDetails.address.$model"
                :state="getFieldState($v.shippingDetails.address)"
                required
                placeholder="Enter your shipping address"
              ></b-form-input>
            </b-form-group>

            <!-- Apartment/Suite Input (Optional) -->
            <b-form-group
              label="Apartment/Suite (Optional)"
              label-for="shipping-apartment"
            >
              <b-form-input
                id="shipping-apartment"
                v-model="$v.shippingDetails.apartment.$model"
                placeholder="Apartment, suite, etc. (Optional)"
              ></b-form-input>
            </b-form-group>

            <!-- City Input -->
            <b-form-group
              label="City"
              label-for="shipping-city"
              :state="getFieldState($v.shippingDetails.city)"
              invalid-feedback="City is required"
            >
              <b-form-input
                id="shipping-city"
                v-model="$v.shippingDetails.city.$model"
                :state="getFieldState($v.shippingDetails.city)"
                required
                placeholder="Enter your city"
              ></b-form-input>
            </b-form-group>

            <!-- State Input -->
            <b-form-group
              label="State"
              label-for="shipping-state"
              :state="getFieldState($v.shippingDetails.state)"
              invalid-feedback="State is required"
            >
              <b-form-input
                id="shipping-state"
                v-model="$v.shippingDetails.state.$model"
                :state="getFieldState($v.shippingDetails.state)"
                required
                placeholder="Enter your state"
              ></b-form-input>
            </b-form-group>

            <!-- ZIP Code Input -->
            <b-form-group
              label="ZIP Code"
              label-for="shipping-zip"
              :state="getFieldState($v.shippingDetails.zip)"
              invalid-feedback="ZIP code is required"
            >
              <b-form-input
                id="shipping-zip"
                v-model="$v.shippingDetails.zip.$model"
                :state="getFieldState($v.shippingDetails.zip)"
                required
                placeholder="Enter your ZIP code"
              ></b-form-input>
            </b-form-group>
          </b-form>
        </div>
</template>

<script>
export default {
  data() {
    return {
      shippingDetails: {
        address: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
      },
    };
  },
  watch: {
    'shippingDetails': {
      deep: true,
      handler() {
        this.$emit('shipping-information-changed', this.shippingDetails);
      },
    },
  },
};
</script>