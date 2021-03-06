$(document).ready(function () {
    $('.floating-label-form-container').on('focus', '.floating-labels input, .floating-labels textarea', floatLabel);
    $('.floating-label-form-container').on('blur', '.floating-labels input, .floating-labels textarea', unFloatLabel);
    $('.floating-label-form-container').on('keydown', '.floating-labels input, .floating-labels textarea', function (e) {
        $(this).closest('.has-danger').removeClass('has-danger');
    });

    $('.floating-label-form-container').on('click', '.floating-labels textarea', function (e) {
        if ($('html').hasClass('device-sm') || $('html').hasClass('device-xs')) {
            if (!$(this).hasClass('full-height')) {
                $(this).addClass('full-height');
            }
        }
        if(/Android/i.test(navigator.userAgent) ){
            $('#modalContactForm').animate({
                scrollTop: $(window).scrollTop() + 150
            });
        }
    });
    $(document).ajaxSuccess(function () {
        floatingLabelInit();
    });
    floatingLabelInit();

    $(".contact-modal")
        .on('data', function(e, invokerData, modalData) {
            var modal = $(this);

            if (modalData.hasOwnProperty('profileImage')) {
                var title = $('.modal-header.hidden-xs-down .modal-title .title', modal);
                var xsHeader = $('.modal-header.hidden-sm-up', modal);

                if (modalData['profileImage'] !== '') {
                    if (!$(title).hasClass("has-photo")) {
                        $(title).addClass("has-photo");
                    }
                    $(title).css('background-image', 'url(' + modalData['profileImage'] + ')');

                    if (!$(xsHeader).children('img').length) {
                        $(xsHeader).prepend('<img class="modal-image" src="' + modalData['profileImage'] + '"/>');
                    } else {
                        $(xsHeader).children('.modal-image').attr('src', modalData['profileImage']);
                    }
                } else {
                    $(title).css('background-image', '').removeClass("has-photo");
                }
            }

            if (invokerData.hasOwnProperty('actionUrl')) {
                var formAction = invokerData['actionUrl'];
                $("form", modal).data('formAction', formAction).attr('data-form-action', formAction);
            }

            if (window.hasOwnProperty('isForbiddenHost') && isForbiddenHost) {
                if (modalData.hasOwnProperty('profName')) {
                    var noEmailMessageUpdated = noEmailMessage.replace('[NAME]', modalData['profName']);
                    var phoneMessageUpdated = '';
                    if (modalData.hasOwnProperty('phone')) {
                        phoneMessageUpdated = phoneMessage.replace('[PHONE]', modalData['phone']);
                    }
                    noEmailMessageUpdated = noEmailMessageUpdated.replace('[PHONE_TEXT]', phoneMessageUpdated);
                    $('.modal-content-init', modal).hide();
                    modalAddAlert(modal, 'warnings', '<div id="forbiddenHost">'+noEmailMessageUpdated+'</div>');
                }
            }

            if (modalData.hasOwnProperty('newClients') && modalData['newClients'] != 1) {
                if (modalData.hasOwnProperty('profName')) {
                    var notAcceptingNewClientMessageUpdated = notAcceptingNewClientMessage.replace('[NAME]', modalData['profName']);
                    modalAddAlert(modal, 'warning', notAcceptingNewClientMessageUpdated);
                }
            }

            if (!modal.is('#modalShareForm') && modalData.hasOwnProperty('emailUrl') && !modalData['emailUrl']) {
                $('.modal-content-init', modal).hide();
                if (modalData.hasOwnProperty('profName') && modalData.hasOwnProperty('profilePhone')) {
                    var notAcceptingEmailMessageUpdated = notAcceptingEmailMessage
                        .replace('[NAME]', modalData['profName'])
                        .replace('[PHONE]', modalData['profilePhone']);
                    modalAddAlert(modal, 'warnings', notAcceptingEmailMessageUpdated);
                }
            }

            if (modalData.hasOwnProperty('useCompanyName')) {
                var messageLabel = (modalData['useCompanyName'] != 1) ? personMessageLabel : companyMessageLabel;
                var messageFloatingLabel = (modalData['useCompanyName'] != 1) ? personMessageFloatingLabel : companyMessageFloatingLabel;
                $('.contact-message', modal).prev('label')
                    .html(messageLabel)
                    .data('floatingLabel', messageFloatingLabel)
                    .attr('data-floating-label', messageFloatingLabel);
            }
        })
        .on('show.bs.modal', function(e) {
            var invoker = $(e.relatedTarget);
            var modal = $(this);

            modalFormsReset(modal);
            loadModalData(invoker, modal);

            var formId = $('form', modal).attr('id');
            var captchaId = $('.form-captcha', modal).attr('id');
            if (!formId || !captchaId.length) {
                return;
            }

            var token = $('#access-token', modal).val();
            if (token.length && isCaptchaLoaded(captchaId)) {
                return resetCaptcha(captchaId);
            }

            getAccessToken(formId, function(err, res) {
                if (!err && res && res.data) {
                    $('#access-token', modal).val(res.data.id);
                    if (res.data.token.required) {
                        loadCaptcha(captchaId);
                    }
                }
            });

            // Make sure the reCaptcha is positioned to offset the body's top
            var recaptchaPositionFix = function() {
                $.recaptchaContainer = $('iframe[title="recaptcha challenge"]').parent('div').parent('div');
                $.recaptchaContainer.css('margin-top', -$('body').offset().top);
            };

            // When a Recaptcha is focused and the modal blurred or the device rotated, reposition the recaptcha
            $(".modal").on('blur', recaptchaPositionFix);
            $(window).on('orientationchange', function() { setTimeout(recaptchaPositionFix, 500)});

        });

    $(".contact-modal form").on("submit", function (event) {
        event.preventDefault();

        var form = $(this);
        var captchaId = $('.form-captcha', form).attr('id');
        var token = $('#access-token', form).val();
        var modal = $(form).closest('.modal');
        var captchaOverride = $('form #captcha-override', modal).val();

        postContactForm(form, function(err, res) {
            modalRemoveAlerts(modal);

            if (err) {
                modalAddAlert(modal, 'danger', err);
                if (res && res.hasOwnProperty('FormErrors')) {
                    formErrors = res.FormErrors;
                    $(document).trigger('formErrors');
                }
            } else if (res.hasOwnProperty('SuccessMessage')) {
                $('.modal-content-init', modal).hide();
                modalAddAlert(modal, 'success', res.SuccessMessage);
                $('#access-token', modal).val(res.AccessToken.id);
                if (res.AccessToken.token.required && !isCaptchaLoaded(captchaId) && !captchaOverride) {
                    loadCaptcha(captchaId);
                }
                if (Array.isArray(res.Events)) {
                    $.each(res.Events, function(key, event) {
                        dataLayer.push(event);
                    });
                }
            }

            resetSubmitHide();
        });
    });

    $('.result-btn-email, .action-btn-email').click(function(event) {
        $('.modal-title > .title > h1').text($(event.target).data('modal-title'));
    });
});

function floatingLabelInit() {
    $('.floating-label-form-container input, .floating-label-form-container textarea').each(function() {
        if ($(this).val() != '') {
            floatLabel({target: this});
        }
    });
}

function floatLabel(event) {
    var input = $(event.target);
    var label = input.prev('label');

    input.parent().addClass('has-focus')
    input.parent().addClass('floated-label');
    if (label.data('floating-label')) {
        if (!label.data('original-label')) {
            label.data('original-label', label.text());
        }
        label.text(label.data('floating-label'));
    }
}

function unFloatLabel(event) {
    var input = $(event.target);
    var label = input.prev('label');

    if (input.val() == '') {
        input.parent().removeClass('floated-label');
        input.parent().removeClass('has-focus')
        if (label.data('original-label')) {
            label.text(label.data('original-label'));
        }
    }
}

var loadedCaptchas = {};
function isCaptchaLoaded(captchaId) {
    return loadedCaptchas.hasOwnProperty(captchaId);
}

function loadCaptcha(captchaId) {
    if (!window.hasOwnProperty('grecaptcha') || isCaptchaLoaded(captchaId)) {
        return;
    }

    loadedCaptchas[captchaId] = grecaptcha.render(captchaId, {
        callback: clearErrors,
        'sitekey' : '6Lc5fB4TAAAAAGSgjCOgZJD8_jEozXbM0Gx2p-B6'
    });
}

function resetCaptcha(captchaId) {
    if (!window.hasOwnProperty('grecaptcha') || !isCaptchaLoaded(captchaId)) {
        return;
    }

    grecaptcha.reset(loadedCaptchas[captchaId]);
}

function getAccessToken(scope, cb) {
    var captchaOverride = ($('#'+ scope +' #captcha-override').val());
    $.ajax({
        url: '/authenticate/access-tokens',
        cache: false,
        data: {scope: scope, 'captcha-override': captchaOverride},
        dataType: 'json',
        type: 'GET',
        error: function() {
            cb('Error');
        },
        success: function (res) {
            cb(null, res);
        }
    });
}

function postContactForm(form, cb) {
    var url = $(form).data('formAction');
    var postData = $(form).serializeArray();

    if (typeof ga !== 'undefined' && typeof ga.getAll !== 'undefined') {
        postData.push({name: 'ga-client-id', value: ga.getAll()[0].get('clientId') });
        postData.push({name: 'ga-document-location', value: document.location.origin + document.location.pathname + document.location.search });
        postData.push({name: 'ga-document-host-name', value: document.location.host });
        postData.push({name: 'ga-document-path', value: document.location.pathname });
        postData.push({name: 'ga-document-title', value: $('title').text() });
    }

    $.ajax({
        url: url,
        cache: false,
        dataType: 'json',
        type: 'POST',
        data: postData,
        error: function(jqXHR) {
            var res = jqXHR.responseJSON;
            var errorMessage = (res && res.hasOwnProperty('ErrorMessage')) ? res.ErrorMessage : ajaxErrorMessage;
            cb(errorMessage, res);
        },
        success: function (res) {
            cb(null, res);
        }
    });
}

function loadModalData(invoker, modal) {
    var data = $(invoker).data();
    if(data.hasOwnProperty('elementTarget')) {
        var absoluteTarget = data['elementTarget'][0] == '#';
        var selector = absoluteTarget ? $(data['elementTarget']) : $(invoker).closest(data['elementTarget']);
    }
    var modalData = selector ? selector.data() : {};
    $(modal).trigger('data', [data, modalData]);
}
