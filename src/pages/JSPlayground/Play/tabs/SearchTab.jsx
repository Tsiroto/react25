import React, { useState } from 'react';
import { people } from '../../../../data/people';
import './SearchTab.css';

export default function SearchTab() {
  const [searchField, setSearchField] = useState('name');
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filterField, setFilterField] = useState("none");
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");


  const filteredPeople = people.filter(person => {
    const value = person[searchField];
    if (value == null) return false;

    const matchesSearch = searchTerm.trim() === ""
        || String(value).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterField === "none"
        || filterValue === ""
        || String(person[filterField]) === filterValue;

    const matchesSalary =
        (minSalary === "" || person.annualIncome >= Number(minSalary)) &&
        (maxSalary === "" || person.annualIncome <= Number(maxSalary));

    const matchesAge =
        (minAge === "" || person.age >= Number(minAge)) &&
        (maxAge === "" || person.age <= Number(maxAge));

    return matchesSearch && matchesFilter && matchesSalary && matchesAge;
  });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];

    let result;

    if (Array.isArray(valA) && Array.isArray(valB)) {
      result = valA.length - valB.length;
    } else if (typeof valA === 'number' && typeof valB === 'number') {
      result = valA - valB;
    } else if (typeof valA === 'boolean' && typeof valB === 'boolean') {
      result = valA === valB ? 0 : valA ? -1 : 1;
    } else {
      result = String(valA).toLowerCase().localeCompare(String(valB).toLowerCase());
    }

    return sortDirection === 'asc' ? result : -result;
  });

    const handleSort = (field) => {
      if (field === sortField) {
        // toggle direction
        setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        // new field selected, default to ascending
        setSortField(field);
        setSortDirection('asc');
      }
    };


  return (
    <>
      <h3>Search People</h3>

      <div className="controls">

        {/* Search + Clear */}
        <div className="control-group">
          <div className="control-item">
            <label>
              Search:
              <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
              />
            </label>
          </div>
          <div className="control-item">
            <label>&nbsp;</label>
            <button onClick={() => {
              setSearchTerm('');
              setSearchField('name');
              setFilterField('none');
              setFilterValue('');
              setSortField('name');
              setSortDirection('asc');
              setMinSalary('');
              setMaxSalary('');
              setMinAge('');
              setMaxAge('');
            }}>
              Clear
            </button>
          </div>
        </div>

        {/* Age & Salary Range */}
        <div className="control-group">
          <div className="control-item">
            <label>
              Age Range:
              <div className="range-inputs">
                <input
                    type="number"
                    placeholder="Min"
                    value={minAge}
                    onChange={(e) => setMinAge(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max"
                    value={maxAge}
                    onChange={(e) => setMaxAge(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="control-item">
            <label>
              Salary Range (€):
              <div className="range-inputs">
                <input
                    type="number"
                    placeholder="Min"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                />
              </div>
            </label>
          </div>
        </div>

        {/* Filter + Subfilter */}
        <div className="control-group">
          <div className="control-item">
            <label>
              Filter by:
              <select onChange={(e) => setFilterField(e.target.value)} value={filterField}>
                <option value="none">No Filters</option>
                <option value="country">Country</option>
                <option value="location">Location</option>
                <option value="employmentStatus">Employment Status</option>
                <option value="remote">Remote</option>
                <option value="department">Department</option>
              </select>
            </label>
          </div>
          {filterField !== "none" && (
              <div className="control-item">
                {(() => {
                  const options = Array.from(
                      new Set(filteredPeople.map(p => p[filterField]).filter(Boolean))
                  );
                  return options.length > 0 ? (
                      <label>
                        Value:
                        <select onChange={(e) => setFilterValue(e.target.value)} value={filterValue}>
                          <option value="">All</option>
                          {options.map((val, i) => (
                              <option key={i} value={val}>{String(val)}</option>
                          ))}
                        </select>
                      </label>
                  ) : (
                      <p style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>
                        No subfilter options available.
                      </p>
                  );
                })()}
              </div>
          )}
        </div>

        {/* Sort */}
        <div className="control-group">
          <div className="control-item">
            <label>
              Sort By:
              <select onChange={(e) => handleSort(e.target.value)} value={sortField}>
                <option value="name">Name</option>
                <option value="age">Age</option>
                <option value="country">Country</option>
                <option value="location">Location</option>
                <option value="email">Email</option>
                <option value="employmentStatus">Employment</option>
                <option value="yearsAtCurrentJob">Years at Job</option>
                <option value="annualIncome">Income</option>
                <option value="remote">Remote</option>
                <option value="skills">Number of Skills</option>
                <option value="department">Department</option>
                <option value="dob">Date of Birth</option>
              </select>
            </label>
          </div>
        </div>

      </div>


      {/*Results*/}
      <h4>Results:</h4>
      {sortedPeople.length > 0 ? (
          <div className={"table-wrapper"}>
          <table className="people-table">
            <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                Name {sortField === 'name' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}
              </th>
              <th onClick={() => handleSort('age')}>
                Age {sortField === 'age' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}
              </th>
              <th onClick={() => handleSort('country')}>
                Country {sortField === 'country' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}
              </th>
              <th onClick={() => handleSort('location')}>
                Location {sortField === 'location' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}
              </th>
              <th onClick={() => handleSort('email')}>
                Email {sortField === 'email' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}
              </th>
              <th onClick={() => handleSort('employmentStatus')}>
                Employment {sortField === 'employmentStatus' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}
              </th>
              <th onClick={() => handleSort('yearsAtCurrentJob')}>
                Years at Job {sortField === 'yearsAtCurrentJob' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}
              </th>
              <th onClick={() => handleSort('annualIncome')}>
                Income {sortField === 'annualIncome' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}
              </th>
              <th onClick={() => handleSort('remote')}>
                Remote {sortField === 'remote' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}
              </th>
              <th onClick={() => handleSort('skills')}>
                Skills {sortField === 'skills' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}
              </th>
              <th onClick={() => handleSort('department')}>
                Department {sortField === 'department' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}
              </th>
              <th onClick={() => handleSort('dob')}>
                Date of Birth {sortField === 'dob' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}
              </th>
            </tr>
            </thead>
            <tbody>
            {sortedPeople.map((p, i) => (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.country}</td>
                  <td>{p.location}</td>
                  <td>{p.email}</td>
                  <td>{p.employmentStatus}</td>
                  <td>{p.yearsAtCurrentJob}</td>
                  <td>€{p.annualIncome.toLocaleString()}</td>
                  <td>{p.remote ? 'Yes' : 'No'}</td>
                  <td>{p.skills.join(', ')}</td>
                  <td>{p.department}</td>
                  <td>{p.dob}</td>
                </tr>
            ))}
            </tbody>
          </table>
          </div>
      ) : (
          <p>No records found with keywords: "{searchTerm}"</p>
      )}

      <p style={{ marginTop: '1rem' }}>
        {sortedPeople.length} entries found
      </p>

    </>
  );
}
