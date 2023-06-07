<script lang="ts" setup>
interface Agent {
  id: number
  first_name: string
  last_name: string
  email: string
  mobile_number: string
}

const { error: agentsError, data: agentsData } 
  = await useFetch<Agent[]>('/api/agents', {
    method: 'GET'
  })

const noAgents = computed(() => {
  return agentsError.value === null && agentsData.value && agentsData.value.length === 0
})

const agents = computed(() => {
  return agentsData.value
    ? agentsData.value.map((agent) => {
      return {
        ...agent,
        link: `/agent/${agent.id}`
      }
    })
    : null
})
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
  <div v-else-if="agents">
    <div v-for="agent in agents" :key="agent.id">
      <NuxtLink :to="agent.link">
        {{ agent.first_name }} {{  agent.last_name }}
      </NuxtLink>
    </div>
  </div>
  <div>
    <NuxtLink to="/new-agent">Create new agent</NuxtLink>
  </div>
</template>
