package com.clients.client.controller;


import com.clients.client.entity.Employee;
import com.clients.client.service.EmployeeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmployeeController {
    private  final EmployeeService employeeService;

    @PostMapping("/employee")
    public Employee postEmployee(@RequestBody Employee employee){
        return  employeeService.postEmployee(employee);

    }
    @GetMapping("/employees")
    public List<Employee> getAllEmployees(){
        return employeeService.getAllEmployees();
    }
@DeleteMapping("/employee/{id}")
public ResponseEntity<?> deleteEmployee(@PathVariable Long id){
        try{
            employeeService.deleteEmployee(id);
            return new ResponseEntity<>("Successfully delete By : " + id , HttpStatus.OK);
        }catch (EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage() , HttpStatus.NOT_FOUND);

        }
}

    @GetMapping("/employee/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id){
       Employee employee = employeeService.getEmployeeById(id);
         if ( employee == null) return ResponseEntity.notFound().build();
         return ResponseEntity.ok(employee);
    }
    @PatchMapping("/employee/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        Employee updatedEmployee = employeeService.updateEmployee(id, employee);

        if (updatedEmployee == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return ResponseEntity.ok(updatedEmployee);
    }




}
