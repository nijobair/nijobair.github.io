---
layout: default
---
<main class="home-wrapper">

{% include homePage/heroSection.html %}

{% include homePage/aboutSection.html %}
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
<!-- <div class="index-achievements" markdown="1">

<div class="home-title">
<h2>Achievements</h2>
</div>

{% include badges.html %}

</div> -->

<!-- Publications: blog, tutorial, papers, learning resources, etc. -->
<!-- <div id="index-publications" markdown="1">

<div class="home-title">
<h2>Publications</h2>
</div>

{% assign featured_posts = site.posts | where: "featured", true %}
{% for post in featured_posts %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}

...[more posts 📝]({% link _blog/1_all.md %})

</div> -->

</main>