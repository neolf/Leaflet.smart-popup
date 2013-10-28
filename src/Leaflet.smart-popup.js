

(function() {
    /*
     * L.AnimatedMarker is used to display animated icons on the map.
     */

    L.PopupDown = L.Popup.extend({
        _initLayout: function () {
            var prefix = 'leaflet-popup',
                containerClass = prefix + ' ' + this.options.className + ' leaflet-zoom-' +
                    (this._animated ? 'animated' : 'hide'),
                container = this._container = L.DomUtil.create('div', containerClass),
                closeButton;

            if (this.options.closeButton) {
                closeButton = this._closeButton =
                    L.DomUtil.create('a', prefix + '-close-button', container);
                closeButton.href = '#close';
                closeButton.innerHTML = '&#215;';
                L.DomEvent.disableClickPropagation(closeButton);

                L.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
            }

            this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
            this._tip = L.DomUtil.create('div', prefix + '-tip-down', this._tipContainer);

            var wrapper = this._wrapper =
                L.DomUtil.create('div', prefix + '-content-wrapper', container);
            L.DomEvent.disableClickPropagation(wrapper);

            this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);
            L.DomEvent.on(this._contentNode, 'mousewheel', L.DomEvent.stopPropagation);
            L.DomEvent.on(this._contentNode, 'MozMousePixelScroll', L.DomEvent.stopPropagation);
            L.DomEvent.on(wrapper, 'contextmenu', L.DomEvent.stopPropagation);
        },

        _updatePosition: function () {
            if (!this._map) { return; }

            var pos = this._map.latLngToLayerPoint(this._latlng),
                animated = this._animated,
                offset = L.point(this.options.offset);

            if (animated) {
                L.DomUtil.setPosition(this._container, pos);
            }

            this._containerBottom = -offset.y - this._containerHeight - (animated ? 0 : pos.y);
            this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x + (animated ? 0 : pos.x);

            // bottom position the popup in case the height of the popup changes (images loading etc)
            this._container.style.bottom = this._containerBottom + 'px';
            this._container.style.left = this._containerLeft + 'px';
        }
    });

    L.popupdown = function (options, source) {
        return new L.PopupDown(options, source);
    };


}).call(this);