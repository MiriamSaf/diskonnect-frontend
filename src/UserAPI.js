import App from './App'
import Auth from './Auth'
import Toast from './Toast'

class UserAPI {
  
 //when update user pass in userid, userData and the type is form or data
 
async updateUser(userId, userData, dataType = 'form'){
  // validate
  if(!userId || !userData) return
  
  let responseHeader
  
  // form data
  if(dataType == 'form'){
    // fetch response header normal (form data)
    responseHeader = {
      method: "PUT",        
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
      body: userData
    }
    
  // json data
  }else if(dataType == 'json'){
    responseHeader = {
      method: "PUT",        
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`, "Content-Type" : "application/json"},
      body: JSON.stringify(userData)
    }
  }

  // make fetch request to backend
  const response = await fetch(`${App.apiBase}/user/${userId}`, responseHeader)

  // if response not ok
  if(!response.ok){
    // console log error
    const err = await response.json()
    if(err) console.log(err)
    // throw error (exit this function)      
    throw new Error('Problem updating user')
  }

  // convert response payload into json - store as data
  const data = await response.json()
  
  // return data
  return data
}
  //get a user using their unique id
  async getUser(userId){
    // validate
    if(!userId) return
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/user/${userId}`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting user')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

  
//async bc await and promises
//passes in id of hike
async addFavHike(hikeId){
  // validate and if no id then leave function
  if(!hikeId) return

  // fetch the json data
  const response = await fetch(`${App.apiBase}/user/addFavHike`, {
    //PUT bc updating
    method: "PUT",
    headers: { "Authorization": `Bearer ${localStorage.accessToken}`, "Content-Type": 'application/json'},
    //stringifying the body we are sending
    body: JSON.stringify({hikeId: hikeId})
  })

  // if response not ok
  if(!response.ok){ 
    // console log error
    const err = await response.json()
    if(err) console.log(err)
    // throw error (exit this function)      
    throw new Error('Problem adding hikes to favourites')
  }
  
  // convert response payload into json - store as data
  const data = await response.json()
  
  // return data - json object being sent back from User model - backend
  return data

}

}

export default new UserAPI()