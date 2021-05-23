import App from './App'
import Auth from './Auth'
import Toast from './Toast'

class HikeAPI {
//create a new hike - only authorized user can see this pg  
async newHike(formData){
  // send fetch request
  const response = await fetch(`${App.apiBase}/hike`, {
    //using POST method
    method: 'POST',
    //makes sure we are authorized to do this func
    headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
    body: formData
  })

  // if response not ok or anything is wrong
  if(!response.ok){ 
    let message = 'Problem adding hike'
    if(response.status == 400){
      const err = await response.json()
      message = err.message
    }      
    // throw error (exit this function)      
    throw new Error(message)
  }
  
  // convert response payload into json - store as data
  const data = await response.json()
  
  // return data
  return data
}


  
  //get all hikes
  async getHikes(){
    
    // fetch the json data and respond it to us
    //ensures we are authenticated to view it
    const response = await fetch(`${App.apiBase}/hike`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting hikes')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }
}

export default new HikeAPI()

