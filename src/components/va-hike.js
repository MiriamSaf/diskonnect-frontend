
import { LitElement, html, css } from '@polymer/lit-element'
import {render} from 'lit-html'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'
import Toast from './../Toast'
import UserAPI from './../UserAPI'
//above 
//need lit-element library and import router to navigate
//auth if need to access current user
//import app if need app header


//create a new element and call it va-hike
customElements.define('va-hike', class Diskonnect extends LitElement {
    //constructor to set up obj or set up data etc
    constructor(){
    //super refers to inheriting litElement class
    super()    
  }

  //define attribute and say its a property
  static get properties(){
    return {
      id: {
        type: String
    },
      title: {
        type: String
      },
      location: {
          type: String
      }, 
      stars: {
          type: Number
      }, 
      description: {
          type: String
      }, 
      skillLevel: {
        type: String
      },
      time: {
        type: Number
      },
      hikeDistance: {
        type: Number
      },
      image:{
          type: String
      },
    }
  }

  //referring to lit-element class
  firstUpdated(){
    super.firstUpdated()
  }

  //helpful test feauture
  testHandler(){
    alert("test")
  }

  //bring open dialog box bc of nesting cant do normally - must
  //create it dynamically  WITH JavaScript
  moreInfoHandler(){
        //create sl-dialog
        const dialogEL = document.createElement('sl-dialog')
        //class name added
        dialogEL.className = 'disk-dialog'
        
        //sl-dialog content
        const dialogContent = html`

        <style>
        .wrap {
            display: flex;
        }
        .image {
            width: 50%;
        }
        .image img {
            width: 100%;
        }
        .content {
            padding-left: 1em;
        }

        .star-rating::part(base){
      /* changes star color */
      --symbol-color-active: var(--brand-color);
    }
      
        </style>
        <div class="wrap">
        <div class="image">
            <img src="${App.apiBase}/images/${this.image}" alt="${this.title}" />
        </div>
        <div class="content">
            <h1>${this.title}</h1>
            <h3>${this.description}</h3>
            <a href = 'https://www.google.com/maps/' target="_blank"><p class="Location">${this.location}</p></a>
            <sl-rating class = "star-rating" readonly value="${this.stars}"></sl-rating>
            <p class="hikeDistance">${this.hikeDistance} km</p>
            <!--if it is less than an hour show in minutes else show in hours by dividing by 60 -->
            ${this.time < 60 ? html 
            `<p class="time"><span>${this.time}</span> mins</p>`
            : `${this.time / 60} hours`}    
            <p class="skillLevel"></span>Skill Level: ${this.skillLevel}</p>
            <sl-button @click=${this.addFavHandler.bind(this)}>
            <sl-icon slot="prefix" name="heart-fill"></sl-icon>
            Add to Favourites
            </sl-button>
        </div>
        </div>
        `
        //render the html content inside our dialogEl above
        render(dialogContent, dialogEL)

        //append to document body but not visible yet - need show method
        document.body.append(dialogEL)

        //show sl-dialog
        dialogEL.show()

        //on hide delete dialog el
        dialogEL.addEventListener('sl-after-hide', () =>{
           dialogEL.remove() 
        })
  }

  //favourite our hike
  async addFavHandler(){    
    try {
      console.log(this.id + 'is hike id')
      await UserAPI.addFavHike(this.id)
      Toast.show('Hike added to favourites')
    }catch(err){
      Toast.show(err, 'error')
    }
  }
  
  //must be rendered with visuals
  //its in its own vaccuum and wont inherit from outside
  render(){    
    return html`
    <style>

    .descrip{
        font-size: 0.9em;
        opacity: 0.8;
    }

    .star-rating::part(base){
      /* changes star color */
      --symbol-color-active: var(--brand-color);
    }

     
    </style>

    <!-- This is the card that is seen immediately upon landing on fav/hikes page -->
    <sl-card>
        <img slot = "image" src= "${App.apiBase}/images/${this.image}"/>
        <h1>${this.title}</h1>
        <sl-rating class = "star-rating" readonly value="${this.stars}"></sl-rating>
        <br>
        <h3 class ="descrip">${this.description}</h3>
        <sl-button @click= ${this.moreInfoHandler.bind(this)}>More Info</sl-button> 
        
    </sl-card>
       
    `
  }
  
})