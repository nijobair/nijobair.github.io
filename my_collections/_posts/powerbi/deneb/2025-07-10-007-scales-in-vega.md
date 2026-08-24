---
category: powerbi
tags: ["Power BI", "Vega", "Deneb"]
label: "Vega · Tutorial"
read_time: "~8 min"
vega: true
math: true
title: "Deneb & Vega - 07: Define the Scales"
image: /assets/images/posts/powerbi/001-title.jpeg
excerpt: "Scales are the bridge between your data and the canvas. Learn what Vega scales are, why every chart needs them, and how to use different scale types with practical examples."
---

# Introduction

In the previous post, we shaped our data into exactly the form we wanted. Now it's time to tell Vega how that data should be translated into positions, sizes, and colors on the canvas. This is where scales come in.

Scales are one of the most important concepts in Vega. Every chart uses them, whether you're creating a simple bar chart or a highly interactive custom visual in Deneb. Once you understand scales, you'll understand how Vega connects your data to the visual elements on the screen.

In this post, we'll learn what scales are, why we need them, how they work, and the scale types you'll use most often in Vega and Deneb.

# What Are Scales?

A **scale** is a function that converts values from your dataset into visual values on the canvas.

Think of it as a translator between **data space** and **screen space**. Your dataset contains values like `120`, `450`, or `950`, but the canvas only understands pixels. A scale is responsible for converting one into the other. Let's use a simple dataset throughout this section.

<figure class="table-wrapper" markdown="1">
<figcaption>Table 01: Sales data</figcaption>

| Month | Sales |
|:-----:|:-----:|
|  Jan  |  120  |
|  Feb  |  300  |
|  Mar  |  650  |
|  Apr  |  950  |

</figure>

Suppose our chart is **300 pixels tall**. The sales values range from **0 to 1000**, so we need to fit that range into a canvas that is only **300 pixels** high.

## Without Scales

If Vega didn't have scales, you would have to calculate the pixel position for every value yourself. The normalization formula would look like this:

$$\frac{300-0}{1000-0}\times\text{datum.sales}$$

Now every sales value has to be converted manually.

<figure class="table-wrapper" markdown="1">
<figcaption>Table 02: Sales values converted to pixels</figcaption>

| Sales | Pixel Height |
|:-----:|:------------:|
|  120  |    36 px     |
|  300  |    90 px     |
|  650  |   195 px     |
|  950  |   285 px     |

</figure>

Your mark would need to contain something like this:

```json
{
  "y": {"expr": "height - (datum.sales / 1000) * 300"},
  "y2": {"value": 300}
}
```

That works... but it's not very practical.

### What happens when the data changes?

Imagine next month's data looks like this.

<figure class="table-wrapper" markdown="1">
<figcaption>Table 03: Sales data of the next month</figcaption>

| Month | Sales |
|:-----:|:-----:|
|  Jan  |   200 |
|  Feb  |   800 |
|  Mar  |  1200 |
|  Apr  |  1600 |

</figure>

The maximum sales value is no longer `1000`. It's `1600`. Now your old calculation is wrong. A value of `1600` becomes:

$$0.3\times1600=480\text{ px}$$

Your bar is now **480 pixels tall** on a canvas that's only **300 pixels** high. Part of the chart will be drawn outside the canvas. So you'd have to update the formula everywhere:

$$\frac{300-0}{1600-0}\times\text{datum.sales}$$

And if the maximum changes again next week? You have to edit the calculation again. That's exactly the problem scales solve.

## With Scales

Instead of calculating pixel positions yourself, you simply tell Vega:

- The **domain** of my data is the `Sales` column.
- The **range** is the height of the canvas.

```json
{
  "name": "y",
  "type": "linear",
  "domain": {"data": "dataset", "field": "Sales"},
  "range": [{"signal": "height"}, 0]
}
```

Now Vega automatically figures out the minimum and maximum sales values and maps them to the canvas. For our first dataset, Vega internally does something equivalent to:

<figure class="table-wrapper" markdown="1">
<figcaption>Table 04: Sales values converted to pixel positions</figcaption>

| Sales | Pixel Position |
|:-----:|:--------------:|
| 120 | 264 px |
| 300 | 210 px |
| 650 | 105 px |
| 950 | 15 px |

</figure>

Notice that we never calculated these values ourselves. Vega did it for us. Now replace the dataset with the new one where sales go up to `1600`. We **don't change the scale at all**. Vega recalculates everything automatically.

<figure class="table-wrapper" markdown="1">
<figcaption>Table 05: Sales values converted to pixel positions</figcaption>

| Sales | Pixel Position |
|:-----:|:--------------:|
| 200 | 262.5 px |
| 800 | 150 px |
| 1200 | 75 px |
| 1600 | 0 px |

</figure>

The chart still fits perfectly inside the same **300-pixel canvas**.

That's the real power of scales. You describe the relationship between the data and the canvas once, and Vega automatically adapts whenever the data changes. Whether your sales range from `0–1000`, `0–1600`, or even `0–1,000,000`, you never have to rewrite the positioning logic.

# The "scales" Block

Scales are defined inside the `scales` block, which is a top-level property of a Vega specification.

```json
{
  "scales": [
    {
      "name": "xScale",
      "type": "band",
      "domain": {"data": "dataset", "field": "Month"},
      "range": "width"
    }
  ]
}
```

Just like the `data` and `marks` blocks, `scales` takes an array. That means you can define multiple scales in the same visualization.

A typical chart has at least two scales:

- An **x-scale** for horizontal positioning.
- A **y-scale** for vertical positioning.

More advanced visuals often define additional scales for color, size, opacity, or even symbol shapes.

# How Scales Work

Every scale has two important concepts: **domain** and **range**. The **domain** represents the values coming from your data. The **range** represents the visual values on the canvas. You can think of it like this:

> **Domain → Scale → Range**

The scale takes a value from the domain and converts it into the corresponding value in the range.

# The Most Common Scale Types

Vega supports many scale types, but you'll use a few of them most of the time.

## 1. Band Scale

A **band** scale is used for categorical axes.

It's the standard choice for:

- Bar charts.
- Column charts.
- Heatmaps.

```json
{
  "name": "x",
  "type": "band",
  "domain": {"data": "dataset", "field": "Category"},
  "range": "width"
}
```

Each category gets its own evenly sized band across the canvas.

One special feature of band scales is that Vega also knows the width of each band. That becomes useful later when we create bars.

For example:

```json
"width": {
  "scale": "x",
  "band": 1
}
```

tells Vega that each bar should occupy the full width of its category band.

## 2. Linear Scale

A **linear** scale is the most common scale for numeric values.

Use it for:

- Bar heights.
- Line charts.
- Scatter plots.
- Area charts.

```json
{
  "name": "y",
  "type": "linear",
  "domain": {"data": "dataset", "field": "Sales"},
  "range": "height"
}
```

A linear scale preserves proportional distances.

If one value is twice as large as another, its visual position is also twice as far along the range.

This makes linear scales perfect for continuous numeric data.

## 3. Time Scale

Dates are continuous values, so Vega provides a dedicated **time** scale.

```json
{
  "name": "x",
  "type": "time",
  "domain": {"data": "dataset", "field": "Date"},
  "range": "width"
}
```

Unlike a band scale, a time scale positions values according to chronological order rather than equally spaced categories.

This is the scale you'll almost always use for line charts that show values over time.

## 4. Ordinal Scale

An **ordinal** scale maps categories to discrete visual values instead of positions.

The most common example is color.

```json
{
  "name": "color",
  "type": "ordinal",
  "domain": {
    "data": "dataset",
    "field": "Region"
  },
  "range": ["#2563EB", "#EA580C", "#16A34A"]
}
```

Now each region receives a different color.

Ordinal scales can also map categories to shapes, symbols, or other discrete visual properties.

# Using Scales Inside Marks

Defining a scale does not draw anything by itself. A mark has to reference the scale.

```json
"marks": [
  {
    "type": "rect",
    "from": {"data": "dataset"},
    "encode": {
      "update": {
        "x": {
          "scale": "x",
          "field": "Category"
        },
        "y": {
          "scale": "y",
          "field": "Sales"
        }
      }
    }
  }
]
```

Here's what's happening:

- The `x` property takes the value from the `Category` field and passes it through the `x` scale.
- The `y` property takes the value from the `Sales` field and passes it through the `y` scale.

The mark never works with pixel values directly. It simply asks the scale to translate the data value into a visual value.

This is one of the reasons Vega specifications stay clean and reusable. Multiple marks can reference the same scale.

# Why Does the Y-Axis Look Backwards?

One thing confuses almost everyone when they start using Vega.

If the range is `"height"`, why do larger values appear lower on the canvas?

The answer is that the Vega canvas starts at the **top-left corner**.

That means:

- `0` pixels is at the top.
- Larger pixel values move downward.

For most charts, we want higher values to appear higher on the screen, so we reverse the range.

```json
"range": [
  {"signal": "height"},
  0
]
```

Now the mapping works like this:

- The minimum value appears at the bottom.
- The maximum value appears at the top.

You'll see this pattern in almost every Vega bar chart, line chart, or area chart.

# Nice Scales

Sometimes the minimum and maximum values in your data produce awkward axis labels.

Suppose your sales values range from `13` to `97`.

Without any adjustment, Vega might generate tick marks like:

`13, 34, 55, 76, 97`

Not very reader-friendly.

You can ask Vega to round the domain to nicer values.

```json
{
  "name": "y",
  "type": "linear",
  "domain": {"data": "dataset", "field": "Sales"},
  "range": [{"signal": "height"}, 0],
  "nice": true
}
```

Now Vega expands the domain to something like:

`0, 20, 40, 60, 80, 100`

The underlying data stays the same, but the axis becomes much easier to read.

# Starting the Scale at Zero

Bar charts usually start at zero because viewers compare lengths.

Vega lets you enforce that using the `zero` property.

```json
{
  "name": "y",
  "type": "linear",
  "domain": {"data": "dataset", "field": "Sales"},
  "range": [{"signal": "height"}, 0],
  "zero": true
}
```

Even if your smallest value is `45`, Vega expands the domain so the axis starts at `0`.

For line charts, you don't always want this behavior because it can flatten meaningful variation.

# Padding Between Categories

Band scales also let you control the spacing between categories.

```json
{
  "name": "x",
  "type": "band",
  "domain": {"data": "dataset", "field": "Category"},
  "range": "width",
  "padding": 0.2
}
```

Increasing the padding creates more space between adjacent bands.

A padding of `0` makes the bands touch each other.

Larger padding values make bars narrower and leave gaps between categories.

This is one of the easiest ways to improve the appearance of a column or bar chart.

# A Complete Example

Let's put everything together with a simple column chart.

```json
{
  "$schema": "https://vega.github.io/schema/vega/v6.json",
  "width": 400,
  "height": 200,

  "data": [
    {
      "name": "sales",
      "values": [
        {"month": "Jan", "sales": 28},
        {"month": "Feb", "sales": 55},
        {"month": "Mar", "sales": 43},
        {"month": "Apr", "sales": 91}
      ]
    }
  ],

  "scales": [
    {
      "name": "x",
      "type": "band",
      "domain": {"data": "sales", "field": "month"},
      "range": "width",
      "padding": 0.15
    },
    {
      "name": "y",
      "type": "linear",
      "domain": {"data": "sales", "field": "sales"},
      "range": [{"signal": "height"}, 0],
      "nice": true,
      "zero": true
    }
  ],

  "marks": [
    {
      "type": "rect",
      "from": {"data": "sales"},
      "encode": {
        "update": {
          "x": {"scale": "x", "field": "month"},
          "width": {"band": 1, "scale": "x"},
          "y": {"scale": "y", "field": "sales"},
          "y2": {"scale": "y", "value": 0},
          "fill": {"value": "#2563EB"}
        }
      }
    }
  ]
}
```

This example contains everything we've learned so far:

- A categorical `band` scale for the x-axis.
- A numeric `linear` scale for the y-axis.
- A reversed y-range.
- A zero baseline.
- Nice axis values.
- Padding between the columns.

# Common Scale Properties

Here are the scale properties you'll use most frequently.

| Property | Purpose |
|----------|---------|
| `name` | Gives the scale a unique name so marks can reference it. |
| `type` | Defines how values are mapped (`band`, `linear`, `time`, `ordinal`, etc.). |
| `domain` | Specifies the input values from the dataset or manually. |
| `range` | Specifies the visual output values on the canvas. |
| `nice` | Expands numeric domains to cleaner, rounded values. |
| `zero` | Ensures the numeric domain includes zero. |
| `padding` | Adds spacing between categories in band scales. |

These few properties cover the majority of scales you'll create in everyday Vega work.

# Conclusion

Scales are the bridge between your data and your visualization. They take raw values from your dataset and translate them into positions, colors, sizes, and other visual properties on the canvas.

Once you understand **domain** and **range**, the rest of Vega becomes much easier to read and write. You'll define scales once and reuse them across multiple marks, keeping your specifications clean and consistent.

In the next post, we'll build on this foundation by looking at **axes**—the visual representation of scales. We'll learn how to draw axes, customize labels, control tick marks, and make our Vega charts much easier to read.