import React, { useEffect, useState } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import UserModal from "./UserModal";
import { io } from "socket.io-client";




const TableExampleApprove = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false)

  
  useEffect(() => {
    console.log("god in useEffect");
    // const socket = io("http://localhost:8080");


   async function fetchUsers(){
let response = await fetch('http://localhost:8080/users/',{
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
  
})
let users =await response.json()
// console.log(users.data);

setUsers(users.data)
   }
   fetchUsers()
    // Listen for the "user created" event from the Socket.IO server

    // Listen for the "user updated" event from the Socket.IO server
    // socket.on('user updated', (user) => {
    //   // Update the user in the list of users
    //   setUsers((prevUsers) =>
    //     prevUsers.map((u) => (u._id === user._id ? user : u))
    //   );
    // });

    // // Listen for the "user deleted" event from the Socket.IO server
    // socket.on('user deleted', (userId) => {
    //   // Remove the deleted user from the list of users
    //   setUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
    // });
  }, []);

  
  const handleAddUser = ()=>{
   setOpen(!open)
  }


  return(
  <Table compact celled definition>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>E-mail address</Table.HeaderCell>
        <Table.HeaderCell>Age</Table.HeaderCell>
        <Table.HeaderCell>Options</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
{users.map(user=>      <Table.Row key={user._id}>
        <Table.Cell collapsing></Table.Cell>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>{user.age}</Table.Cell>
        <Table.Cell>
          <Button.Group>
            <Button icon="edit" />
            <Button icon="delete" />
          </Button.Group>
        </Table.Cell>
      </Table.Row>)}
    </Table.Body>

    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan="4">
          <Button
            floated="right"
            icon
            labelPosition="left"
            primary
            size="small"
            onClick={handleAddUser}
          >
            <Icon name="user" /> Add User
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
    <UserModal setOpen={setOpen} open={open}/>
  </Table>


)};

export default TableExampleApprove;

/**  what functionality iam trying to eexecute here is,
 * 1. i will set firstly all the users in table
 * 2.then onclick of adduser the model should open up to add few details
 * 3. then i will add a pencil button on right side to give the functionality of edit user, it also appear with similar model
 * 4.at side of pencil will also provide bin icon to delete the user
 * 5.the succesfully added toast popup (on user addintion & error toast for non successful addition)
 * 6.now with the help of socket what i will do is i will execute the events for the user addition & removal & updation sequentially
 * 
 */