---
featured: true
categories: dax powerbi
title: "My Solution to the '25 Days of DAX Fridays!' Challenge – Ed1 by CURBAL"
image: /assets/images/post_dax-challenge/dax-challenge-ed1.png
excerpt: "Explore a beginner's solution to the '25 days of DAX Fridays!' Challenge by CURBAL."
---

## Introduction

Learning `DAX` can be scary and frustrating at times.`import pandas as pd`  Understanding some functions can take time. But with practice anything is possible, so is learning DAX. Unlike other programming languages, DAX doesn't have that rich resources. This makes it ever harder to learn DAX. Luckily, there are some, though not enough, resources which provides us with a chance to practice DAX. One such resource is the **"25 days of DAX Fridays!"** Challenge by **CURBAL**. In this post, I will share my solution to the first edition of the challenge.

## About the Challenge


## My Solutions


#### Challenge 01:
- **How many current products cost less than $20?**
```dax
CALCULATE(
    COUNT(Products[ProductID]),
    FILTER(
        Products,
        AND(Products[Unit Price] < 20, Products[Discontinued] = FALSE())
    )   -- Products[Unit Price] < 20 && Products[Discontinued] = FALSE() --> Same as AND()
)
```

#### Challenge 02:
- **Which product is the most expensive?**
```dax
CALCULATE(
    VALUES(Products[ProductName]),
    FILTER(
        Products,
        Products[UnitPrice] = MAX(Products[UnitPrice])
    )
)
```

#### Challenge 03:
- **What is the average unit price for our products?**
```dax
AVERAGE(
    Products[UnitPrice]
)
```

#### Challenge 04:
- **How many products are above the average unit price?**
```dax
VAR
    avgPrice = AVERAGE(Orders[UnitPrice])
RETURN
    CALCULATE(
    COUNTA(Products[ProductID]),
    FILTER(
        Products,
        Products[UnitPrice] > avgPrice   -- Why can't I use the measure from the previous day (3) here?
    )
)
```

#### Challenge 05:
- **How many products cost between $15 and $25? (inclusive)**
```dax
CALCULATE(
    COUNTA(Products[ProductID]),
    FILTER(
        Products,
        AND(Products[UnitPrice] >= 15, Products[UnitPrice] <= 25)
    )
)
```

#### Challenge 06:
- **What is the average number of products per order?**
```dax
AVERAGEX(
    SUMMARIZE(
        Orders,
        Orders[OrderID],
        "ProductCount", COUNTA(Orders[ProductID])
    ),
    [ProductCount]
)
```

#### Challenge 07:
- **What is the order value in $ of open orders? (Not shipped yet)**
```dax
CALCULATE(
    [Total sales],
    Orders[ShippedDate] = BLANK()
)
```

#### Challenge 08:
- **How many orders are "single item" (only one product ordered)?**
```dax
COUNTROWS(
    FILTER(
        SUMMARIZE(
            Orders,
            Orders[OrderID],
            "TotalProducts", COUNTA(Orders[ProductID])
        ),
        [TotalProducts] = 1
    )
)
```

#### Challenge 09:
- **What is the average sales per transaction for "Romero y tomillo"?**
```dax
CALCULATE(
    AVERAGEX(
        VALUES(Orders[OrderID]),
        [Total sales]
    ),
    FILTER(
        Customers,
        Customers[CompanyName] = "Romero y tomillo"
    )
)
```

#### Challenge 10:
- **How many days since "North/ South" last purchase?**
```dax
DATEDIFF(
    CALCULATE(
        MAX(Orders[OrderDate]), // LASTDATE gives the same result.
        Customers[CompanyName] = "North/South"
    ),
    TODAY(),
    DAY
)
```
<div><img loading="lazy" class="lightbox-image" src="{{ page.image | relative_url }}" alt="{{ page.title }}"></div>

#### Challenge 11:
- **How many customers have ordered only once?**
```dax
COUNTROWS(
    FILTER(
        // This is a multi-line comment.
        -- Okay?
        SUMMARIZE(
            Customers,
            Customers[CustomerID],
            "TotalOrders", DISTINCTCOUNT(Orders[OrderID])
        ),
        [TotalOrders] = 1
    )
)
```

#### Challenge 12:
- **How many new customers in the current year?**
```dax
COUNTROWS(
    FILTER(
        // This is a single line comment.
        SUMMARIZE(
            Customers,
            Customers[CustomerID],
            "FirstOrder", FIRSTDATE(Orders[OrderDate])
        ),
        YEAR([FirstOrder]) = YEAR(TODAY())
    )
)
```

#### Challenge 13:
- **How many lost customers in the current year?**
```dax
COUNTROWS(
    FILTER(
        SUMMARIZE(
            Customers,
            Customers[CustomerID],
            "LastOrder", LASTDATE(Orders[OrderDate])
        ),
        [Las Order] < DATE(YEAR(TODAY()), 1, 1) && [LastOrder] <> BLANK()
    )
)
```

#### Challenge 14:
- **How many customers have NEVER purchased _Queso Cabrales_**
```dax
VAR AllCustomers = VALUES(Customers[CustomerID])
VAR QCCustomers =
    CALCULATETABLE(
        VALUES(Orders[CustomerID]),
        FILTER(
            ALL(Orders),
            Orders[ProductID] = 11
        )
    )
RETURN
    CALCULATE(
        DISTINCTCOUNT(Customers[CustomerID]),
        EXCEPT(AllCustomers, QCCustomers)
    )

    -- I didn't understand this formula properly? Is there any easier way?
```
...
```

#### Challenge 12:
- **How many new customers in 2022?**
```
...
```

#### Challenge 13:
- ****
```
...
```

#### Challenge 14:
- ****
```
...
```

#### Challenge 15:
- **Blah Blah Blah**
```dax
...
```

#### Challenge 16:
- ****
```
...
```

#### Challenge 17:
- ****
```
...
```

#### Challenge 18:
- ****
```
...
```

#### Challenge 19:
- ****
```
...
```

#### Challenge 20:
- ****
```
...
```

#### Challenge 21:
- ****
```
...
```

#### Challenge 22:
- ****
```
...
```

#### Challenge 23:
- ****
```
...
```

#### Challenge 24:
- ****
```
...
```

#### Challenge 25:
- ****
```
...
```