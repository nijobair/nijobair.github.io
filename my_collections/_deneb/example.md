---
title: "Example"
date: 2024-08-30
---
## Is it working?

What a waste of time this is! Are you really able to live like this? How are you coping with the pain? Do you even feel any pain?

```javascript
{
"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
"description": "A simple bar chart with embedded data.",
"data": {
    "values": [
    {"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43}
    ]
},
"mark": "bar",
"encoding": {
    "x": {"field": "a", "type": "nominal", "axis": {"title": "Category"}},
    "y": {"field": "b", "type": "quantitative", "axis": {"title": "Value"}}
}
} // This is a JSON script written in javascript.
```