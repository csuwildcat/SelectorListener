SelectorListener
================

Provides the following document/element methods to enable listening for CSS selector rule matches:

###The Basics###

```javascript

var oneTwoThree = function(){
  alert('Listening for complex element sequences is easy as 1, 2, 3!');
};

document.addSelectorListener('.one + .two + .three', oneTwoThree);

document.removeSelectorListener('.one + .two + .three', oneTwoThree);

/* Also available on elements: */

document.getElementById('foo').addSelectorListener('.one + .two + .three', oneTwoThree);

document.getElementById('foo').removeSelectorListener('.one + .two + .three', oneTwoThree);

```

###Now let's get fancy:###

```javascript

// Listening for attribute value matches? Child's play.
document.addSelectorListener('.foo[bar="boom"]', function(){ ... });

// Matching elements on hashchange can be annoying, let's make it stupid simple
document.addSelectorListener('*:target', function(event){
  alert('The hash-targeted element is:' + event.target);
});

// How about a more performant way to listen for custom tooltip nodes document wide?
document.addSelectorListener('.tooltip:hover', function(){ ... });


/*** Now that we have the new CSS 4 Selector spec, let's see what we can do: ***/

// Working with HTML5 sliders just got even easier
document.querySelector('#RandomForm').addSelectorListener('slider:out-of-range', function(){
  alert('Your slider value is now out of range! Oh noes!');
});

```

