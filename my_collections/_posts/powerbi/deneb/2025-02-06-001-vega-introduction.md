---
featured: true
category: powerbi
tags: ["Power BI", "Vega", "Deneb"]
label: "Vega · Tutorial"
read_time: "~8 min"
vega: true
title: "Deneb & Vega - 01: Custom Visuals in Power BI"
image: /assets/images/posts/powerbi/001-title.jpeg
excerpt: "Some charts just aren't possible with Power BI's native visuals—but with Vega and Deneb, you can create stunning custom visuals like gradient area charts and radial plots. This post introduces Vega, the language behind Deneb, and lays the foundation for learning it step by step."
---

# Introduction

Have you ever looked at a Power BI report or dashboard and wondered how some of the visualizations were created? With Power BI's continuous advancements, many complex visualizations can now be built using native charts, conditional formatting, and DAX measures. However, there are still some charts that simply can’t be created using built-in visuals.

Take, for example, the following chart taken from the Vega example gallery.

<div id="chart-01" data-caption="Chart: A dummy bar chart made using Vega"></div>
<script type="text/javascript">
  async function run() {
    const container = document.getElementById('chart-01');
    const width = container.clientWidth - 40;
    const height = width * 9 / 16;
    const specs = '/vegaCharts/001-01-vega-example.json';
    const result = await vegaEmbed("#chart-01", specs, {
      actions: true,
    //   width: width,
    //   height: height
    });
    console.log(result);
  }
  document.addEventListener('DOMContentLoaded', run);
</script>

Another example is the event calendar below that I created for one of my clients.

<div class="powerbi-embed has-caption" data-caption="Dashboard: Event visualization with custom calendar">
    <iframe title="Event Calendar" src="https://app.powerbi.com/view?r=eyJrIjoiOTYxNDNmM2UtNzJlOC00YzdjLWFhNTctZTAzM2Q0Y2JjZDJhIiwidCI6ImRjM2YyNGU5LTAyYjktNGZiMC05NzE2LWQ1NTYzOTVlNWVlNSIsImMiOjl9&pageName=8b09270edfd60077e6bf" frameborder="0" allowFullScreen="true"></iframe>
</div>

While Power BI does offer many custom visuals through the App Store, some are paid while others are free. Among the free ones, **Deneb** stands out as, in my opinion, the best. Deneb is certified by Microsoft, meaning that it doesn't access external services or resources and can be exported to PDF or displayed in emails. Pretty cool, right?

Now, plenty of resources explain what Deneb is and how it works, so I won’t go into that. Instead, I want to focus on the language Deneb uses to create these stunning visuals: **Vega** and **Vega-Lite**. Think of them as twin sisters—except Vega is more complex to grasp but also offers more customizations. In this series of posts, we will learn about **Vega**.

# What is Vega?

Let’s take a look at the definition of Vega from its [official website](https://vega.github.io/vega/#:~:text=Vega%20is%20a%20visualization%20grammar%2C%20a%20declarative%20language%20for%20creating%2C%20saving%2C%20and%20sharing%20interactive%20visualization%20designs.%20With%20Vega%2C%20you%20can%20describe%20the%20visual%20appearance%20and%20interactive%20behavior%20of%20a%20visualization%20in%20a%20JSON%20format%2C%20and%20generate%20web%2Dbased%20views%20using%20Canvas%20or%20SVG.){:target="_blank" rel="noopener"}:

> Vega is a visualization grammar, a declarative language for creating, saving, and sharing interactive visualization designs. With Vega, you can describe the visual appearance and interactive behavior of a visualization in a JSON format, and generate web-based views using Canvas or SVG.

Simply put, **Vega is a structured way of describing visualizations**, much like grammar in a language. Just as grammar defines the rules for adjectives, adverbs, and prepositions, Vega provides a defined set of rules for building charts. Both Vega and Vega-Lite use JSON syntax, which consists of key-value pairs like: `"name": "Nazmul"` or `"date": "2024-08-05"`. This means that every visualization you create in Vega and Vega-Lite is simply a structured JSON object describing the chart.

# Understanding Vega the Right Way

Now comes the real challenge: **How do we make sense of this language in a logical and intuitive way?**

Surely, learning English grammar wasn’t easy. And unfortunately, most existing resources don’t explain Vega’s syntax in a way that’s beginner-friendly. The [Official Documentation](https://vega.github.io/vega/docs/){:target="_blank" rel="noopener"} is comprehensive, but if you jump straight into it—like I did—you’ll feel like you’re reading Martian! **So, Should You Give Up?**

*Absolutely not!* That’s where this series comes in.

In this series of posts, I’ll break down the logical structure of Vega in an easy-to-understand way. I’ll not only explain the concepts but also provide plenty of examples to reinforce them.

### What You Should Know Before We Start

1. **Progressive Learning** – Each post builds on the previous ones. I’ll assume you’ve read the earlier posts and won’t repeat concepts unnecessarily. So, make sure you follow along from the beginning to get the most out of this series.

2. **Power BI vs. Vega** – Vega is a standalone visualization language, while Deneb is its Power BI implementation. There are some Power BI-specific features in Deneb that don’t exist in standard Vega. For now, we’ll mainly focus Vega, and once we understand it well, we’ll explore how it works inside Power BI.

# What’s Next?

In the next post, we'll explore the online Vega editor and the code editor of Deneb. These tools have some features that will help us understand and debug our code easily.

So, are you ready to master Vega? Let’s get started!
