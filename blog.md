---
layout: blog
permalink: /blog/
---

{% for post in site.posts %}
<div class="post-item {{ post.categories | join: ' ' }}">
    <div class="post-image">
        {% if post.image %}
        <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
        {% else %}
        <img src="{{ '/assets/images/featured_default.png' | asset_url }}" alt="{{ post.title }}">
        {% endif %}
    </div>

    <div class="post-content">
        {% for category in post.categories %}
            <span class="category">{{ category }}</span>
        {% endfor %}
        <h5><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h5>
        <p>{{ post.excerpt }}</p>
    </div>
</div>
{% endfor %}