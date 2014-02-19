/**
 * Created by zcl on 14-2-19.
 */
;
(function ($) {
    $.fn.TS = function (options) {
        var myDate = new Date()
            , D = myDate.getDay() - 0
            , H = myDate.getHours() - 0
            , M = myDate.getMinutes() - 0
            , $element = $(this)

            , defaults = {
                startTime: "6:00",
                endTime: "18:00",
                interval: "10",
                callback: function (data) {
                },
                selectDay: D
            }
            , options = $.extend(defaults, options)
            , sH = options.startTime.split(':')[0] - 0
            , sM = options.startTime.split(':')[1] - 0
            , eH = options.endTime.split(':')[0] - 0
            , eM = options.endTime.split(':')[1] - 0
            , difference = (eH * 60 + eM) - (sH * 60 + sM) - 0
            , number = Math.floor(difference / options.interval) - 0
            , remainder = (difference % options.interval) - 0
            , result = ''
            , arr="";
        for (var i = 0; i < number; i++) {
            sM = sM - 0;
            sM += options.interval - 0;
            if (sM >= 60) {
                sH++;
                sM = sM % 60 - 0;
            }
            if (sM == 0) {
                sM = "00";
            }
            if (options.selectDay != D) {
                result += "<li><a>" + (sH) + ":" + (sM) + "</a></li>";
            } else {
                if (sH >= H) {
                    result += "<li><a>" + (sH) + ":" + (sM) + "</a></li>";
                } else {
                    if (sM > M && sH == H) {

                        result += "<li><a>" + (sH) + ":" + (sM) + "</a></li>";
                    } else {
                        result += "<li>" + (sH) + ":" + (sM) + "</li>";
                    }
                }
            }

        }
        if (remainder != 0) {
            sM += remainder - 0;
            result += "<li><a>" + (sH) + ":" + (sM) + "</a></li>";
        }
        $element.css({width: '400px', height: '300px', border: '1px solid #fefefe'}).html('<ul>' + result + '</ul><div style="clear: both"></div>').find('ul').css({margin: '0', padding: '0'}).find('li').css({backgroundColor: '#bdbdbd', width: '50px', height: '23px', lineHeight: '23px', float: 'left', fontSize: '12px', listStyleType: 'none', border: '1px solid #e9e9e9', textAlign: 'center'}).find('a').css({backgroundColor: '#fff', display: 'inline-block', width: '50px'});
        $element.on('click', 'li a', function () {
            var my = $(this);
            if (my.attr("data_") == "yes") {
                my.attr("data_", "no").css({backgroundColor: '#fff'});
                if (arr.indexOf(my.text()) != -1) {
                    arr = arr.replace(my.text()+',', '');
                }
            } else {
                my.attr("data_", "yes").css({backgroundColor: '#ffbd49'});
                if (arr.indexOf(my.text()) == -1) {
                    arr += my.text() + ',';
                }
            }
            options.callback(arr);
        });
        $element.find('a').hover(
            function () {
                $(this).css({fontSize: '18px'})
            },
            function () {
                $(this).css({fontSize: '12px'})
            }
        )
    }

})(jQuery);