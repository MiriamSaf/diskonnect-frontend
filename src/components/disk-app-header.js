import { LitElement, html, css } from '@polymer/lit-element'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'

customElements.define('disk-app-header', class AppHeader extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      title: {
        type: String
      },
      user: {
        type: Object
      }
    }
  }

  firstUpdated(){
    super.firstUpdated()
    this.navActiveLinks()    
  }

  navActiveLinks(){	
    const currentPath = window.location.pathname
    const navLinks = this.shadowRoot.querySelectorAll('.app-top-nav a, .app-side-menu-items a')
    navLinks.forEach(navLink => {
      if(navLink.href.slice(-1) == '#') return
      if(navLink.pathname === currentPath){			
        navLink.classList.add('active')
      }
    })
  }

  //code for when click the hamburger menu
  hamburgerClick(){  
    const appMenu = this.shadowRoot.querySelector('.app-side-menu')
    appMenu.show()
  }
  
  //takes us to menu heading that we clicked off sl-drawer
  menuClick(e){
    e.preventDefault()
    const pathname = e.target.closest('a').pathname
    const appSideMenu = this.shadowRoot.querySelector('.app-side-menu')
    // hide appMenu
    appSideMenu.hide()
    appSideMenu.addEventListener('sl-after-hide', () => {
      // goto route after menu is hidden
      gotoRoute(pathname)
    })
  }

  //renders our css for our header/ hamburger menu
  render(){    
    return html`
    <style>      
      * {
        box-sizing: border-box;
      }
      .app-header {
        background: var(--brand-pink);
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        height: var(--app-header-height);
        color: #fff;
        display: flex;
        z-index: 9;
        box-shadow: 4px 0px 10px rgba(0,0,0,0.2);
        align-items: center;
        font-family: var(--base-heading-font);
      }
      

      .app-header-main {
        flex-grow: 1;
        display: flex;
        align-items: center;
      }

      .app-header-main::slotted(h1){
        color: #fff;
      }

      .app-logo a {
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.2em;
        padding: .6em;
        display: inline-block;        
      }

      .app-logo img {
        width: 90px;
      }
      
      .hamburger-btn::part(base) {
        color: var(--app-header-txt-color);
      }

      .app-top-nav {
        display: flex;
        height: 100%;
        align-items: center;
      }

      .app-top-nav a {
        display: inline-block;
        padding: .8em;
        text-decoration: none;
        color: var(--app-header-txt-color);
      }

      .app-side-menu-items{
        /* gives breathing space on top of menu items */
        margin-top: 1em;
      }
      
      /*links on menu sidebar */
      .app-side-menu-items a {
        display: block;
        padding: .5em;
        text-decoration: none;
        font-size: 1.6em;
        color: var(--app-header-txt-color);
        font-family: var(--base-heading-font);
        /*style for hover state beginning
        adapted from
        "Having Fun With Link Hover Effects | CSS-Tricks". 2021. CSS-Tricks. 
        https://css-tricks.com/having-fun-with-link-hover-effects/. */
        background:
        linear-gradient(
          to bottom, var(--brand-pink) 0%,
          var(--brand-pink) 100%
        );
        background-position: 0 100%;
        background-repeat: repeat-x;
        background-size: 0px 0px;
        color: #000;
        text-decoration: none;
        transition: background-size .2s;
      }

      /*diskonnect logo */
      .app-side-menu-logo {
        width: 133px;
        margin-bottom: -5em;
        position: absolute;
        top: -0.2em;
        left: 1.5em;
      }

      .page-title {
        color: var(--app-header-txt-color);
        margin-right: 0.5em;
        font-size: var(--app-header-title-font-size);
      }

      /* styles the avatar image*/
      .avatar-img::part(base){
        background-color: var(--heading-color);
        color:  var(--brand-pink);
        margin-right: 0.2em;
      }

      /* active nav links */
      .app-top-nav a.active,
      .app-side-menu-items a.active {
        font-weight: bold;
      }
      /* nav active menu items expand on hover state */
      .app-side-menu-items a:hover{
        background-size: 4px 50px;
      }
     


      /* RESPONSIVE - MOBILE ------------------- */
      @media all and (max-width: 768px){       
        
        .app-top-nav {
          display: none;
        }
      }

    </style>

    <header class="app-header">
      <sl-icon-button class="hamburger-btn" name="list" @click="${this.hamburgerClick}" style="font-size: 1.5em;"></sl-icon-button>       
      
      <div class="app-header-main">
        ${this.title ? html`
          <h1 class="page-title">${this.title}</h1>
        `:``}
        <slot></slot>
      </div>

      <nav class="app-top-nav">
        
         <!-- should only show for hairdressers-->
       ${this.user.accessLevel == 2 ? html 
       `<a href="/newHike" @click="${anchorRoute}">Add Hike</a> `
        : ''}    
        <sl-dropdown>
          <a slot="trigger" href="#" @click="${(e) => e.preventDefault()}">
            <sl-avatar class ="avatar-img" style="--size: 42px;" image=${(this.user && this.user.avatar) ? `${App.apiBase}/images/${this.user.avatar}` : ''}></sl-avatar> <!--${this.user && this.user.firstName}-->
          </a>
          <sl-menu>            
            <sl-menu-item @click="${() => gotoRoute('/profile')}">Profile</sl-menu-item>
            <sl-menu-item @click="${() => gotoRoute('/editProfile')}">Edit Profile</sl-menu-item>
            <sl-menu-item @click="${() => Auth.signOut()}">Sign Out</sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      </nav>
    </header>

    <!-- diskonnect app slideout right side menu -->
    <sl-drawer class="app-side-menu" placement="left">
    <!-- ensures logo image takes user back to home screen -->
    <a href="/" @click="${this.menuClick}">
      <img class="app-side-menu-logo" src="${App.apiBase}/images/logoLarge.svg">
    </a>
      <nav class="app-side-menu-items">
        <a href="/" @click="${this.menuClick}">Home</a>
        ${this.user.accessLevel == 2 ? html 
       `<a href="/newHike" @click="${this.menuClick}">Add Hike</a> `
        : ''}
        <a class = "menu-item" href="/hike" @click="${this.menuClick}">Hikes</a>
        <a href="/favouriteHikes" @click="${this.menuClick}">Favourite Hikes</a>   
        <a href="/about" @click="${this.menuClick}">About</a>
        <a href="/profile" @click="${this.menuClick}">Profile</a>     
        <a href="#" @click="${() => Auth.signOut()}">Sign Out</a>
      </nav>  
    </sl-drawer>
    `
  }
  
})

