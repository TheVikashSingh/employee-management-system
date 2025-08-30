import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import GetEmployeeDetails from './GetEmployeeDetails';


const Home = () => {


  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [salary, setSalary] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);
  const queryClient = useQueryClient();


  const {data, isPending, isError, error} = useQuery({
    queryFn: GetEmployeeDetails,
    queryKey: ["get-employees"],
  });
  
  const {mutate} = useMutation({
    mutationFn: async (newEmployee) => {
      const response = await fetch("http://localhost:8080/employees",{
        method: "POST",
        headers: {  
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(newEmployee)
      });
      if(!response.ok){
        throw new Error("Failed to add an emplpyee");
      }
      return response.json(); 
    },

    onSuccess: () => {
      alert("Hero Added Successfully");
      queryClient.invalidateQueries({queryKey:["get-employees"]});
    }
  });


  function inputFirstName(e){
    setFirstName(e.target.value);
  }

  function inputLastName(e){
    setLastName(e.target.value);
  }

  function inputEmail(e){
    setEmail(e.target.value);
  }

  function inputSalary(e){
    setSalary(e.target.value);
  }

  function inputDepartmentId(e){
    setDepartmentId(e.target.value);
  }

  function submitDetails(){
    const newEmployee = {
      "first_name" : firstName,
      "last_name" : lastName,
      "email" : email,
      "salary" : salary,
      "department_id" : departmentId
    };
    mutate(newEmployee);
    alert("Employee Added!");
  }


  return (

    <>



    <div style={{display:"flex", justifyContent:"center", fontFamily:"Cambria"}}>
      <h1>EMPLOYEE MANAGEMENT SYSTEM</h1></div>
    <hr></hr>
    <div>
        
            <div style={{border:"1px solid black",fontFamily:"Cambria"}}>
                <h3>Employee Details:</h3><br />

                <label>Employee's Name: 
                <input type='text' placeholder='First Name...' id='input_firstName' onChange={inputFirstName}/>
                <input type='text' placeholder='Last Name...' id='input_lastName' onChange={inputLastName}/>
                </label><br />

                <label>Employee's Email: 
                <input type='text' placeholder='Email...' id='input_email' onChange={inputEmail}/>
                </label><br />

                <label>Employee's Salary: 
                <input type='text' placeholder='Salary...' onChange={inputSalary} />
                </label><br />

                <label>Employee's Department ID: 
                <input type='text' placeholder='Dept. ID...' id='input_departmentId' onChange={inputDepartmentId} />
                </label><br /><br />


            <button onClick={submitDetails}>Submit Details</button>

            
            </div>
            <br />
            <br />
            <div style={{border:"2px solid grey",fontFamily:"Cambria"}}>
            <h3>All Employees in the Organisation:-</h3>
            <h2 id = "Output">{JSON.stringify(data)}</h2>
            </div>
                    
    </div>
    
    </>
    
  )
}

export default Home