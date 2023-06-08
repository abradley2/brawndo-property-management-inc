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
  <div class="flex-grid">
    <div class="form flex-grid__content">
      <div class="form__form-group">
        <label for="address" class="form-group__label">Address</label>
        <input type="text" id="address" v-model="address" class="form-group__input"/>
        <div v-if="addressError" class="form-group__error">{{ addressError }}</div>
      </div>
      <div class="form__form-group">
        <label for="city" class="form-group__label">City</label>
        <input type="text" id="city" v-model="city" class="form-group__input"/>
        <div v-if="cityError" class="form-group__error">{{ cityError }}</div>
      </div>
      <div class="form__form-group">
        <label for="state" class="form-group__label">State</label>
        <input type="text" id="state" v-model="state" class="form-group__input"/>
        <div v-if="stateError" class="form-group__error">{{ stateError }}</div>
      </div>
      <div class="form__form-group">
        <label for="zip-code" class="form-group__label">Zip Code</label>
        <input type="text" id="zip-code" v-model="zip" class="form-group__input"/>
        <div v-if="zipError" class="form-group__error">{{ zipError }}</div>
      </div>
      <div class="form__form-group form__form-group--full">
        <div v-if="formSubmitError" class="form-group__error">{{ formSubmitError }}</div>
        <button @click="trySubmit" class="submit">Submit</button>
      </div>
    </div>
  </div>
</template>