import React, { useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";

function UserModal(props) {
  const setOpen = props.setOpen;
  const open = props.open;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    
    async function createUser(formData) {
      const response = await fetch("http://localhost:8080/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(formData, "formData");
      console.log("god created api", data);
    }
    createUser(formData);

    setOpen(!open)
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
            <input placeholder="Name" type="text" name="name" value={formData.name} onChange={handleChange}/>
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input placeholder="Email" name="email" value={formData.email} type="text" onChange={handleChange}/>
          </Form.Field>
          <Form.Field>
            <label>Age</label>
            <input placeholder="Age" type="Number" name="age" value={formData.age} onChange={handleChange} />
          </Form.Field>
          <Form.Field></Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default UserModal;
