// must be used with jquery.pagination.js
/* used to define the functionality of the paginated sections in the site */
(function( $ ){
	var settings = {
		defaultSectionSelector:"div.contentSection",
		defaultPaginationSelector:".pagination",
		defaultHiddenSelector:".hiddenContent",
		defaultSectionsSelector:".contentSections"
	};

	var methods = {
		init:function(options){
			var pp = this;
			
			return this.each(function(){				
				var $this = $(this), 
					data = $this.data("paginationPlus")
				
				$.extend(settings, options);
				  		
				// If the plugin hasn't been initialized yet
				if ( ! data ) {
					$this.data("paginationPlus", {
						target 			: $this
					});
				}
				
				var num_entries = $this.find( settings.defaultHiddenSelector+" "+settings.defaultSectionSelector).length;
				
				// Create content inside pagination element
				if(num_entries>1)
				{
					$this.find(settings.defaultPaginationSelector).pagination(num_entries, {
						callback:function(page_index,obj){
							var new_content = $this.find(settings.defaultHiddenSelector+' '+settings.defaultSectionSelector+':eq('+page_index+')').clone();
							new_content.css("display", "none");
							var old_content = $this.find(settings.defaultSectionsSelector+' '+settings.defaultSectionSelector);
							$this.find(settings.defaultSectionsSelector).append(new_content);
							
							new_content.fadeIn("fast");
							old_content.fadeOut("fast", onContentOut);
							
							return false;
						},
						items_per_page:1, // Show only one item per page
						load_first_page:true,
						next_text:">",
						prev_text:"<"
					});
				}
				else
				{
					var new_content = $this.find(settings.defaultHiddenSelector+' '+settings.defaultSectionSelector+':first').clone();
					new_content.css("display", "none");
					$this.find(settings.defaultSectionsSelector).empty().append(new_content);
					new_content.fadeIn("fast");
				}
			});
		}
	};
	
	onContentOut = function(){
		$(this).remove();
	}
	
	$.fn.paginationPlus = function(method) {
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jquery.paginationPlus' );
		}
	};
})( jQuery );