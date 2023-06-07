<script lang="ts">
interface Data {
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

export default defineComponent({
  methods: {
    async trySubmit() {
      this.$data.firstNameError = this.$data.firstName.length === 0 ? "First name is required" : undefined
      this.$data.lastNameError = this.$data.lastName.length === 0 ? "Last name is required" : undefined
      this.$data.emailError = this.$data.email.length === 0 ? "Email is required" : undefined
      this.$data.mobileNumberError = this.$data.mobileNumber.length === 0 ? "Mobile number is required" : undefined

      if (this.$data.firstNameError || this.$data.lastNameError || this.$data.emailError || this.$data.mobileNumberError) {
        return
      }

      const result = await fetch('/api/agent', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: this.$data.firstName,
          lastName: this.$data.lastName,
          email: this.$data.email,
          mobileNumber: this.$data.mobileNumber,
        })
      })

      if (result.status >= 300) {
        this.$data.formSubmitError = "An error occurred"
        return
      }

      const resultJson = await result.json()

      console.log(resultJson)

      this.$router.push('/agents')
    }
  },
  data(): Data {
    return {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
    }
  }
})
</script>

<template>
  <div>
    <div>
      <label for="first-name">First Name</label>
      <input id="first-name" type="text" v-model="firstName" />
    </div>
    <div>
      <label for="last-name">Last Name</label>
      <input id="last-name" type="text" v-model="lastName" />
    </div>
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" v-model="email" />
    </div>
    <div>
      <label for="mobile-number">Mobile Number</label>
      <input id="mobile-number" type="text" v-model="mobileNumber" />
    </div>
    <button @click="trySubmit">Submit</button>
  </div>
</template>