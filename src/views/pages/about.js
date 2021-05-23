import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class AboutView {
  init(){
    document.title = 'About'    
    this.render()    
    Utils.pageIntroAnim()
    //extra gsap
    Utils.aboutExtraAnim()
  }

  render(){
    const template = html`
      <disk-app-header title="About" user="${JSON.stringify(Auth.currentUser)}"></disk-app-header>
      <div class="page-content" style="padding: 0em;">        
        
        <div class ="about-lg-box">
          <!-- section 1 - using flexbox-->
          <div class = "section-1-mission">
            
            <!--mission statement section -->
            <div class ="mission-statement">
            <h1>OUR MISSION</h1>
            <p class = "parag">
            <strong>
            Our mission at Diskonnect is to promote disconnecting from technology and fast-paced living. We all know how revitalising and energised we
            feel once we immerse in nature and so as a team we have created Diskonnect. We want to share our tremendous passion for the outdoors with all
            you guys and the more of you that get involved in hiking and outdoor awesome stuff, the better we all feel. We have an unquentiable thirst and 
            love for nature, wildlife and countryside and we hope you'll start to feel it to. Happy diskonnecting!
            </strong>
            </p>
            </div>

            <!-- beach picture - uses flex-->
            <div class = "pic-about">
              <img class = "about-hike-pic" src="${App.apiBase}/images/islandCrop.jpg" alt ="man hiking - looking at sky">
            </div>
          </div>

          <!-- section 2 -->
          <div class = "section-2-team">
            <h1>OUR TEAM</h1>
            <div class = "team-descrip">
            <!-- pic 1 -->
            <div>
            <img src="${App.apiBase}/images/terisaPic.jpg" alt ="diskonnect-profile pic terisa">
            <strong><p>TERISA BLOCK</p></strong>
            <p>Terisa prefers living in a tent and would camp all year if it was an option. She scouts out trails and is our go to on the ground. Terisa is one in a million</p>
            </div>
            <!-- pic 2 -->
            <div>
            <img src="${App.apiBase}/images/saryProf.jpg" alt ="diskonnect-profile pic sary">
            <strong><p>SARY HASTE</p></strong>
            <p>Sary is a freelance photographer who joined the team in its infancy and has a strong passion for all things outdoors. Sary never misses a moment and is always found with her trusty camera</p>
            </div>
            <!-- pic 3 -->
            <div>
            <img src="${App.apiBase}/images/AliPic.jpg" alt ="diskonnect-profile pic Ali">
            <strong><p>ALI DOLTZNO</p></strong>
            <p>Ali is our programmer who practically never sleeps. He is always working on the coding of the site and is an inspiration with his attention to detail. Ali is passionate about nature.</p>
            </div>

            </div><!-- close team descrip div> -->

          </div>
          <!-- section 3 -->
          <div class = "section-3-about">
            <p class = "parag"> <strong>Diskonnect was founded as a not for profit organisation. We are passionate about keeping it this way as this will ensure we are focused towards our diskonnect users ALWAYS. 
              We rely on our hiking family to help keep our site running. Every small amount counts and spurs us to continue in making it a better and more efficient experience for each of you guys. Please donate 
              using the link below so we can keep the love going strong.</strong></p>
          <sl-button href = "https://www.gofundme.com/" target = "_blank" type="primary" class="about-donate-btn"  style="width: 20%; margin: 0; padding-bottom: 1em;" pill>
            <strong>PLEASE DONATE</strong>
          </sl-button>  
          </div>

        </div><!-- close lg box div -->
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new AboutView()