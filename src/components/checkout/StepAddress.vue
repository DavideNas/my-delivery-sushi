<script setup lang="ts">
import { inject } from 'vue'
import { CheckoutKey } from '@/types/checkout'
import { rules } from '@/utils/validationRules'


const checkoutContext = inject(CheckoutKey)
if (!checkoutContext) throw new Error('StepAddress must be used inside CheckoutStepper')

const { checkoutData, nextStep } = checkoutContext
</script>

<template>
  <v-form @submit.prevent="nextStep">
    <h3 class="text-h6 font-weight-bold mb-4">Where do we deliver? 🛵</h3>
    
    <v-text-field
      v-model="checkoutData.address.fullName"
      label="Full Name on the Doorbell"
      variant="outlined"
      :rules="[rules.required]"
      required
    ></v-text-field>

    <v-text-field
      v-model="checkoutData.address.street"
      label="Street and Number"
      variant="outlined"
      :rules="[rules.required]"
      required
    ></v-text-field>

    <v-text-field
      v-model="checkoutData.address.city"
      label="City"
      variant="outlined"
      :rules="[rules.required]"
      required
    ></v-text-field>

    <v-text-field
      v-model="checkoutData.address.phone"
      label="Phone Number"
      variant="outlined"
      type="tel"
      :rules="[rules.required, rules.phone]"
      required
    ></v-text-field>

    <v-btn type="submit" color="primary" block size="large" class="mt-4">
      Continue to Payment
    </v-btn>
  </v-form>
</template>