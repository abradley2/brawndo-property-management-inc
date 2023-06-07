<script lang="ts" setup>
const { error: agentsError, data: agentsData } 
  = await useFetch<any>('/api/agents', {
    method: 'GET'
  })

const noAgents = computed(() => {
  return agentsError.value === null && agentsData.value && agentsData.value.length === 0
})

console.log(noAgents)
</script>

<template>
  <div>
    <NuxtLink to="/agent/1">See Agent</NuxtLink>
  </div>
  <div v-if="agentsError">
    Error: {{ agentsError.message }}
  </div>
  <div v-else-if="noAgents">
    No agents found
  </div>
  <div v-else-if="agentsData">
    <div v-for="agent in agentsData" :key="agent.id">
      {{ agent.name }}
    </div>
  </div>
  <div>
    <NuxtLink to="/new-agent">Create new agent</NuxtLink>
  </div>
</template>
