---
title: "Area Chart with Gradient Fill"
date: 2024-08-30
---
## Is it working?

![This is a picture](/assets/images/post_sql/title.png)

What a waste of time this is! Are you really able to live like this? How are you coping with the pain? Do you even feel any pain?

```javascript
{
  // Dataset
  "data": {
    "name": "dataset"
  },

  // Layers.
  "layer": [

    {
      "mark": {
        "type": "area",
        "line": {
          "color": "brown"
          },
          "interpolate": "monotone",
        "color": {
          "x1": 0,
          "x2": 0,
          "y1": 1,
          "y2": 0,
          "gradient": "linear",
          "stops": [
            {
              "offset": 0,
              "color": "white"
            },
            {
              "offset": 1,
              "color": "darkblue"
            }
          ]
        }
      }
    }, // Area Layer.

    {
      "mark": {
        "type": "bar",
        "width": 2,
        "color": {
          "x1": 0,
          "x2": 0,
          "y1": 1,
          "y2": 0,
          "gradient": "linear",
          "stops": [
            {
              "offset": 0,
              "color": "white"
            },
            {
              "offset": 1,
              "color": "brown"
            }
          ]
        }
      }
    }, // Gradient Bar Layer.

    {
      "mark": {
        "type": "text",
        "fontWeight": "bold",
        "yOffset": -15,
        "size": 12
      },

      "encoding": {
        "text": {
          "field": "Total Actual",
        "format": "$#0,.K",
        "formatType": "pbiFormat"
        }
      }
    } // Data Labels.

  ],

  // Encodings.
  "encoding": {

    "x": {
      "field": "Month Name",
      "type": "nominal",
      "axis": {
        "labelAngle": 0
      }
    },

    "y": {
      "field": "Total Actual",
      "type": "quantitative",
      "axis": null
    }
  }
}
```