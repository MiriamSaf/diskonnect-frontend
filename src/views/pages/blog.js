import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class TemplateView {
  init(){
    document.title = 'Blog'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <disk-app-header title="Blog" user="${JSON.stringify(Auth.currentUser)}"></disk-app-header>
      <div class="page-content">        
        <h1>Blog</h1>
        <p>Page content ...</p>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new TemplateView()