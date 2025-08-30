package com.employeemanagementsystem.managingemployee.mapper;

import com.employeemanagementsystem.managingemployee.DTO.EmployeeDTO;
import com.employeemanagementsystem.managingemployee.model.Employee;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
    public interface EmployeeMapper{

        EmployeeDTO toEmployeeDTO(Employee employee);
        Employee toEmployeeEntity(EmployeeDTO employeeDTO);

    }


