import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

function UserModal(props) {
  const setOpen = props.setOpen;
  const open = props.open;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });


useEffect(()=>{

if(props.user) {
  const {name, email, age} = props.user
  setFormData({name, email, age})}
else setFormData({
  name: "",
  email: "",
  age: "",
})
},[open,props.user])

// useEffect(()=>{
//   console.log("god set formdata");
// setFormData({
//   name: "sainath",
//   email: "god",
//   age: "unknoewn",
// })
// },[open])


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(props.method);

    if (props.method === "POST") {
      async function createUser(formData) {
        const response = await fetch("http://localhost:8080/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();

      }
      createUser(formData);
    } else if (props.method === "PUT") {
  

const updateUser = async (user, updatedUserData) => {
  //now the question is how do i set the formdata as soon as user click on the edit button
  try {
    const response = await fetch(`http://localhost:8080/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
updateUser(props.user)

    }

    setOpen(!open);
    setFormData({
      name: "",
      email: "",
      age: "",
    })
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      // trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email"
              name="email"
              value={formData.email}
              type="text"
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Age</label>
            <input
              placeholder="Age"
              type="Number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field></Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() =>{ setOpen(false);    setFormData({
      name: "",
      email: "",
      age: "",
    })}}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default UserModal;
