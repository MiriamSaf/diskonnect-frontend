import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import moment from 'moment'

class ProfileView {
  init(){
    console.log('ProfileView.init')
    document.title = 'Profile'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <disk-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></disk-app-header>
      <div class="page-content calign">        
        ${Auth.currentUser && Auth.currentUser.avatar ? html`
          <sl-avatar style="--size: 210px; margin-bottom: 1em; margin-top: 1em;" image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
        `:html`
        <sl-avatar style="--size: 210px; margin-bottom: 1em; margin-top: 1em;"></sl-avatar>
        `}
        <h2>${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</h2>
        <p>${Auth.currentUser.email}</p>
        
        <p>Updated at: ${moment(Auth.currentUser.updatedAt).format('Do MMMM YYYY, h:mm a')}</p>
        
        <!-- if bio text is there, then show the bio txt , else dont -->
        ${Auth.currentUser.bio ? html`<h3>Bio</h3>
        <p>${Auth.currentUser.bio}</p>`: html``}
        
        <!-- button to edit profile -->
        <sl-button type = primary @click=${()=> gotoRoute('/editProfile')}>Edit Profile</sl-button>
      </div>       
    `
    render(template, App.rootEl)
  }
}


export default new ProfileView()