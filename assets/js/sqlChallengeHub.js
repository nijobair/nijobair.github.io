let db;
let SQL;
let currentChallengeID;
let hint;
let totalChallenges;

const resultPlaceHolder = "Write a query and click the `Run Query` button or press `Ctrl + Enter` to see the result...";


// Initialize SQL.js and load the challenge list when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}` }).then(SQLLib => {
        SQL = SQLLib;
        db = new SQL.Database();

        // Check the URL for a challenge ID
        const urlParams = new URLSearchParams(window.location.search);
        const challengeID = urlParams.get('challenge');

        if (challengeID) {
            loadChallenge(parseInt(challengeID));
        }
    }).catch(error => console.error('Error initializing SQL.js:', error));
});

// Load a specific challenge by its ID
function loadChallenge(id) {
    // Update the URL with the current challenge ID
    window.history.pushState({ challengeID: id }, `Challenge ${id}`, `?challenge=${id}`);

    // Store the current challenge ID for comparison later
    currentChallengeID = id;

    // Check if SQL is initialized
    if (!SQL) {
        console.error('SQL.js is not initialized');
        return;
    }

    const challengesFile = '/sqlChallengeHub/challenges.json';
    fetch(challengesFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${challengesFile}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(challenges => {
            totalChallenges = challenges.length;
            const challenge = challenges.find(challenge => challenge.id === id);
            if (!challenge) {
                throw new Error(`Challenge with id ${id} not found`);
            }

            hint = challenge.hint;

            displayChallengeDetails(challenge);
            resetQueryAndResult();

            // Reset the database and load new tables for the challenge
            db = new SQL.Database();
            loadTables(challenge.tables || [challenge.table]);
        })
        .catch(error => console.error('Error loading challenge:', error));
}

// Display challenge details
function displayChallengeDetails(challenge) {
    const challengeContainer = document.getElementById('challenge-container');
    challengeContainer.innerHTML = `
        <h2>Challenge ${challenge.id}</h2>
        <p><strong>Category:</strong> ${challenge.category}</p>
        <p><strong>Title:</strong> ${challenge.title}</p>
        <p><strong>Description:</strong> ${challenge.description}</p>
        <p><strong>Credit:</strong> <i><a href="${challenge.credit.link}" target="_blank">${challenge.credit.name}</a></i></p>
        <div id="table-container"></div>
    `;
}

// Reset query input and result output
function resetQueryAndResult() {
    const queryInput = document.getElementById('query-input');
    queryInput.value = '';
    queryInput.style.width = ''; // Reset the width of the textarea
    queryInput.style.height = ''; // Reset the height of the textarea

    const resultOutput = document.getElementById('result-output');
    resultOutput.placeholder = resultPlaceHolder;
    resultOutput.value = '';
    resultOutput.style.width = ''; // Reset the width of the textarea
    resultOutput.style.height = ''; // Reset the height of the textarea

    document.getElementById('challenge-list').style.display = 'none';
    document.getElementById('sql-playground-app').style.display = 'flex';

    // Focus the textarea with id 'query-input'
    document.getElementById('query-input').focus();

    // Remove previous message if it exists
    const resultMessage = document.getElementById('result-message');
    if (resultMessage) {
        resultMessage.remove();
    }
}

// Load tables specified in the challenge
function loadTables(tableNames) {
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = ''; // Clear the table container before loading new tables

    tableNames.forEach(tableName => {
        fetch(`/sqlChallengeHub/tables/${tableName}.sql`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch /sqlChallengeHub/tables/${tableName}.sql: ${response.statusText}`);
                }
                return response.text();
            })
            .then(sql => {
                // Execute the SQL commands to create the table and insert the data
                db.run(sql);

                // Display the table data
                displayTableData(tableName);
            })
            .catch(error => console.error('Error loading table:', error));
    });
}

// Display table data in the SQL Playground
function displayTableData(tableName) {
    const tableContainer = document.getElementById('table-container');
    const query = `SELECT * FROM ${tableName} LIMIT 9;`; // Limit to first 9 rows for display
    const countQuery = `SELECT COUNT(*) AS total FROM ${tableName};`; // Query to count total rows

    try {
        // Execute the count query to get the total number of rows
        const countResult = db.exec(countQuery);
        const totalRows = countResult[0].values[0][0]; // Get the total number of rows

        // Execute the query to get the first 9 rows
        const result = db.exec(query);
        if (result.length > 0) {
            const table = {
                columns: result[0].columns,
                rows: result[0].values
            };

            let tableHTML = `<p><strong>Table:</strong> ${tableName}${totalRows > 9 ? ' <i>(first 9 rows)</i>' : ''}</p><table border="1" style="align-self: center;"><thead><tr>`;

            // Add table headers
            table.columns.forEach(column => {
                tableHTML += `<th>${column}</th>`;
            });

            tableHTML += `</tr></thead><tbody>`;

            // Add table rows
            table.rows.forEach(row => {
                tableHTML += `<tr>`;
                row.forEach(value => {
                    tableHTML += `<td>${value}</td>`;
                });
                tableHTML += `</tr>`;
            });

            tableHTML += `</tbody></table>`;
            tableContainer.innerHTML += tableHTML;
        } else {
            tableContainer.innerHTML += `<p><strong>Table:</strong> ${tableName} <i>(no data)</i></p>`;
        }
    } catch (e) {
        console.error('Error displaying table data:', e);
    }
}

// Execute the SQL query written by the user
function executeQuery() {
    const query = document.getElementById('query-input').value;

    // Check if the query is read-only
    if (!isReadOnlyQuery(query)) {
        document.getElementById('result-output').value = 'Error: Only SELECT queries are allowed.';
        return;
    }

    try {
        const result = db.exec(query);
        if (result.length > 0) {
            const userResult = {
                columns: result[0].columns,
                rows: result[0].values
            };

            // Display the query result
            displayQueryResult(userResult);

            // Fetch and compare results
            compareResults(currentChallengeID, userResult);
        } else {
            document.getElementById('result-output').value = 'No results';
        }
    } catch (e) {
        document.getElementById('result-output').value = `Error: ${e.message}`;
    }
}

// Display the result of the user's query
function displayQueryResult(userResult) {
    // Normalize the result rows
    const normalizedRows = normalizeResult(userResult);

    // Calculate the maximum length of each column
    const colLengths = userResult.columns.map((col, index) => {
        return Math.max(
            col.length,
            ...normalizedRows.map(row => row[index].length)
        );
    });

    // Create a markdown table
    let output = '| ' + userResult.columns.map((col, i) => col.padEnd(colLengths[i])).join(' | ') + ' |\n';
    output += '| ' + colLengths.map(length => '-'.repeat(length)).join(' | ') + ' |\n';

    // Add the table rows
    normalizedRows.forEach(row => {
        output += '| ' + row.map((value, i) => value.padEnd(colLengths[i])).join(' | ') + ' |\n';
    });

    // Update the result output element with the markdown table
    document.getElementById('result-output').value = output;
}

// Check if the query is a read-only query
function isReadOnlyQuery(query) {
    const forbiddenKeywords = ['INSERT', 'UPDATE', 'DELETE', 'DROP', 'ALTER'];
    const upperQuery = query.toUpperCase();
    return !forbiddenKeywords.some(keyword => upperQuery.includes(keyword));
}

// Fetch and compare the result of the user's query with the expected result
function compareResults(challengeId, userResult) {
    const resultFile = `/sqlChallengeHub/results/result${challengeId}.sql`;

    fetch(resultFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${resultFile}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(expectedQuery => {
            // Execute the expected query to get the expected result
            const expectedResult = db.exec(expectedQuery)[0];

            if (!expectedResult) {
                displayErrorMessage('Error: No result was found to compare your output.');
                return;
            }

            const expectedResultFormatted = {
                columns: expectedResult.columns,
                rows: expectedResult.values
            };

            // Normalize data types
            normalizeResult(userResult);
            normalizeResult(expectedResultFormatted);

            // Check if the number of rows is the same
            if (userResult.rows.length !== expectedResultFormatted.rows.length) {
                displayErrorMessage('The result does not match the expected result. Please try again.');
                return;
            }

            // Convert rows to string representations for comparison
            const userRowsSet = new Set(userResult.rows.map(row => JSON.stringify(row)));
            const expectedRowsSet = new Set(expectedResultFormatted.rows.map(row => JSON.stringify(row)));

            // Check if every expected row is present in the user's result
            let allRowsMatch = true;
            for (const expectedRow of expectedRowsSet) {
                if (!userRowsSet.has(expectedRow)) {
                    allRowsMatch = false;
                    break;
                }
            }

            if (allRowsMatch) {
                displayFireworks();
                displaySuccessMessage('Congratulations! You have successfully completed the challenge.');
            } else {
                displayErrorMessage('The result does not match the expected result. Please try again.');
            }
        })
        .catch(error => console.error('Error comparing results:', error));
}

// Display a success message
function displaySuccessMessage(message) {
    displayMessage(message, 'green');
}

// Display an error message
function displayErrorMessage(message) {
    displayMessage(message, 'red');
}

// Common function to display a message
function displayMessage(message, color) {
    const resultOutput = document.getElementById('query-result');

    // Remove previous message if it exists
    const previousMessage = document.getElementById('result-message');
    if (previousMessage) {
        previousMessage.remove();
    }

    // Create and append the message
    const messageElement = document.createElement('div');
    messageElement.id = 'result-message';
    messageElement.textContent = message;
    messageElement.style.color = color; // Style the message
    messageElement.style.textAlign = 'center'; // Center the message
    resultOutput.appendChild(messageElement);
}

// Normalize data types in the result
function normalizeResult(result) {
    return result.rows.map(row => row.map(value => {
        if (value === null) {
            return 'NULL'; // Handle NULL values
        }
        if (typeof value === 'boolean') {
            return value ? 'TRUE' : 'FALSE'; // Convert boolean values to strings
        }
        if (!isNaN(value) && typeof value !== 'boolean') {
            return String(value); // Convert numbers to strings
        }
        return value;
    }));
}

// Display fireworks animation
function displayFireworks() {
    // Create a container for the fireworks
    const container = document.createElement('div');
    container.id = 'fireworks-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.zIndex = '9999'; // Ensure the container is on top of other elements
    document.body.appendChild(container);

    // Initialize and start the fireworks
    const fireworks = new Fireworks(container, {
        // Fireworks options
        speed: 2,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 50,
        trace: 3,
        explosion: 9,
        boundaries: {
            top: 50,
            bottom: container.clientHeight,
            left: 50,
            right: container.clientWidth
        }
    });
    fireworks.start();

    // Stop the fireworks after a few seconds
    setTimeout(() => {
        fireworks.stop();
        document.body.removeChild(container);
    }, 3000); // Adjust the duration as needed
}

// Show the challenge list and hide the SQL Playground
function showChallengeList() {
    // Update the URL to remove the challenge ID
    window.history.pushState({}, document.title, window.location.pathname);

    document.getElementById('sql-playground-app').style.display = 'none';
    document.getElementById('challenge-list').style.display = 'block';
}

// Clear Query and Result
function clearQuery() {
    resetQueryAndResult();
}

// Show the answer for the challenge
function showAnswer() {
    // Construct the path to the result SQL file based on the challengeId
    const filePath = `/sqlChallengeHub/results/result${currentChallengeID}.sql`;

    // Fetch the content of the result SQL file
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(query => {
            // Set the content of the query-input textarea
            const queryInput = document.getElementById('query-input');
            queryInput.value = query;
        })
        .catch(error => {
            console.error('Error fetching the query:', error);
        });
}

// Show the hint for the challenge
function showHint() {
    // Get the query-input textarea element
    const queryInput = document.getElementById('result-output');

    // Set the placeholder attribute to the hint value
    queryInput.value = '';
    queryInput.placeholder = hint;
}

// Go to the next challenge
function nextChallenge() {
    if (currentChallengeID < totalChallenges) {
        const nextChallengeID = currentChallengeID + 1;
        loadChallenge(nextChallengeID);
    } else {
        alert('You have completed all the challenges. Congratulations! 🎉');
    }
}

// Go to the previous challenge
function previousChallenge() {
    if (currentChallengeID > 1) {
        const previousChallengeID = currentChallengeID - 1;
        loadChallenge(previousChallengeID);
    } else {
        alert('There are no previous challenges.');
    }
}

// Tab key functionality for the textarea
document.getElementById('query-input').addEventListener('keydown', function (event) {
    const textarea = event.target;

    // Check if the Tab key was pressed
    if (event.key === 'Tab') {
        event.preventDefault(); // Prevent the default Tab behavior (focus shifting)

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        // Set the textarea's value to: text before caret + 4 spaces + text after caret
        const fourSpaces = '    ';
        textarea.value = textarea.value.substring(0, start) + fourSpaces + textarea.value.substring(start);

        // Move the caret
        textarea.selectionStart = textarea.selectionEnd = start + fourSpaces.length;
    }

    // Check if Ctrl+Enter was pressed
    if (event.key === 'Enter' && event.ctrlKey) {
        event.preventDefault(); // Prevent the default Enter behavior

        // Call the executeQuery function
        executeQuery();
    }

    // Check if Ctrl+/ was pressed
    if (event.key === '/' && event.ctrlKey) {
        event.preventDefault(); // Prevent the default / behavior

        // Call the comment/uncomment function
        toggleComment(textarea);
    }
});

// Comment/uncomment selected lines
function toggleComment(textarea) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    // Get the start and end line indexes
    const startLineStartIndex = text.lastIndexOf('\n', start - 1) + 1;
    const endLineEndIndex = text.indexOf('\n', end);
    const endLineEndIndexAdjusted = endLineEndIndex === -1 ? text.length : endLineEndIndex;

    // Get the current line(s)
    const selectedLines = text.substring(startLineStartIndex, endLineEndIndexAdjusted).split('\n');

    // Determine if we are commenting or uncommenting
    const isCommenting = selectedLines.every(line => !line.trim().startsWith('--'));

    const updatedLines = selectedLines.map(line => {
        if (isCommenting) {
            return '-- ' + line;
        } else {
            return line.replace(/^\s*--\s?/, '');
        }
    });

    // Update the textarea value with the commented/uncommented lines
    const beforeSelection = text.substring(0, startLineStartIndex);
    const afterSelection = text.substring(endLineEndIndexAdjusted);
    const updatedText = beforeSelection + updatedLines.join('\n') + afterSelection;
    textarea.value = updatedText;

    // Adjust the selection to encompass the newly commented/uncommented text
    textarea.selectionStart = start;
    textarea.selectionEnd = end + (updatedLines.join('\n').length - selectedLines.join('\n').length);
}