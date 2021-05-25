// import views
import homeView from './views/pages/home'
import aboutView from './views/pages/about'
import fourOFourView from './views/pages/404'
import signinView from './views/pages/signin'
import signupView from './views/pages/signup'
import profileView from './views/pages/profile'
import editProfileView from './views/pages/editProfile'
import GuideView from './views/pages/guide'
import favouriteHikes from './views/pages/favouriteHikes'
import Hikes from './views/pages/hikes'
import newHike from './views/pages/newDiskonnectHike'

// define routes
const routes = {
	//every VIEW has a route to go to
	//if someoone types in following views take them to this route
	//eg if you go to /signin run signinView
	'/': homeView,	
	'404' : fourOFourView,
	'/signin': signinView,
	'/signup': signupView,
	'/about' : aboutView,
	'/profile': profileView,
	'/favouriteHikes': favouriteHikes,
	'/editProfile': editProfileView,
	'/guide': GuideView,
	'/hike' : Hikes,
	'/newHike'	: newHike
}

class Router {
	constructor(){
		//creates property called routes
		this.routes = routes
	}
	
	init(){
		// initial call
		this.route(window.location.pathname)

		// on back/forward
		window.addEventListener('popstate', () => {
			this.route(window.location.pathname)
		})
	}
	
	route(fullPathname){
		// extract path without params
		const pathname = fullPathname.split('?')[0]
		const route = this.routes[pathname]
		
		if(route){
			// if route exists, run init() of the view
			this.routes[window.location.pathname].init()
		}else{			
			// show 404 view instead
			this.routes['404'].init()			
		}
	}

	gotoRoute(pathname){
		window.history.pushState({}, pathname, window.location.origin + pathname);
		this.route(pathname)
	}	
}

// create appRouter instance and export
const AppRouter = new Router()
//export as defualt export
export default AppRouter


// programmatically load any route
export function gotoRoute(pathname){
	AppRouter.gotoRoute(pathname)
}


// allows anchor <a> links to load routes
export function anchorRoute(e){
	e.preventDefault()	
	const pathname = e.target.closest('a').pathname
	AppRouter.gotoRoute(pathname)
}
