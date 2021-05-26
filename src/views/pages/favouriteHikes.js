import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from './../../Toast'
import UserAPI from './../../UserAPI'

class favouriteHikes {
  init(){
    document.title = 'Favourite Hikes'   
    this.favHikes = null 
    this.render()    
    Utils.pageIntroAnim()
    //call the fav function
    this.getFavHikes()
    Utils.favExtraAnim()
  }

  
  //get favourite hike
  async getFavHikes(){
    try {
      //will return current user and redeclare the fav hikes to our current user
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      //reassign favHikes value to array of fav hikes
      this.favHikes = currentUser.favouriteHikes
      console.log(this.favHikes)
      //rerender page
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <disk-app-header title="Favourite Hikes" user="${JSON.stringify(Auth.currentUser)}"></disk-app-header>
      <div class="page-content">    
      <div class = "hike-header-section">
          <h1 class = "fav-h1">Favourite Hikes</h1>
          </div>    

        <div class="fav-grid">
        ${this.favHikes == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${this.favHikes.map(hikes => html`
            <va-hike class="fav-card"
              id="${hikes._id}"
              image = "${hikes.image}"
              title = "${hikes.title}"
              description = "${hikes.description}"
              location = "${hikes.location}"
              stars = "${hikes.stars}"
              time = "${hikes.time}"
              hikeDistance = "${hikes.hikeDistance}"
              skillLevel = "${hikes.skillLevel}"
            >        
            </va-hike>

          `)}
        `}
        </div>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new favouriteHikes()