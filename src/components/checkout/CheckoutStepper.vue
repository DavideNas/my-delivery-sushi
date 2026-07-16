<script setup lang="ts">
import { ref, provide, reactive } from 'vue'
// Importiamo dal nuovo file dedicated to the checkout steps
import { CheckoutKey, type CheckoutData } from '@/types/checkout'
import StepAddress from './StepAddress.vue'
import StepPayment from './StepPayment.vue'
import StepSummary from './StepSummary.vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const currentStep = ref(1)

// Init state with new struct
const checkoutData = reactive<CheckoutData>({
  address: {
    fullName: '',
    street: '',
    city: '',
    phone: ''
  },
  payment: {
    method: 'cash_on_delivery', // default method updated
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    paypalEmail: '',
    cashOnDelivery: true
  }
})

const nextStep = () => {
  if (currentStep.value < 3) currentStep.value++
}

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
}

provide(CheckoutKey, {
  checkoutData,
  currentStep,
  nextStep,
  prevStep
})
</script>

<template>
  <v-card class="mx-auto my-4 rounded-xl elevation-2" max-width="600" min-width="450">
    <!-- Modal Header with Title and Close Button -->
    <v-card-title class="bg-primary text-white d-flex align-center py-4 px-6 font-weight-bold">
      <!-- Empty space on the left to balance the close button (optional, but keeps the title centered) -->
      <div class="flex-grow-1 text-center pl-8">
        Completion of Order 🍣
      </div>
      <!-- The X button positioned on the right in the header -->
      <v-btn
        variant="tonal"
        color="white"
        density="comfortable"
        size="medium"
        @click="emit('close')"
      >
        <v-icon color="white" size="24">mdi-close</v-icon>
    </v-btn>
    </v-card-title>

    <!-- Stepper Navigation (The aligned columns from the previous test) -->
    <v-row class="pa-4 text-center border-b" no-gutters>
      <!-- Step 1: Address -->
      <v-col cols="4" class="d-flex align-center justify-center text-subtitle-2 text-grey-darken-1"
        :class="{ 'text-primary font-weight-bold': currentStep >= 1 }">
        <v-avatar size="24" :color="currentStep >= 1 ? 'primary' : 'grey-lighten-2'" 
          class="text-white text-caption mr-2 font-weight-bold">1</v-avatar>
        <span>Address</span>
      </v-col>

      <!-- Step 2: Payment -->
      <v-col cols="4" class="d-flex align-center justify-center text-subtitle-2 text-grey-darken-1"
        :class="{ 'text-primary font-weight-bold': currentStep >= 2 }">
        <v-avatar size="24" :color="currentStep >= 2 ? 'primary' : 'grey-lighten-2'" 
          class="text-white text-caption mr-2 font-weight-bold">2</v-avatar>
        <span>Payment</span>
      </v-col>

      <!-- Step 3: Summary -->
      <v-col cols="4" class="d-flex align-center justify-center text-subtitle-2 text-grey-darken-1"
        :class="{ 'text-primary font-weight-bold': currentStep >= 3 }">
        <v-avatar size="24" :color="currentStep >= 3 ? 'primary' : 'grey-lighten-2'" 
          class="text-white text-caption mr-2 font-weight-bold">3</v-avatar>
        <span>Summary</span>
      </v-col>
    </v-row>

    <v-card-text class="pa-6">
      <v-window v-model="currentStep">
        <!-- Window 1: Address -->
        <v-window-item :value="1">
          <StepAddress />
        </v-window-item>

        <!-- Window 2: Payment -->
        <v-window-item :value="2">
          <StepPayment />
        </v-window-item>

        <!-- Window 3: Summary -->
        <v-window-item :value="3">
          <StepSummary @success="emit('close')" />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>