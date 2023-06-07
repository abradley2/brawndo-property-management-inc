<script lang="ts" setup>
const route = ref(useRoute())

const isHome = computed(() => route.value.fullPath === '/')
</script>


<template>
  <div class="nav">
    <NuxtLink to="/" class="nav__nav-link">Home</NuxtLink>
    <NuxtLink to="/agents" class="nav__nav-link">Agents</NuxtLink>
    <NuxtLink to="/properties" class="nav__nav-link">Properties</NuxtLink>
  </div>
  <div>
    <slot></slot>
  </div>
</template>


<style>
:root {
  --background-color: rgba(0, 0, 0, 0.8);
  --primary-text-color: rgba(255, 255, 255, 1);
}
html {
  font-family: Arial, Helvetica, sans-serif;
}
a {
  color: var(--primary-text-color);
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
}
a:visited {
  color: var(--primary-text-color);
}
a:hover {
  text-decoration: none;
}
body {
  background-color: var(--background-color);
  color: var(--primary-text-color);
  box-sizing: border-box;
}
* {
  box-sizing: border-box;
}

.nav {
  padding-top: 1rem;
  padding-bottom: 4rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
}

a {
  /** right downwards box shadow */
  box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.315);
  padding: 0.5rem 1rem;
  transition: 0.5s;
  font-size: 0.875rem;
  display: inline-block;
  border-bottom: 1px solid rgba(255, 244, 94, 1);
  font-weight: normal;
}

a.option {
  border: 1px solid rgb(59, 184, 171);
  border-radius: 9999rem;
}

a.cta {
  background-color: rgba(255, 244, 94, 1);
  color: var(--background-color);
}

.nav__nav-link:not(:last-child) {
  margin-right: 1rem;
}

a:hover, a:focus {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
}

@keyframes outlineloop {
  from {
    outline: 1px solid rgba(255, 244, 94, 1);
    outline-offset: 0.1rem;
  }

  to {
    outline: 1px solid  rgba(255, 244, 0, 0);
    outline-offset: 0.3rem;
  }
}

*:focus, a:hover {
    animation-name: outlineloop;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
}

@media screen and (min-width: 600px) {
  .nav {
    justify-content: space-around;
  }
  .nav__nav-link {
      padding: 0.5rem 2rem;
      font-size: 1rem;
      min-width: 11rem;
      text-align: center;
  }
  .nav__nav-link:not(:last-child) {
    margin-right: 0rem;
  }
}
</style>