import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3'

// 1. Import Vuetify and their styles
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// 2. Create Vuetify instance for Storybook
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

// 3. Register Vuetify inside Vue app of Storybook
setup((app) => {
  app.use(vuetify)
})

// 4. Configurazione di Preview con parametri e decoratori
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            // Disable the rule only for elements injected by external devtools or plugins
            id: 'aria-prohibited-attr',
            selector: '*:not(.vue-devtools__anchor-btn)',
          },
        ],
      },
      // Alternatively, you can tell axe-core to ignore that selector altogether:
      element: '#storybook-root', // Only parse the root of your application, not the iframe/overlay
    },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<v-app><story /></v-app>',
    }),
  ],
}

export default preview
