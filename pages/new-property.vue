<script lang="ts">
interface Data {
  address: string
  addressError?: string
  city: string
  cityError?: string
  state: string
  stateError?: string
  zip: string
  zipError?: string
  formSubmitError?: string
}

export default defineComponent({
  methods: {
    async trySubmit() {
      this.$data.addressError = this.$data.address.length === 0 ? "Address is required" : undefined
      this.$data.cityError = this.$data.city.length === 0 ? "City is required" : undefined
      this.$data.stateError = this.$data.state.length === 0 ? "State is required" : undefined
      this.$data.zipError = this.$data.zip.length === 0 ? "Zip code is required" : undefined

      if (this.$data.addressError || this.$data.cityError || this.$data.stateError || this.$data.zipError) {
        return
      }

      const result = await fetch('/api/properties', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          address: this.$data.address,
          city: this.$data.city,
          state: this.$data.state,
          zip: this.$data.zip,
        })
      })

      if (result.status >= 300) {
        this.$data.formSubmitError = "An error occurred"
        return
      }

      const resultJson = await result.json()

      this.$router.push('/properties')
    }
  },
  data(): Data {
    return {
      address: "",
      addressError: undefined,
      city: "",
      cityError: undefined,
      state: "",
      stateError: undefined,
      zip: "",
      zipError: undefined,
      formSubmitError: undefined,
    }
  }
})
</script>

<template>
  <div>
    <div>
      <label for="address">Address</label>
      <input id="address" v-model="address" />
      <div v-if="addressError">{{ addressError }}</div>
    </div>
    <div>
      <label for="city">City</label>
      <input id="city" v-model="city" />
      <div v-if="cityError">{{ cityError }}</div>
    </div>
    <div>
      <label for="state">State</label>
      <input id="state" v-model="state" />
      <div v-if="stateError">{{ stateError }}</div>
    </div>
    <div>
      <label for="zip-code">Zip Code</label>
      <input id="zip-code" v-model="zip" />
      <div v-if="zipError">{{ zipError }}</div>
    </div>
    <div v-if="formSubmitError">{{ formSubmitError }}</div>
    <button @click="trySubmit">Submit</button>
  </div>
</template>