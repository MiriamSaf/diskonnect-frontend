import App from './../../App'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

// SignInView
class SignInView {
  init(){
    console.log('SignInView.init')
    document.title = 'Sign In'
    //this refers to the class
    //looks for method render below
    this.render()
    Utils.pageIntroAnim()
  }

  signInSubmitHandler(e){
    e.preventDefault()
    const formData = e.detail.formData
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    
    // sign in using Auth    
    Auth.signIn(formData, () => {
      submitBtn.removeAttribute('loading')
    })
  }

 
  render(){ 
    //inserts html with js   
    //allows us to add events in the html
    const template = html`      
      <div class="page-content page-centered">
        <div class="signinup-box">
          <img class="signinup-logo" src="/images/logo.svg">          
          <sl-form class="form-signup dark-theme" @sl-submit=${this.signInSubmitHandler}>          
            <div class="input-group">
              <sl-input class = "sign-in-input" name="email" type="email" placeholder="Email" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="password" type="password" placeholder="Password" required></sl-input>
            </div>
            <sl-button class="submit-btn" type="primary" submit style="width: 100%;">Sign In</sl-button>
          </sl-form>
          <p>Or</p>
          <!-- takes user to sign up view when clicked-->
          <a href="/signup" @click=${anchorRoute}> 
          <sl-button class="submit-btn" submit style="width: 100%;" >Sign Up</sl-button>
          </a>
        </div>
      </div>
    `
    //render the html into the root element
    render(template, App.rootEl)    
  }
}

export default new SignInView()