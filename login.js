const fs = require('fs');
const csv = require('csv-parser');

const employeeIDs = [];

// Function to log in with an individual username using Fetch
async function loginWithUsername(username) {
  const apiUrl = 'https://api.techenablesme.com/calman/api/login'; // Replace with your actual API URL
  const requestBody = {
    username: username,
    password: '2021cm', // Replace with your actual password
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (response.status === 200) {
      console.log(`Logged in successfully`);
    } else {
      console.error(`Failed to log in with username: ${username}, Status Code: ${response.status}`);
    }
  } catch (error) {
    return 'Error during login: ' + error.message;
  }
}

fs.createReadStream('EMPLIST.csv') // Assuming the CSV file is named 'employees.csv'
  .pipe(csv())
  .on('data', async (row) => {
    const employeeID = row['CODE']; // Assuming employee ID is the first value in each row
    const username = row['Name'];
    employeeIDs.push({ employeeID, username });
  })
  .on('end', async() => {
    console.log('Employee IDs:', employeeIDs);
    for (const { employeeID, username } of employeeIDs) {
      console.log('Employee ID:', employeeID);
      console.log('Username:', username);
      // You can perform actions with each employee ID here
      // For now, we're just printing them as usernames
      const loginResult = await loginWithUsername(employeeID, username);
      // console.log(`Login result for employee ID ${employeeID}: ${loginResult}`);
    }
  })
  .on('error', (error) => {
    console.error('Error reading CSV file:', error);
  });