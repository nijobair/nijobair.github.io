let db;

// Initialize SQL.js and load the challenge list when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}` }).then(SQL => {
        db = new SQL.Database();
        loadChallengeList();
    }).catch(error => console.error('Error initializing SQL.js:', error));
});

// Load the list of challenges
function loadChallengeList() {
    const challengeFiles = [
        '/assets/sqlPlayground/challenges/challenge1.json',
        '/assets/sqlPlayground/challenges/challenge2.json',
        '/assets/sqlPlayground/challenges/challenge3.json'
    ];

    // Fetch challenge files and populate the challenge list
    Promise.all(challengeFiles.map(url => fetch(url).then(resp => {
        if (!resp.ok) {
            throw new Error(`Failed to fetch ${url}: ${resp.statusText}`);
        }
        return resp.json();
    }))).then(challenges => {
        const challengeList = document.getElementById('challenges');
        challengeList.innerHTML = ''; // Clear the list before adding new items
        challenges.forEach(challenge => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#" onclick="loadChallenge(${challenge.id})">${challenge.title}</a> - ${renderDifficulty(challenge.difficulty)}`;
            challengeList.appendChild(li);
        });
    }).catch(error => console.error('Error loading challenges:', error));
}

// Render difficulty as stars
function renderDifficulty(difficulty) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < difficulty ? '★' : '☆';
    }
    return stars;
}

// Load a specific challenge by its ID
function loadChallenge(id) {
    const challengeFile = `/assets/sqlPlayground/challenges/challenge${id}.json`;
    fetch(challengeFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${challengeFile}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(challenge => {
            const challengeContainer = document.getElementById('challenge-container');
            challengeContainer.innerHTML = `
                <h2>${challenge.title}</h2>
                <p>${challenge.description}</p>
                <div id="table-container"></div>
            `;
            document.getElementById('challenge-list').style.display = 'none';
            document.getElementById('sql-playground-app').style.display = 'block';

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
        fetch(`/assets/sqlPlayground/tables/${tableName}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch /assets/sqlPlayground/tables/${tableName}.json: ${response.statusText}`);
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
    let tableHTML = `<h3>Table: ${tableName}</h3><table border="1"><thead><tr>`;

    table.columns.forEach(column => {
        tableHTML += `<th>${column}</th>`;
    });

    tableHTML += `</tr></thead><tbody>`;

    table.rows.forEach(row => {
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
    try {
        const result = db.exec(query);
        if (result.length > 0) {
            const columns = result[0].columns;
            const values = result[0].values;
            let output = columns.join('\t') + '\n';
            values.forEach(row => {
                output += row.join('\t') + '\n';
            });
            document.getElementById('result-output').textContent = output;
        } else {
            document.getElementById('result-output').textContent = 'No results';
        }
    } catch (e) {
        document.getElementById('result-output').textContent = `Error: ${e.message}`;
    }
}

// Show the challenge list and hide the SQL Playground
function showChallengeList() {
    document.getElementById('sql-playground-app').style.display = 'none';
    document.getElementById('challenge-list').style.display = 'block';
}