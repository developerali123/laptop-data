import React from 'react';
import EmployeeTable from './EmployeeTable';

const App = () => {
  const data = {
    employee: 'Ali',
    gross_salary: 1200,
    bonus_salary: 1500,
    basic_salary: 1800,
    department: 'Sales',
    position: 'Manager',
  };

  return (
    <div className="p-6">
      <EmployeeTable data={data} />
    </div>
  );
};

export default App;
