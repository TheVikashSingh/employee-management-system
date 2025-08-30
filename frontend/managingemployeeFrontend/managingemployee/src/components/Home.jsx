import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import GetEmployeeDetails from './GetEmployeeDetails';


const Home = () => {


  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [salary, setSalary] = useState(null);
  const [departmentId, setDepartmentId] = useState(1);
  const queryClient = useQueryClient();
  const [employeeId, setEmployeeId] = useState(null);


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
      queryClient.invalidateQueries({queryKey:["get-employees"]});
    }
  });


  const {mutate:deleteEmployee} = useMutation({
    mutationFn: async (id) => {
      const url = "http://localhost:8080/employees/" + id;
      const response = await fetch(url,{
        method: "DELETE",
      });
      if(!response.ok){
        throw new Error("Failed to delete an emplpyee");
      }
      return id;
      },
    
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["get-employees"]});
    }
  }
  );
 

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

  function inputEmployeeId(e){
    setEmployeeId(e.target.value);
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
  }

  function deleteEmployeeById(){
    deleteEmployee(employeeId);
  }
  


  return (

    <>


    <div style={{display:"flex", justifyContent:"center", fontFamily:"Cambria"}}>
      <h1 style={{color:"crimson"}}>EMPLOYEE  MANAGEMENT  SYSTEM</h1></div>
    <hr />
    <div style={{display:"flex", 
            flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            
            <div style={{border:"5px solid white",fontFamily:"Cambria",
            borderRadius:"5px",padding:"10px 10px 10px", boxShadow:"5px 5px 5px grey"
            }}>
                <h2 style={{display:"flex", justifyContent:"center"}}>Employee Details:</h2><br />

                <label>Employee's Name: 
                <input type='text' placeholder='First Name...' id='input_firstName' onChange={inputFirstName}/>
                <input type='text' placeholder='Last Name...' id='input_lastName' onChange={inputLastName}/>
                </label><br />

                <label>Employee's Email: 
                <input type='text' placeholder='Email...' id='input_email' onChange={inputEmail}/>
                </label><br />

                <label>Employee's Salary: 
                <input type='number' placeholder='Salary...' onChange={inputSalary} />
                </label><br />

                <label>Employee's Department ID: 
                <input type='number' value={departmentId} placeholder='Dept. ID...' id='input_departmentId' onChange={inputDepartmentId} />
                </label><br /><br />

            <button onClick={submitDetails}>Submit Details</button>

            </div>
            {/* <div style={{border:"2px solid red"}}>
              <label>
                <button onClick={deleteEmployeeById}>Delete Employee</button>
                <input type="number" placeholder='Employee Id...' onChange={inputEmployeeId}></input>
              </label>
            </div> */}
            

            <br />
            <br />
            
            <div style={{border:"2px solid grey",fontFamily:"Cambria",
              display:"inline-block",padding:"5px 5px 5px",
              borderRadius:"5px"
            }}>
            <h3>All Employees in the Organisation:-</h3>
            {isPending && <h2>Loading Data...</h2>}
            {isError && <p style={{color:"red"}}>Error {error.message}</p>}
            {data && (<table style={{font:"Arial", padding: "10px 10px 10px",
              background:"beige",color:"black"}} border="2">
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
              <tbody>
                {data.map((emp) => (
                  <tr>
                    <td>{emp.id}</td>
                    <td>{emp.first_name} {emp.last_name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.salary}</td>
                    <td>{emp.department_id}</td>
                    <td><button onClick={() => deleteEmployee(emp.id)}>DEL</button></td>
                    </tr>))}
              </tbody>
              </table>)}
            </div>
                    
    </div>
    
    </>
    
  )
}

export default Home