//bring in App from other file
import App from './App.js'

// import components (custom web components)
//here its the header (blue) 
//va stands for vanilla (name of app)
import './components/disk-app-header'
import './components/va-hike'

// master styles sheet import
import './scss/master.scss'

// app.init
//wait till DOM is ready to begin
document.addEventListener('DOMContentLoaded', () => {
  App.init()
})