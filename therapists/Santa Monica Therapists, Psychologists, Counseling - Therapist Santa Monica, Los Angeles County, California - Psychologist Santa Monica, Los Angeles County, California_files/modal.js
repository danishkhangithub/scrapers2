$(document).ready(function () {
    // Modified enforceFocus to allow iframes in modals to take focus
    $.fn.modal.Constructor.prototype.enforceFocus = function () {
        $(document)
            .off('focusin.bs.modal') // guard against infinite focus loop
            .on('focusin.bs.modal', $.proxy(function (e) {
                if (this.$element[0] !== e.target && !this.$element.has(e.target).length && !$(e.target).is('iframe')) {
                    this.$element.trigger('focus')
                }
            }, this));
    };

    $('.modal').on('show.bs.modal', function (event) {

        hideGalleryModal();
        $('.modal.in').not(event.target).modal('hide');
        var url = $(event.target).data('modal-url');

        if (!url) {
            url = $(event.relatedTarget).data('modal-url');
        }

        if (!url) {
            return;
        }

		var modal = $(this)

        $.get({
            url: url,
            success: function (data) {
                modal.find('.modal-body').empty();
                modal.find('.modal-body').append(data);
                modal.find('.modal-body form').append('<input type="hidden" name="ajax" value="1">');
                $(event.target).modal('handleUpdate');
                $(':submit', $(event.target)).on('click', {targetModal: event.target}, modalFormSubmit);
                $(event.target).trigger('shown.bs.modal');
            }
        });
    });

    $('.modal').on('shown.bs.modal', function (event) {
        var target = event.target;
        modalAdjustHeight(target);
        modalDisableBodyScrolling();
        accommodateScrollbars();
    });

    $(window).on('resize', function () {
        var modal = $('.modal:visible');
        if (modal.length) {
            modalAdjustHeight(modal);
            modalDisableBodyScrolling();
        }
    });

    $('.modal').on('hide.bs.modal', function (event) {
        if ($(this).data('modal-url')) {
            $(event.target).empty();
        }
        modalEnableBodyScrolling();
        $('.fixed-header').css('padding-right', 0);
    });

    $('.modal:visible').on('touchend', function (event) {
        var scrollable = $(event.target).closest('.scrollable');
        scrollable.addClass('ioshack').removeClass('ioshack').addClass('ioshack');
    });

    $('.modal:visible').on('touchstart', function (event) {
        var scrollable = $(event.target).closest('.scrollable');
        scrollable.removeClass('ioshack');
    });
});

function accommodateScrollbars() {
    var scrollerWidth = sx.scrollerWidth();
    if ($('body').prop('scrollHeight') > $(window).innerHeight()) {
        $('.fixed-header').css('padding-right', scrollerWidth);

        // Adjust width of the action bar and footer to replace scrollbars
        $('#profile-options-actions').css('width', 'calc(100% + '+scrollerWidth+'px)');
        $('.footer-nav').css('width', 'calc(100% + '+scrollerWidth+'px)');
    }
}

function modalDisableBodyScrolling() {

    if (!$('body').hasClass('scrolling-disabled')) {

        accommodateScrollbars();

        var scrollTop = $(window).scrollTop();
        $('body').data('modal-original-scrolltop', scrollTop);
        $('body').addClass('scrolling-disabled');
        $('body').css({top: -scrollTop});
    }

    if ($('#modalPhotoContact').is(':visible')) {
        return;
    }

    // this logic handles windows that are so short the captcha doesn't fit vertically in the viewport
    var currentHeight = $(window).height();
    var minHeight = 478; // 478 is the height of the captcha flyout
    var isTallEnough = currentHeight > minHeight;

    if (!isTallEnough) {

        $('body').addClass('scrolling-disabled-short');
        $('.modal-dialog').addClass('modal-dialog-short');

        $('body').css('top', "-30");
    } else {
        if ($('body').is('.scrolling-disabled-short')) {
            $('body').removeClass('scrolling-disabled-short');
        }
        if ($('.modal-dialog').is('.modal-dialog-short')) {
            $('.modal-dialog').removeClass('modal-dialog-short');
        }
    }
}

function modalEnableBodyScrolling() {
    if ($('body').hasClass('scrolling-disabled')) {
        $('body').removeClass('scrolling-disabled');
        $(window).scrollTop($('body').data('modal-original-scrolltop'));
        $('body').css({top: 0});
    }
}

function modalAdjustHeight(target) {
    var modal = $(target);
    if ($('.modal-content', modal).length == 0) return;

    var modalHeaderFooterHeight = $('.modal-footer', modal).height();
    var maxModalBodyHeight = $(window).innerHeight() - ($('.modal-body', modal).offset().top - $(window).scrollTop()) - modalHeaderFooterHeight;

    if (!modal.is('#modalVideoPlayer, #modalPhotoContact')) {
        $('.modal-body', modal).css({
            'max-height': maxModalBodyHeight,
            'overflow': ''
        });
    }
}

function modalFormSubmit(event) {
    event.preventDefault();

	var form = $(this).closest('form');

    var data = form.serializeArray();
    var url = form.attr('action');

	data.push({
		name: 'edit[submit]',
		value: $(this).val()
	});

	var modal = $(event.data.targetModal);

    $.post({
        url: url,
        data: data,
        success: function (data) {

			if (typeof data == "object") {
				// Response is javascript object
				if (1 == data.status) {
					if (data.hasOwnProperty('redirect')) {
						document.location.href = data.redirect;
						return;
					} else if (1 == data.mainXhrRefresh) {
						modal.modal('hide');
						modalEnableBodyScrolling();
						sx.refreshPage();
						return;
					} else {
						modal.modal('hide');
						modalEnableBodyScrolling();
						return;
					}
				} else {
					data = data.form
				}
			}

            modal.find('.modal-body').empty();
            modal.find('.modal-body').append(data);
            modal.find('.modal-body form').append('<input type="hidden" name="ajax" value="1">');
            modal.modal('handleUpdate');
            $(':submit', $(event.data.targetModal)).on('click', {targetModal: event.data.targetModal}, modalFormSubmit);
            $(document).trigger('formErrors');
            $(event.data.targetModal).trigger('shown.bs.modal');
        }
    });
}

function modalAddAlert(target, alertContext, message) {
    $(target).find('.alerts').prepend('<div class="alert alert-' + alertContext + '">' + message + '</div>');
}

function modalRemoveAlerts(target) {
    $(target).find('.alerts .alert').remove();
}

function modalFormsReset(target) {
    var modal = $(target);
    var form = $('form', modal);
    modalRemoveAlerts(modal);
    $(form).trigger('reset');
    $('.modal-content-init', modal).show();
    $('input, textarea', form).each(function () {
        unFloatLabel({target: this});
    });
    $('.form-group', form).removeClass('has-danger');
    $('.form-group span.help-block.textError', form).remove();
}

function hideGalleryModal() {
    $('html').removeClass('large-gallery-open');
    $('body').css('overflow', '');
    $('#gallery-large').remove();
}
