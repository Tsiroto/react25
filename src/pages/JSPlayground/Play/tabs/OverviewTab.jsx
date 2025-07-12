import React, { useEffect, useState } from 'react';
import './OverviewTab.css';

export default function OverviewTab() {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState([]);
  const [delayed, setDelayed] = useState(false);

  const fetchPeople = (withDelay = false) => {
    setLoading(true);
    fetch('http://localhost:3000/people')
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then(data => {
          if (withDelay) {
            setTimeout(() => {
              setPeople(data);
              setLoading(false);
            }, 2000); // 2s delay
          } else {
            setPeople(data);
            setLoading(false);
          }
        })
        .catch(err => {
          console.error("Fetch error:", err);
          setLoading(false);
        });
  };

  useEffect(() => {
    if (!delayed) fetchPeople();
  }, [delayed]);

  const totalEmployees = people.length;
  const remoteCount = people.filter(p => p.remote).length;
  const remotePercentage = ((remoteCount / totalEmployees) * 100).toFixed(1);
  const totalIncome = people.reduce((sum, p) => sum + p.annualIncome, 0);
  const averageIncome = Math.round(totalIncome / totalEmployees || 0);
  const uniqueDepartments = [...new Set(people.map(p => p.department))].length;
  const highestPaid = people.reduce((top, p) =>
          p.annualIncome > top.annualIncome ? p : top,
      people[0] || {}
  );
  const totalAge = people.reduce((sum, p) => sum + p.age, 0);
  const averageAge = Math.round(totalAge / totalEmployees || 0);
  const departmentCounts = people.reduce((acc, p) => {
    acc[p.department] = (acc[p.department] || 0) + 1;
    return acc;
  }, {});
  const mostCommonDepartment = Object.entries(departmentCounts).reduce(
      (top, entry) => entry[1] > top[1] ? entry : top,
      [null, 0]
  )[0];

  return (
      <div>
        <h3>Company Overview</h3>

        {loading ? (
            <p>Loading people...</p>
        ) : (
            <ul>
              <li>Total employees: {totalEmployees}</li>
              <li>Remote workers: {remoteCount} ({remotePercentage}%)</li>
              <li>Average salary: €{averageIncome.toLocaleString()}</li>
              <li>Top earner: {highestPaid?.name} (€{highestPaid?.annualIncome?.toLocaleString?.() || 0})</li>
              <li>Average age: {averageAge}</li>
              <li>Departments: {uniqueDepartments}</li>
              <li>Most common department: {mostCommonDepartment}</li>
            </ul>
        )}

        <button className={"simulate-button"} onClick={() => {
          setDelayed(true);
          fetchPeople(true);
        }}>
          Simulate Slow Load
        </button>
      </div>
  );
}
