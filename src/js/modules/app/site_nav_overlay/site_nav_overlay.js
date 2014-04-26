(function() {

  if (!document.getElementById('trigger-overlay')) return;

	var triggerBttn = document.getElementById( 'trigger-overlay' );
	var overlay = document.querySelector( 'div.overlay' );
  var toggle = document.querySelector('.toggle');
	//var closeBttn = overlay.querySelector( 'button.overlay-close' );
	var transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		};
	var transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ];
	var support = { transitions : Modernizr.csstransitions };

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
      classie.remove( toggle, 'is-visible' );

      classie.add( overlay, 'close' );
      classie.add( toggle, 'is-hidden');
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
        classie.remove( toggle, 'is-hidden');
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
      classie.add( toggle, 'is-hidden' );
		}
	}

	triggerBttn.addEventListener( 'click', toggleOverlay );
	//closeBttn.addEventListener( 'click', toggleOverlay );
})();
