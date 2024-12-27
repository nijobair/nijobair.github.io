---
layout: default
title: SQL Playground
permalink: /sql-playground/
---

<div id="sql-playground-app">
  <h1>SQL Playground</h1>
  <div id="challenge-container"></div>
  <textarea id="query-input" placeholder="Write your SQL query here..."></textarea>
  <button onclick="executeQuery()">Run Query</button>
  <pre id="result-output"></pre>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/sql-wasm.js"></script>
<script src="{{ '/assets/js/sqlPlayground.js' | relative_url }}"></script>
<link rel="stylesheet" href="{{ '/assets/css/sqlPlayground/style.css' | relative_url }}">