import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home'    
    this.render()    
    Utils.pageIntroAnim()   
    //unique animation just for home entry page 
    Utils.homeExtraAnim()
  }


  //render shows whats visible
  render(){
    const template = html`
      <disk-app-header title="Home" user=${JSON.stringify(Auth.currentUser)}></disk-app-header>
      
      <div class="page-content">
        <div class ="pg-container">
          <div class = "home-box">
   
            <p class = "extra-large-text top-home-p"><strong>Are you ready to fully DISKONNECT?</strong></p>
            <p class = "extra-large-text bottom-home-p"><strong>Start your journey today</strong></p>
            <!-- search hikes button - directs to hike page -->
            <sl-button type="primary" class="home-search-hikes"  style="width: 80%; margin-bottom: 1rem; margin-left: 7em" pill @click=${()=> gotoRoute('/hike')}>  
              <sl-icon style = "margin-right: 0.5em" name="search"></sl-icon>SEARCH HIKES
            </sl-button>
          

          </div><!-- close home box div-->

          <img class ="home-pic-box" src="${App.apiBase}/images/home.jpg" alt ="man hiking on cliff - looking at water below">
        </div><!-- close pg container -->
        
        <!-- footer for bottom of pg -->
        <footer class ="home-footer">   
          <div class="footer-main">&copy 2021. Website created as a project for DIG 31</div>
          <div class = "footer-right">
            <sl-icon style = "margin: 0.5em; " name="facebook"></sl-icon>
            <sl-icon style = "margin: 0.5em;" name="google"></sl-icon>
            <sl-icon style = "margin: 0.5em;" name="twitter"></sl-icon>
            <sl-icon style = "margin: 0.5em;" name="youtube"></sl-icon>
          </div>
        </footer>
      </div><!-- close pg content div -->
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()