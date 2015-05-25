// BOILERPLATE: https://github.com/johndugan/jquery-plugin-boilerplate

// ---------------------------------
// ------------ Sidebar ------------
// ---------------------------------
// without events;
// Ember triggers methods directly;
// maybe should use Mediator for it;

;(function($, undefined){

	var pluginName = 'sidebar';

	function Plugin(element, options){
		this.element = element;
		this._name = pluginName;
		this._defaults = $.fn[pluginName].defaults;
		this.options = $.extend({}, this._defaults, options);

		this.init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		init: function(){
			this.buildCache();
			this.pagination = this.paginationFactory(this);
			this.refresh();
		},

		destroy: function(){
			this.$element.removeData();
		},

		buildCache: function(){
			this.$element = $(this.element);
		},
		
		resolve: function(target){
			var $target;
			var plugin = this;

			this.active = function(){
				var active = plugin.options.active;
				return plugin.$element.find(active)
			},

			this.byId = function(id){
				var active = "[data-id='"+id+"']";
				return plugin.$element.find(active)
			}

			
			if(typeof target == 'undefined'){
				$target = this.active();
			}else if(typeof target == 'number'){
				$target = this.byId(target);
			}else if(target instanceof $){
				$target = target;
			}else if(!!target){
				$target = $(target); // DOM node / selector string
			}
			
			return $target;
			
		},

		dropdown: {
			shouldClose: function($dropdown){
				return ($dropdown.attr('data-closed') == 'false')
			},
			isOpen: function($dropdown){
				return ($dropdown.attr('data-closed') !== 'true')
			},
			userOpen: function($dropdowns){
				$dropdowns
					.attr('data-closed', 'user');
				return this;
			},
			userClose: function($dropdowns){
				this.close($dropdowns);
			},
			open: function($dropdown){
				$dropdown
					.attr('data-closed', 'false');
				return this;
			},
			close: function($dropdown){
				$dropdown
					.attr('data-closed', 'true');
				return this;
			}
		},

		openDropdowns: function($dropdowns){
			this.$element
				.find($dropdowns)
				.filter("[data-closed='true']")
				.attr('data-closed', 'false');

			return this;
		},

		closeDropdownsExcept: function($dropdowns){
			// creating an asymptomatic method for future animation
			this.$element
				.find("[data-status='dropdown'][data-closed='false']")
				.not($dropdowns)
				.attr('data-closed', 'true');

			return this;
		},

		_refresh: function($target){
			var $parents = $target.parents("[data-status='dropdown']");
			this
				.closeDropdownsExcept($parents)
				.openDropdowns($parents)
				.pagination.state($target);
		},
		
		refresh: function(target){
			$target = this.resolve(target);
			
			if($target){
				this._refresh($target);
			}

			return this;
		},

		userToggle: function(target){
			var $target = this.resolve(target);
			var $targets;
			if(this.dropdown.isOpen($target)){
				$targets = $target.find("[data-closed='user']").andSelf()
				this.dropdown.close($targets)
			}else{
				$targets = this.$element.find($target.parents().andSelf())
				this.dropdown.userOpen($targets)
			}
		},

		paginationFactory: function(plugin){
			var options   = plugin.options.pagination;
			var $element  = $(options.element);
			var $buttons  = $element.find(options.buttons);
			var $previous = $buttons.filter(options.previous);
			var $next     = $buttons.filter(options.next);

			var pagination = {
				options: options,
				$element: $element,
				$buttons: $buttons,
				$previous: $previous,
				$next: $next,
				get: {
					activeAnchors: function(){
						return plugin.$element.find("li[data-status!='disabled']>a");
					},
					currentIndex: function($anchors, current){
						var $current = plugin.resolve(current);
						return $anchors.index($current);
					},
					prevIndex: function($anchors, current){
						var currentIndex = this.currentIndex($anchors, current);
						return currentIndex - 1;
					},
					nextIndex: function($anchors, current){
						var currentIndex = this.currentIndex($anchors, current);
						return currentIndex + 1;
					},
					$prev: function(current){
						var $anchors    = this.activeAnchors();
						var targetIndex = this.prevIndex($anchors, current);
						var $target     = $anchors.eq(targetIndex)
						return $target;
					},
					$next: function(current){
						var $anchors    = this.activeAnchors();
						var targetIndex = this.nextIndex($anchors, current);
						var $target     = $anchors.eq(targetIndex)
						return $target;
					}
				},
				breadcrumb: function($target){
					var $links = plugin.$element.find($target.parents()).find('>a, >span').clone();
					var crumbs = [];
					$links.each(function(){
						crumbs.push(this)
						crumbs.push("<i>&gt;</i>")
					})
					crumbs.pop();
					$('.breadcrumb').empty().append(crumbs);
					return this;
				},
				setupButtons: function($anchors, currentIndex){
					this.$buttons.prop('disabled', false)
					if(currentIndex == 0){
						this.$previous.prop('disabled', true); //first
					}
					if(currentIndex == ($anchors.length -1)){
						this.$next.prop('disabled', true); //last
					}
					return this;
				},
				state: function($target){
					var $anchors     = this.get.activeAnchors();
					var currentIndex = this.get.currentIndex($anchors, $target);
					this.setupButtons($anchors, currentIndex)
						.breadcrumb($target);
					return this;
				},
				prev: function(current){
					var $target = this.get.$prev(current);
					$target.trigger('click');
					// plugin.refresh($target); //handled in page router
					return this;
				},
				next: function(current){
					var $target = this.get.$next(current);
					$target.trigger('click');
					// plugin.refresh($target); //handled in page router
					return this;
				}
			};
			return pagination;
		}

	});

	$.fn[pluginName] = function(options){
		this.each(function(){
			var instance = $.data(this, "plugin_" + pluginName);
			if (!instance){
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
		});
		var instance = this.data("plugin_" + pluginName);
		return $.extend({}, this, instance);
	};

	$.fn[pluginName].defaults = {
		active: 'nav.pages a.active',
		pagination: {
			element: 'nav.pagination',
			buttons: 'button',
			previous: '.previous',
			next: '.next',
			breadcrumb: '.breadcrumb'
		}
	};

})(jQuery);
