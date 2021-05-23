import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import HikeAPI from '../../HikeAPI'
import Toast from '../../Toast'



class HikeView {
 async init(){
    document.title = 'Hikes'    
    //this refers to this class
    //will store hikes when come in from backend
    this.hikes = null
    this.render()    
    Utils.pageIntroAnim()
    //call func below
    await this.getHikes()
    //gsap animation specific for this view
    Utils.hikesExtraAnim()
  }

//filter hikes by the field and match
async filterHikes(field, match){
    //validate that inputs are there
    if (!field || !match) return
    //get fresh hikes copy 
    this.hikes = await HikeAPI.getHikes()

    console.log('field: '+field)
    console.log('match: '+match)

    let filteredHikes

    //check stars field
    if(field == 'stars'){
      filteredHikes = this.hikes.filter(hikes => hikes.stars == match)
    }
    //check hikeDistance field
    if(field == 'hikeDistance'){
      //get price range start 
      const hikeRangeStart = match.split('-')[0]
      const hikeRangeEnd = match.split('-')[1]
      console.log(hikeRangeStart,hikeRangeEnd)
      //if price is greater than or = to start and less than equal to end range
      filteredHikes = this.hikes.filter(hikes => hikes.hikeDistance >= hikeRangeStart && hikes.hikeDistance <= hikeRangeEnd)
    }
    //check time field
    if(field == 'time'){
      //get price range start 
      const timeRangeStart = match.split('-')[0]
      const timeRangeEnd = match.split('-')[1]
      console.log(timeRangeStart,timeRangeEnd)
      //if price is greater than or = to start and less than equal to end range
      filteredHikes = this.hikes.filter(hikes => hikes.time >= timeRangeStart && hikes.time <= timeRangeEnd)
    }
    //check skill level field
    if(field == 'skillLevel'){
      filteredHikes = this.hikes.filter(hikes => hikes.skillLevel == match)
    }

    console.log(filteredHikes)
     //render
     this.hikes = filteredHikes
     this.render()
}

handleFilterBtn(e){
  //clear filter btns
  this.clearFilterBtns()

  //console.log(e.target)
  //set btn as primary type for sl stlying full colour ACTIVE
  e.target.setAttribute('type', 'primary')
  //extract the data field from the btn
  const field = e.target.getAttribute('data-field')
  //grab the match field from the btn
  const match = e.target.getAttribute('data-match')

  //console.log('field = '+field)
  //console.log('match= '+match)
  
  //filter hikes
  this.filterHikes(field, match)
}

clearFilterBtns(){
  //remove (type = primary) active from other btns - clear state
  const filterBtns = document.querySelectorAll('.filter-btn')
  filterBtns.forEach(btn => btn.removeAttribute('type'))
}

//get back all hikes (fresh copy) and clear all btns
clearFilters(){
  this.getHikes()
  this.clearFilterBtns()
}

 async getHikes(){
    try{
      //return json of all hikes
      //return a promise (takes time)
      this.hikes = await HikeAPI.getHikes()
      console.log(this.hikes)
      //must rerender page
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }


  

  render(){
    const template = html`
       <style>
        .filter-menu{
          display: flex;
          align-items: center;
          
        }

        .filter-menu > div {
          margin-right: 1em;
        }

      </style>
      <disk-app-header title="Hikes" user="${JSON.stringify(Auth.currentUser)}"></disk-app-header>
      <div class="page-content"> 
        <div class = "fav-header-section">
          <h1 class = "hike-h1">Search Hikes</h1>
       
        <div class = "filter-menu">
          <div class = "filter-title">
            Filter: 
          </div>
           <!-- Hike distance -->
          <div class = "length-full-screen">
            <strong>Length</strong>
              <sl-button class ="filter-btn" size ="small" data-field ="hikeDistance" data-match ="0-1" @click=${this.handleFilterBtn.bind(this)}>0-1 km</sl-button>
              <sl-button class ="filter-btn" size ="small" data-field ="hikeDistance" data-match ="1-2" @click=${this.handleFilterBtn.bind(this)}>1-2 km</sl-button>
              <sl-button class ="filter-btn" size ="small" data-field ="hikeDistance" data-match ="2-3" @click=${this.handleFilterBtn.bind(this)}>2-3 km</sl-button>
              <sl-button class ="filter-btn" size ="small" data-field ="hikeDistance" data-match ="3-100" @click=${this.handleFilterBtn.bind(this)}>3+ km</sl-button>
          </div>
          <!-- length/hike distance 2 (for responsiveness) -->
          <div class = "length-dropdown">
          <br>
          <sl-dropdown distance="5">
            <sl-button class ="filter-btn" size = "small" slot="trigger" style ="margin-left: 0.5em;" caret><strong>Length</strong></sl-button>
            <sl-menu>
              <sl-menu-item data-field ="hikeDistance" data-match="0-1" @click=${this.handleFilterBtn.bind(this)}>0-1 km</sl-menu-item>
              <sl-menu-item data-field ="hikeDistance" data-match="1-2" @click=${this.handleFilterBtn.bind(this)}>1-2 km</sl-menu-item>
              <sl-menu-item data-field ="hikeDistance" data-match="2-3" @click=${this.handleFilterBtn.bind(this)}>2-3 km</sl-menu-item>
              <sl-menu-item data-field ="hikeDistance" data-match="3-100" @click=${this.handleFilterBtn.bind(this)}>3+ km</sl-menu-item>
            </sl-menu>
          </sl-dropdown>
          </div>

          <!-- time -->
          <div class = "time-full-screen"> 
            <strong>Time</strong>
              <sl-button class ="filter-btn" size ="small" data-field ="time" data-match ="0-30" @click=${this.handleFilterBtn.bind(this)}>0-30 mins</sl-button>
              <sl-button class ="filter-btn" size ="small" data-field ="time" data-match ="30-60" @click=${this.handleFilterBtn.bind(this)}>30-60 mins</sl-button>
              <sl-button class ="filter-btn" size ="small" data-field ="time" data-match ="60-90" @click=${this.handleFilterBtn.bind(this)}>1-1.5 hrs</sl-button>
              <sl-button class ="filter-btn" size ="small" data-field ="time" data-match ="90-1000" @click=${this.handleFilterBtn.bind(this)}>1.5+ hrs</sl-button>
          </div>
          <!-- time 2 (for responsiveness) -->
          <div class = "time-dropdown">
          <br>
          <sl-dropdown distance="5">
            <sl-button class ="filter-btn" size = "small" slot="trigger" style ="margin-left: 0.5em;" caret><strong>Time</strong></sl-button>
            <sl-menu>
              <sl-menu-item data-field ="time" data-match="0-30" @click=${this.handleFilterBtn.bind(this)}>0-30 mins</sl-menu-item>
              <sl-menu-item data-field ="time" data-match="30-60" @click=${this.handleFilterBtn.bind(this)}>30-60 mins</sl-menu-item>
              <sl-menu-item data-field ="time" data-match="60-90" @click=${this.handleFilterBtn.bind(this)}>1-1.5 hrs</sl-menu-item>
              <sl-menu-item data-field ="time" data-match="90-1000" @click=${this.handleFilterBtn.bind(this)}>1.5+ hrs</sl-menu-item>
            </sl-menu>
          </sl-dropdown>
          </div>

          <!-- skill level -->
          <div class = "skill-full-screen">
            <strong>Skill Level</strong>
              <sl-button class ="filter-btn" size ="small" data-field ="skillLevel" data-match ="Easy" @click=${this.handleFilterBtn.bind(this)}>Easy</sl-button>
              <sl-button class ="filter-btn" size ="small" data-field ="skillLevel" data-match ="Moderate" @click=${this.handleFilterBtn.bind(this)}>Moderate</sl-button>
              <sl-button class ="filter-btn" size ="small" data-field ="skillLevel" data-match ="Advanced" @click=${this.handleFilterBtn.bind(this)}>Advanced</sl-button>
          </div>
           <!-- skill level 2 - dropdown (for responsiveness) -->
          <div class = "skill-lev-dropdown">
          <br>
          <sl-dropdown distance="5">
            <sl-button class ="filter-btn" size = "small" slot="trigger" style ="margin-left: 0.5em;" caret><strong>Level</strong></sl-button>
            <sl-menu>
              <sl-menu-item data-field ="skillLevel" data-match="Easy" @click=${this.handleFilterBtn.bind(this)}>Easy</sl-menu-item>
              <sl-menu-item data-field ="skillLevel" data-match="Moderate" @click=${this.handleFilterBtn.bind(this)}>Moderate</sl-menu-item>
              <sl-menu-item data-field ="skillLevel" data-match="Advanced" @click=${this.handleFilterBtn.bind(this)}>Advanced</sl-menu-item>
            </sl-menu>
          </sl-dropdown>
          </div>
          
          <!-- stars -->
          <div class = "stars-section">
          <strong>Stars</strong>
          <sl-dropdown distance="5">
            <sl-button class ="filter-btn" size = "small" slot="trigger" style ="margin-left: 0.5em;" caret><strong>Stars</strong></sl-button>
            <sl-menu>
              <sl-menu-item data-field ="stars" data-match="1" @click=${this.handleFilterBtn.bind(this)}>1</sl-menu-item>
              <sl-menu-item data-field ="stars" data-match="2" @click=${this.handleFilterBtn.bind(this)}>2</sl-menu-item>
              <sl-menu-item data-field ="stars" data-match="3" @click=${this.handleFilterBtn.bind(this)}>3</sl-menu-item>
              <sl-menu-item data-field ="stars" data-match="4" @click=${this.handleFilterBtn.bind(this)}>4</sl-menu-item>
              <sl-menu-item data-field ="stars" data-match="5" @click=${this.handleFilterBtn.bind(this)}>5</sl-menu-item>
            </sl-menu>
          </sl-dropdown>
          </div>

            <!-- star 2 - dropdown (for responsiveness) -->
          <div class = "star-tablet-dropdown">
          <br>
          <sl-dropdown class = "star-btn-tablet" distance="5">
            <sl-button class ="filter-btn" size = "small" slot="trigger" style ="margin-left: 0.5em;" caret><strong>Stars</strong></sl-button>
            <sl-menu>
            <sl-menu-item data-field ="stars" data-match="1" @click=${this.handleFilterBtn.bind(this)}>1</sl-menu-item>
              <sl-menu-item data-field ="stars" data-match="2" @click=${this.handleFilterBtn.bind(this)}>2</sl-menu-item>
              <sl-menu-item data-field ="stars" data-match="3" @click=${this.handleFilterBtn.bind(this)}>3</sl-menu-item>
              <sl-menu-item data-field ="stars" data-match="4" @click=${this.handleFilterBtn.bind(this)}>4</sl-menu-item>
              <sl-menu-item data-field ="stars" data-match="5" @click=${this.handleFilterBtn.bind(this)}>5</sl-menu-item>
            </sl-menu>
          </sl-dropdown>
          </div>
         
        </div><!-- close filter menu div -->
        <sl-button class = "clear-fltr" size = "small" @click = ${this.clearFilters.bind(this)}>Clear Filters</sl-button>
        </div><!-- close hike header div -->
        

        <div class="hike-grid">
        ${this.hikes == null ? html`
        <sl-spinner></sl-spinner>
        ` 
        : html`
        ${this.hikes.map(hikes => html`
           <!-- uses custom web component -->
        <va-hike class="hike-card"
          id = "${hikes._id}"
          location="${hikes.location}"
          title = "${hikes.title}"
          stars = "${hikes.stars}"
          image = "${hikes.image}"
          skillLevel = "${hikes.skillLevel}"
          time = "${hikes.time}"
          hikeDistance = "${hikes.hikeDistance}"
          description = "${hikes.description}"
        >
        </va-hike> 
        `)}
        `}
        </div> <!-- close hike grid div-->
      </div><!-- close page content div -->      
    `
    render(template, App.rootEl)
  }
}


export default new HikeView()