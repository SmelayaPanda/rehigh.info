export const config = {
  firebase (env) {
    if (env === 'development') {
      return {
        apiKey: 'AIzaSyBChgD-ImMjNR9nRvYOlPpFDDxWHyo3x68',
        authDomain: 'rehigh-dev.firebaseapp.com',
        databaseURL: 'https://rehigh-dev.firebaseio.com',
        projectId: 'rehigh-dev',
        storageBucket: 'rehigh-dev.appspot.com',
        messagingSenderId: '430080679681'
      }
    } else if (env === 'production') {
      return {
        apiKey: 'AIzaSyBChgD-ImMjNR9nRvYOlPpFDDxWHyo3x68',
        authDomain: 'rehigh-dev.firebaseapp.com',
        databaseURL: 'https://rehigh-dev.firebaseio.com',
        projectId: 'rehigh-dev',
        storageBucket: 'rehigh-dev.appspot.com',
        messagingSenderId: '430080679681'
      }
    }
  },
  vuetifyTheme: {
    theme: {
      primary: '#039be5',
      secondary: '#262f3d',
      accent: '#82B1FF',
      error: '#FF5252',
      info: '#616161',
      success: '#10ca54',
      warning: '#FFC107',
      'logo-green': '#39d18a',
      'logo-blue': '#2f397b',
      'logo-purple': '#421159'
    }
  }
}
