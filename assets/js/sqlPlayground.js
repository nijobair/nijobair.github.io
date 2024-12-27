let db;

document.addEventListener('DOMContentLoaded', () => {
    initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}` }).then(SQL => {
        db = new SQL.Database();
        loadChallenges();
    });
});

function loadChallenges() {
    fetch('/assets/sqlPlayground/challenges/challenge1.json')
        .then(response => response.json())
        .then(challenge => {
            const challengeContainer = document.getElementById('challenge-container');
            challengeContainer.innerHTML = `
        <h2>${challenge.title}</h2>
        <p>${challenge.description}</p>
      `;
            loadTable(challenge.table);
        })
        .catch(error => console.error('Error loading challenges:', error));
}

function loadTable(tableName) {
    fetch(`/assets/sqlPlayground/tables/${tableName}.json`)
        .then(response => response.json())
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
        })
        .catch(error => console.error('Error loading table:', error));
}

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