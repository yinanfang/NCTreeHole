(function( $ ){

	var methods = {
		init:function(options){
			var IR = this;
			
			return this.each(function(){			
				var $this = $(this), 
					data = $this.data(IR.attr('id')),
					myData = {};
				
				$.extend(myData, options);
				
				myData.origValue = $this.attr("value");
				
				if(myData.origValue == undefined){
					myData.origValue = $this.attr("value");
				}
				
				$this.focus(function() {
					if(myData.origValue == undefined){
						myData.origValue = $this.attr("value");
					}
					
					if(myData.origValue == $this.attr("value")){
						$this.attr("value", "");
					}
				});
				
				$this.blur(function() {
					if($this.attr("value") == '')
					{
						$this.attr("value", myData.origValue);
					}
				});
			});
		}
	};
	
	$.fn.disappearingTextInput = function(method) {
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || !method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jquery.disappearingTextInput' );
		}
	};
})( jQuery );