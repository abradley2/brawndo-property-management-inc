<script lang="ts" setup>
const route = ref(useRoute())

const isHome = computed(() => route.value.fullPath === '/')
</script>

<template>
  <div>
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink v-if="!isHome" to="/agents">See Agents</NuxtLink>
    <NuxtLink v-if="!isHome" to="/properties">See Properties</NuxtLink>
  </div>
  <div>
    <slot></slot>
  </div>
</template>