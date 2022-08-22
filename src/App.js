import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";

import raw_country from './country.json'

// Set title name by using array
const titleName = ['Mr.', 'Mrs.', 'Miss.', 'Ms.'];
var country = [];
// Preparing data from country.json
for(var i in raw_country.country)
  country.push([i, raw_country.country[i]]);

// Push data into title form
const title_form = [];
titleName.forEach((data) => {
  title_form.push(<option value={data}>{data}</option>)
})

// Push country into country form
const country_form = [];
country.forEach((data) => {
  country_form.push(<option value={data[1].country}>{data[1].country}</option>)
})

// Push country code into phone form
const phone_form = [];
country.forEach((data) => {
  phone_form.push(<option value={data[1].code}>{"+" + data[1].code + " | " + data[1].country}</option>)
})

let database = [];

/* ************************************************************** *
 * This function using for input the user information from form   *
 * and then send to the function of keep into localstorage        *
 * ************************************************************** *
 *  => Create by: Mr.Supakij Buasod                               *
 *  => Create date: 21/08/2022                                    *
 *  => Last update: 22/08/2022                                    *
 * ************************************************************** *
*/
function Form_input() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = data => {
    // if(localStorage.getItem('UserDB') === null){
    //   database.push(data);
    //   localStorage.setItem('UserDB', JSON.stringify(database));
    //   console.log(JSON.parse(localStorage.getItem('UserDB')));
    // }else{
    //   let input = JSON.parse(localStorage.getItem('UserDB'))
    //   database = [];
    //   database.push(input);
    //   database[0].push(data);
    //   database = database[0];
    //   localStorage.setItem('UserDB', JSON.stringify(database));
    //   console.log(JSON.parse(localStorage.getItem('UserDB')));
    // }

    if(localStorage.getItem('UserDB') === null){
      database.push(data);
      localStorage.setItem('UserDB', JSON.stringify(database));
      console.log(JSON.parse(localStorage.getItem('UserDB')));
    }else{
      let input = JSON.parse(localStorage.getItem('UserDB'))
      database = [];
      database.push(input);
      let state_same_user = 0;
      database[0].forEach(user => {
        if(user.CitizenId == data.CitizenId){
          state_same_user = 1;
        }
      });
      if(state_same_user == 0){
      database[0].push(data);
      database = database[0];
      localStorage.setItem('UserDB', JSON.stringify(database));
      console.log(JSON.parse(localStorage.getItem('UserDB')));
      window.location.reload(false);
      }else{
          let input = JSON.parse(localStorage.getItem('UserDB'))
          let deleted = [];
          let raw_data = [];
          raw_data.push(input);
          raw_data[0].forEach(user => {
          if(user.CitizenId != data.CitizenId){
              deleted.push(user);
          }
          });
          localStorage.setItem('UserDB', JSON.stringify(deleted));

          input = JSON.parse(localStorage.getItem('UserDB'))
          database = [];
          database[0].push(data);
          database = database[0];
          localStorage.setItem('UserDB', JSON.stringify(database));
          localStorage.setItem('SuperAdmin', '0');
          localStorage.removeItem('SuperAdmin');
          console.log(JSON.parse(localStorage.getItem('UserDB')));
          window.location.reload(false);
      }
    }
  };
  return (
    <Container className="mt-3 mb-3 pt-3 bg-light">
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* First row -- Name and Surname */}
        <Row>
          <Col sm={2}>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column sm={3}>
                Title
              </Form.Label>
              <Col sm={9}>
                <Form.Select aria-label="Default select example" {...register("SelectTitle", { required: true })} id="SelectTitle" required>
                <option value=''>Please select</option>
                {title_form}
                </Form.Select>
              </Col>
            </Form.Group>
          </Col>
          <Col sm={5}>
            <Form.Group as={Row} className="mb-3" controlId="formFirstname" required>
              <Form.Label column sm={3}>
                First name
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" placeholder="Please input first name" {...register("Firstname", { required: true })} id="Firstname" required />
              </Col>
            </Form.Group>
          </Col>
          <Col sm={5}>
            <Form.Group as={Row} className="mb-3" controlId="formLastname">
              <Form.Label column sm={3}>
                Last name
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" placeholder="Please input last name" {...register("Lastname", { required: true })} id="Lastname" required />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        {/* Second row -- Date of birth and Nationality */}
        <Row>
          <Col sm={4}>
            <Form.Group as={Row} className="mb-3" controlId="formDateOfBirth">
              <Form.Label column sm={4}>
                Birthday
              </Form.Label>
              <Col sm={8}>
                <Form.Control type="date" placeholder="Date of birth" {...register("DateOfBirth", { required: true })} id="DateOfBirth" required />
              </Col>
            </Form.Group>
          </Col>
          <Col sm={8}>
            <Form.Group as={Row} className="mb-3" controlId="formNationality">
              <Form.Label column sm={3}>
                Nationality
              </Form.Label>
              <Col sm={9}>
                <Form.Select aria-label="Default select example" {...register("SelectCountry", { required: true })} id="SelectCountry" required>
                  <option value=''>Please select</option>
                  {country_form}
                </Form.Select>
              </Col>
            </Form.Group>
          </Col>
        </Row>
        {/* Third row -- Citizen ID */}
        <Row>
          <Col sm={12}>
            <Form.Group as={Row} className="mb-3" controlId="formFirstname">
              <Form.Label column sm={1}>
                Citizen ID
              </Form.Label>
              <Col sm={10}>
                <Col column sm={4}>
                <Form.Control className='input' type="tel" placeholder="X-XXXX-XXXXX-XX-X" 
                  maxLength={13} {...register("CitizenId", { minLength:13, maxLength:13, required: true })} id="CitizenId" required />
                </Col>
              </Col>
            </Form.Group>
          </Col>
        </Row>
        {/* Fourth row - Gender */}
        <Row>
          <Col sm={12}>
            <Form.Group as={Row} className="mb-3" controlId="formFirstname" required>
              <Form.Label column sm={1}>
                Gender
              </Form.Label>
              <Col sm={5}>
                <div key='inline-radio' className="mb-3" {...register("Gender")} id="Gender" required>
                  <Form.Check 
                    inline
                    value="Male"
                    label="Male"
                    name="group1"
                    type='radio'
                    id='Male'
                    {...register("Gender", {required:true})} required />
                  <Form.Check 
                    inline
                    value="Female"
                    label="Female"
                    name="group1"
                    type='radio'
                    id='Female'
                    {...register("Gender", {required:true})} required/>
                  <Form.Check 
                    inline
                    value="Unisex"
                    label="Unisex"
                    name="group1"
                    type='radio'
                    id='Unisex'
                    {...register("Gender", {required:true})} required/>
                </div>
              </Col>
            </Form.Group>
          </Col>
        </Row>
        {/* Fifth row - Phone number */}
        <Row>
          <Col sm={12}>
            <Form.Group as={Row} className="mb-3" controlId="formPhone" required>
              <Form.Label column sm={2}>
                Mobile Phone
              </Form.Label>
              <Col sm={2}>
                <Form.Select aria-label="Default select example" {...register("SelectPhone", { required: true })} id="SelectPhone" required >
                  <option value=''>Please select</option>
                  {phone_form}
                </Form.Select>
              </Col>
              <Col sm={4}>
                <Form.Control type="tel" {...register("PhoneNumber", { required: true })} maxLength={10} id="PhoneNumber" required />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        {/* Sixth row - Passport No */}
        <Row>
          <Col sm={12}>
            <Form.Group as={Row} className="mb-3" controlId="formPassport" required>
              <Form.Label column sm={2}>
                Passport No
              </Form.Label>
              <Col sm={4}>
                <Form.Control type="tel" {...register("Passport", { required: true })} id="Passport" maxLength={9} minLength={9} required />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        {/* Seventh row - Expected Salary */}
        <Row>
          <Col sm={10}>
            <Form.Group as={Row} className="mb-3" controlId="formSalary" required>
              <Form.Label column sm={3}>
                Expected Salary
              </Form.Label>
              <Col sm={5}>
                <Form.Control type="number" {...register("Salary", { required: true })} id="Salary" required />
              </Col>
              <Form.Label column sm={2}>
                THB
              </Form.Label>
            </Form.Group>
          </Col>
          <Col sm={2} align='center' className='mb-4'>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>

      </Form>
    </Container>
  );
}

export default Form_input;
