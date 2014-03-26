var init = function($){
	$(document).ready(function(){
		initApp($);
	}).delegate('.ui-page','pageshow',function(ev){
		// console.log('pageshow',arguments);
		var target = $(ev.target),
			header = target.find('.ui-header'),
			content = target.find('.ui-content'),
			footer = target.find('.ui-footer');
		content.height($("body").outerHeight()-(header.outerHeight() + footer.outerHeight() + 
			parseInt(content.css('padding-top').replace('px','')) +
			parseInt(content.css('padding-bottom').replace('px',''))
		));
		// if(target.attr('id') == "home"){
		// 	map.render();
		// }
	});
}(jQuery);

function initApp($){
	angular.bootstrap(document, ['App']);
}