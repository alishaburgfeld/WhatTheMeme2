import axios from 'axios'

const getFriendList = async (user_email) => {
    console.log('I AM IN get Friend List', user_email)
    const response = await axios.get('/friendlist' )
    // console.log('friendlist response.data:', response.data)
    return response
}

const getFriendRequests = async (user_email) => {
    console.log('I AM IN get Friend Requests on react', user_email)
    const response = await axios.get('/friendrequests/view')
    // console.log('friend Requests response:', response)
    return response

    //is array
}

const createFriendRequest = async (event) => {
    let friend_email = event.target[0].value
    console.log('I AM IN CREATE  Friend Requests on react', 'friend:', friend_email)
    const response = await axios.put('/friendrequests/create', {friend_email: friend_email})
    // console.log('friend Requests response', response)
    // console.log('request emails', response.data.friend_requests)
    return response.data.friend_requests
}

const acceptFriendRequest = async (user_email, friend_email) => {
    console.log('I AM IN ACCEPT Friend Requests on react', user_email, 'friend:', friend_email)
    const response = await axios.put('/addfriend/', {friend_email: friend_email})
    // console.log('add friend response', response)
    // console.log('request emails', response.data.friend_requests)
    return response
}

const declineFriendRequest = async (user_email, friend_email) => {
    console.log('I AM IN DECLINE Friend Requests on react', user_email, 'friend:', friend_email)
    const response = await axios.put('/friendrequests/decline', {friend_email: friend_email})
    // console.log('decline friend response', response)
    // console.log('request emails', response.data.friend_requests)
    return response
}

const removeFriend = async (user_email, friend_email) => {
    console.log('I AM IN REMOVE Friend on react', user_email, 'friend:', friend_email)
    const response = await axios.put('/removefriend/', {friend_email: friend_email})
    // console.log('remove friend response', response)
    // console.log('request emails', response.data.friend_requests)
    return response
}


export {
    getFriendList,
    getFriendRequests,
    createFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
    removeFriend
}