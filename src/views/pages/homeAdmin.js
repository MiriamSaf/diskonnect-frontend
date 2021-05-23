import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'HomeAdmin'    
    this.render()    
    Utils.pageIntroAnim()    
  }

  //render shows whats visible
  render(){
    const template = html`
      <disk-app-header title="HomeAdmin" user=${JSON.stringify(Auth.currentUser)}></disk-app-header>
      
      <div class="page-content">
        <h1 class="anim-in">Hey ${Auth.currentUser.firstName}</h1>

        <h3>Button example:</h3>
        <sl-button class="anim-in" @click=${() => gotoRoute('/profile')}>View Profile</sl-button>
        <p>&nbsp;</p>
        <h3>Link example</h3>
        <a href="/profile" @click=${anchorRoute}>View Profile</a>
        <br>
        <a href="/test" @click=${anchorRoute}>Test</a>
        <br>
        <sl-button @click=${() => gotoRoute('/test') }>Test</sl-button>
      </div>
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()