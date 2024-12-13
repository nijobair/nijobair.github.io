---
featured: true
categories: vba excel
title: "My Approach to Naming Conventions in VBA Code"
image: /assets/images/post_vba/title-VBANaming.png
excerpt: "Learn the naming conventions I use in VBA to keep code clean, readable, and easy to maintain. Simple tips for variables, procedures, and more!"
---

## Introduction

As a VBA developer, I’ve come to realize that maintaining clean, consistent, and understandable code is critical, especially for projects that grow over time or involve collaboration. One of the simplest yet most effective ways to achieve this is by using a clear **naming convention** for variables, procedures, and objects in VBA.

In this post, I’ll share the naming convention I follow in my VBA projects. It’s simple, logical, and ensures that anyone reading the code (including future me 🤔!) can easily understand its purpose.

## What are Naming Conventions?

Naming conventions are like roadmaps 🛣️ for your code. They provide a clear, consistent way of labeling variables, functions, and other elements so that anyone reading your code can quickly understand its purpose. Imagine trying to navigate a city where street signs are missing or randomly labeled—it would be frustrating and time-consuming. The same applies to coding. When names are clear and follow a pattern, the code becomes easier to read, debug, and extend.

In VBA, where you often deal with objects like worksheets, ranges, and user forms, a good naming convention is especially valuable. It helps you quickly identify what a variable represents or what a procedure does, reducing the chances of errors and making your projects much easier to manage over time.

## Why Naming Conventions Matter

Naming conventions aren’t set in stone, and they’re definitely not a rule you must follow to write code. But here’s the thing—they make life so much easier. Think of them as labels on jars in your kitchen. Sure, you could leave them unlabeled, but having *"Sugar"* and *"Salt"* clearly marked saves you from awkward mistakes.

In coding, naming conventions serve a similar purpose. They help you quickly understand what each variable, function, or object does without needing to decipher it every time. For VBA, where you're often working with Excel objects, a clear naming convention can make your code feel less like a maze and more like a well-organized toolkit. While not obligatory, it’s a small effort that pays off big when debugging, revisiting old projects, or collaborating with others.

## My Naming Conventions

When it comes to naming conventions, I like to keep things practical and straightforward. The goal isn’t to make the names overly complex or follow rigid rules but to create a structure that’s easy to remember and intuitive to use. My approach ensures that variables, procedures, and objects are self-explanatory, helping me (and anyone else reading the code) quickly understand their purpose without digging too deep. Here's how I structure my naming conventions:

#### 1. Variables

I use **camel 🐫 case** along with certain prefixes to make the purpose clear at a glance. If you’re unfamiliar, **camel case** is a style where the first word is lowercase, and each subsequent word starts with an uppercase letter—like this: `myVariableName`. It keeps names compact and readable.

For variables, I add the prefix `var` before all variable names to immediately identify them as variables. This approach ensures consistency and prevents any confusion with object names or other identifiers. As for the actual name, I try to keep it short yet descriptive. For example:

```vba
Sub subVariablesEx()
    'Declare Variables:
    Dim varUserName As String
    Dim varIsEmpty As Boolean
    Dim varTotalCost As Double
    Dim varPricesArr() As Variant
    ...
End Sub
```

#### 2. Procedures & Functions

For procedures and functions, I like to keep things straightforward by using prefixes that immediately distinguish between the two. I prefix all my procedures with sub and my functions with fun. This makes it clear at a glance whether a block of code performs an action (`sub`) or returns a value (`fun`). Additionally, I name my functions in all caps after the prefix, like `funCALC_TOTAL()`, to make them stand out. For example, a procedure might be named `subUpdateDashboard`, while a function could be `funSQUARE_ROOT()`. This approach keeps my code organized and makes it easier to understand the purpose of each routine. Example:

```vba
'PROCEDURE NAME EXAMPLE:
Sub subEditEntry()    
    'Necessary Codes 
End Sub

'FUNCTION NAME EXAMPLE:
Function funSTD()
    'Necessary Calculations    
End Function
```

#### 3. Constants

When it comes to constants, I like to keep things bold and obvious. I use all uppercase letters with underscores to separate words, which makes them stand out from the rest of the code. For instance, `PI`, `MY_CONSTANT`, or `PLANK_CONST` are some examples of how I name my constants. This style not only keeps the code clean but also acts as a clear indicator that these values are fixed and not meant to be altered. It’s a simple yet effective way to avoid confusion.

#### 4. Modules

If you’ve read this far, you might assume I use the prefix mod for module names. Well, I don’t—mainly because module names are rarely used inside the code. Instead, I stick with camel case, but I capitalize the first letter as well. For example, I name my modules `DataEntry`, `EditWorkSheet`, `DataCleaning`, and so on. This keeps the names simple, clean, and easy to recognize when navigating through the project.

#### 5. Sheets

When working with sheets, I like to keep their names both functional and easy to identify. I use the prefix sht to make it immediately clear that I’m referencing a worksheet, followed by a name that reflects its purpose. For instance, `shtDashboard` is for the dashboard, `shtTransactions` handles transaction data, and `shtPivotTables` stores pivot tables. This way, even in a large project with multiple sheets, I know exactly which one I’m working with without any guesswork. It’s all about clarity and avoiding unnecessary confusion.

#### 6. Object Names

Naming objects like UserForms and controls requires a method that ensures clarity and distinction. I use specific prefixes to indicate the type of object, making it effortless to understand its role in the project. Here's a quick overview of the prefixes I use:

<div class="df_before" markdown="1">
<br>

| Prefix | Object            | Example           |
|--------|-------------------|-------------------|
| frm     | UserForm         | frmLogin          |
| lbl     | Label            | lblStatus         |
| txt     | TextBox          | txtUserName       |
| btn     | CommandButton    | btnSubmit         |
| chk     | Checkbox         | chkAgree          |
| opt     | OptionButton     | optBangladesh     |
| img     | Image            | imgCatFight       |

</div>

## Wrap-up Example

To wrap things up, here's a practical example that incorporates many of the naming conventions discussed. This code snippet shows how different types of variables, procedures, and objects work together in a simple VBA project. You'll see camel case for variables, prefixes for procedures and functions, and uppercase for constants. By following these conventions, the code is not only organized but also much easier to read and maintain.

```vba
Sub subCalculateInvoice()
    ' Declare Variables:
    Dim varProductName As String
    Dim varQuantity As Integer
    Dim varUnitPrice As Double
    Dim varTotalPrice As Double
    Dim varInvoiceData() As Variant
    
    ' Constants:
    Const TAX_RATE As Double = 0.07
    
    ' Initialize Variables:
    varProductName = "Laptop"
    varQuantity = 5
    varUnitPrice = 1000.0
    
    ' Calculate Total:
    varTotalPrice = funCALCULATE_TOTAL(varQuantity, varUnitPrice)
    
    ' Output Data to Worksheet:
    shtInvoice.Cells(1, 1).Value = varProductName
    shtInvoice.Cells(1, 2).Value = varQuantity
    shtInvoice.Cells(1, 3).Value = varTotalPrice
End Sub

Function funCALCULATE_TOTAL(varQty As Integer, varPrice As Double) As Double
    funCALCULATE_TOTAL = varQty * varPrice * (1 + TAX_RATE)
End Function
```

## Common Pitfalls to Avoid

While naming conventions are essential, there are a few common pitfalls that you should avoid to keep your code clean and consistent. One mistake is **using vague or overly generic names** for variables and functions. For example, names like `varData` or `funProcess` don't give enough context about what the variable or function is doing. Instead, aim for names that are descriptive and specific to the task, such as `varCustomerName` or `funCALCULATE_TOTAL`.

Another pitfall is **inconsistency in naming styles**. Switching between camel case, snake case, or using random prefixes can confuse you or others who need to read your code later. For instance, mixing `varTotalCost` with `total_cost` or `VarProductName` with `productname` creates unnecessary complexity. Stick to one naming convention and apply it consistently throughout your project. Finally, be careful with abbreviations; while abbreviations can make names shorter, they can also make your code harder to understand. Always prioritize clarity over brevity.

## Conclusion

In the end, a solid naming convention can make a world of difference when working with VBA code. It’s all about creating an organized, consistent structure that allows you (and others) to navigate the code with ease. Whether you’re working solo on a project or collaborating with a team, following clear and intuitive naming practices saves time, reduces errors, and makes your code much easier to maintain.

I’ve found that keeping things simple yet descriptive, with prefixes for easy identification, works best for me. Of course, naming conventions can vary from one developer to another, and there’s no one-size-fits-all approach. But if you’re looking for a way to make your VBA projects cleaner and more understandable, I hope this post gave you some useful ideas!

**What naming conventions do you follow in your VBA projects?** I’d love to hear your thoughts or suggestions in the comments below! Let’s keep the conversation going and learn from each other.