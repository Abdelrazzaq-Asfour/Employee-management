package com.clients.client.service;

import com.clients.client.entity.Employee;
import com.clients.client.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public Employee postEmployee (Employee employee){
        return employeeRepository.save(employee);
    }


    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }


    public void deleteEmployee(Long id){
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("NOT Found  : " + id);
        }

    }


    public Employee getEmployeeById(Long id){
       return employeeRepository.findById(id).orElse(null);




    }

    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);

        if (optionalEmployee.isPresent()) {
            Employee existingEmployee = optionalEmployee.get();

            // تحديث بيانات الموظف الحالي بالبيانات الجديدة
            existingEmployee.setName(updatedEmployee.getName());
            existingEmployee.setEmail(updatedEmployee.getEmail());
            existingEmployee.setPhone(updatedEmployee.getPhone());
            existingEmployee.setDepartment(updatedEmployee.getDepartment());

            return employeeRepository.save(existingEmployee);
        } else {
            // يمكنك إما رمي استثناء أو التعامل مع الحالة حسب احتياجك
            throw new RuntimeException("Employee not found with ID: " + id);
        }
    }

}
