import React from 'react';
import { people } from '../../../../data/people';
import './OverviewTab.css';

export default function OverviewTab() {
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

  return (
    <div>
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
    </div>
  );
}
