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
  <div v-else-if="properties">
    <div v-for="property in properties" :key="property.id">
      <NuxtLink :to="property.link">
        {{ property.address }}, {{ property.city }}, {{ property.state }} {{ property.zip_code }}
      </NuxtLink>
    </div>
  </div>
  <div>
    <NuxtLink to="/new-property">Create new property</NuxtLink>
  </div>
</template>
