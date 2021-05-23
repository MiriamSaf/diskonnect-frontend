//imports
import Router from './Router'
import Auth from './Auth'
import Toast from './Toast'

//create class app
class App {
  constructor(){
    this.name = "Diskonnect"
    this.version = "1.0.0"
    this.apiBase = 'http://localhost:3000'
    //save root element to this.rootEl
    this.rootEl = document.getElementById("root")
    this.version = "1.0.0"
  }
  
  //this gets fired at beginning
  init() { 
    console.log("App.init")
    
    // Toast init
    //messages that pop up
    Toast.init()   
    
    // Authentication check 
    //checks to see if they are logged in as nothing can work if they are not   
    Auth.check(() => {
      // authenticated! init Router
      Router.init()
    })    
  }
}

export default new App()