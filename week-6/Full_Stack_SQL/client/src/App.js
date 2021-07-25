import React, { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  // Use State Hooks
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [newWage, setNewWage] = useState(0);

  // -------------------------------------------------------------Functions Start-----------------------------------------------
  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees", {}).then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };
  //  ----------------------------------------------------Functions End--------------------------------------------------------

  // Form For Getting Employee Data
  return (
    <div className='App'>
      <div className='enter-information'>
        <label>Name:</label>
        <input
          type='text'
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type='number'
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type='text'
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type='text'
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        />
        <label>Wage (year)</label>
        <input
          type='number'
          onChange={(e) => {
            setWage(e.target.value);
          }}
        />
        <br></br>
        <button onClick={addEmployee}>Add Employee</button>
        <br></br>
        <button onClick={getEmployees}>Show Employees</button>
      </div>
      <br></br>

      {/* Show Employees */}
      <div className='employee-list'>
        {employeeList.map((val, key) => {
          return (
            <div className='each-employee'>
              <div>
                <h4>Name: {val.name}</h4>
                <h4>Age: {val.age}</h4>
                <h4>Country: {val.country}</h4>
                <h4>Position: {val.position}</h4>
                <h4>Salary: {val.wage}</h4>
              </div>
              <div className='card-controls'>
                <input
                  type='text'
                  placeholder='Edit Salary...'
                  onChange={(e) => {
                    setNewWage(e.target.value);
                  }}
                />
                <button onClick={() => updateEmployeeWage(val.id)}>
                  Update
                </button>

                <button
                  onClick={(id) => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
