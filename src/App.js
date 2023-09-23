import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function App() {

  const [formValues, setFormValues] = useState({ email: "", password: "", favClass: "1" })

  const handleEmailChange = ((e) => {
    setFormValues({ ...formValues, email: e.target.value })
  });

  const handlePasswordChange = ((e) => {
    setFormValues({ ...formValues, password: e.target.value })
    const password = e.target.value;
    if (password.length < 9) {
      setValidationStates({ ...validationStates, passwordState: false })
    }
    if (password.length >= 9) {
      setValidationStates({ ...validationStates, passwordState: (password.match(/[a-z]/) || password.match(/[A-Z]/)) && password.match(/[0-9]/) })
    }
  });

  const handleSelectChange = ((e) => {
    setFormValues({ ...formValues, favClass: e.target.value })
  });

  const clickSubmit = (() => {
    if (formValues.email.split("@")[0].length > 0 && formValues.email.includes("@uniandes.edu.co")){
      setValidationStates({ ...validationStates, emailState: true })
      setTimeout(() => {
        if (validationStates.passwordState) {
          alert("Operacion Exitosa. Datos guardados: " + JSON.stringify(formValues))
        }
      }, 0);
    }
    else {
      setValidationStates({ ...validationStates, emailState: false })
    }
  });

  const [validationStates, setValidationStates] = useState({ emailState: true, passwordState: true })

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>

      <Form>
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={formValues.email} isInvalid={!validationStates.emailState} />
          <Form.Control.Feedback type="invalid"> Your email should follow an established format (x@uniandes.edu.co)</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={formValues.password} isInvalid={!validationStates.passwordState} />
          <Form.Control.Feedback type="invalid"> Your password should be have numbers and letters and should be at least 9 char long</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologias web</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
