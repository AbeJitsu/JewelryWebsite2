<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" class="custom-navbar">
    <b-navbar-brand href="#" class="custom-brand-text">
      <img
        :src="require('@/assets/logo.png')"
        alt="Logo"
        height="70"
        class="d-inline-block logo-custom-padding"
      />Escape, Relax & Be Jeweled
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'jewelry-showcase' }"> Home </b-nav-item>
        <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        <b-nav-item :to="{ name: 'live-shows' }">Watch Live</b-nav-item>
        <b-nav-item :to="{ name: 'connect' }">Connect</b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input
            size="sm"
            class="mr-sm-2"
            placeholder="Search"
          ></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit"
            >Search</b-button
          >
        </b-nav-form>
        <b-nav-item href="#"><b-icon icon="cart-fill"></b-icon></b-nav-item>
        <b-nav-item href="#"><b-icon icon="person-fill"></b-icon></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  // Component logic here
};
</script>

<style scoped>
.custom-navbar {
  background-color: #333; /* Dark background color */
  color: #fff; /* White text color */
}

.custom-navbar .navbar-nav .nav-item .nav-link,
.escape-relax-bejeweled {
  /* Targeting the specific class */
  color: #ff6b81; /* Soft pink accent color for links and specified text */
}

.custom-navbar .navbar-toggler-icon {
  background-color: #ff6b81; /* Soft pink accent color for the toggler icon */
  border-color: #ff6b81; /* Soft pink accent color for the toggler icon border */
}

.custom-navbar .navbar-toggler-icon:focus,
.custom-navbar .navbar-toggler-icon:hover,
.escape-relax-bejeweled:hover {
  /* Adding hover effect for the text as well */
  background-color: #ff8c99; /* Lighter pink on hover/focus */
  border-color: #ff8c99; /* Lighter pink on hover/focus */
  color: #ff8c99; /* Lighter pink for the text on hover, if desired */
}
.logo-custom-padding {
  margin-right: 20px; /* Adjust the padding as needed */
}
.custom-brand-text {
  font-family: "'Cormorant Garamond'", serif;
  font-size: 1.5rem;
}
</style>
