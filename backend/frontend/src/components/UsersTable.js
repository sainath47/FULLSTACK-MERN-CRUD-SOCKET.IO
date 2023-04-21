import React, { useEffect, useState } from "react";
import { Button, Icon, Table } from "semantic-ui-react";
import UserModal from "./UserModal";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8080");

const TableExampleApprove = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState('');
  // const handleGod = ()=>{
  //   socket.emit("god")
  //     }
  // useEffect(()=>{

  //   socket.on("emit from backend",(data)=>{
  //     console.log(data);
  //   })

  // },[])
  useEffect(() => {
    // Listen for the "user created" event from the Socket.IO server
    socket.on("user created", (user) => {
      // Add the newly created user to the list of users
      setUsers((prevUsers) => [...prevUsers, user]);
    });

    // Listen for the "user updated" event from the Socket.IO server
    socket.on("user updated", (user) => {
      // Update the user in the list of users
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u._id === user._id ? user : u))
      );
    });

    // Listen for the "user deleted" event from the Socket.IO server
    socket.on("user deleted", (userId) => {
      // Remove the deleted user from the list of users
      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
    });

    async function fetchUsers() {
      let response = await fetch("/users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let users = await response.json();
      // console.log(users.data);

      setUsers(users.data);
    }
    fetchUsers();
  }, []);

  useEffect(() => {}, []);

  const handleAddUser = () => {
    setMethod('POST')
    setUser("")
    setOpen(!open);
  };
const handleUpdateUser = (user)=> {
// handle it by sending a state in the prop which will say whether it is update functionality or create functionality
//also add the message accordingly in bottom
setMethod('PUT')
setUser(user)
setOpen(!open);

}
  const handleDeleteUser = (id)=> {
  // Make sure to replace the URL with the actual URL of your backend API

const deleteUser = async (userId) => {
  try {
 
    const response = await fetch(`/users/${userId}`, {
      method: "DELETE",
    });
   await response.json();

  } catch (error) {
    console.error(error);
  }
};
deleteUser(id)

  }


  return (
    <Table compact celled definition>
      {/* <button onClick={handleGod}>god</button> */}
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
        {users.map((user) => (
          <Table.Row key={user._id}>
            <Table.Cell collapsing></Table.Cell>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.age}</Table.Cell>
            <Table.Cell>
              <Button.Group>
                <Button onClick={()=>handleUpdateUser(user)} icon="edit" />
                <Button  onClick={()=>handleDeleteUser(user._id)}icon="delete" />
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        ))}
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
      <UserModal setOpen={setOpen} open={open} method={method} user={user}/>
    </Table>
  );
};

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
//now that socket is working, i want to emit event from api to handle the state of the user
