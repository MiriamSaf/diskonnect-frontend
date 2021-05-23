import gsap from 'gsap'

//utilities that are helpful but dont fit into any other modules
class Utils {

  //allows for mobile viewport to be detected and dealt with for responsiveness
  isMobile(){
    let viewportWidth = window.innerWidth
    if(viewportWidth <= 768){
      return true
    }else{
      return false
    }
  }


  //gives each page intro animation
  pageIntroAnim(){
    const pageContent = document.querySelector('.page-content')
    if(!pageContent) return
    gsap.fromTo(pageContent, {opacity: 0, y: -12}, {opacity: 1, y: 0, ease: 'power2.out', duration: 0.3})
  }

  //extra gsap  for home view
  homeExtraAnim(){
    gsap.from('.home-box', {opacity:0, y:30, ease: "powerout", duration: 0.5 } )
    gsap.from('.home-search-hikes', {opacity:0, x:30, ease: "powerout", duration: 0.5 }, "-=0.5")
    gsap.from('.home-pic-box', {opacity:0, y:50, ease: "powerout", duration: 0.6}, "-=1")
    gsap.from('.footer-main', {opacity:0, y:-50, ease: "powerout", duration: 0.5}, "-=2")
    gsap.from('.footer-right sl-icon', {opacity:0, y:-50, ease: "powerin", duration: 1,  stagger: 0.5})
  }

  //gsap for hikes view
  hikesExtraAnim(){
    gsap.from('.hike-h1', {opacity:0, y:-50, ease: "power1", duration: 0.6})
    gsap.from('.filter-menu div', {opacity:0, y:50, ease: "power1", duration: 0.6}, "-=1")
    gsap.from('.clear-fltr', {opacity:0, y:50, ease: "power1", duration: 0.6}, "-=1")
    gsap.from('.hike-card', {opacity:0, y:-60, ease: "slow", duration: 1,  stagger: 0.5})
  }

   //gsap for favourites view
   favExtraAnim(){
    gsap.from('.fav-h1', {opacity:0, y:-50, ease: "power1", duration: 0.6})
    //gsap.from('.fav-grid .fav-card', {opacity:0, y:-60, ease: "back", duration: 1,  stagger: 0.5})
  }

  //gsap about view
  aboutExtraAnim(){
    gsap.from('.mission-statement h1', {opacity:0, y:-50, ease: "power1", duration: 1})
    gsap.from('.mission-statement', {opacity:0, y:50, ease: "power1", duration: 1.5}, "-=1")
    gsap.from('.about-hike-pic' , {opacity:0, y:-50, ease: "power1", duration: 1.5}, "-=1")
  }
}



export default new Utils()