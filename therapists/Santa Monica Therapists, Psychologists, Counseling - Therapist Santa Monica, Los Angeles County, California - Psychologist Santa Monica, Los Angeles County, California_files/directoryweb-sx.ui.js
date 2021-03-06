var sx;
var profMenuTimer;
var prevWindowSize = '';

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-generatedcontent-csstransforms-csstransforms3d-history-input-inputtypes-localstorage-geolocation-inlinesvg-svg-touch-shiv-cssclasses-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes-file_api
 */
;
window.Modernizr = function(a, b, c) {
    function B(a) {
        j.cssText = a
    }

    function C(a, b) {
        return B(n.join(a + ";") + (b || ""))
    }

    function D(a, b) {
        return typeof a === b
    }

    function E(a, b) {
        return !!~("" + a).indexOf(b)
    }

    function F(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!E(e, "-") && j[e] !== c) return b == "pfx" ? e : !0
        }
        return !1
    }

    function G(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c) return d === !1 ? a[e] : D(f, "function") ? f.bind(d || b) : f
        }
        return !1
    }

    function H(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1),
            e = (a + " " + p.join(d + " ") + d).split(" ");
        return D(b, "string") || D(b, "undefined") ? F(e, b) : (e = (a + " " + q.join(d + " ") + d).split(" "), G(e, b, c))
    }

    function I() {
        e.input = function(c) {
            for (var d = 0, e = c.length; d < e; d++) u[c[d]] = c[d] in k;
            return u.list && (u.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), u
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), e.inputtypes = function(a) {
            for (var d = 0, e, f, h, i = a.length; d < i; d++) k.setAttribute("type", f = a[d]), e = k.type !== "text", e && (k.value = l, k.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && k.style.WebkitAppearance !== c ? (g.appendChild(k), h = b.defaultView, e = h.getComputedStyle && h.getComputedStyle(k, null).WebkitAppearance !== "textfield" && k.offsetHeight !== 0, g.removeChild(k)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = k.checkValidity && k.checkValidity() === !1 : e = k.value != l)), t[a[d]] = !!e;
            return t
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }
    var d = "2.6.2",
        e = {},
        f = !0,
        g = b.documentElement,
        h = "modernizr",
        i = b.createElement(h),
        j = i.style,
        k = b.createElement("input"),
        l = ":)",
        m = {}.toString,
        n = " -webkit- -moz- -o- -ms- ".split(" "),
        o = "Webkit Moz O ms",
        p = o.split(" "),
        q = o.toLowerCase().split(" "),
        r = {
            svg: "http://www.w3.org/2000/svg"
        },
        s = {},
        t = {},
        u = {},
        v = [],
        w = v.slice,
        x, y = function(a, c, d, e) {
            var f, i, j, k, l = b.createElement("div"),
                m = b.body,
                n = m || b.createElement("body");
            if (parseInt(d, 10))
                while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
            return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i
        },
        z = {}.hasOwnProperty,
        A;
    !D(z, "undefined") && !D(z.call, "undefined") ? A = function(a, b) {
        return z.call(a, b)
    } : A = function(a, b) {
        return b in a && D(a.constructor.prototype[b], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function(b) {
        var c = this;
        if (typeof c != "function") throw new TypeError;
        var d = w.call(arguments, 1),
            e = function() {
                if (this instanceof e) {
                    var a = function() {};
                    a.prototype = c.prototype;
                    var f = new a,
                        g = c.apply(f, d.concat(w.call(arguments)));
                    return Object(g) === g ? g : f
                }
                return c.apply(b, d.concat(w.call(arguments)))
            };
        return e
    }), s.touch = function() {
        var c;
        return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : y(["@media (", n.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
            c = a.offsetTop === 9
        }), c
    }, s.geolocation = function() {
        return "geolocation" in navigator
    }, s.history = function() {
        return !!a.history && !!history.pushState
    }, s.csstransforms = function() {
        return !!H("transform")
    }, s.csstransforms3d = function() {
        var a = !!H("perspective");
        return a && "webkitPerspective" in g.style && y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b, c) {
            a = b.offsetLeft === 9 && b.offsetHeight === 3
        }), a
    }, s.generatedcontent = function() {
        var a;
        return y(["#", h, "{font:0/0 a}#", h, ':after{content:"', l, '";visibility:hidden;font:3px/1 a}'].join(""), function(b) {
            a = b.offsetHeight >= 3
        }), a
    }, s.localstorage = function() {
        try {
            return localStorage.setItem(h, h), localStorage.removeItem(h), !0
        } catch (a) {
            return !1
        }
    }, s.svg = function() {
        return !!b.createElementNS && !!b.createElementNS(r.svg, "svg").createSVGRect
    }, s.inlinesvg = function() {
        var a = b.createElement("div");
        return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == r.svg
    };
    for (var J in s) A(s, J) && (x = J.toLowerCase(), e[x] = s[J](), v.push((e[x] ? "" : "no-") + x));
    return e.input || I(), e.addTest = function(a, b) {
            if (typeof a == "object")
                for (var d in a) A(a, d) && e.addTest(d, a[d]);
            else {
                a = a.toLowerCase();
                if (e[a] !== c) return e;
                b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
            }
            return e
        }, B(""), i = k = null,
        function(a, b) {
            function k(a, b) {
                var c = a.createElement("p"),
                    d = a.getElementsByTagName("head")[0] || a.documentElement;
                return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
            }

            function l() {
                var a = r.elements;
                return typeof a == "string" ? a.split(" ") : a
            }

            function m(a) {
                var b = i[a[g]];
                return b || (b = {}, h++, a[g] = h, i[h] = b), b
            }

            function n(a, c, f) {
                c || (c = b);
                if (j) return c.createElement(a);
                f || (f = m(c));
                var g;
                return f.cache[a] ? g = f.cache[a].cloneNode() : e.test(a) ? g = (f.cache[a] = f.createElem(a)).cloneNode() : g = f.createElem(a), g.canHaveChildren && !d.test(a) ? f.frag.appendChild(g) : g
            }

            function o(a, c) {
                a || (a = b);
                if (j) return a.createDocumentFragment();
                c = c || m(a);
                var d = c.frag.cloneNode(),
                    e = 0,
                    f = l(),
                    g = f.length;
                for (; e < g; e++) d.createElement(f[e]);
                return d
            }

            function p(a, b) {
                b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
                    return r.shivMethods ? n(c, a, b) : b.createElem(c)
                }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + l().join().replace(/\w+/g, function(a) {
                    return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
                }) + ");return n}")(r, b.frag)
            }

            function q(a) {
                a || (a = b);
                var c = m(a);
                return r.shivCSS && !f && !c.hasCSS && (c.hasCSS = !!k(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), j || p(a, c), a
            }
            var c = a.html5 || {},
                d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                e = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                f, g = "_html5shiv",
                h = 0,
                i = {},
                j;
            (function() {
                try {
                    var a = b.createElement("a");
                    a.innerHTML = "<xyz></xyz>", f = "hidden" in a, j = a.childNodes.length == 1 || function() {
                        b.createElement("a");
                        var a = b.createDocumentFragment();
                        return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined"
                    }()
                } catch (c) {
                    f = !0, j = !0
                }
            })();
            var r = {
                elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
                shivCSS: c.shivCSS !== !1,
                supportsUnknownElements: j,
                shivMethods: c.shivMethods !== !1,
                type: "default",
                shivDocument: q,
                createElement: n,
                createDocumentFragment: o
            };
            a.html5 = r, q(b)
        }(this, b), e._version = d, e._prefixes = n, e._domPrefixes = q, e._cssomPrefixes = p, e.testProp = function(a) {
            return F([a])
        }, e.testAllProps = H, e.testStyles = y, e.prefixed = function(a, b, c) {
            return b ? H(a, b, c) : H(a, "pfx")
        }, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + v.join(" ") : ""), e
}(this, this.document), Modernizr.addTest("filereader", function() {
    return !!(window.File && window.FileList && window.FileReader)
});

function transEndEvent() {
    var transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
    };
    return transEndEventNames[Modernizr.prefixed('transition')];
}

(function($) {

    $(function () {
        //setup ajax error handling
        $.ajaxSetup({
            error: function (jqXHR, exception, error) {
                if (jqXHR.status === 0) {
                    // Status 0 means page unloaded before ajax completed
                } else if (jqXHR.status == 404) {
                    alert('Requested page not found. [404]');
                } else if (jqXHR.status == 500) {
                    alert('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    alert('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    alert('Time out error.');
                } else if (exception === 'abort') {
                    alert('Ajax request aborted.');
                } else {
                    alert('Uncaught Error. ' + jqXHR.responseText);
                }
            }
        });
    });

    $.footerPosition = 'static';
    sx = { // Collection of global functions
        transitionEndEvent: transEndEvent(),
        setResponsive: function() {
            $('html').removeClass('device-xs');
            $('html').removeClass('device-sm');
            $('html').removeClass('device-md');
            $('html').removeClass('device-lg');

            if (window.innerWidth < 576) {
                $('html').addClass('device-xs');
            } else if (window.innerWidth >= 576 && window.innerWidth < 768) {
                $('html').addClass('device-sm');
            } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
                $('html').addClass('device-md');
            } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
                $('html').addClass('device-lg');
            } else {
                $('html').addClass('device-xl');
            }
        },
        setMinHeight: function() {
            var footer = $('#pageFooter');
            var footerHeight = footer.outerHeight();
            var windowHeight = $(window).innerHeight();
            var mainHeight = $('#main').outerHeight() + $('#headerWrapper').outerHeight();

            if (mainHeight + footerHeight < windowHeight) {
                footer.css({
                    'position' : 'fixed',
                    'bottom' : '0px'
                });
                $.footerPosition = 'fixed';
            } else {
                footer.css({
                    'position' : 'static',
                    'bottom' : ''
                });
            }
        },
        closeAll: function() {
            $('.ui-popup').hide();
            sx.hideLoading();
            if ($('.ui-modal').is(':visible')) {

                $('.ui-modal').on(sx.transitionEndEvent, function() {
                    if (0 == $(this).css('opacity')) {
                        $('.ui-modal').css({
                            visibility: 'hidden',
                            display: 'none'
                        });
                        $(this).off(sx.transitionEndEvent);
                    }
                });
                $('.ui-modal').css({
                    opacity: 0,
                    visibility: 'hidden',
                    display: 'none'
                });

                if (!sx.transitionEndEvent) {
                    $('.ui-modal').css({
                        visibility: 'hidden',
                        display: 'none'
                    });
                }
            }
            //document.body.removeEventListener('touchmove', sx.disableTouchMove);
            $('#ui-overlay').removeClass('overlayActive');
            $('#ui-overlay').removeClass('popup-open');
            $('.ui-dropdown').hide();
            $('.dropDownOpen').removeClass('dropDownOpen');
            $('.navOpen').removeClass('navOpen');
            $('#gallery-large').remove();
            $('.prof-menu-btn-open').removeClass('prof-menu-btn-open');
            $('.prof-menu-open').removeClass('prof-menu-open');
            $('html').removeClass('large-gallery-open');
            $('.app-menu').trigger('close');
            var scrollTo = 0;
            if ($('body').css('top')) {
                scrollTo = Math.abs(parseInt($('body').css('top')));
            }

            $('body').css({
                position: 'static',
                overflow: 'auto',
                top: 0
            });
            if (scrollTo) {
                $('body').scrollTop(scrollTo);
            }

            $('body').css('padding-right', '0px');
            $('#headerWrapper').css('padding-right', '0px');
            $('#contactBar').css('padding-right', '0px');
            $('.subBrandsOpen').removeClass('subBrandsOpen');
            $('.refineFilterOpen').removeClass('refineFilterOpen');
            $('body').off('scroll touchmove mousewheel');
            sx.showSubmit();
        },
        disableTouchMove: function(e) {
            //    e.preventDefault();
        },
        showSubmit: function(obj) {
            $('.submit-hide:disabled').remove();
            $('.submit-hide').show();
        },
        hideSubmit: function(obj) {
            $obj = $(obj);
            $obj.clone()
                .attr('disabled', 'disabled')
                .attr('value', 'Working...')
                .css({
                    cursor: 'default',
                    opacity: '.5'
                })
                .insertAfter($obj);
            $obj.hide();
        },
        showOverlay: function(options) {
            var defaults = {
                backgroundColor: 'transparent',
                opacity: 0,
                closeOnClick: true
            };

            options = $.extend(defaults, options);

            if (!$('html').hasClass('device-xs')) {
                $('#ui-overlay').addClass('overlayActive');
            }
            $('#ui-overlay').css({
                opacity: options.opacity
            });

            //document.body.addEventListener('touchmove', sx.disableTouchMove);

            if (options.closeOnClick) {
                $("#ui-overlay").on('click', function() {
                    sx.closeAll();
                    $(this).off('click');
                });
            }
        },
        showLoading: function() {
            if (0 == $('#loadingAnimation').length) {
                $('body').append('<div id="loadingAnimation"></div>');
            }
            $('#loadingAnimation').css({
                visibility: 'visible',
                opacity: 1,
            });
        },
        hideLoading: function() {
            $('#loadingAnimation').on(sx.transitionEndEvent, function() {
                $('#loadingAnimation:visible').css({
                    visibility: 'hidden'
                });
                $(this).off(sx.transitionEndEvent);
            });

            $('#loadingAnimation').css({
                opacity: 0,
                visibility: 'hidden',
            });

        },
        scrollerWidth: function() {
            var scr = null;
            var inn = null;
            var wNoScroll = 0;
            var wScroll = 0;

            // Outer scrolling div
            scr = document.createElement('div');
            scr.style.position = 'absolute';
            scr.style.top = '-1000px';
            scr.style.left = '-1000px';
            scr.style.width = '100px';
            scr.style.height = '50px';
            // Start with no scrollbar
            scr.style.overflow = 'hidden';

            // Inner content div
            inn = document.createElement('div');
            inn.style.width = '100%';
            inn.style.height = '200px';

            // Put the inner div in the scrolling div
            scr.appendChild(inn);
            // Append the scrolling div to the doc
            document.body.appendChild(scr);

            // Width of the inner div sans scrollbar
            wNoScroll = inn.offsetWidth;
            // Add the scrollbar
            scr.style.overflow = 'auto';
            // Width of the inner div width scrollbar
            wScroll = inn.offsetWidth;

            // Remove the scrolling div from the doc
            document.body.removeChild(document.body.lastChild);

            // Pixel width of the scroller
            return (wNoScroll - wScroll);
        },
        refreshPage: function(options) {
            var defaults = {
                'onComplete': function() {},
            };

            var sep = '?';
            if (document.location.href.indexOf('?') > 0) {
                sep = '&';
            }
            var url = document.location.href + sep +"ajax=1&ajaxRefresh=1";

            $.ajax(url, {
                dataType: 'html',
                success: sx.displayRefreshPage
            });

        },
        displayRefreshPage: function(data, textStatus, jqXHR) {
            var $data = $('<div>' + data + '</div>');

            $('[data-xhr-content]', $data).each(function() {
                var $this = $(this);
                var s = $this.data('xhr-content');
                var $target = $('body [data-xhr-content=' + s + ']');
                if (0 < $target.length) {
                    $target.replaceWith($this);
                }
            });

            doReady({
                init: 'xhrRefresh'
            });

            sx.closeAll();
        },
        formValidate: function(url, validator, field) {
            $.ajax(url, {
                data: {
                    validate: validator,
                    value: $('#edit-' + field).val()
                },
                dataType: 'json',
                success: function(data, textStatus, jqXHR) {
                    if ('undefined' == data.severity) {
                        if (data.valid) {
                            data.severity = 'valid';
                        } else {
                            data.severity = 'valid';
                        }
                    }

                    $('#field-' + field).attr('data-validation-response', data.severity);
                    $('#edit-' + field + '_hint').html(data.message);
                    sx.showSubmit();
                }

            });
        },
        clickToCommunity: function(element) {
            var dataset = element.dataset;
            dataLayer.push({
                'event': 'dataLayerEvent',
                'eventCategory': dataset.eventCategory,
                'eventAction': dataset.eventAction,
                'eventLabel': dataset.eventLabel
            });
        },
        appMenuTransition: 200,
        appMenuOpenTimeout: 0,
        appMenuCloseTimeout: 0,
        initializeAppMenu: function() {
            $('.app-menu').on('open.app-menu', function() {
                if($(this).data('isOpen')) { return false; }

                var scrollTop = $(window).scrollTop();
                scrollTop  = scrollTop > 0 ? scrollTop : 0;
                var scrollerWidth = $('body').prop('scrollHeight') > $(window).innerHeight() ? sx.scrollerWidth() : '';

                $(this).data('isOpen', true);
                $('html').removeClass('app-menu-open app-menu-opening app-menu-closing');
                $('html').addClass('app-menu-opening');

                clearTimeout(this.appMenuOpenTimeout);
                this.appMenuOpenTimeout = setTimeout(function(){
                    $('html').removeClass('app-menu-opening');
                    $('html').addClass('app-menu-open');
                }, this.appMenuTransition);

                $("#ui-overlay").one('click.app-menu', function () {
                    $('.app-menu').trigger('close');
                }).addClass('overlayActive');

                $('body').data('app-original-scrolltop', scrollTop);
                $('.device-xs body').css({top: -scrollTop});
                $('.device-xs #pageContainer').css('padding-right', scrollerWidth);

            });

            $('.app-menu').on('close.app-menu', function() {
                $(this).data('isOpen', false);
                $('html').removeClass('app-menu-open app-menu-opening app-menu-closing');
                $('html').addClass('app-menu-closing');
                $("#ui-overlay").removeClass('overlayActive');

                var scrollTop = $('.device-xs body').data('app-original-scrolltop');
                if(scrollTop) {
                    $(window).scrollTop(scrollTop);
                }
                $('body').css({top: ''});
                $('#pageContainer').css('padding-right', '');

                clearTimeout(this.appMenuCloseTimeout);
                this.appMenuCloseTimeout = setTimeout(function(){
                    $('html').removeClass('app-menu-closing');
                }, this.appMenuTransition);
            });

            $('.app-menu').on('toggle.app-menu', function() {
                if($(this).data('isOpen')) {
                    $(this).trigger('close');
                } else {
                    $(this).trigger('open');
                }

                return true;
            });

            $('.app-menu-btn').on('click', function (e) {
                e.preventDefault();
                $('.app-menu').trigger('toggle');
            });
        },
        revealOtherAddresses: function () {
            $('.other-location').toggle();
            $('.other-addresses').removeClass('hidden-sm-down');
        }

    };

    $.fn.extend({
        sxAddCloseButton: function() {
            $('.ui-close').on('click', function(event) {
                event.preventDefault();
                sx.closeAll();
            });
        },
        sxPos: function() {
            var offset = $(this).offset();

            pos = {
                left: offset.left,
                top: offset.top,
                right: offset.left + $(this).outerWidth(),
                bottom: offset.top + $(this).outerHeight(),
                width: $(this).outerWidth(),
                height: $(this).outerHeight()
            };
            return pos;
        },

        sxFixPos: function() {
            var wScrollTop = $(window).scrollTop();
            var wScrollLeft = $(window).scrollLeft();

            var wHeight = $(window).height();
            var wWidth = window.innerWidth;

            // Mobile devices go full screen
            if ($('html').hasClass('device-xs') || $('html').hasClass('device-sm')) {
                $(this).css({
                    'width': '100%',
                    'height': '100%',
                    'top': 0,
                    'left': 0,
                    'overflow': 'auto',
                    'position':'fixed'
                });
                return;
            }

            var objPos = $(this).sxPos();
            if ($('.region-right').length) {
                var containerPos = $('.region-right').sxPos();
            } else {
                containerPos = $('body').sxPos();
            }

            var maxBottom = wScrollTop + wHeight;
            var maxRight = wScrollLeft + wWidth;

            var maxConRight = containerPos.left + containerPos.width;

            var newTop = objPos.top;
            var newLeft = objPos.left;

            if (maxConRight < maxRight) {
                maxRight = maxConRight;
            }
            if (objPos.bottom > maxBottom) {
                newTop = maxBottom - $(this).outerHeight() - 30;
            }
            if (objPos.right > maxConRight) {
                newLeft = maxRight - $(this).outerWidth() - 15;
            }

            if (newTop < wScrollTop) {
                newTop = wScrollTop;
            }

            var newWidth = objPos.width;
            var newHeight = objPos.height;

            if (newHeight > wHeight - wScrollTop) {
                newHeight = wHeight - 100;
                newTop = newTop + 20;
            }

            $(this).offset({
                top: newTop,
                left: newLeft
            });

            $(this).css({
                overflow: 'auto'
            });
            if (newHeight < objPos.height) {
                $(this).height(newHeight);
            }
            if (newWidth < objPos.width) {
                $(this).width(newWidth);
            }

        },
        sxTabs: function() {
            this.each(function() {
                if ($(this).hasClass('tabs-processed')) {
                    return;
                } else {
                    $(this).addClass('tabs-processed');
                }

                $('div.tab-pane', this).hide();
                $('div.tab-pane:first', this).show();

                var tabs = $(this);
                var fragmentId = /^#.+/;
                $('ul:first a:first', this).addClass('tab-active');
                $('ul:first a:first', this).append('<span class="arrow"><span class="icon ui-sprite"></span></span>');
                $('ul:first a', this).each(function() {
                    $(this).on('click', function(event) {
                        event.preventDefault();
                        dataLayer.push({
                            'eventCategory': 'ProfDetail',
                            'eventAction': 'Tab',
                            'eventLabel': $(this).text(),
                            'event': 'dataLayerEvent'
                        });
                        $('div.tab-pane', tabs).hide();
                        $(this).addClass('tab-active');
                        frag = this.href.split('#');
                        $('#' + frag[1]).show();
                        $('ul:first a', tabs).removeClass('tab-active');
                        $('ul:first a span', tabs).remove();
                        $(this).append('<span class="arrow"><span class="icon ui-sprite"></span></span>');
                        $(this).addClass('tab-active');
                    });
                });

                if ($("#select-finances-office").hasClass('not-default')) {
                    $("#select-finances-office").removeClass('not-default');
                    $("#select-finances-office").removeClass('tab-active');
                    $("#select-finances-online").addClass('tab-active');
                }

                if ($('html').hasClass('device-xs')) {
                    $('#tabs-endorsements-more').show();
                    $('#tabs-recommendations-more').show();
                    $('#tabs-connections-more').show();
                }
                $('#select-endorsements').on('click', function (e) {
                    if ($('html').hasClass('device-xs')) {
                        $('#tabs-endorsements-more').show();
                    } else {
                        $('.defaultLast').hide();
                        $('.connections.defaultLast').show();
                        $('#tabs-endorsements-more').hide();
                        $('#endorsements-less-btn').hide();
                        $('#endorsements-more-btn').show();
                    }
                });
                $('#select-recommendations').on('click', function (e) {
                    if ($('html').hasClass('device-xs')) {
                        $('#tabs-recommendations-more').show();
                    } else {
                        $('.defaultLast').hide();
                        $('.connections.defaultLast').show();
                        $('#tabs-recommendations-more').hide();
                        $('#recommendations-less-btn').hide();
                        $('#recommendations-more-btn').show();
                    }
                });
                $('#select-connections').on('click', function (e) {
                    if ($('html').hasClass('device-xs')) {
                        $('#tabs-connections-more').show();
                    } else {
                        $('.defaultLast').hide();
                        $('.connections.defaultLast').show();
                        $('#tabs-connections-more').hide();
                        $('#connections-less-btn').hide();
                        $('#connections-more-btn').show();
                    }
                });
                $('#select-finances-office').on('click', function (e) {
                    $('#tabs-finances-online').hide();
                    $('#tabs-finances-office').show();
                });
                $('#select-finances-online').on('click', function (e) {
                    $('#tabs-finances-office').hide();
                    $('#tabs-finances-online').show();
                });
            });

        },
        sxPopup: function(options) {
            $(this).each(function() {
                var defaults = {
                    buttonClass: null,
                    content: null
                };

                if ($(this).hasClass('popup-processed')) {
                    return;
                } else {
                    $(this).addClass('popup-processed');
                }

                options = $.extend(defaults, options);

                var popup = $(this);
                popup.css({
                    'z-index': 100,
                    'position': 'absolute'
                });

                popup.hide();
                popup.sxAddCloseButton();

                popup.addClass('processed');
                popup.addClass('ui-popup');

                var buttonClass = 'ui-button';
                if (options.buttonClass) {
                    buttonClass += " " + options.buttonClass;
                }

                var eventLabel = $(this).data('event-label');

                if (!$(this).hasClass('glossary-button') &&  eventLabel == 'Nearby') {
                    buttonClass += ' btn-nearby-areas';
                    eventLabel = 'data-event-label="Address_NearbyAreas"';
                }

                // Check to see if there is a button already...
                var button = $(this).prev('button[' + eventLabel + ']');

                // ...otherwise create one and put it before the popup
                if (!button.get(0)) {
                    button = $('<button type="button" class="' + buttonClass + '"' + eventLabel + '><span>' + $(':first-child', popup).html() + '</span></button>');
                    popup.before(button);
                }

                $(popup).appendTo('body');
                var loaded = false;
                $(button).on('click', function(event) {
                    if($('html').is('.device-xs') &&
                        !$(this).hasClass('glossary-button')) {
                        return false;
                    }
                    if ($(this).hasClass('glossary-button')) {
                        dataLayer.push({
                            'eventCategory': 'ProfDetail',
                            'eventAction': 'GlossaryPopup',
                            'eventLabel': $(this).text(),
                            'event': 'dataLayerEvent'
                        });

                    }

                    if (loaded === false && options.content) {
                        content = options.content(function() {
                            showPopup(event);
                        });
                        loaded = true;
                    } else {
                        showPopup();
                    }

                });


                function showPopup(event) {
                    sx.closeAll();
                    sx.showOverlay();
                    $('#ui-overlay').addClass('popup-open');
                    if ($('html').hasClass('device-xs')) {
                        $('body').css({
                            overflow: 'hidden'
                        });

                    }
                    $(popup).show();
                    var bpos = $(button).offset();
                    var bheight = $(button).height();
                    $(popup).offset({
                        top: bpos.top,
                        left: bpos.left
                    });
                    $(popup).sxFixPos();
                }
            });
        },

        sxModal: function(options) {
            var defaults = {
                top: false,
                left: false,
                overlay: 0.5,
                closeButton: null,
                positionFn: function(modal) {
                    var wHeight = $(window).height();
                    var wWidth = $(window).width();

                    // Mobile devices go full screen
                    if ($('html').hasClass('device-xs')) {
                        var pos = {
                            top: 0,
                            left: 0
                        };
                        return pos;
                    }

                    var x = (wWidth - $(modal).width()) / 2;
                    var y = (wHeight - $(modal).height()) / 2;
                    if (y > 200) {
                        y = 200;
                    }
                    var pos = {
                        top: y,
                        left: x
                    };

                    return pos;
                }
            };

            options = $.extend(defaults, options);
            var o = options;

            $(this).each(function() {
                if ($(this).hasClass('modal-processed')) {
                    return;
                } else {
                    $(this).addClass('modal-processed');
                }
                var target = $(this).attr('data-ui-target');
                if (!target) {
                    return;
                }

                var url;
                if ('href' == target) {
                    url = $(this).attr('href');

                    if (url.search('AddPhotos') > 0 && $.browser.msie && parseFloat($.browser.version) < 10) {
                        return;
                    }

                    if (url.indexOf('?')) {
                        url += "&";
                    } else {
                        url += "?";
                    }
                    url += "ajax=1";
                }


                if ('#' == target.substr(0, 1)) {
                    if (!$(target).length) {
                        $('body').append('<div id="' + target.substr(1) + '" style="display:none;"><div class="ui-modal-content"></div></div>');
                    }
                    $(target).addClass('ui-modal');
                } else {
                    if (!$('#ui-modal-default').length) {
                        $('body').append('<div id="ui-modal-default" class="ui-modal" style="display:none;"><div class="ui-modal-content"></div></div>');
                    }
                    target = '#ui-modal-default';
                }

                $(target).addClass('ui-modal-xs');
                $(target).addClass('ui-modal-sm');
                $(target).addClass('ui-modal-md');
                $(target).addClass('ui-modal-lg');

                $(this).click(function(e) {
                    e.preventDefault();
                    sx.closeAll();
                    var modalPanel = $(target);
                    modalPanel.sxAddCloseButton();

                    if (target == '#ui-modal-default') {
                        $('.ui-modal-content', modalPanel).html('');
                    }

                    var modal_height = $(modalPanel).outerHeight();
                    var modal_width = $(modalPanel).outerWidth();

                    $(modalPanel).show();
                    $(modalPanel).css({
                        'display': 'block',
                        'position': 'fixed',
                        'z-index': 11000,
                    });

                    if (url) {
                        sx.showLoading();
                        $.ajax(url, {
                            dataType: 'html',
                            success: function(data, textStatus, jqXHR) {
                                prepareAjaxHTML(data, modalPanel);
                                doReady({
                                    init: 'modalLoad'
                                });
                                var pos = o.positionFn(modalPanel);

                                sx.hideLoading();
                                modalPanel.css({
                                    opacity: 1,
                                    visibility: 'visible',
                                    'left': pos.left + "px",
                                    'top': pos.top + "px"
                                });
                                $(modalPanel).sxFixPos();
                            }
                        });
                    } else {

                        pos = o.positionFn(modalPanel);
                        modalPanel.css({
                            opacity: 1,
                            visibility: 'visible',
                            'left': pos.left + "px",
                            'top': pos.top + "px"
                        });
                        $(modalPanel).sxFixPos();
                    }
                    sx.showOverlay({
                        closeOnClick: false
                    });

                    var off = $('#headerWrapper').offset();
                    var sbWidth = sx.scrollerWidth();

                    $('body').css({
                        overflow: 'hidden'
                    });
                    $('body').css('padding-right', sbWidth + 'px');
                    $('#headerWrapper').css('padding-right', sbWidth + 'px');
                    $('#contactBar').css('padding-right', sbWidth + 'px');

                    w1 = $('body').width();
                    w2 = $('body').width() - sbWidth;
                    pos = .5 / (w1 / w2) * 100;
                });

                function prepareAjaxHTML(data, modalPanel) {

                    $data = $('<div>' + data + '</div>');
                    $('.ui-modal-content', modalPanel).empty();
                    $('meta', $data).remove();
                    $('link', $data).remove();
                    $('.ui-modal-content', modalPanel).append($data);
                    $('.ui-modal-content form', modalPanel).append('<input type="hidden" name="ajax" value="1">');

                    $(':submit', modalPanel).on('click', function(event) {

                        event.preventDefault();
                        var form = $(this).closest('form');
                        var data = form.serializeArray();
                        var dest = form.attr('action');
                        data.push({
                            name: 'edit[submit]',
                            value: $(this).val()
                        });
                        $.ajax(dest, {
                            data: data,
                            type: 'post',
                            success: function(data, textStatus, jqXHR) {

                                if (typeof data == "object") {
                                    // Response is javascript object
                                    if (1 == data.status) {
                                        if (data.hasOwnProperty('redirect')) {
                                            document.location.href = data.redirect;
                                        } else if (1 == data.mainXhrRefresh) {
                                            sx.closeAll();
                                            sx.showLoading();
                                            sx.refreshPage(function() {
                                                sx.hideLoading();
                                            });
                                        } else {
                                            sx.closeAll();
                                        }
                                    } else {
                                        prepareAjaxHTML(data.form, modalPanel);
                                    }
                                } else {
                                    prepareAjaxHTML(data, modalPanel);
                                }


                            }
                        });
                    });
                }
            });
        },

        sxGlossary: function() {
            // Insert a blank popup for re-use throughout
            var terms = [];
            $(this).each(function(index, item) {

                var glossaryUrl = $(this).attr('data-glossary-url');
                if (!glossaryUrl) {
                    return;
                }


                var popup = $('<div class="ui-popup glossary-popup" style="display:none;"><h2>' + $(this).html() + '</h2></div>');
                var mobileScrollTop = 0;

                var options = {
                    buttonClass: 'glossary-button',
                    content: function(callback) {
                        // Haven't loaded data yet, so fetch it then go
                        $.getJSON(glossaryUrl, function(data) {
                            if ($('html').is('.device-xs, .device-sm')) {
                                mobileScrollTop = $(window).scrollTop();
                            }
                            $(popup).append('<div class="glossary-definition card"><div class="card-block"><button type="button" class="btn-close ui-close close"><span aria-hidden="true">x</span></button><h4>' + data.data.title + '</h4><p class="cart-text">' + data.data.definition + '</p></div></div>');
                            $('.ui-close').on('click', function(event) {
                                event.preventDefault();
                                if ($('html').is('.device-xs, .device-sm')) {
                                    $(window).scrollTop(mobileScrollTop);
                                }
                                sx.closeAll();
                            });
                            callback();
                        });
                    }
                };
                $(popup).insertAfter(this).sxPopup(options);
                $(this).remove();
            });

        },
        sxCollapsible: function() {

            $(this).each(function(index, item) {
                if ($(this).hasClass('collapsible-processed')) {
                    return;
                } else {
                    $(this).addClass('collapsible-processed');
                }
                $('h3', this).append('<span class="collapsible-arrow"><span></span></span>');
                $('.collapsible-content', this).hide();
                $('h3', this).addClass('collapsed');

                $('h3', this).click(function(e) {
                    e.preventDefault();
                    if ($(this).hasClass('collapsed')) {
                        $('#pageFooter').css('position', 'static');
                        $('.collapsible-content', $(this).parent()).slideDown();
                        $(this).removeClass('collapsed');
                    } else {
                        $('.collapsible-content', $(this).parent()).slideUp({
                            'complete': function () {
                                $('#pageFooter').css('position', $.footerPosition);
                            }
                        });
                        $(this).addClass('collapsed');
                    }
                });


            });
        },
        sxCollapsibleSearchMeta: function() {
            $(this).each(function(index, item) {
                if ($(this).hasClass('collapsible-processed')) {
                    return;
                } else {
                    $(this).addClass('collapsible-processed');
                }
                $('a', this).append('<span class="collapsible-arrow"><span></span></span>');
                $('.collapsible-content-meta-search').hide();
                $('a', this).addClass('collapsed');

                $('.search-drawer-control').click(function(e) {
                    e.preventDefault();
                    if ($(this).parent().hasClass('collapsed')) {
                        var footerPos = $('nav.footer-nav').position();
                        $('nav.footer-nav').css({top: footerPos.top, position: 'absolute', 'z-index': 0});
                        $('#pageFooter').css('position', 'static');
                        $('.collapsible-content-meta-search').slideDown();
                        $(this).parent().removeClass('collapsed');
                    } else {
                        $('.collapsible-content-meta-search').slideUp({
                            'complete': function () {
                                $('nav.footer-nav').attr({style : ""});
								positionFooter();
                            }
                        });
                        $(this).parent().addClass('collapsed');
                    }
                });


            });
        },
        sxSliderList: function(options) {
            var defaults = {
                target: false,
                click: function(e) {},
                outerWidth: function() {
                    return $(window).innerWidth();
                }
            };

            options = $.extend(defaults, options);

            if (!options.target) {
                return;
            }

            var list = $(options.target);
            list.addClass('sliderList');

            var container = list.wrap('<div class="sliderContainer"></div>').parent();
            var slider = list.wrap('<div id="photo-strip"></div>').parent();

            var sliderPrevPg = $('<div class="sliderPrevPg"><i class="icon icon-chevron-left"></i></div>').prependTo(container);
            var sliderNextPg = $('<div class="sliderNextPg"><i class="icon icon-chevron-right"></i></div>').appendTo(container);


            // Bind some events
            list.bind('sliderChanged', function() {
                setSize();
                setNextPrev();
            });

            setSize();
            setNextPrev();

            $(window).on('resize', function() {
                setSize();
                setNextPrev();
            });

            function setSize() {
                var newWidth = 0;
                $('.sliderItem', list).each(function() {
                    newWidth = $(this).outerWidth(true) + newWidth;
                });

                $(list).width(newWidth);


                n1 = sliderPrevPg.outerWidth(true);
                n2 = sliderNextPg.outerWidth(true);

                $(slider).width(options.outerWidth() - (n1 + n2));

                $(container).width(options.outerWidth());
                $(slider).css({
                    'left': n1 + 'px'
                });

            }

            function setNextPrev() {
                var listPos = list.position();
                var containerWidth = container.width();
                var listWidth = list.width();

                if (!listWidth) {
                    return;
                }

                if (Math.abs(listPos.left) + containerWidth <= listWidth) {
                    sliderNextPg.css({
                        opacity: '1',
                        cursor: 'pointer'
                    })
                        .unbind('click')
                        .click(slideNext);
                } else {
                    sliderNextPg.css({
                        opacity: '.25',
                        cursor: 'default'
                    })
                        .unbind('click');
                }

                if ((listPos.left < 0)) {
                    sliderPrevPg.css({
                        opacity: '1',
                        cursor: 'pointer'
                    })
                        .unbind('click')
                        .click(slidePrev);
                } else {
                    sliderPrevPg.css({
                        opacity: '.25',
                        cursor: 'default'
                    }).unbind('click');
                }

            }

            function slidePrev(event) {
                event.preventDefault();
                var nextPos;
                var listPos = list.position();
                var containerWidth = container.width();
                var containerLeft = Math.abs(listPos.left);
                var containerRight = containerLeft + containerWidth;

                // Find the next thumbnail not visible on the right
                $('.sliderItem', container).each(function() {
                    var thumbPos = $(this).position();
                    var thumbWidth = $(this).width();

                    var maxPos = containerLeft - containerWidth;

                    if (maxPos < 0) {
                        nextPos = 0;
                        return false;
                    } else {
                        if ((thumbPos.left >= maxPos)) {
                            nextPos = thumbPos.left;
                            return false;
                        }
                    }
                });

                list.css({
                    left: -nextPos
                }).bind(sx.transitionEndEvent, function() {
                    setNextPrev();
                });

                if (!sx.transitionEndEvent) {
                    setNextPrev();
                }

            }

            function slideNext(event) {
                event.preventDefault();
                var nextPos = 0;
                var listPos = list.position();
                var containerWidth = container.width();
                var containerLeft = Math.abs(listPos.left);
                var containerRight = containerLeft + containerWidth;

                // Find the next thumbnail not visible on the right
                $('.sliderItem', list).each(function() {
                    var thumbPos = $(this).position();
                    var thumbWidth = $(this).width();

                    thumbPos.right = thumbWidth + thumbPos.left;

                    if (thumbPos.right > containerRight) {
                        nextPos = thumbPos.left;
                        return false;
                    }
                });

                list.css({
                    left: -nextPos
                })
                    .bind(sx.transitionEndEvent, function() {
                        setNextPrev();
                    });

                if (!sx.transitionEndEvent) {
                    setNextPrev();
                }

            }

        }
    });



    function doReady(context) {

        sx.setResponsive();
        $(window).on('resize', function() {
            sx.setResponsive();
            if ($('.ui-popup:visible').length > 0) {
                sx.closeAll();
            }
        });

        sx.initializeAppMenu();

        $('.profile-address .profile-nearby').attr('data-ui-type', 'popup').addClass('hidden-xs');

        $('[data-ui-type="glossary"]').sxGlossary();

        // scroll a bit for anchors to clear fixed headers
        var hash = window.location.hash;
        if (hash) {
            $(window).on('load', function() {
                window.scrollTo(0, window.pageYOffset - 50);
            });
        }

        if ($('#ui-overlay').length == 0) {
            $("body").append("<div id='ui-overlay'></div>");
        }
        $('[data-ui-type="popup"]').sxPopup({
            buttonClass: " btn btn-location btn-default"
        });

        var o = {};

        if ($("body").hasClass('prof-detail')) {
            o = {
                positionFn: function() {
                    var scrollTop = $(window).scrollTop();
                    var headPos = $('.profile-menu').offset();
                    var pos = {};

                    if (headPos.top < scrollTop) {
                        // position nicely
                        pos.top = 100;
                    } else {
                        pos.top = (headPos.top) - scrollTop;
                    }

                    var mPos = $('#profile-content').offset();
                    pos.left = mPos.left;

                    return pos;
                }
            };

        }

        $('[data-ui-type="modal"]').sxModal(o);

        $('.collapsible').sxCollapsible();
        $('.collapsible-meta').sxCollapsibleSearchMeta();
        $('.tabs').sxTabs();

        $('.other-location').on('click', sx.revealOtherAddresses);

        if (context.init == 'firstLoad') {
            if (!$('body').hasClass('prof-search')) {
                sx.setMinHeight();
                $(window).on('resize', function() {
                    sx.setMinHeight();
                });
            }
        }

        // HTML5 input placeholder fallback
        // Duplicated in mobile.js!
        if (Modernizr.input.placeholder) {
            // clear the val
            $('[placeholder]').each(function() {
                if ($(this).val() == $(this).attr('placeholder')) {
                    $(this).val("");
                    $(this).addClass('placeholder-processed');
                }
            });
        } else {
            $('[placeholder]').each(function() {
                if ($(this).val() == $(this).attr('placeholder')) {
                    $(this).val($(this).attr('placeholder')).css({
                        color: '#aaa'
                    });
                }
                $(this).on('focus', function() {
                    if ($(this).val() == $(this).attr('placeholder')) {
                        $(this).val('').css({
                            color: '#000'
                        });
                    }
                });
                $(this).on('blur', function() {
                    if ($(this).val() === '') {
                        $(this).val($(this).attr('placeholder')).css({
                            color: '#aaa'
                        });
                    }
                });
            });
        }

        $(document).on('click', '.submit-hide', function(e) {
            sx.hideSubmit(this)
        });

        $(document).on('click', '.result-row a, .result-row button', function(e) {
            // Keep links inside the result row from triggering the row click event
            e.stopPropagation();
        });

        $(document).on('click', '.result-row', function() {
            var url = [
                $(this).data('result-url'),
                '&' + 'tr=ResultsRow'
            ];

            document.location.href = url.join('');
        });

        if ($.fn.sxDraggableGrid) {
            $('[data-ui-type="draggableGrid"]').sxDraggableGrid();
        }

        if(context.init == 'firstLoad') {

            // prof menu
            $('.prof-menu-btn:not([data-prof-menu-target])').on('mouseenter', function(e) {
                window.clearTimeout(profMenuTimer);
                var $this = $(this);
                sx.closeAll();

                if (!$this.hasClass('prof-menu-btn-open')) {
                    profMenuTimer = window.setTimeout(function() {
                        $this.addClass('prof-menu-btn-open');
                    }, 100);
                }
            });

            $('.prof-menu-btn:not([data-prof-menu-target])').on('mouseleave', function(e) {
                sx.closeAll();
                window.clearTimeout(profMenuTimer);
            });

            $('.prof-menu-btn[data-prof-menu-target]').on('mouseenter', function(e) {
                window.clearTimeout(profMenuTimer);
                var $this = $(this);
                if (!$this.hasClass('prof-menu-btn-open')) {
                    profMenuTimer = window.setTimeout(function() {

                        $this.trigger('click');
                    }, 100);
                }
            });

            $('.prof-menu-btn').on('mouseleave', function(e) {
                window.clearTimeout(profMenuTimer);
            });

            sx.positionMenu = function($menuBtn, $menu) {
                var menuItemOffset = $menuBtn.offset();
                var menuItemHeight = $menuBtn.outerHeight();
                var menuItemWidth = $menuBtn.outerWidth();

                var windowWidth = $(window).innerWidth();

                var menuTop = menuItemOffset.top + menuItemHeight - $(document).scrollTop();
                $menu.css({
                    top: menuTop + 'px'
                });

                if ($menuBtn.closest('.prof-menu-item').hasClass('last')) {
                    $menu.css({
                        right: windowWidth - (menuItemOffset.left + menuItemWidth) + 'px'
                    });
                } else {
                    $menu.css({
                        left: (menuItemOffset.left) + 'px'
                    });
                }
            }

            $('.prof-menu-btn[data-prof-menu-target]').on('click', function(e) {

                e.preventDefault();
                var $this = $(this);
                var $menu = $('#' + $this.attr('data-prof-menu-target'));

                if ($menu.length == 0) {
                    return;
                }

                if ($this.hasClass('prof-menu-btn-open')) {
                    sx.closeAll();
                    return;
                }



                window.clearTimeout(profMenuTimer);

                sx.closeAll();
                sx.showOverlay();

                $menu.addClass('prof-menu-open');
                // For large and medium, position the dropdown
                if (!$('html').hasClass('device-xs')) {

                    sx.positionMenu($this, $menu)

                    $menu.on('mouseenter.prof-menu', function(e) {
                        window.clearTimeout(profMenuTimer);

                        $menu.on('mouseleave.prof-menu', function(e) {
                            profMenuTimer = window.setTimeout(function() {
                                sx.closeAll();
                            }, 500);
                        });
                    });

                    $(window).on('resize.prof-menu', function() {
                        sx.positionMenu($this, $menu);

                        // Switched to xsmall, turn off mouse events
                        if ($('html').hasClass('device-xs')) {
                            $menu.off('mouseenter.prof-menu');
                            $menu.off('mouseleave.prof-menu');
                        } else {
                            $('body').css({
                                position: 'static',
                                overflow: 'auto'
                            });
                        }
                    });

                } else {
                    // For xsmall, freeze the body from scrolling
                    $('body').css({
                        position: 'fixed',
                        overflow: 'hidden',
                        top: '-' + $('body').scrollTop()
                    })
                }
                $('#headerWrapper').addClass('navOpen');
                $('#topSubNav').addClass('navOpen');
                $('#main').addClass('navOpen');
                $(this).addClass('prof-menu-btn-open');

            });
        }
    }
    $(document).on('ready', function() {
        doReady({
            init: 'firstLoad'
        });

        // Init PhoneClickToReveal
        new PhoneClickToReveal($(document)).init();

        $('.btn-nearby-areas').click(function() {
            if (!$('.profile-nearby > .card-block').length) {
                $('.profile-nearby').wrapInner('<div class="card-block"></div>');
                $('.profile-nearby > .card-block').prepend('<button type="button" class="btn-close ui-close close"><span aria-hidden="true">x</span></button>');
                $('.profile-nearby > .card-block > .ui-close').on('click', function(event) {
                    event.preventDefault();
                    sx.closeAll();
                });
            }
        });
    });


})(jQuery);

function resetSubmitHide() {
    $('.submit-hide:disabled').remove();
    $('.submit-hide').show();
}

var isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1;
var scrollTopPosition = 0;

$(document).ready(function(){
    $('body').on('click', '.glossary-button', function() {
        if ($('html').is('.device-xs, .device-sm')) {
            if (isAndroid) {
                scrollTopPosition = $(window).scrollTop();
                $('body').addClass('lock');
                $('body').css('height', $(window).height() + 'px');
            } else {
                window.onwheel = preventDefaultScroll;
                window.ontouchmove = preventDefaultScroll;
            }
        }
    });

    $('body').on('click', '.glossary-popup .ui-close', function() {
        if ($('html').is('.device-xs, .device-sm')) {
            if (isAndroid) {
                $('body').removeClass('lock');
                $(window).scrollTop(scrollTopPosition);
            } else {
                window.onwheel = null;
                window.ontouchmove = null;
            }
        }
    });
});

function preventDefaultScroll(event) {
    event = window.event;

    if (event.preventDefault)
        event.preventDefault();
}
