import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class TestView {
  init(){
    document.title = 'Test'    
    this.render() 
    //Utils will find div pg content and will do from to animation   
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <disk-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></disk-app-header>
      <div class="page-content">        
        <h1>Test</h1>
        <p>This is a test page</p>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new TestView()