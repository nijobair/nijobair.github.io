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

Just like the `data` and `marks` blocks, `scales` takes an array. That means you can define multiple scales in the same visualization. Some of the properties that each scale definition can have are:

<figure class="table-wrapper" markdown="1">
<figcaption>Table 06: Scale properties</figcaption>

| Name | Description | Example |
|:-----:|:--------------|:-------|
| `name` | **Required**. A unique name for the scale. Scales and projections share the same namespace; names must be unique across both. | `{"name": "xScale"}` |
| `type` | The type of the scale. The default value is `linear` | `{"type": "band"}` |
| `domain` | The domain of input data values for the scale. It can take literal values, a signal or a data reference. | `{"domain": [0, 500] / {"signal": "myDomain"} / {"data": "sales", "field": "Total Sales"}}` |
| `range` | The range of the scale, representing the set of visual values. It can take literal values, a signal or a data reference. Vega also offers some predefined ranges for convinience. | `{"range": [0, 500] / {"signal": "myRange"} / "width"}` |
| `round` | A boolean flag (default false) that rounds numeric output values to integers. Helpful for snapping to a pixel grid. | `{"round": true}` |

</figure>

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

- **Band Scale**: A **band** scale is used for categorical axes. A **band** scale is used for categorical axes. It's the standard choice for bar charts, column charts, and heatmaps.
- **Linear Scale**: A **linear** scale is the most common scale for numeric values. It is mostly used for line charts, scatter plots, area charts, etc.
- **Time Scale**: Dates are continuous values, so Vega provides a dedicated **time** scale. This is the scale you'll almost always use for line charts that show values over time.
- **Ordinal Scale**: An **ordinal** scale maps categories to discrete visual values instead of positions. This is mostly used for mapping categories to colors.

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

The mark never works with pixel values directly. It simply asks the scale to translate the data value into a visual value. This is one of the reasons Vega specifications stay clean and reusable. Multiple marks can reference the same scale.

# Conclusion

Scales are the bridge between your data and your visualization. They take raw values from your dataset and translate them into positions, colors, sizes, and other visual properties on the canvas.

Once you understand **domain** and **range**, the rest of Vega becomes much easier to read and write. You'll define scales once and reuse them across multiple marks, which keeps your Vega specifications much cleaner and easier to maintain.

In the next few posts, we'll dive deeper into the most common scale types in Vega, including **band**, **linear**, **time**, and **ordinal** scales. We'll see how each one works and when to use it. Stay tuned!