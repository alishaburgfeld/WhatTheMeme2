import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import {getFriendList, getFriendRequests, createFriendRequest, acceptFriendRequest} from '../AxiosCalls/AxiosCalls'



function FriendAndLogout({user}) {
    const [friends, setFriends] = useState([])
    const [friendRequests, setFriendRequests] = useState([])
    console.log('USER HERE', user)
    useEffect(()=> {
        console.log(user)
        let response = getFriendList(user)
        // console.log(response)
        // setFriends(response)
    }, [])

    // useEffect(()=> {
    //     console.log('friend request page user')
    //     let response = getFriendRequests(user)
    //     // setFriends(response)
    // }, [])


    return (
        <div>
            <h3>Friend List</h3>
            <h4>{user}</h4>
            {/* must be logged in as somebody other than jeff to test this: */}
            <Button onClick={()=>{createFriendRequest(user,"jeff@amazon.com")}}>Create Friend Request </Button>
            {/* must be logged in as Jeff to test this: */}
            <Button onClick={()=>{acceptFriendRequest(user,"mark@tesla.com")}}>Accept Friend Request from Mark </Button>
            
        </div>
    )
}

export default FriendAndLogout