---
layout: default
---
# Data Analyst & Physics Lover

<!-- Introduction -->
<div class="index-introduction" markdown="1">

I am a passionate data analyst with a background in physics, driven by a fascination with uncovering hidden patterns and extracting meaningful insights from data. I leverage my analytical skills and scientific knowledge to tackle complex problems, develop data-driven solutions, and create impactful visualizations.

This website showcases my work, including data analysis projects, research publications, and technical skills. I am eager to collaborate with individuals and organizations seeking to unlock the power of data and gain a deeper understanding of their world.

</div>


<!-- Educational information -->
<div class="index-education" markdown="1">

## Education

- Studied Physics at the [University of Dhaka](https://www.du.ac.bd/) in Bangladesh.

- Studying Physics at [Marmara University](http://fzk.fen.marmara.edu.tr/en/) with the prestigious full-ride [Türkiye Bursları](https://www.turkiyeburslari.gov.tr/) (Turkish Scholarships).

</div>

<!-- Services that I offer -->
<div class="index-my-services" markdown="1">

## My Services

{% include services.html %}

</div>

<!-- Projects -->
<div class="index-projects" markdown="1">

## Projects

{% for project in site.projects %}
- [{{ project.title }}]({{ project.url | relative_url }})
{% endfor %}

</div>

<!-- Acquired certifications -->
<div class="index-achievements" markdown="1">

## Achievements

{% include badges.html %}

</div>

<!-- Publications: blog, tutorial, papers, learning resources, etc. -->
<div id="index-publications" markdown="1">

## Publications

{% assign featured_posts = site.posts | where: "featured", true %}
{% for post in featured_posts %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}

...[more posts 📝]({% link _blog/1_all.md %})

</div>

<!-- Social Media Links -->
<div class="index-contact" markdown="1">

## Get in Touch

{% include social-media.html %}

</div>

```python
import pandas as pd
import matplotlib.pyplot as plt
```

```sql
SELECT *
FROM that_table
WHERE
    client_name = "Nazmul"
```

```javascript
{
    "name": "Nazmul",
    "age": 25,
    "current status": "heartbroken"
}
```