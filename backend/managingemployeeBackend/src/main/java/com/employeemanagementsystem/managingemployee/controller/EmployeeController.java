package com.employeemanagementsystem.managingemployee.controller;

import com.employeemanagementsystem.managingemployee.DTO.EmployeeDTO;
import org.springframework.web.bind.annotation.*;
import com.employeemanagementsystem.managingemployee.service.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService){
        this.employeeService = employeeService;
    }

    @GetMapping
    public List<EmployeeDTO> getAll(){
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public EmployeeDTO getById(@PathVariable Long id){
        return employeeService.getEmployeeByID(id);
    }

    @PostMapping
    public EmployeeDTO createEmployee(@RequestBody EmployeeDTO dto){
        return employeeService.createEmployee(dto);
    }

    @PutMapping("/{id}")
    public EmployeeDTO update(@PathVariable Long id, @RequestBody EmployeeDTO dto){
        return employeeService.updateEmployee(id,dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        employeeService.deleteEmployee(id);
    }

}
