import React from 'react';

const GetEmployeeDetails = async () => {

    const response = await fetch("http://localhost:8080/employees");

    if(!response.ok){
        throw new Error("An Error Occurred!");
    }

    const data = await response.json();
    return data;
}

export default  GetEmployeeDetails