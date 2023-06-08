<script lang="ts" setup>
interface AgentProperty {
  id: number
  agent_id: number
  property_id: number
  address: string
  city: string
  zip: string
}

interface Property {
  id: number
  address: string
  city: string
  zip: string
}

const route = useRoute()

const agentId = parseInt(route.params.id as string)

const addedProperty = ref<number>(0)
const removedProperty = ref<number>(0)

const { error: agentPropertiesError, data: agentPropertiesData } = useFetch<AgentProperty[]>(`/api/agent/${agentId}/properties`, {
  method: 'GET',
  watch: [removedProperty, addedProperty]
})

const { error: allPropertiesError, data: allPropertiesData } = useFetch<Property[]>('/api/properties', {
  method: 'GET',
  watch: [removedProperty, addedProperty]
})

const unassignedProperties = computed(() => {
  const agentProperties = agentPropertiesData.value
  const allProperties = allPropertiesData.value

  if (!agentProperties || !allProperties) {
    return null
  }

  return allProperties.filter((property) => {
    return agentProperties.find((agentProperty) => agentProperty.property_id === property.id) === undefined
  })
})

const unassignAgentFromProperty = async (agentPropertyId: number) => {
  await fetch(`/api/agent-property/${agentPropertyId}`, {
    method: 'DELETE'
  })
  removedProperty.value = removedProperty.value + 1
}

const assignAgentToProperty = async (propertyId: number) => {
  await fetch(`/api/agent/${agentId}/properties`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      property_id: propertyId,
      agent_id: agentId
    })
  })

  addedProperty.value = addedProperty.value + 1
}
</script>

<style>
.agent-properties-page {
  max-width: 36rem;
  padding: 1rem;
  padding-top: 0rem;
  margin: auto;
}
.assigned-properties-list {
  display: flex;
  flex-direction: column;
}

.assigned-properties-list__property {
  margin-top: 1.5rem;
}

.unassigned-properties-list {
  display: flex;
  flex-direction: column;
}

.unassigned-properties-list__property {
  margin-top: 1.5rem;
}
</style>

<template>
<div class="agent-properties-page">
  <h3>Properties Assigned to Agent:</h3>
  <div v-if="agentPropertiesData && agentPropertiesData.length === 0">
    No assigned properties
  </div>
  <div class="assigned-property-list">
    <div v-for="property in agentPropertiesData" :key="property.id" class="assigned-properties-list__property">
      <NuxtLink :to="`/property/${property.id}`" class="option">
        {{ property.address }}, {{  property.zip }}
      </NuxtLink>
      <br />
      <button @click="unassignAgentFromProperty(property.id)" class="cancel cancel--small">Remove Assignment</button>
    </div>
  </div>
  <p><hr /></p>
  <h3>Assignable Properties:</h3>
  <div class="unassigned-property-list">
    <div v-for="property in unassignedProperties" class="unassigned-properties-list__property">
      <span> {{ property.address }}, {{  property.zip }}</span>
      <br />
      <button @click="assignAgentToProperty(property.id)" class="submit submit--small">Add Assignment</button>
    </div>
  </div>
</div>
</template>