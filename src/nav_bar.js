import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

/* ************************************************************** *
 *  NavBarMenu                                                    *
 * ************************************************************** *
 *  => Create by: Mr.Supakij Buasod                               *
 *  => Create date: 21/08/2022                                    *
 *  => Last update: 22/08/2022                                    *
 * ************************************************************** *
*/
function NavBarMenu() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Swift Dynamics Co., Ltd.</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Form className="d-flex">
            <Button variant="outline-primary" disabled>Welcome : admin@admin.com</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarMenu;