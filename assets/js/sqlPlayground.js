let db;
let SQL;
let currentChallengeID;
let hint;

const resultPlaceHolder = "Write a query and click the 'Run Query' button or press 'Ctrl + Enter' to see the result...";
let totalChallenges;

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

    const challengesFile = '/sqlPlayground/challenges.json';
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

            const challengeContainer = document.getElementById('challenge-container');
            challengeContainer.innerHTML = `
                <h2>Challenge ${challenge.id}</h2>
                <p><strong>Category:</strong> ${challenge.category}</p>
                <p><strong>Description:</strong> ${challenge.description}</p>
                <p><strong>Credit:</strong> <i>${challenge.credit}</i></p>
                <div id="table-container"></div>
            `;
            document.getElementById('query-input').value = '';
            document.getElementById('result-output').placeholder = resultPlaceHolder;
            document.getElementById('result-output').textContent = '';

            document.getElementById('challenge-list').style.display = 'none';
            document.getElementById('sql-playground-app').style.display = 'flex';

            // Reset the database and load new tables for the challenge
            db = new SQL.Database();
            loadTables(challenge.tables || [challenge.table]);
        })
        .catch(error => console.error('Error loading challenge:', error));
}

// Load tables specified in the challenge
function loadTables(tableNames) {
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = ''; // Clear the table container before loading new tables
    tableNames.forEach(tableName => {
        fetch(`/sqlPlayground/tables/${tableName}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch /sqlPlayground/tables/${tableName}.json: ${response.statusText}`);
                }
                return response.json();
            })
            .then(table => {
                const createTableSQL = `
                    CREATE TABLE ${tableName} (${table.columns.map(col => `${col} TEXT`).join(', ')});
                `;
                db.run(createTableSQL);

                table.rows.forEach(row => {
                    const insertSQL = `
                        INSERT INTO ${tableName} VALUES (${row.map(val => `'${val}'`).join(', ')});
                    `;
                    db.run(insertSQL);
                });

                displayTableData(tableName, table);
            })
            .catch(error => console.error('Error loading table:', error));
    });
}

// Display table data in the SQL Playground
function displayTableData(tableName, table) {
    const tableContainer = document.getElementById('table-container');
    let tableHTML = `<p><strong>Table:</strong> ${tableName}${table.rows.length > 9 ? ' <i>(first 9 rows)</i>' : ''}</p><table border="1" style="align-self: center;"><thead><tr>`;

    // Add table headers
    table.columns.forEach(column => {
        tableHTML += `<th>${column}</th>`;
    });

    tableHTML += `</tr></thead><tbody>`;

    // Limit the rows to the first 9 if there are more than 9 rows
    const rowsToDisplay = table.rows.length > 9 ? table.rows.slice(0, 9) : table.rows;

    // Add table rows
    rowsToDisplay.forEach(row => {
        tableHTML += `<tr>`;
        row.forEach(value => {
            tableHTML += `<td>${value}</td>`;
        });
        tableHTML += `</tr>`;
    });

    tableHTML += `</tbody></table>`;
    tableContainer.innerHTML += tableHTML;
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

            let output = userResult.columns.join('\t') + '\n';
            userResult.rows.forEach(row => {
                output += row.join('\t') + '\n';
            });
            document.getElementById('result-output').value = output;

            // Fetch and compare results
            compareResults(currentChallengeID, userResult);
        } else {
            document.getElementById('result-output').value = 'No results';
        }
    } catch (e) {
        document.getElementById('result-output').value = `Error: ${e.message}`;
    }
}

// Check if the query is a read-only query
function isReadOnlyQuery(query) {
    const forbiddenKeywords = ['INSERT', 'UPDATE', 'DELETE', 'DROP', 'ALTER'];
    const upperQuery = query.toUpperCase();
    return !forbiddenKeywords.some(keyword => upperQuery.includes(keyword));
}

// Fetch and compare the result of the user's query with the expected result
function compareResults(challengeId, userResult) {
    const resultFile = `/sqlPlayground/results/result${challengeId}.json`;
    fetch(resultFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${resultFile}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(expectedResult => {
            // Normalize data types
            normalizeResult(userResult);
            normalizeResult(expectedResult);

            if (JSON.stringify(userResult) === JSON.stringify(expectedResult)) {
                displayFireworks();
                const resultOutput = document.getElementById('query-result');

                // Remove previous message if it exists
                const previousMessage = document.getElementById('result-message');
                if (previousMessage) {
                    previousMessage.remove();
                }

                // Create and append success message
                const successMessage = document.createElement('div');
                successMessage.id = 'result-message';
                successMessage.textContent = 'Congratulations! You have successfully completed the challenge.';
                successMessage.style.color = 'green'; // Optional: style the message
                successMessage.style.textAlign = 'center'; // Optional: center the message
                resultOutput.appendChild(successMessage);
            } else {
                const resultOutput = document.getElementById('query-result');

                // Remove previous message if it exists
                const previousMessage = document.getElementById('result-message');
                if (previousMessage) {
                    previousMessage.remove();
                }

                // Create and append error message
                const errorMessage = document.createElement('div');
                errorMessage.id = 'result-message';
                errorMessage.textContent = 'The result does not match the expected result. Please try again.';
                errorMessage.style.color = 'red'; // Optional: style the message
                errorMessage.style.textAlign = 'center'; // Optional: center the message
                resultOutput.appendChild(errorMessage);
            }
        })
        .catch(error => console.error('Error comparing results:', error));
}

// Normalize data types in the result
function normalizeResult(result) {
    result.rows = result.rows.map(row => row.map(value => {
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
    document.getElementById('query-input').value = '';
    document.getElementById('result-output').placeholder = resultPlaceHolder;
    document.getElementById('result-output').value = '';
}

// Show the answer for the challenge
function showAnswer() {
    // Construct the path to the answer file based on the challengeId
    const filePath = `/sqlPlayground/answers/answer${currentChallengeID}.txt`;

    // Fetch the content of the answer file
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(answer => {
            // Set the content of the query-input textarea
            const queryInput = document.getElementById('query-input');
            queryInput.value = answer;
        })
        .catch(error => {
            console.error('Error fetching the answer:', error);
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

        // Call the runQuery function
        executeQuery();
    }
});