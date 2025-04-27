---
featured: false
categories: powerbi deneb
title: "Deneb & Vega-Lite: Custom Visuals in Power BI - 02"
image: /assets/images/posts/powerbi/title-Deneb.png
excerpt: ""
---

## Introduction

In our last post, we learned what Vega-lite is, and why we would be interested in learning it. If you didn't read that post, I highly suggest you start with that post. You can read that [here](/posts/powerbi/deneb/deneb-and-vega-lite-01/).

Okay, before jumping into the syntax of Vega-lite, we will learn about some important concepts that will make writing Vega-lite logically a lot easier. Indeed, charting is like painting, and just like painters have terminologies like canvas, paper, etc. to describe where they paint on, Vega-lite also have some terms to describe where we create the charts. I found them very useful to learn at the beginning of learning Vega-lite. After all, we have to know where we are painting before painting anything, right? We learn about `canvas` today and `view` and `layer` in the next post. So, let's jump right in.

## `canvas`

Think of Vega-Lite's `canvas` like a real-life painting canvas. When an artist starts painting, they first need a blank canvas to work on. This blank space is where they add shapes, colors, and layers to create a complete painting. In the same way, in Vega-Lite, the `canvas` is the blank area where the visualization is drawn. It is the entire space that contains all the elements of the chart.

Usually, the canvas has a white background by default. We can specify the overall behavior of the visualization here. These specifications, in Vega-lite documentation they are called- as you would guess- specifications, flows down to everything inside the canvas. But you can always change a specification of a particular element separately. It works like CSS properties. The children gets the properties of their parent unless changed explicitly.

The good thing is, you don't have to define a canvas when you write code. It is implicitly created, and you can only have one canvas for one visualization. You can't draw one picture in two canvases, can you?

## `view`

When you make a chart, there might be times when you want to show different charts side by side on the same visualization. Like small multiples in Power BI. This is where `view` comes in in Vega-lite. Imagine, you divided your canvas into four parts to draw four pictures. In Vega-lite's term, each of those four division will be a `view`.

`veiw`s are special for they can have different backgrounds. Take the chart below for example, it has two views. One has a background lightgrey and the other lightblue. But the canvas has white background. 

<div id="chart-01"></div>

<script type="text/javascript">
    async function run() {
        const local = '/my_collections/trial.json';
        const spec = "https://raw.githubusercontent.com/vega/vega/master/docs/examples/bar-chart.vg.json";
        const trial = "https://raw.githubusercontent.com/nijobair/Vega-lite-Examples/master/trial.vg.json";

        const result = await vegaEmbed("#chart-01", local, {
            actions: true,
        });

        console.log(result);
    }

    run();
</script>

okay, let's write something here to fill up the place.