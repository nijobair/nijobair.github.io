---
featured: false
category: powerbi
tags: ["Power BI", "Vega", "Deneb"]
label: "Vega · Tutorial"
read_time: "~8 min"
math: true
vega: true
graph: true
title: "A Dummy Article with Different HTML Elements"
image: 
excerpt: "Dummied by a dummy-clod, dummier and dumb, dummy-up, dummy-down, feeling totally numb. Dum-dum-dummies dumber as they dummy-talk loud, making every dumber dummy dummy-proud."
---

# Heading Hierarchy

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

A well-designed article should have a clear visual hierarchy.

The `h1` normally represents the article title, while `h2` and `h3` divide the article into logical sections.


# Text Formatting

This is **bold text**.

This is _italic text_.

This is **_bold and italic text_**.

This is ~~deleted text~~.

This is <u>underlined text</u>.

This is <mark>highlighted text</mark>.

This is <small>small text</small>.

This is H<sub>2</sub>O.

This is X<sup>2</sup>.

This is `inline code`.

This is <kbd>Ctrl</kbd> + <kbd>C</kbd>.

You can also use <abbr title="Key Performance Indicator">KPI</abbr> abbreviations.

Here is a link [GitHub](https://github.com) that opens in the same tab. And [GitHub](https://github.com){:target="_blank" rel="noopener"} will open in a new tab.

# Images

![Excalidraw Diagram](/assets/images/excalidraw-trial.svg){: .has-caption.excalidraw.ml-auto.mr-auto }
{: data-caption="Diagram: Demo diagram from Excalidraw"}

![Image with caption](https://picsum.photos/1200/600){: .has-caption.post-img.ml-auto.mr-auto}
{: data-caption="Figure: Demo image with caption"}

<div class="powerbi-embed has-caption" data-caption="Dashboard: Event visualization with custom calendar">
    <iframe title="Event Calendar" src="https://app.powerbi.com/view?r=eyJrIjoiOTYxNDNmM2UtNzJlOC00YzdjLWFhNTctZTAzM2Q0Y2JjZDJhIiwidCI6ImRjM2YyNGU5LTAyYjktNGZiMC05NzE2LWQ1NTYzOTVlNWVlNSIsImMiOjl9&pageName=8b09270edfd60077e6bf" frameborder="0" allowFullScreen="true"></iframe>
</div>

<div id="chart-01" class="has-caption" data-caption="Chart: Dummy chart demonstrating Vega functionalities"></div>
<script type="text/javascript">
  async function run() {
    const container = document.getElementById('chart-01');
    const width = container.clientWidth - 40;
    const height = width * 9 / 16;
    const specs = '/vegaCharts/example.json';
    const result = await vegaEmbed("#chart-01", specs, {
      actions: true,
      width: width,
      height: height
    });
    console.log(result);
  }
  document.addEventListener('DOMContentLoaded', run);
</script>

{% include jsxGraph.html function="renderCustomBoard" id="custom-board-01" caption="Chart: Demo for JSXGraph"%}

# Blockquotes

> Data is valuable only when it helps someone make a better decision.

A longer blockquote can contain multiple paragraphs 🚀.

> Analysis requires curiosity.
>
> Visualization requires clarity.
>
> Communication requires understanding your audience.

Nested Blockquotes

> This is the first level.
>
> > This is the second level.
>
> > > This is the third level.

# Unordered Lists

- Sales
  - Revenue
  - Units
  - Orders
- Customers
  - New customers
  - Returning customers
- Products
  - Best sellers
  - Worst sellers

# Ordered Lists

1. Data preparation
   1. Remove duplicates
   2. Handle missing values
   3. Standardize formats
2. Analysis
   1. Calculate KPIs
   2. Compare periods
   3. Identify anomalies
3. Reporting
   1. Build dashboard
   2. Present insights
   3. Recommend action

# Task Lists

- [x] Collect data
- [x] Clean data
- [x] Build data model
- [x] Create measures
- [ ] Validate results
- [ ] Present findings

---

# Definition List

Revenue
: The total income generated from selling products or services.

Profit
: The amount remaining after subtracting costs from revenue.

Margin
: Profit expressed as a percentage of revenue.

KPI
: A measurable value used to evaluate performance against a business objective.

# Code

A simple Python calculation:

```python
revenue = 275
quantity = 65

average_revenue = revenue / quantity

print(average_revenue)
```

SQL Example

```sql
SELECT
    category,
    SUM(revenue) AS total_revenue,
    SUM(quantity) AS units_sold
FROM sales
GROUP BY category
ORDER BY total_revenue DESC;
```

DAX Example

```DAX
Total Revenue =
SUM ( Sales[Revenue] )
```

Power Query Example

```m
let
    Source = Excel.CurrentWorkbook(){[Name="Sales"]}[Content],
    ChangedType = Table.TransformColumnTypes(
        Source,
        {
            {"Revenue", type number},
            {"Quantity", Int64.Type}
        }
    )
in
    ChangedType
```

When writing SQL, the `SUM()` function can be used to calculate totals.

# Mathematical Expressions

### 1. Global Sets & Custom Macros
* **Inline Sets**: Let $x \in \R$, $y \in \C$, $z \in \Z$, and $n \in \N$.
* **Vector Sum Macro (`\vectorsum{n}`)**:
  $$ \vectorsum{5} = \vec{v}_1 + \vec{v}_2 + \vec{v}_3 + \vec{v}_4 + \vec{v}_5 $$
* **Highlight Macro (`\highlight{math}`)**:
  $$ \highlight{\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}} $$

### 2. Physics & Quantum Mechanics (`physics`)
* **Partial Derivatives**: $\pdv{f}{x}$ and mixed second derivatives:
  $$ \pdv[2]{f}{x}{y} = \pdv{}{x}\left(\pdv{f}{y}\right) $$
* **Schrödinger Equation with Bra-Ket Notation**:
  $$ i\hbar \pdv{\Psi}{t} = \hat{H}\Psi \implies \mel{\psi_a}{\hat{H}}{\psi_b} = E_a \braket{\psi_a}{\psi_b} $$

### 3. Chemistry Equations (`mhchem`)
* **Precipitation Equilibrium**:
  $$ \ce{Ag+(aq) + Cl-(aq) <=> AgCl(v)} $$
* **Thermochemical Reaction with Conditions**:
  $$ \ce{2H2(g) + O2(g) ->[{Pt\text{ catalyst}}][{\Delta}] 2H2O(l)} \quad \Delta H = -571.6\text{ kJ} $$

### 4. Advanced Colors & Canceling (`color` / `xcolor` & `cancel`)
* **Color Mixing & Hex Codes**:
  $$ \textcolor{blue!60!red}{\text{60\% Blue + 40\% Red}} \quad \text{and} \quad \textcolor{#ff5733}{\text{Hex Color \#FF5733}} $$
* **Canceling Terms in Algebraic Simplification**:
  $$ \frac{(x - 1)(x + 3)\cancel{(2x + 5)}}{\xcancel{(2x + 5)}\bcancel{(x - 1)}} = x + 3 $$

### 5. Alignment, Numbering & Extensible Arrows (`mathtools` & AMS)
* **Numbered `align` Environment with Extensible Arrows**:
  $$
  \begin{align}
    A &\xRightarrow[\text{decomposition}]{\text{heat}} \textcolor{red}{\ce{2NaNO3}} + \ce{O2} \\
    B &\xrightarrow[k_{-1}]{k_1} \highlight{\sum_{i=1}^{n} X_i^2} \in \R
  \end{align}
  $$

# Horizontal Rule

The horizontal rule below should be visually distinct.

---

# Table

<figure class="table-wrapper" markdown="1">
<figcaption>A table with caption</figcaption>

| Month    |  Revenue | Orders | Customers |  Profit | Margin |
| -------- | -------: | -----: | --------: | ------: | -----: |
| January  |  $82,400 |  4,120 |     2,840 | $18,500 |  22.5% |
| February |  $85,700 |  4,380 |     2,910 | $19,200 |  22.4% |
| March    |  $91,300 |  4,720 |     3,080 | $21,100 |  23.1% |
| April    |  $95,600 |  5,020 |     3,240 | $22,900 |  23.9% |
| May      | $101,200 |  5,340 |     3,410 | $24,800 |  24.5% |
| June     | $108,700 |  5,720 |     3,680 | $27,100 |  24.9% |

</figure>

# Video

<video controls width="100%">
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    Your browser does not support the video element.
</video>

# Audio

<audio controls width="100%">
    <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
</audio>

# Details and Summary

<details>
<summary>Click to reveal the analytical conclusion</summary>

The analysis suggests that revenue growth was primarily driven by increasing order volume.

However, profitability should be monitored because increasing revenue does not necessarily mean increasing profit.

</details>

# Footnotes

Data visualization is an important part of analytical communication.[^1]

[^1]: Visualization can make complex information easier to understand.

A KPI should always be evaluated against an appropriate benchmark.[^benchmark]

[^benchmark]: The benchmark could be a previous period, budget, target, competitor, or industry standard.

# Long-Form Paragraph

A professional analytical report should provide enough context for the reader to understand not only what happened but also why it happened and what should happen next. This means that the analyst needs to understand the business process behind the data. A beautifully designed dashboard can still fail if it presents irrelevant metrics, uses misleading comparisons, or forces stakeholders to perform the interpretation themselves. Good analytical communication therefore combines accurate calculations, appropriate visualizations, concise explanations, and actionable recommendations. The objective is not to overwhelm the reader with information but to make the important information easier to find and understand.
