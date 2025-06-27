import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    fetch("http://localhost:8080/api/employees")
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => a.id - b.id); // ترتيب حسب ID
        setEmployees(sortedData);
      })
      .catch(error => console.error("Error fetching employees:", error));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      fetch(`http://localhost:8080/api/employee/${id}`, {
        method: "DELETE"
      })
        .then(response => {
          if (response.ok) {
            alert("Employee deleted successfully.");
            fetchEmployees();
          } else {
            alert("Failed to delete employee.");
          }
        })
        .catch(error => console.error("Error deleting employee:", error));
    }
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee.id);
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department
    });
  };

  const handleFormChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/employee/${editingEmployee}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.ok) {
          alert("Employee updated successfully.");
          setEditingEmployee(null);
          fetchEmployees();
        } else {
          alert("Failed to update employee.");
        }
      })
      .catch(error => console.error("Error updating employee:", error));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee List</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No employees found.</td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.department}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEditClick(emp)} className="me-2">
                    Update
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(emp.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {editingEmployee && (
        <div className="mt-5">
          <h4>Edit Employee</h4>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleFormChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleFormChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={formData.phone} onChange={handleFormChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control type="text" name="department" value={formData.department} onChange={handleFormChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Save Changes</Button>{' '}
            <Button variant="secondary" onClick={() => setEditingEmployee(null)}>Cancel</Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
