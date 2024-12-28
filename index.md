---
layout: default
---
<main class="home-wrapper">

<!-- Hero Section -->
{% include homePage/heroSection.html %}

<!-- About -->
{% include homePage/about.html %}

<!-- Services that I offer -->
<!-- <div class="index-my-services" markdown="1">

<div class="home-title">
<h2>My Services</h2>
</div>

{% include services.html %}

</div> -->

<!-- Projects -->
<!-- <div class="index-projects" markdown="1">

<div class="home-title">
<h2>Projects</h2>
</div>

{% for project in site.projects %}
- [{{ project.title }}]({{ project.url | relative_url }})
{% endfor %}

</div> -->

<!-- Acquired certifications -->
{% include homePage/badges.html %}

<!-- Publications: blog, tutorial, papers, learning resources, etc. -->
{% include homePage/featuredPosts.html %}

<!-- Scrolling Logos -->
{% include homePage/scrollingLogos.html %}

</main>