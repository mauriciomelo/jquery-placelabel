;(function($) {    
    $.fn.placeLabel = function(options) {
        var fields = this;
        
        var defaults = {
            animation: true,
            animationDuration: 300,
        }
        

        //plugin constructor
        var settings = $.extend({}, defaults, options);
        var animationDuration = settings.animationDuration;


        var animationDuration = 300; 

        var getInputByLabel = function(label) {
            return $("[id='" + label.attr('for')+"']");
        }
        var getLabelByInput = function(input) {
            return $("label[for='" + input.attr('name') + "']"); 
        }

        var placeLabelInField = function(label) {      
        $input = getInputByLabel(label); 
        label.animate({
           top: $input.offset().top - label.offset().top,
           left: $input.offset().left - label.offset().left,
        }, animationDuration, function() {
            label.css({                            
                'text-align': 'left',
                'color': 'gray',
                'position': 'relative',
                'z-index': '1',
            });
        });
        return label;
        }

        var resetLabelOffset = function(label) {
            var offset = {top: 0, left: 0,},            
                css = {textAlign: 'right', color: '#66afe9', };           
            
            if (settings.animation) {
                label.animate( offset, animationDuration, function() {
                   label.css(css);
                });
            } else {
                var css = $.extend({}, css, offset)
                label.css(css);
                
            }
            return label;                
        }

        var init = function(){ 
            fields.each(function() {
                var $input = $(this);
                var $label = getLabelByInput($input)
                
                if($input.offset()) {
                    resetLabelOffset($label).finish();
                    if($input.val() == "") {
                        placeLabelInField($label).finish();
                    }
                }
            });
        }
        init();
        
        /* Make it responsive! */
        $(window).resize(function() {
            if(typeof reset != 'undefined') {
                clearTimeout(reset);
            }        
            reset = setTimeout(init, 1000);        
        })

        fields.each(function() {
            var $input = $(this);
            var $label = getLabelByInput($input);
            $input.on('keyup input change', function() {
                if($(this).val() != "") {                   
                   resetLabelOffset($label);
                }

            }).on('blur', function() {
                var $input = $(this);
                var $label = getLabelByInput($input);
               
                
                var offsetDiff = ( $input.offset().top - $label.offset().top ) + ( $input.offset().left - $label.offset().left)
                var isLabelOutOfField =  offsetDiff >= 1;
                if( $input.val() == "" && isLabelOutOfField ) {           
                    placeLabelInField($label);
                } 
            });
            
        })
            
        
    }
        
})(jQuery);