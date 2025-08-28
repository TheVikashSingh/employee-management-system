import React from 'react'

const Home = () => {
  return (

    <>
    <div style={{display:"flex", justifyContent:"center"}}><h1>EMPLOYEE MANAGEMENT SYSTEM</h1></div>
    <hr></hr>
    <div>
        
            <div>
                <h3>Employee Details:</h3><br />
                <label>Employee's Name: <input type='text' placeholder='First Name...'/>
                <input type='text' placeholder='Last Name...'/>
                </label><br />
                <label>Employee's Email: <input type='text' placeholder='Email...'/>
                </label><br />
                <label>Employee's Salary: <input type='text' placeholder='Salary...'/>
                </label><br />
                <label>Employee's Department ID: <input type='text' placeholder='Dept. ID...'/>
                </label><br /><br />
            </div>
            <button>Submit Details</button>        
    </div>
    
    </>
    
  )
}

export default Home