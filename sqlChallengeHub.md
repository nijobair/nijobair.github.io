---
layout: sqlChallengeHub
title: SQL Challenge Hub
image: /assets/images/sqlChallengeHub.png
permalink: /sql-challenge-hub/
---

<div id="challenge-list" markdown="1">

# SQL Challenge Hub

<img class="featured-image" src="{{ page.image | relative_url }}" alt="{{ page.title }}">

## Introduction

Hi there! Welcome to the **SQL Challenge Hub!** Whether you're just starting out with SQL or already have some experience, one thing is for sure—practice is the key to mastering it. That’s why I’ve put together a collection of SQL challenges with varying levels of difficulty. These challenges are designed to give you hands-on experience and help you sharpen your SQL skills. The best part? It’s all completely **FREE!** No sign-ups, no strings attached. Just pick a problem and dive in!

**Challenge ID \| Category \| *Credit* \| Difficulty**

{% assign sorted_files = site.data.sqlChallengeHub | numeric_sort %}

{% for file in sorted_files %}
  {% assign challenge = file[1] %}
  
  {% assign difficulty = challenge.difficulty %}
  {% assign stars = '' %}
  
  {% for i in (1..5) %}
    {% if i <= difficulty %}
      {% assign stars = stars | append: '★' %}
    {% else %}
      {% assign stars = stars | append: '☆' %}
    {% endif %}
  {% endfor %}
  
  - <a href="#" onclick="loadChallenge({{ challenge.id }})">**Challenge {{ challenge.id }}** \| {{ challenge.category }} \| *{{ challenge.credit.name }}* \| {{ stars }}</a>
{% endfor %}

## Wanna contribute?

Have a cool SQL challenge you'd like to share? Or maybe you want to help others learn SQL for free? I'd love to hear from you! Send me your challenge, and I’ll review it. If it fits, I’ll add it to the list with a shoutout to you in the **credits**. Let’s make learning SQL fun, accessible, and free for everyone!

</div>

<div id="sql-playground-app" style="display:none;">

  <div class="buttons">
    <button onclick="previousChallenge()">Previous</button>
    <button onclick="showChallengeList()">Back to Challenges</button>
    <button onclick="nextChallenge()">Next</button>
  </div>

  <div id="challenge-container"></div>

  <p><strong>Query:</strong></p>
  <textarea id="query-input" placeholder="Write your SQL query here...

[Ctrl + /] --> Comment/uncomment selected lines.
[Ctrl + Enter] --> Run Query."></textarea>

  <div class="buttons">
    <button onclick="executeQuery()">Run Query</button>
    <button onclick="showHint()">Hint 👀</button>
    <button onclick="clearQuery()">Clear 🔄</button>
    <button onclick="showAnswer()">Show Answer</button>
  </div>

  <p><strong>Output:</strong></p>
  <div id="query-result">
    <textarea id="result-output" readonly></textarea>
  </div>

  <div class="buttons">
    <button onclick="previousChallenge()">Previous</button>
    <button onclick="showChallengeList()">Back to Challenges</button>
    <button onclick="nextChallenge()">Next</button>
  </div>

</div>




<script src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/sql-wasm.js"></script>
<script src="{{ '/assets/js/sqlChallengeHub.js' | relative_url }}"></script>
<script src="https://cdn.jsdelivr.net/npm/fireworks-js/dist/fireworks.min.js"></script>