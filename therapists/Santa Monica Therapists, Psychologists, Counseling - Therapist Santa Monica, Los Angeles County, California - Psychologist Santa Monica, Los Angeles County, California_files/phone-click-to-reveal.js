function PhoneClickToReveal($parentNode) {
    this.$parentNode = $parentNode;
    return this;
}

PhoneClickToReveal.prototype = Object.create({
    // Initialize
    //
    // Creates the on click/touch handler for ctrLinks found in the
    // parent node
    init: function() {
        if (!window.featureToggles || window.featureToggles.clickToRevealPhoneEnabled == false) {
            return;
        }

        var self = this;
        var $ctrLink = this.getCtrLink(this.$parentNode);
        var timeout = $('html').is('.device-xs, .device-sm') ? 100 : 0;

        $ctrLink.on('click', function(e) {
            $('#modalPhotoContact .modal-photo-contact').removeClass('phone-reveal-ext');

            var clickedElementData = $(this).data();
            var isProfResultsCtr = $(this).hasClass('phone-reveal-results');

            // Determine if we should perform logic for all of the found ctrLinks
            // or just the ones associated with a specific profile
            var $ctrElement = isProfResultsCtr && clickedElementData.revealProfile
                ? self.getCtrProfileLink(self.$parentNode, clickedElementData.revealProfile)
                : self.getCtrLink($(document));

            setTimeout(function() {
                self.getCtrPhoneNumberPartial($ctrElement).css('display', 'inline-block');
                self.getCtrPhoneNumberText($ctrElement).addClass('phone-revealed');

                if (!isProfResultsCtr) {
                    self.getCtrPhoneNumberConsultation($ctrElement).addClass('phone-revealed');
                    self.getCtrPhoneNumberFinance($ctrElement).addClass('phone-revealed');
                } else {
                    self.getCtrPhoneNumberText($ctrElement).removeAttr('data-reveal-xs');
                    self.getCtrPhoneNumberPartial($ctrElement).css('display', 'inline-block');
                }
            }, timeout)

            self.handleReveal($ctrElement, clickedElementData);

            if(!$('html').is('.device-xs, .device-sm')) {
                // Prevent default click handler that would dial the phone number
                return false;
            }

        });
    },

    // Get all of the phone CTR links in the parent node
    getCtrLink: function($parentNode) {
        return $parentNode.find('.phone-click-reveal');
    },

    // Get all of the phone CTR links in the parent node
    // that are associated with a specific profile
    getCtrProfileLink: function($parentNode, profileId) {
        return $parentNode.find('a[data-reveal-profile='+profileId+']');
    },

    // Get the phone CTR text found in the phone CTR link
    getCtrPhoneNumberText: function($ctrElement) {
        return $ctrElement.find('.phone-number-text');
    },

    // Get the phone CTR partial found in the phone CTR link
    getCtrPhoneNumberPartial: function($ctrElement) {
        return $ctrElement.find('.phone-number-partial');
    },

    // Get the phone CTR consultation found in the phone CTR link
    getCtrPhoneNumberConsultation: function($ctrElement) {
        return $ctrElement.find('.phone-number-consultation');
    },

    // Get the phone CTR finance found in the phone CTR link
    getCtrPhoneNumberFinance: function($ctrElement) {
        return $ctrElement.find('.phone-number-finance');
    },

    // Get the default GA event category
    getDefaultEventCategory: function() {
        for (index = 0; index < window.dataLayer.length; ++index) {
            if (window.dataLayer[index].hasOwnProperty('defaultEventCategory')) {
                return window.dataLayer[index].defaultEventCategory;
            }
        }
    },

    // Handle the phone CTR link reveal
    handleReveal: function($ctrElement, clickedElementData) {
        if (!$ctrElement.hasClass('phone-clicked')) {
            $ctrElement.addClass('phone-clicked');

            var uuid = $ctrElement.parents('[data-profile-uuid]').data('profileUuid');
            this.sendMetric(uuid, 'PhoneNumberRevealClick');

            var dataLayerEvent = {
                event: 'dataLayerEvent',
                eventAction: 'reveal',
                eventLabel: clickedElementData.eventLabel,
                eventCategory: clickedElementData.eventCategory || this.getDefaultEventCategory(),
            };

            dataLayer.push(dataLayerEvent);
        }
    },

    sendMetric: function(uuid, name) {
        $.post({
            url: '/directory-metrics/metric',
            data: JSON.stringify({metric_name: name, entity_uuid: uuid}),
            contentType: 'application/json',
            error: function(){},
            success: function(){}
        });
    }
});