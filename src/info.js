import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Table, Col, Button, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate'

let items = JSON.parse(localStorage.getItem('UserDB'))

/* ************************************************************** *
 *  This function using for delete many of user information       *
 * ************************************************************** *
 *  => Create by: Mr.Supakij Buasod                               *
 *  => Create date: 21/08/2022                                    *
 *  => Last update: 22/08/2022                                    *
 * ************************************************************** *
*/
function DeleteMany(){
    let check1 = document.getElementById("checkbox0").checked; 
    let check2 = document.getElementById("checkbox1").checked; 
    let check3 = document.getElementById("checkbox2").checked; 
    let check4 = document.getElementById("checkbox3").checked; 
    console.log(check1, check2, check3, check4);
    if(check1 == true){
        Delete_user(document.getElementById("checkbox0").value)
    }
    if(check2 == true){
        Delete_user(document.getElementById("checkbox1").value)
    }
    if(check3 == true){
        Delete_user(document.getElementById("checkbox2").value)
    }
    if(check4 == true){
        Delete_user(document.getElementById("checkbox3").value)
    }

}

/* ************************************************************** *
 *  This function using for showing data in to table              *
 * ************************************************************** *
 *  => Create by: Mr.Supakij Buasod                               *
 *  => Create date: 21/08/2022                                    *
 *  => Last update: 22/08/2022                                    *
 * ************************************************************** *
*/
function Items({ currentItems }) {
    let count = 0;
    return (
        <>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Mobile phone</th>
                        <th>Nationality</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems &&
                        currentItems.map((item, index) => (
                            //   <div>
                            //     <h3>Item #{item.CitizenId}</h3>
                            //   </div>
                            <tr>
                                <td><Form.Check id={"checkbox"+index} value={item.CitizenId} /></td>
                                <td>{item.Firstname + " " + item.Lastname}</td>
                                <td>{item.Gender}</td>
                                <td>{"+" + item.SelectPhone + " " + item.PhoneNumber}</td>
                                <td>{item.SelectCountry}</td>
                                <td align='center'><a className='color=warning' onClick={() => { Edit_user(item.CitizenId) }}>EDIT</a> / <a href='' onClick={() => { Delete_user(item.CitizenId) }}>DELETE</a></td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    );
}

function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
            <Row align="right">
            <Col sm="auto" bl={2}>
            <Row>
            <Form.Check label="Select all" id="selectAll" onClick={()=>{ 
                if(document.getElementById("selectAll").checked == true){
                    document.getElementById("checkbox0").checked = true; 
                    document.getElementById("checkbox1").checked = true;
                    document.getElementById("checkbox2").checked = true;
                    document.getElementById("checkbox3").checked = true;
                }else{
                    document.getElementById("checkbox0").checked = false; 
                    document.getElementById("checkbox1").checked = false;
                    document.getElementById("checkbox2").checked = false;
                    document.getElementById("checkbox3").checked = false; 
                }
        }} />
            </Row>
            </Col>
            <Col><Button className='btn-danger' onClick={() => {DeleteMany()}}>Delete</Button></Col>
            <Col sm={3}>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="previous"
                renderOnZeroPageCount={null}

                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
            />
            </Col>
            </Row>
            <Items currentItems={currentItems} />
            </>
    );
}

/* ************************************************************** *
 *  This function using for edit the user information             *
 * ************************************************************** *
 *  => Create by: Mr.Supakij Buasod                               *
 *  => Create date: 21/08/2022                                    *
 *  => Last update: 22/08/2022                                    *
 * ************************************************************** *
*/
function Edit_user(CitizenId) {
    console.log(CitizenId);
    let input = JSON.parse(localStorage.getItem('UserDB'))
    let user_data = [];
    let raw_data = [];
    raw_data.push(input);
    raw_data[0].forEach(user => {
        if (user.CitizenId == CitizenId) {
            user_data.push(user);
        }
    });
    document.getElementById("SelectTitle").value = user_data[0].SelectTitle;
    document.getElementById("Firstname").value = user_data[0].Firstname;
    document.getElementById("Lastname").value = user_data[0].Lastname;
    document.getElementById("DateOfBirth").value = user_data[0].DateOfBirth;
    document.getElementById("SelectCountry").value = user_data[0].SelectCountry;
    document.getElementById("CitizenId").value = user_data[0].CitizenId;
    document.getElementById("SelectPhone").value = user_data[0].SelectPhone;
    document.getElementById("PhoneNumber").value = user_data[0].PhoneNumber;
    document.getElementById("Passport").value = user_data[0].Passport;
    document.getElementById("Salary").value = user_data[0].Salary;
    switch (user_data[0].Gender) {
        case "Male":
            document.getElementById("Male").checked = true;
            break;
        case "Female":
            document.getElementById("Female").checked = true;
            break;
        case "Unisex":
            document.getElementById("Unisex").checked = true;
            break;
        default:
    }
    document.getElementById("Gender").checked = user_data[0].Gender;
    console.log("User Data", user_data[0].SelectTitle);

    // Delete_user(CitizenId);

}

/* ************************************************************** *
 *  This function using for delete each user by using the citizen *
 *  ID to be the pirmary key                                      *
 * ************************************************************** *
 *  => Create by: Mr.Supakij Buasod                               *
 *  => Create date: 21/08/2022                                    *
 *  => Last update: 22/08/2022                                    *
 * ************************************************************** *
*/
function Delete_user(CitizenId) {
    console.log(CitizenId);

    let input = JSON.parse(localStorage.getItem('UserDB'))
    let deleted = [];
    let raw_data = [];
    raw_data.push(input);
    raw_data[0].forEach(user => {
        if (user.CitizenId != CitizenId) {
            deleted.push(user);
        }
    });
    localStorage.setItem('UserDB', JSON.stringify(deleted));
    console.log(JSON.parse(localStorage.getItem('UserDB')));
    window.location.reload(false);

}

/* ************************************************************** *
 *  This function usin for print out the design of user form      *
 *  into dashboard                                                *
 * ************************************************************** *
 *  => Create by: Mr.Supakij Buasod                               *
 *  => Create date: 21/08/2022                                    *
 *  => Last update: 22/08/2022                                    *
 * ************************************************************** *
*/
function Form_Info() {
    return (
        <Container className="mt-3 mb-3 pt-3 pb-3 bg-light">
            <PaginatedItems itemsPerPage={4} />
        </Container>
    )
}
export default Form_Info;