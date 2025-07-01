import { useState } from 'react';
import './Play.css';
import { people } from '../../../data/people';

export default function JSPlayground() {
  const [mode, setMode] = useState('total');

  const [searchField, setSearchField] = useState('name');
  const [sortField, setSortField] = useState('name');
  const [searchTerm, setSearchTerm] = useState("");

  const totalEmployees = people.length;

  const remoteCount = people.filter(p => p.remote).length;
  const remotePercentage = ((remoteCount / totalEmployees) * 100).toFixed(1);


  const totalIncome = people.reduce((sum, p) => sum + p.annualIncome, 0);
  const averageIncome = Math.round(totalIncome / totalEmployees);

  const uniqueDepartments = [...new Set(people.map(p => p.department))].length;

  const highestPaid = people.reduce((top, p) =>
    p.annualIncome > top.annualIncome ? p : top
  );

  const totalAge = people.reduce((sum, p) => sum + p.age, 0);
  const averageAge = Math.round(totalAge / totalEmployees);

  const departmentCounts = people.reduce((acc, p) => {
    acc[p.department] = (acc[p.department] || 0) +1;
    return acc;
  }, {});
  const mostCommonDepartment = Object.entries(departmentCounts).reduce(
    (top, entry) => entry[1] > top[1] ? entry : top
  )[0];

  const filteredPeople = people.filter(person => {
    const value = person[searchField];
  })

  return (
    <>
      <div className="button-group">
        <button onClick={() => setMode('tab1')}>Overview</button>
        <button onClick={() => setMode('tab2')}>Search</button>
        <button onClick={() => setMode('tab3')}>Tab 3</button>
        <button onClick={() => setMode('tab4')}>tab 4</button>
      </div>

      <div className="resultsBox">
        {mode === 'tab1' && (
          <>
            <h3>Company Overview</h3>
            <ul>
              <li>Total employees: {totalEmployees}</li>
              <li>Remote workers: {remoteCount} ({remotePercentage}%)</li>
              <li>Average salary: €{averageIncome.toLocaleString()}</li>
              <li>Top earner: {highestPaid.name} (€{highestPaid.annualIncome.toLocaleString()})</li>
              <li>Average age: {averageAge}</li>
              <li>Departments: {uniqueDepartments}</li>
              <li>Most common department: {mostCommonDepartment}</li>
            </ul>
          </>
        )}
        {mode === 'tab2' && (
          <>
            <h3>Search People</h3>

            <div className="controls">
              <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{marginLeft : 20}}
              />

              <label>
                Filter by:
                <select onChange={(e) => setSearchField(e.target.value)} value={searchField}>
                  <option value="name">Name</option>
                  <option value="location">Location</option>
                  <option value="country">Country</option>
                  <option value="email">Email</option>
                  <option value="dob">Date of birth</option>
                  <option value="age">Age</option>
                  <option value="employmentStatus">Employment Status</option>
                  <option value="yearsAtCurrentJob">Years at current job</option>
                  <option value="annualIncome">Annual Income</option>
                  <option value="remote">Remote</option>
                  <option value="skills">Skills</option>
                  <option value="department">Department</option>
                </select>
              </label>

              <label>
                Sort By:
                <select onChange={(e) => setSortField(e.target.value)} value={sortField}>
                  <option value="aToZ">A-Z</option>
                  <option value="name">Name</option>
                  <option value="annualIncome">Income</option>
                  <option value="remote">Remote</option>
                  <option value="yearsAtCurrentJob">Years at Job</option>
                  <option value="numberOfSkills">Number of skills</option>
                </select>
              </label>
            </div>

            <ul>

            </ul>
          </>
        )}

        {mode === 'tab3' && (
          <>
            <h3>Tab 3</h3>
            <ul>
            </ul>
          </>
        )}
        {mode === 'tab4' && (
          <>
            <h3>Something else</h3>
            <ul>
            </ul>
          </>
        )}
      </div>
    </>
  );
}