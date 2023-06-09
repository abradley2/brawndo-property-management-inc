<script lang="ts">
interface Data {
  id?: number
  firstName: string
  firstNameError?: string
  lastName: string
  lastNameError?: string
  email: string
  emailError?: string
  mobileNumber: string
  mobileNumberError?: string
  formSubmitError?: string
}

interface AgentData {
  id: number
  first_name: string 
  last_name: string 
  email: string 
  mobile_number: string
}

export default defineComponent({
  setup() {
    const route = useRoute()

    const agentId = route.params.id ?
      parseInt(route.params.id as string)
      : null

    if (agentId) {
      const { data: agentData } = useFetch<AgentData>(`/api/agent/${agentId}`)

      return {
        agentId,
        agentData: agentData.value
      }
    }

    return {
      agentId: null,
      agentData: null as AgentData | null
    }
  },
  methods: {
    async trySubmit() {
      this.$data.firstNameError = this.$data.firstName.length === 0 ? "First name is required" : undefined
      this.$data.lastNameError = this.$data.lastName.length === 0 ? "Last name is required" : undefined
      this.$data.emailError = this.$data.email.length === 0 ? "Email is required" : undefined
      this.$data.mobileNumberError = this.$data.mobileNumber.length === 0 ? "Mobile number is required" : undefined

      if (this.$data.firstNameError || this.$data.lastNameError || this.$data.emailError || this.$data.mobileNumberError) {
        return
      }

      const result = await fetch('/api/agents', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: this.$data.id,
          first_name: this.$data.firstName,
          last_name: this.$data.lastName,
          email: this.$data.email,
          mobile_number: this.$data.mobileNumber,
        })
      })

      if (result.status >= 300) {
        this.$data.formSubmitError = "An error occurred"
        return
      }

      const resultJson = await result.json()

      this.$router.push('/agents')
    }
  },
  data(): Data {
    // terrible use of "any" here. Need to investigate why Vue types think this is a function
    const agentData : AgentData | null = this.agentData as any
    return {
      id: agentData?.id || undefined,
      firstName: agentData?.first_name || "",
      firstNameError: undefined,
      lastName: agentData?.last_name || "",
      lastNameError: undefined,
      email: agentData?.email || "",
      emailError: undefined,
      mobileNumber: agentData?.mobile_number || "",
      mobileNumberError: undefined,
      formSubmitError: undefined,
    }
  }
})
</script>

<template>
  <div class="flex-grid">
    <div class="form flex-grid__content">
      <div class="form__form-group">
        <label for="first-name" class="form-group__label">First Name</label>
        <input id="first-name" type="text" v-model="firstName" class="form-group__input" />
        <div v-if="firstNameError" class="form-group__error">
          {{ firstNameError }}
        </div>
      </div>
      <div class="form__form-group">
        <label for="last-name" class="form-group__label">Last Name</label>
        <input id="last-name" type="text" v-model="lastName" class="form-group__input" />
        <div v-if="lastNameError" class="form-group__error">
          {{ lastNameError }}
        </div>
      </div>
      <div class="form__form-group">
        <label for="email" class="form-group__label">Email</label>
        <input id="email" type="text" v-model="email" class="form-group__input" />
        <div v-if="emailError" class="form-group__error">
          {{ emailError }}
        </div>
      </div>
      <div class="form__form-group">
        <label for="mobile-number" class="form-group__label">Mobile Number</label>
        <input id="mobile-number" type="text" v-model="mobileNumber" class="form-group__input" />
        <div v-if="mobileNumberError" class="form-group__error">
          {{ mobileNumberError }}
        </div>
      </div>
      <div v-if="formSubmitError">
        {{ formSubmitError }}
      </div>
      <div class="form__form-group form__form-group--full">
        <button @click="trySubmit" class="submit">Submit</button>
      </div>
    </div>
  </div>
</template>