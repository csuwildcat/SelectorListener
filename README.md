SelectorListener
================

Provides the following document/element methods to enable listening for CSS selector rule matches:

## Document-wide Selector Listeners

```javascript
var oneTwoThree = function(){
  alert('Listening for complex element sequences is easy as 1, 2, 3!');
};

document.addSelectorListener('.one + .two + .three', oneTwoThree);

document.removeSelectorListener('.one + .two + .three', oneTwoThree);
```

## Selector Listeners on Individual Elements

```javascript
var foo = document.getElementById('foo');

foo.addSelectorListener('.one + .two + .three', oneTwoThree);

foo.removeSelectorListener('.one + .two + .three', oneTwoThree);
```

## Support for At-Rules

```javascript
document.addSelectorListener(['@media (min-width: 500px)', 'h2:target'], someFn);
```

## Interesting Examples:

```javascript
// Listening for attribute value matches? Child's play.

document.addSelectorListener('.foo[bar="boom"]', function(){ ... });


// Listen for when elements are emptied of their children

document.addSelectorListener('*:empty', function(){ ... });


// How about a more performant way to listen for custom tooltip nodes document wide?

document.addSelectorListener('.tooltip:hover', function(){ ... });


// Act on inputs the moment any field fails native validation pattern logic

document.addSelectorListener('*:invalid', function(){ ... });


// Working with HTML5 sliders just got even easier

document.querySelector('#RandomForm').addSelectorListener('slider:out-of-range', function(){
  alert('Your slider value is now out of range! Oh noes!');
});
```

