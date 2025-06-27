import React, { useState } from 'react';
import { Container, Nav, Navbar, Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [employeeInfo, setEmployeeInfo] = useState(null);

  const handleSearch = () => {
    if (searchId.trim() !== "") {
      fetch(`http://localhost:8080/api/employee/${searchId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Employee not found");
          }
          return response.json();
        })
        .then(data => {
          setEmployeeInfo(data);
          setShowModal(true);
        })
        .catch(error => {
          alert("Employee not found or error occurred.");
          console.error(error);
        });
    }
  };

  return (
    <div>
      <Navbar bg="success" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/"><strong> System</strong></Navbar.Brand>
          <Nav className="ml-auto"></Nav>

          {/* Search input field */}
          <input
            type="text"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={{
              marginLeft: '10px',
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />

          {/* Search button */}
          <button
            onClick={handleSearch}
            style={{
              marginLeft: '5px',
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '5px 10px',
              cursor: 'pointer'
            }}
          >
            Search
          </button>

          {/* Add Employee button */}
          <button
            onClick={() => navigate('/add-employee')}
            style={{
              marginLeft: '10px',
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '5px 10px',
              cursor: 'pointer'
            }}
          >
            Add Employee
          </button>
        </Container>
      </Navbar>

      {/* Modal to show employee info */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {employeeInfo ? (
            <div>
              <p><strong>Name:</strong> {employeeInfo.name}</p>
              <p><strong>Email:</strong> {employeeInfo.email}</p>
              <p><strong>Phone:</strong> {employeeInfo.phone}</p>
              <p><strong>Department:</strong> {employeeInfo.department}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Header;
