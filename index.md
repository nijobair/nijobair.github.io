---
layout: default
---

<!-- Introduction -->
# Data Analyst & Physics Lover

I am a passionate data analyst with a background in physics, driven by a fascination with uncovering hidden patterns and extracting meaningful insights from data. I leverage my analytical skills and scientific knowledge to tackle complex problems, develop data-driven solutions, and create impactful visualizations.

This website showcases my work, including data analysis projects, research publications, and technical skills. I am eager to collaborate with individuals and organizations seeking to unlock the power of data and gain a deeper understanding of their world.


<!-- Educational information -->
## Education

- Studied Physics at the [University of Dhaka](https://www.du.ac.bd/) in Bangladesh.

- Studying Physics at [Marmara University](http://fzk.fen.marmara.edu.tr/en/) with the prestigious full-ride [Türkiye Bursları](https://www.turkiyeburslari.gov.tr/) (Turkish Scholarships).

<!-- Services that I offer -->
## My Services

{% include services.html %}

<!-- Projects -->
## Projects

{% for project in site.projects %}
- [{{ project.title }}]({{ project.url | relative_url }})
{% endfor %}

<!-- Acquired certifications -->
## Achievements

{% include badges.html %}

<!-- Publications: blog, tutorial, papers, learning resources, etc. -->
## Publications

{% assign featured_posts = site.posts | where: "featured", true %}
{% for post in featured_posts %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}

...[more posts 📝]({% link _blog/1_all.md %})

<!-- Social Media Links -->
## Get in Touch

{% include social-media.html %}

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