import React from 'react';

const EmployeeTable = ({ data }: { data: Record<string, any> }) => {
  // Extracting keys from the data object to create dynamic headers
  const headers = Object.keys(data);
  
  return (
    <div className="overflow-x-auto max-w-full">
      <table className="min-w-full table-auto border-collapse border border-gray-300 bg-">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2 border border-gray-300 text-left">
                {header.replace('_', ' ').toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {headers.map((header, index) => (
              <td key={index} className="px-4 py-2 border border-gray-300">
                {data[header]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
