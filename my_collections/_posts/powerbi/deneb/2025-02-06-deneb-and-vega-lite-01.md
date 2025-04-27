---
featured: true
categories: powerbi deneb
title: "Deneb & Vega-Lite: Custom Visuals in Power BI - 01"
image: /assets/images/posts/powerbi/title-Deneb.png
excerpt: ""
---

## Introduction

Have you ever looked at a Power BI report or dashboard and wondered how some of the visualizations were created? With Power BI's continuous advancements, many complex visualizations can now be built using native charts, conditional formatting, and DAX measures. However, there are still some charts that simply can’t be created using built-in visuals.

Take, for example, the gradient area chart below. Doesn’t it look amazing? Shouldn’t it be a native chart in Power BI? Yet, as of now, it isn’t.

<div id="chart-01"></div>

<script type="text/javascript">
    async function run() {
        const local = '/my_collections/01/area-with-gradient.json';
        const spec = "https://raw.githubusercontent.com/vega/vega/master/docs/examples/bar-chart.vg.json";
        const trial = "https://raw.githubusercontent.com/nijobair/Vega-lite-Examples/master/trial.vg.json";

        const result = await vegaEmbed("#chart-01", local, {
            actions: true,
        });

        console.log(result);
    }

    run();
</script>

Or consider this radial chart. It’s another example of something you can’t create with Power BI’s native charts.

<div id="chart-02"></div>

<script type="text/javascript">
    async function run() {
        const local = '/my_collections/01/radial-plot.json';
        const spec = "https://raw.githubusercontent.com/vega/vega/master/docs/examples/bar-chart.vg.json";
        const trial = "https://raw.githubusercontent.com/nijobair/Vega-lite-Examples/master/trial.vg.json";

        const result = await vegaEmbed("#chart-02", local, {
            actions: true,
        });

        console.log(result);
    }

    run();
</script>

While Power BI does offer many custom visuals through the App Store, some are paid while others are free. Among the free ones, **Deneb** stands out as, in my opinion, the best. Deneb is certified by Microsoft, meaning that it doesn't access external services or resources and can be exported to PDF or displayed in emails. Pretty cool, right?

Now, plenty of resources explain what Deneb is and how it works, so I won’t go into that. Instead, I want to focus on the language Deneb uses to create these stunning visuals: **Vega** and **Vega-Lite**. Think of them as twin sisters—except Vega is more complex to grasp. So, we’ll stick with **Vega-Lite** for now.

## What is Vega-lite?

Let’s take a look at the definition of Vega-Lite from its [official website](https://vega.github.io/vega-lite/#:~:text=Vega%2DLite%20is%20a%20high%2Dlevel%20grammar%20of%20interactive%20graphics.%20It%20provides%20a%20concise%2C%20declarative%20JSON%20syntax%20to%20create%20an%20expressive%20range%20of%20visualizations%20for%20data%20analysis%20and%20presentation.):

> Vega-Lite is a high-level grammar of interactive graphics. It provides a concise, declarative JSON syntax to create an expressive range of visualizations for data analysis and presentation.

Simply put, **Vega-Lite is a structured way of describing visualizations**, much like grammar in a language. Just as grammar defines the rules for adjectives, adverbs, and prepositions, Vega-Lite provides a defined set of rules for building charts. Both Vega and Vega-Lite use JSON syntax, which consists of key-value pairs like: `"name": "Nazmul"` or `"date": "2024-08-05"`. This means that every visualization you create in Vega-Lite is simply a structured JSON object describing the chart.

## Understanding Vega-Lite the Right Way

Now comes the real challenge: **How do we make sense of this language in a logical and intuitive way?**

Surely, learning English grammar wasn’t easy. And unfortunately, most existing resources don’t explain Vega-Lite’s syntax in a way that’s beginner-friendly. The [Official Documentation](https://vega.github.io/vega-lite/docs/) is comprehensive, but if you jump straight into it—like I did—you’ll feel like you’re reading Martian.

## So, Should You Give Up?

Absolutely not! That’s where this series comes in.

In this series of posts, I’ll break down the logical structure of Vega-Lite in an easy-to-understand way. I’ll not only explain the concepts but also provide plenty of examples to reinforce them.

#### What You Should Know Before We Start

1. **Progressive Learning** – Each post builds on the previous ones. I’ll assume you’ve read the earlier posts and won’t repeat concepts unnecessarily. So, make sure you follow along from the beginning to get the most out of this series.

2. **Power BI vs. Vega-Lite** – Vega-Lite is a standalone visualization language, while Deneb is its Power BI implementation. There are some Power BI-specific features in Deneb that don’t exist in standard Vega-Lite. For now, we’ll focus on pure Vega-Lite, and once we understand it well, we’ll explore how it works inside Power BI.

## What’s Next?

In the next post, we’ll start from scratch and build our first Vega-Lite visualization. We’ll break down its syntax logically, step by step.

So, are you ready to master Vega-Lite? Let’s get started!