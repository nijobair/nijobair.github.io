---
layout: blog
title: Excel
permalink: /blog/excel/
---

{% assign excel_posts = site.posts | where: "categories", "excel" %}

{% for post in excel_posts %}
<div class="post-item">
    <div class="post-image">
        {% if post.image %}
        <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
        {% else %}
        <img src="{{ '/assets/images/featured_default.png' | asset_url }}" alt="{{ post.title }}">
        {% endif %}
    </div>

    <div class="post-content">
        <h4><a href="{{ post.url | relative_url }}">{{ post.title | markdownify }}</a></h4>
        <p>{{ post.excerpt }}</p>
    </div>
</div>
{% endfor %}
