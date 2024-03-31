<template>
  <div>
    <!-- Shipping Information Section -->
    <h2 class="section-title">Shipping Info</h2>
    <div class="shipping-info-container">
      <b-form @submit.prevent="onSubmitShipping">
        <!-- First Name Input -->
        <b-form-group
          class="form-group"
          label-for="first-name"
          label-cols-sm="3"
          content-cols-sm="9"
          label="First Name"
        >
          <b-form-input
            id="first-name"
            v-model="shippingDetails.firstName"
            required
            placeholder="Enter your first name"
          ></b-form-input>
        </b-form-group>

        <!-- Last Name Input -->
        <b-form-group
          class="form-group"
          label-for="last-name"
          label-cols-sm="3"
          content-cols-sm="9"
          label="Last Name"
        >
          <b-form-input
            id="last-name"
            v-model="shippingDetails.lastName"
            required
            placeholder="Enter your last name"
          ></b-form-input>
        </b-form-group>

        <!-- Shipping Address Input -->
        <b-form-group
          class="form-group"
          label-for="shipping-address"
          label-cols-sm="3"
          content-cols-sm="9"
          label="Address"
        >
          <b-form-input
            id="shipping-address"
            v-model="shippingDetails.address"
            required
            placeholder="Enter your shipping address"
          ></b-form-input>
        </b-form-group>

        <!-- Checkbox for Apartment/Suite Information -->
        <b-form-group
          class="form-group"
          label-for="has-apartment"
          label-cols-sm="3"
          content-cols-sm="9"
        >
          <b-form-checkbox id="has-apartment" v-model="hasApartment">
            I have an Apt, Unit, or Suite number
          </b-form-checkbox>
        </b-form-group>

        <!-- Conditionally Render Apartment/Suite Input -->
        <b-form-group
          label="Apt, Unit, or Suite"
          class="form-group"
          label-for="shipping-apartment"
          label-cols-sm="3"
          content-cols-sm="9"
          v-if="hasApartment"
        >
          <b-form-input
            id="shipping-apartment"
            v-model="shippingDetails.apartment"
            placeholder="Apt, Unit, or Suite (Optional)"
          ></b-form-input>
        </b-form-group>

        <!-- Shipping City Input -->
        <b-form-group
          class="form-group"
          label-for="shipping-city"
          label-cols-sm="3"
          content-cols-sm="9"
          label="City"
        >
          <b-form-input
            id="shipping-city"
            v-model="shippingDetails.city"
            required
            placeholder="Enter your city"
          ></b-form-input>
        </b-form-group>

        <!-- Shipping State Input -->
        <b-form-group
          class="form-group"
          label-for="shipping-state"
          label-cols-sm="3"
          content-cols-sm="9"
          label="State"
        >
          <b-form-input
            id="shipping-state"
            v-model="shippingDetails.state"
            required
            placeholder="Enter your state"
          ></b-form-input>
        </b-form-group>

        <!-- Shipping ZIP Code Input -->
        <b-form-group
          class="form-group"
          label-for="shipping-zip"
          label-cols-sm="3"
          content-cols-sm="9"
          label="ZIP Code"
        >
          <b-form-input
            id="shipping-zip"
            v-model="shippingDetails.zip"
            required
            placeholder="Enter your ZIP code"
          ></b-form-input>
        </b-form-group>

        <!-- Checkbox to indicate if billing address is the same as shipping -->
        <b-form-checkbox v-model="billingSameAsShipping">
          Billing address is the same as shipping address
        </b-form-checkbox>

        <!-- Checkbox to indicate if cardholder's name is the same as the shipping name -->
        <b-form-checkbox v-model="cardholderNameSameAsShipping">
          Cardholder's name is the same as shipping name
        </b-form-checkbox>
      </b-form>
    </div>

    <!-- Billing Information Section -->
    <h2 class="section-title">Billing Information</h2>
    <div class="billing-info-container" v-if="!billingSameAsShipping">
      <b-form @submit.prevent="onSubmitBilling">
        <!-- Cardholder's Name Input -->
        <b-form-group
          class="form-group"
          label-for="cardholder-name"
          label-cols-sm="3"
          content-cols-sm="9"
          label="Cardholder's Name"
        >
          <b-form-input
            id="cardholder-name"
            v-model="billingDetails.cardholderName"
            :disabled="cardholderNameSameAsShipping"
            required
            :placeholder="
              cardholderNameSameAsShipping
                ? `${shippingDetails.firstName} ${shippingDetails.lastName}`
                : 'Enter cardholder\'s name'
            "
          ></b-form-input>
        </b-form-group>

        <!-- The rest of the billing address fields, only shown when billing address is not the same as shipping -->
        <template v-if="!billingSameAsShipping">
          <!-- Billing Address Input -->
          <b-form-group
            class="form-group"
            label-for="billing-address"
            label-cols-sm="3"
            content-cols-sm="9"
            label="Address"
          >
            <b-form-input
              id="billing-address"
              v-model="billingDetails.address"
              required
              placeholder="Enter your billing address"
            ></b-form-input>
          </b-form-group>

          <!-- Checkbox for Billing Apartment/Suite Information -->
          <!-- Checkbox for Billing Apartment/Suite Information -->
          <b-form-group
            class="form-group"
            label-for="has-billing-apartment"
            label-cols-sm="3"
            content-cols-sm="9"
          >
            <b-form-checkbox
              id="has-billing-apartment"
              v-model="hasBillingApartment"
            >
              I have an Apt, Unit, or Suite number
            </b-form-checkbox>
          </b-form-group>

          <!-- Conditionally Render Billing Apartment/Suite Input -->
          <b-form-group
            label="Apt, Unit, or Suite"
            class="form-group"
            label-for="billing-apartment"
            label-cols-sm="3"
            content-cols-sm="9"
            v-if="hasBillingApartment"
          >
            <b-form-input
              id="billing-apartment"
              v-model="billingDetails.apartment"
              placeholder="Apt, Unit, or Suite (Optional)"
            >
            </b-form-input>
          </b-form-group>

          <!-- Billing City Input -->
          <b-form-group
            class="form-group"
            label-for="billing-city"
            label-cols-sm="3"
            content-cols-sm="9"
            label="City"
          >
            <b-form-input
              id="billing-city"
              v-model="billingDetails.city"
              required
              placeholder="Enter your city"
            ></b-form-input>
          </b-form-group>

          <!-- Billing State Input -->
          <b-form-group
            class="form-group"
            label-for="billing-state"
            label-cols-sm="3"
            content-cols-sm="9"
            label="State"
          >
            <b-form-input
              id="billing-state"
              v-model="billingDetails.state"
              required
              placeholder="Enter your state"
            ></b-form-input>
          </b-form-group>

          <!-- Billing ZIP Code Input -->
          <b-form-group
            class="form-group"
            label-for="billing-zip"
            label-cols-sm="3"
            content-cols-sm="9"
            label="ZIP Code"
          >
            <b-form-input
              id="billing-zip"
              v-model="billingDetails.zip"
              required
              placeholder="Enter your ZIP code"
            ></b-form-input>
          </b-form-group>
        </template>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mount } from "@vue/test-utils";
import BillingInformation from "./BillingInformation.vue";

describe("BillingInformation", () => {
  it("submits shipping details when onSubmitShipping is called", () => {
    const wrapper = mount(BillingInformation);
    const shippingDetails = {
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      apartment: "Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
    };

    wrapper.setData({ shippingDetails });
    wrapper.vm.onSubmitShipping();

    expect(wrapper.emitted().submitShipping[0][0]).toEqual(shippingDetails);
  });

  it("submits billing details when onSubmitBilling is called", () => {
    const wrapper = mount(BillingInformation);
    const billingDetails = {
      cardholderName: "John Doe",
      address: "456 Elm St",
      apartment: "Suite 200",
      city: "New York",
      state: "NY",
      zip: "10002",
    };

    wrapper.setData({ billingDetails });
    wrapper.vm.onSubmitBilling();

    expect(wrapper.emitted().submitBilling[0][0]).toEqual(billingDetails);
  });

  it("updates billing details with shipping details when billingSameAsShipping is true", () => {
    const wrapper = mount(BillingInformation);
    const shippingDetails = {
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      apartment: "Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
    };

    wrapper.setData({ shippingDetails, billingSameAsShipping: true });
    wrapper.vm.onSubmitBilling();

    expect(wrapper.vm.billingDetails.address).toBe(shippingDetails.address);
    expect(wrapper.vm.billingDetails.apartment).toBe(shippingDetails.apartment);
    expect(wrapper.vm.billingDetails.city).toBe(shippingDetails.city);
    expect(wrapper.vm.billingDetails.state).toBe(shippingDetails.state);
    expect(wrapper.vm.billingDetails.zip).toBe(shippingDetails.zip);
  });

  it("updates billing details cardholderName with shipping details when cardholderNameSameAsShipping is true", () => {
    const wrapper = mount(BillingInformation);
    const shippingDetails = {
      firstName: "John",
      lastName: "Doe",
    };

    wrapper.setData({ shippingDetails, cardholderNameSameAsShipping: true });
    wrapper.vm.onSubmitBilling();

    expect(wrapper.vm.billingDetails.cardholderName).toBe(
      `${shippingDetails.firstName} ${shippingDetails.lastName}`
    );
  });
});
</script>
