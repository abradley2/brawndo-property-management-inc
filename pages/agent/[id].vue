<script lang="ts" setup>
interface AgentProperty {
  id: number
  agent_id: number
  property_id: number
}

interface Property {
  id: number
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

<template>
  <div v-for="property in agentPropertiesData" :key="property.id">
    <pre>Assigned to: {{  JSON.stringify(property, null, 2) }}</pre>
    <button @click="unassignAgentFromProperty(property.id)">Unassign</button>
  </div>
  <div v-for="property in unassignedProperties">
    <pre>{{  JSON.stringify(property, null, 2) }}</pre>
    <button @click="assignAgentToProperty(property.id)">Assign</button>
  </div>
</template>