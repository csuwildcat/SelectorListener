(function(){
	
	var events = {},
      selectors = {},
      animationCount = 0,
      styles = document.createElement('style'),
      keyframes = document.head.appendChild(document.head.appendChild(styles).cloneNode()),
      prefix = window.CSSKeyframesRule ? { css: '', event: 'animationstart' } : { css: '-webkit-', event: 'webkitAnimationStart' },
      trimJoin = function(z){ return z.map(Function.prototype.call, String.prototype.trim).join(' ')  },
      startEvent = function(e){
        e.selector = (events[e.animationName] || {}).selector;
        ((this.selectorListeners || {})[e.animationName] || []).forEach(function(fn) { fn.call(this, e) }, this);
      }
  
	HTMLDocument.prototype.addSelectorListener = HTMLElement.prototype.addSelectorListener = function(values, fn){
    var rules = typeof values === 'string' ? [values] : values,
        id = rules.length > 1 ? trimJoin(values) : values,
        key = selectors[id],
			  listeners = this.selectorListeners = this.selectorListeners || { count: 0 };
			
		if (key) events[key].count++;
		else {
			key = selectors[id] = 'selector-listener-' + animationCount++;
      var style = rules.pop() + '::before { content: ""; ' + prefix.css + 'animation: ' + key + ' 0.01s; }';
			styles.sheet.insertRule(rules.reduceRight(function(current, next) {
        return next + '{' + current + '}'
      }, style), 0);
			events[key] = {
        count: 1,
        selector: id,
        keyframe: keyframes.appendChild(document.createTextNode('@' + prefix.css + 'keyframes ' + key + ' { to { outline-color: rgba(0,0,0,0) } }')),
        rule: styles.sheet.cssRules[0]
      };
		} 
		
		listeners.count ? listeners.count++ : this.addEventListener(prefix.event, startEvent, true);
		
		(listeners[key] = listeners[key] || []).push(fn);
	};
	
	HTMLDocument.prototype.removeSelectorListener = HTMLElement.prototype.removeSelectorListener = function(values, fn){
    var id = typeof values === 'string' ? values : trimJoin(values),
        listeners = this.selectorListeners || {},
			  key = selectors[id],
			  listener = listeners[key] || [],
			  index = listener.indexOf(fn);
			
		if (index > -1){
			var event = events[selectors[id]];
			if (!--event.count){
				styles.sheet.deleteRule(styles.sheet.cssRules.item(event.rule));
				keyframes.removeChild(event.keyframe);
				delete events[key];
				delete selectors[id];
			}
			
			listeners.count--;
			listener.splice(index, 1);
			if (!listeners.count) this.removeEventListener(prefix.event, startEvent);
		}
	};
	
})();