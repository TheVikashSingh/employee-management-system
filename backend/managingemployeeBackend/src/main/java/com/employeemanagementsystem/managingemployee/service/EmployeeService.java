package com.employeemanagementsystem.managingemployee.service;

import com.employeemanagementsystem.managingemployee.DTO.EmployeeDTO;
import com.employeemanagementsystem.managingemployee.mapper.EmployeeMapper;
import com.employeemanagementsystem.managingemployee.model.Employee;
import org.springframework.stereotype.Service;
import com.employeemanagementsystem.managingemployee.repository.EmployeeRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    public EmployeeService(EmployeeRepository employeeRepository,
                           EmployeeMapper employeeMapper){
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
    }

    public List<EmployeeDTO> getAllEmployees(){
        return employeeRepository.findAll().stream()
                .map(employeeMapper::toEmployeeDTO)
                .collect(Collectors.toList());
    }

    public EmployeeDTO getEmployeeByID(Long id){
        return employeeRepository.findById(id)
                .map(employeeMapper::toEmployeeDTO)
                .orElse(null);
    }

    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO){
        Employee employee = employeeMapper.toEmployeeEntity(employeeDTO);
        return employeeMapper.toEmployeeDTO(employeeRepository.save(employee));
    }

    public EmployeeDTO updateEmployee(Long id, EmployeeDTO dto){
        dto.setId(id);
        Employee emp = employeeMapper.toEmployeeEntity(dto);
        return employeeMapper.toEmployeeDTO(employeeRepository.save(emp));
    }

    public void deleteEmployee(Long id){
        employeeRepository.deleteById(id);
    }

}
