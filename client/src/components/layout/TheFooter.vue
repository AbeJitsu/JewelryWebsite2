<template>
  <footer class="footer mt-auto py-4 bg-darker text-white">
    <div class="container">
      <div class="row">
        <div class="col-sm-4">
          <!-- <h5>About Us</h5> -->
          <router-link to="/about" class="link-pink"
            >Learn More About Us</router-link
          >
        </div>
        <div class="col-sm-4">
          <router-link to="/contact" class="link-pink">Contact Us</router-link>
        </div>
        <div class="col-sm-4">
          <!-- <h5>Follow Us</h5> -->
          <!-- Flex container for social links -->
          <div class="social-links">
            <a
              href="https://www.facebook.com/EscapeRelaxBeJeweled/"
              target="_blank"
              class="link-pink social-link"
            >
              <font-awesome-icon :icon="['fab', 'facebook-f']" /> Facebook
            </a>
            <a
              href="https://www.instagram.com/p/Cy5yu28KR7M/"
              target="_blank"
              class="link-pink social-link"
            >
              <font-awesome-icon :icon="['fab', 'instagram']" /> Instagram
            </a>
            <a
              href="https://www.youtube.com/channel/UCcQr-jL4kdI0kVAT2tdUQig"
              target="_blank"
              class="link-pink social-link"
            >
              <font-awesome-icon :icon="['fab', 'youtube']" /> YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
// Importing Vue and use Vue Router might be necessary if this component is standalone or in a setup that doesn't globally import Vue Router
export default {
  name: "TheFooter",
  // If you are using font-awesome-icons globally, you might not need to import it here.
  // But, ensure that your main.js or equivalent setup file imports and uses FontAwesomeIcon component globally.
};
</script>

<style scoped>
.bg-darker {
  background-color: #121212; /* Darker background color for the footer */
}

.link-pink {
  color: #ff6b81; /* Soft pink color for links */
  transition: color 0.3s ease, transform 0.3s ease; /* Smooth transition for hover effect */
}

.link-pink:hover,
.link-pink:focus {
  text-decoration: none; /* Remove underline on hover/focus */
  color: #ff8c99; /* Lighter pink on hover/focus */
  transform: scale(
    1.05
  ); /* Slightly increase size on hover/focus for emphasis */
}

.social-link {
  margin-right: 15px; /* Adjust the right margin to increase spacing between social links */
  color: #ff6b81; /* Ensure social links also have the soft pink color */
  transition: color 0.3s ease; /* Smooth color transition for social links */
}

.social-link:hover,
.social-link:focus {
  color: #ff8c99; /* Lighter pink on hover/focus for social links */
  text-decoration: none; /* Remove underline on hover/focus for social links */
}

/* Optionally, adjust the last social link's margin */
.social-links a:last-child {
  margin-right: 0; /* Remove extra spacing on the right for the last item */
}
</style>
