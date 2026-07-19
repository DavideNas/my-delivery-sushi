<script setup lang="ts">
import { useOrderTracking } from '@/composables/useOrderTracking';

// Defining Props in TypeScript
interface Props {
    isOpen: boolean;
    orderId: string;
}
const props = defineProps<Props>();

// We define the Emits to communicate the closure to the parent component
const emit = defineEmits<{
    (e: 'close'): void;
}>();

// Initialize the composable.
// Note: We pass a reactive prop or a string. If the orderId changes dynamically,
// we could pass () => props.orderId, but for now we'll keep it simple.
const { status, error, isReconnecting, deliveryData, retryManually } = useOrderTracking(props.orderId);
</script>

<template>
    <!-- Il modale si mostra solo se isOpen è true -->
    <div v-if="isOpen" class="modal-overlay" @click.self="emit('close')">
        <div class="modal-content"> 
            
            <!-- Modal Header -->
            <div class="modal-header">
                <h3>Order Tracking #{{ orderId }}</h3>
                <button class="close-btn" @click="emit('close')">&times;</button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <div :class="['status-badge', status]">
                    Status: <strong>{{ status }}</strong>
                </div>

                <p class="message">{{ deliveryData || 'Connecting to the server...' }}</p>

                <!-- Reconnection State -->
                <div v-if="isReconnecting" class="warning-banner">
                    ⚠️ Connection unstable. Reconnecting...
                </div>

                <!-- Fatal Error -->
                <div v-if="status === 'FAILED'" class="error-banner">
                    <p>{{ error }}</p>
                    <button class="retry-btn" @click="retryManually">Force Reconnection</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 12px;
    width: 90%;
    max-width: 450px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 15px;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
}

.status-badge {
    padding: 12px;
    border-radius: 6px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 15px;
}

/* Dynamic colorizations based on TS states */
.INITIALIZING { background: #eee; }
.PREPARING_FORNITORI { background: #ffeaa7; color: #d63031; }
.TRANSIT_TO_HUB { background: #74b9ff; color: #fff; }
.HUB_ASSEMBLY { background: #a29bfe; color: #fff; }
.OUT_FOR_DELIVERY { background: #fdcb6e; color: #fff; }
.DELIVERED { background: #55efc4; color: #00b894; }
.FAILED { background: #ff7675; color: white; }

.message {
    font-size: 1.1em;
    color: #2d3436;
    line-height: 1.4;
}

.warning-banner {
    background: #ffeaa7;
    color: #c0392b;
    padding: 10px;
    border-radius: 6px;
    margin-top: 15px;
    font-size: 0.9em;
}

.error-banner {
    background: #ff7675;
    color: white;
    padding: 15px;
    border-radius: 6px;
    margin-top: 15px;
}

.retry-btn {
    background: white;
    color: #ff7675;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 8px;
}
</style>