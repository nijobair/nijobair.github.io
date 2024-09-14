---
layout: blog
title: Others
permalink: /blog/others/
---

{% assign other_posts = site.posts | where: "categories", "others" %}

{% for post in other_posts %}
<div class="post-item">
    <div class="post-image">
        {% if post.image %}
        <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
        {% else %}
        <img src="{{ '/assets/images/featured_default.png' | asset_url }}" alt="{{ post.title }}">
        {% endif %}
    </div>

    <div class="post-content">
        <h5><a href="{{ post.url | relative_url }}">{{ post.title | markdownify }}</a></h5>
        <p>{{ post.excerpt }}</p>
    </div>
</div>
{% endfor %}