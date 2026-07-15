import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi' // Assicurati di avere @mdi/font installato

const sushiTheme = {
  dark: false,
  colors: {
    background: '#FAFAFA',
    surface: '#FFFFFF',
    primary: '#FF5722',     
    secondary: '#4CAF50',   
    accent: '#FFC107',      
    error: '#D32F2F',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FF9800',
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'sushiTheme',
    themes: {
      sushiTheme,
    },
  },
  // AGGIUNGI QUESTO BLOCCO PER LE ICONE:
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})