/*require.config({
	baseUrl: 'javascripts/',
	paths: {
		'jquery': 'bower_components/jquery/dist/jquery',
        'layer':'lib/layer/layer'
	}
});
require(['jquery','layer','mylayer','metisMenu'], function($) {
    $('#menu').metisMenu();
    $('#menu > ul > li').on('click',function () {
    		if($('#menu > ul > li').find('.active')) {
    			$('#menu > ul > li').removeClass('active')
    			$('#menu > ul > li > a').attr('aria-expanded','false');
    			$('#menu > ul > li > ul').attr('aria-expanded','false').removeClass('in');
    		};
    		
    	$(this).addClass('active');
    	$(this).find('a').attr('aria-expanded','true');
    	$(this).find('ul').attr('aria-expanded','true').addClass('in');
    	$(this).find('ul > li > a').on('click', function () {
    		$('#menu > ul > li > ul > li > a').removeClass('active')
    		$(this).addClass('active');
    	});
    });
    //退出
    $('.out').on('click', function () {
        //弹出提示框
        confirm('确认退出吗?',function(){
            window.location.href='/logout';
         });
    });
    /**
     * 获取当前iframe
     */
/*    function getActiveIFrame() {
        return $("#mainIframe").contentWindow;
    }
    
});*/
$(function () {
    $('#menu').metisMenu();
    $('#menu > ul > li').on('click',function () {
            if($('#menu > ul > li').find('.active')) {
                $('#menu > ul > li').removeClass('active')
                $('#menu > ul > li > a').attr('aria-expanded','false');
                $('#menu > ul > li > ul').attr('aria-expanded','false').removeClass('in');
            };
            
        $(this).addClass('active');
        $(this).find('a').attr('aria-expanded','true');
        $(this).find('ul').attr('aria-expanded','true').addClass('in');
        $(this).find('ul > li > a').on('click', function () {
            $('#menu > ul > li > ul > li > a').removeClass('active')
            $(this).addClass('active');
        });
    });
    //退出
    $('.out').on('click', function () {
        //弹出提示框
        confirm('确认退出吗?',function(){
            window.location.href='/logout';
         });
    });
    /**
     * 获取当前iframe
     */
    function getActiveIFrame() {
        return $("#mainIframe").contentWindow;
    }
});