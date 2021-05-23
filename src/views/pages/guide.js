import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'

class GuideView {
  init(){
    document.title = 'Guide'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser()
    //console.log('in init function - guide')
  }

  //updates the newUser to false so that the guide page will not show more than once
  async updateCurrentUser(){
    try{
      //uses method from UserAPI
      //sets a user who has signed in as false for newUser
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, {newUser : false}, 'json')
      //console.log('user updated')
      console.log(updatedUser)
    }catch(err){
      Toast.show(err,'error')
    }
  }

  render(){
    const template = html`
      <disk-app-header title="Guide" user="${JSON.stringify(Auth.currentUser)}"></disk-app-header>
      <div class="page-content calign">        
        <h1>Guide</h1>
        <h3 class="brand-color">Welcome ${Auth.currentUser.firstName}!</h3>
          <p>This is a quick tour to teach you the basics of using the Diskonnect site</p>

          <div class="guide-step">
            <h4>Find a Hike</h4>
            <img src="${App.apiBase}/images/hikePage.PNG">
          </div>

          <div class="guide-step">
            <h4>Save hike to favourites</h4>
            <img src="${App.apiBase}/images/FavBtn.PNG">
          </div>

          <div class="guide-step">
            <h4>View Profile</h4>
            <img src="${App.apiBase}/images/profilePage.PNG">
          </div>

          <sl-button type="primary" @click=${() => gotoRoute('/')}>Yes I've got it!</sl-button>


        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new GuideView()