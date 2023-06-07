<script lang="ts" setup>
interface Property {
  id: number
  address: string
  city: string
  state: string
  zip_code: string
}

const { error: propertiesError, data: propertiesData } 
  = await useFetch<Property[]>('/api/properties', {
    method: 'GET'
  })

const noProperties = computed(() => {
  return propertiesError.value === null && propertiesData.value && propertiesData.value.length === 0
})

const properties = computed(() => {
  return propertiesData.value
    ? propertiesData.value.map((property) => {
      return {
        ...property,
        link: `/property/${property.id}`
      }
    })
    : null
})
</script>

<template>
  <div v-if="propertiesError">
    Error: {{ propertiesError.message }}
  </div>
  <div v-else-if="noProperties">
    No properties found
  </div>
  <div v-else-if="properties" class="property-list">
    <div v-for="property in properties" :key="property.id" class="property-list__agent">
      <NuxtLink :to="property.link" class="option">
        {{ property.address }}, {{ property.city }}, {{ property.state }} {{ property.zip_code }}
      </NuxtLink>
    </div>
  </div>
  <div class="property-list__cta">
    <NuxtLink to="/new-property" class="cta">Create new property</NuxtLink>
  </div>
</template>

<style>
.property-list {
  display: flex;
  flex-direction: column;
}
.property-list__agent {
  text-align: center;
}
.property-list__agent:not(:first-child) {
  margin-top: 1rem;
}
.property-list__cta {
  text-align: center;
  margin-top: 4rem;
}
</style>