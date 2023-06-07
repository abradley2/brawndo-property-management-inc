<script lang="ts" setup>
interface Agent {
  id: number
  first_name: string
  last_name: string
  email: string
  mobile_number: string
}

const deletedAgent = ref<number | null>(null)
const deletingAgent = ref<number | null>(null)

const setDeletingAgent = (agentId: number) => {
  deletingAgent.value = agentId
}
const confirmDeleteAgent = async () => {
  const agentId = deletingAgent.value
  deletingAgent.value = null
  await fetch(`/api/agent/${agentId}`, {
    method: 'DELETE'
  })
  deletedAgent.value = agentId
}
const cancelDeleteAgent = () => {
  deletingAgent.value = null
}

const { error: agentsError, data: agentsData } 
  = await useFetch<Agent[]>('/api/agents', {
    method: 'GET',
    watch: [deletedAgent]
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
  <div v-if="agentsError">
    Error: {{ agentsError.message }}
  </div>
  <div v-else-if="noAgents">
    No agents found
  </div>
  <div v-else-if="agents" class="agent-list">
    <div v-for="agent in agents" :key="agent.id" class="agent-list__item">
      <div class="agent-list__agent">
        <button 
          :class="{'agent__remove-btn': true, 'agent_remove-btn--active': deletingAgent === agent.id}" 
          @click="setDeletingAgent(agent.id)"
        >
          X
        </button>
        <NuxtLink :to="agent.link" class="option">
          {{ agent.first_name }} {{  agent.last_name }}
        </NuxtLink>
      </div>
      <div :class="{'deleting-agent': true, 'deleting-agent--inactive': deletingAgent !== agent.id}">
        <div class="deleting-agent__content">
          <button 
            :disabled="deletingAgent !== agent.id" 
            @click="confirmDeleteAgent" class="action-btn action-btn--confirm-remove">Delete Agent</button>
          <button 
            :disabled="deletingAgent !== agent.id" 
            @click="cancelDeleteAgent" class="action-btn action-btn--cancel-remove">Cancel</button>
        </div>
      </div>
      
    </div>
  </div>
  <div class="agent-list__cta">
    <NuxtLink class="cta" to="/new-agent">Create new agent</NuxtLink>
  </div>
</template>

<style>
.deleting-agent {
  height: 3rem;
  overflow: hidden;
  width: 100%;
  transition: 0.33s;
}
.deleting-agent--inactive {
  height: 0rem;
}
.deleting-agent__content {
  height: 3rem;
  padding: 0.5rem 1rem;
  width: 20rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 0.25rem;
}

.deleting-agent__confirm {
  cursor: pointer;
  width: 50%;
  text-align: center;
}
.deleting-agent__cancel {
  cursor: pointer;
  width: 50%;
  text-align: center;
}

.agent-list {
  display: flex;
  flex-direction: column;
  max-width: 32rem;
  box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.315);
  padding: 1rem;
  border-radius: 0.125rem;
  margin: 0 auto;
}
.agent-list__agent {
  display: flex;
  align-items: center;
}
.agent-list__item:not(:first-child) {
  margin-top: 1rem;
}
.agent__remove-btn {
  background-color: rgba(255, 0, 0, 0.33);
  height: 2.5rem;
  width: 2.5rem;
  box-sizing: border-box;
  border-radius: 100%;
  margin-right: 0.25rem;
  border: none;
  color: white;
  cursor: pointer;
  width: 100%;
  max-width: 2.5rem;
}
.agent_remove-btn--active {
  background-color: rgba(255, 0, 0, 1);
}
.agent-list__cta {
  text-align: center;
  margin-top: 4rem;
}
</style>