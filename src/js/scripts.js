$(window).on('load',function(){
    navScripts();
    loopOptions();
    sliderIndustria();
    menuMobile();
});


function navScripts(){
    var industriaLink = $('.toggle-industrias');
    var serviciosLink = $('.toggle-servicios');
    var langSelector = $('.toggle-lang');
    dropDownMenus(industriaLink, false);
    dropDownMenus(serviciosLink, false);
    dropDownMenus(langSelector, false);
}

function dropDownMenus(link, onlyClick){
    if(onlyClick){
        link.on('click', function(e){
            var item = this;
            var dropDownMenu = $(item).find('.dropdown-menu');
            dropDownMenu.toggleClass('isActive');
        });
    }else{
        link.on('mouseenter', function(e){
            var item = this;
            var dropDownMenu = $(item).find('.dropdown-menu');
            dropDownMenu.addClass('isActive');
        }).mouseleave(function(){
            var item = this;
            var dropDownMenu = $(item).find('.dropdown-menu');
            dropDownMenu.removeClass('isActive');
        });
    }
}

function loopOptions(){
    var options = $('.optionsInitSection .option');
    var optionsContent = $('.optionsInitSection .optionContent');

    var currentActive = $(options).first();
    var currentActiveContent = $(optionsContent).first();
    var totalOptions = options.length;
    var i=1;
    function LoopForever() {
        currentActive.removeClass('isActive');
        currentActiveContent.removeClass('isActive');
        if (i == totalOptions){
            $(options).first().addClass('isActive');
            currentActive = $(options).first();

            $(optionsContent).first().addClass('isActive');
            currentActiveContent = $(optionsContent).first();

            i=0;
        }else{
            currentActive.next().addClass('isActive');
            currentActive = currentActive.next();

            currentActiveContent.next().addClass('isActive');
            currentActiveContent = currentActiveContent.next();
        }
        i++;
    }
    interval = self.setInterval(function(){LoopForever()},5000);
}

function sliderIndustria(){
    var sliderContainer = $('.carouselThirdSection');    
    var slides = $('.carouselThirdSection .itemGroup');
    var navDots = $('.navCarousel .navDot');
    var wSlide = slides.outerWidth();

    navDots.click(function(){
        var element = this;
        var slideToShow = $(element).data('slide');
        var activeBefore = '';

        var transformMatrix =   sliderContainer.css("-webkit-transform") ||
                                sliderContainer.css("-moz-transform")    ||
                                sliderContainer.css("-ms-transform")     ||
                                sliderContainer.css("-o-transform")      ||
                                sliderContainer.css("transform");

        var matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
        var x = parseInt(matrix[12] || matrix[4]);

        //miramos el slide activo 
        slides.each(function(){
            if($(this).hasClass('active')){
                activeBefore = $(this).data('slide');
            }
        });
        
        if (activeBefore != slideToShow){
            //calculamos movimiento
            if(activeBefore > slideToShow){
                var moves = activeBefore - slideToShow;
                var translateX = x+(wSlide*moves)+(24*moves);
                sliderContainer.css('transform', 'translateX('+translateX+'px)');
                
            }else{
                var moves = slideToShow - activeBefore;
                var translateX = x-(wSlide*moves)-(24*moves);
                sliderContainer.css('transform', 'translateX('+translateX+'px)');
            }
        }
        navDots.removeClass('active');
        $(element).addClass('active');

        slides.removeClass('active');
        slides.filter('[data-slide="'+slideToShow+'"]').addClass('active');

    });
}

function menuMobile(){
    var opener = $('.main-menuMobile .openerMenu');
    var menuMobile = $('.main-menuMobile .menuContent');

    opener.click(function(){
        menuMobile.toggleClass('isActive');
        opener.toggleClass('open');
        $('html').toggleClass('noScroll');
    });

    var industriaLink = $('.toggle-industrias-mobile');
    var serviciosLink = $('.toggle-servicios-mobile');
    dropDownMenus(industriaLink, true);
    dropDownMenus(serviciosLink, true);
}