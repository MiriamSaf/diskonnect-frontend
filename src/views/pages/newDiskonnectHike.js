import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from './../../Toast'
import HikeAPI from './../../HikeAPI'

class newHike {
  init(){
    document.title = 'Create New Hike'    
    this.render()    
    Utils.pageIntroAnim()
  }

  
  async newHikeSubmitHandler(e){
    //dont want refresh of page due to spa
    e.preventDefault()
    //want to send form handler to Hike.API page
    const submitBtn = document.querySelector('.submit-btn')
    //adds loading animation
    submitBtn.setAttribute('loading', '')  
    //grab form data from e attribute  
    const formData = e.detail.formData

    //this will take time so must make a try and catch
    try{
    //pass in data through HikeAPI function
    await HikeAPI.newHike(formData)
    Toast.show('Hike added!')
    //remove loading btn
    submitBtn.removeAttribute('loading')
    //then reset the form - its a custom form 
    //text + text area fields
    const textInputs = document.querySelectorAll('sl-input, sl-textarea')
    if(textInputs) textInputs.forEach(textInput => textInput.value = null)
    const fileInput = document.querySelector('input[type = file]')
    if(fileInput) fileInput.value = null
    } catch (err){
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')
    }

  }

  render(){
    const template = html`
      <disk-app-header title="New Hike" user="${JSON.stringify(Auth.currentUser)}"></disk-app-header>
      <div class="page-content">    
      <div class = "form-align">    
        <h1>New Hike</h1>
  
        <sl-form class="page-form " @sl-submit=${this.newHikeSubmitHandler}>
          <div class="input-group">
            <sl-input name="title" type="text" placeholder="Hike Title" required></sl-input>
          </div>

          <div class="input-group">              
            <sl-input name="location" type="text" placeholder="Location" required>
            </sl-input>
          </div>

          <div class="input-group">
            <sl-textarea name="description" rows="3" placeholder="Description"></sl-textarea>
          </div>

          <div class="input-group">
          <sl-input name="stars" type="text" placeholder="Enter Stars (0-5)" pattern="[1-5]+" required>
            </sl-input>
          </div>

          <div class="input-group">
          <sl-input name="hikeDistance" type="text" placeholder="Enter hike distance (number)" pattern="[0-9]+" required>
            </sl-input>
          </div>

          <div class="input-group">
          <sl-input name="time" type="text" placeholder="Enter est time (number)" pattern="[0-9]+" required></sl-input>
            </sl-input>
          </div>

          <div class="input-group" style="margin-bottom: 2em;">
          <sl-input name="skillLevel" type="text" placeholder="Enter skill level (Easy, Moderate, Hard)" required>
            </sl-input>
          </div>

          <div class="input-group" style="margin-bottom: 2em;">
            <label>Image</label><br>
            <input type="file" name="image" />              
          </div>
         
          
          <sl-button type="primary" class="submit-btn" submit>Add Hike</sl-button>
        </sl-form><!-- close shoelace form -->     
        </div>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new newHike()