export type TrackingStatus = 
    | 'INITIALIZING'
    | 'PREPARING_SUPPLIERS'
    | 'TRANSIT_TO_HUB'
    | 'HUB_ASSEMBLY'
    | 'OUT_FOR_DELIVERY'
    | 'DELIVERED'
    | 'FAILED'

export interface TrackingStep {
    status: Exclude<TrackingStatus, 'INITIALIZING' | 'FAILED'>;
    message: string; 
}

export interface UseOrderTrackingReturn {
    status: import('vue').Ref<TrackingStatus>;
    error: import('vue').Ref<string | null>;
    isReconnecting: import('vue').Ref<boolean>;
    deliveryData: import('vue').Ref<string | null>;
    retryManually: () => void;
}