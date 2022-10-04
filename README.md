# Xmlify

A very simple function family that I made to make xml parsing and building easier. I didn't need a fully fledged xml parsing ability since most apis that this is used for return plain xml:

```xml
<response>
    <receipt>
        <!-- ...receipt info -->
    </receipt>
</response>
```

and parses that directly into:

```ts
{
    response: {
        receipt: {
            // ... receipt info
        }
    }
}
```

So you are able to just get the xml response as a nice cute js object. I also built a few handlers to deal with edge cases that are used as mutators in the function, i.e. `camelize`, `snakefy`, and 'pascalize' which will change the properties to the right case. This helps since some apis will require you to send your xml with properties in snake case and then return xml in pascal case. So using these little interceptors you can easily force the return or built xml to conform to your naming convention.

## 🤌 Usage

`builder({ tree, mutator })`

the main function that is used to create an xml string from an object. By default it will take what you passed it and return it exactly as written as xml. i.e.

```ts
// usage
const xml = builder({
    tree: {
        parent: {
            orderId: 'my order id',
            somethingElse: 'meep',
            whaaa: 'yeet'
        }
    }
});

// makes
"<parent>
    <orderId>my order id</orderId>
    <somethingElse>meep</somethingElse>
    <whaaa>yeet</whaaa>
</parent>"

// convert the names to snake_case
const xml = builder({ tree, mutator: toSnakeCase });

// makes
"<parent>
    <order_id>my order id</order_id>
    <something_else>meep</something_else>
    <whaaa>yeet</whaaa>
</parent>"

// use custom mutator
const xml = builder({ tree, mutator: (property) => property.toLowerCase() });

// makes
"<parent>
    <orderid>my order id</orderid>
    <somethingelse>meep</somethingelse>
    <whaaa>yeet</whaaa>
</parent>"
```

`parser({ xml, mutator })`

This reverses the above, and returns an object from a serialized xml string. You can either have the object mirror the properties by the exact name they have in the xml (default) or provide a mutator that will change and standardize the property names from the xml return.

```ts
// usage
const xml = parser({
    xml: "<parent><OrderId>my order id</OrderId><SomethingElse>meep<somethingElse><Whaaa>yeet</Whaaa></parent>",
});

// makes -> see how the properties are in PascalCase like the xml is ^^
{
    parent: {
        OrderId: 'my order id',
        SomethingElse: 'meep',
        Whaaa: 'yeet'
    }
}

// convert the names to snake_case
const xml = parser({ xml, mutator: toSnakeCase });

// makes
{
    parent: {
        order_id: 'my order id',
        something_else: 'meep',
        Whaaa: 'yeet'
    }
}

// use custom mutator
const xml = parser({ xml, mutator: (property) => property.toLowerCase() });

// makes
{
    parent: {
        orderid: 'my order id',
        somethingelse: 'meep',
        whaaa: 'yeet'
    }
}
```