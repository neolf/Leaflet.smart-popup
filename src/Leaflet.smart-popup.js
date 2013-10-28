

(function() {
    /*
     * L.AnimatedMarker is used to display animated icons on the map.
     */

    L.SmartPopup = L.Popup.extend({
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


            if(this._tipOnUpper){
                this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
                this._tip = L.DomUtil.create('div', prefix + '-tip-down', this._tipContainer);
            }
            var wrapper = this._wrapper =
                L.DomUtil.create('div', prefix + '-content-wrapper', container);
            L.DomEvent.disableClickPropagation(wrapper);

            this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);
            L.DomEvent.on(this._contentNode, 'mousewheel', L.DomEvent.stopPropagation);
            L.DomEvent.on(this._contentNode, 'MozMousePixelScroll', L.DomEvent.stopPropagation);
            L.DomEvent.on(wrapper, 'contextmenu', L.DomEvent.stopPropagation);
            if(!this._tipOnUpper){
                this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
                this._tip = L.DomUtil.create('div', prefix + '-tip', this._tipContainer);
            }
        },
        setTipOnUpper: function (flag) {
            this._tipOnUpper = flag;
            return this;
        },
        setXOffset: function (offset) {
            this._xOffect = offset;
            return this;
        },
        _tipOnUpper:false,
        _xOffect:0,
        _updatePosition: function () {
            if (!this._map) { return; }

            var pos = this._map.latLngToLayerPoint(this._latlng),
                animated = this._animated,
                offset = L.point(this.options.offset);

            if (animated) {
                L.DomUtil.setPosition(this._container, pos);
            }

            this._containerBottom = -offset.y - (animated ? 0 : pos.y);
            if(this._tipOnUpper){
                 this._containerBottom -=  this._containerHeight ;
            }
            this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x + (animated ? 0 : pos.x);

            // bottom position the popup in case the height of the popup changes (images loading etc)
            this._container.style.bottom = this._containerBottom + 'px';
            this._container.style.left = (this._containerLeft - this._xOffect) + 'px';
            if(this._xOffect > 0)
                this._tipContainer.style.marginRight = (this._containerWidth / 2 - Math.abs(this._xOffect) - 20)+"px";
            else if(this._xOffect < 0)
                this._tipContainer.style.marginLeft = (this._containerWidth / 2 - Math.abs(this._xOffect) - 20)+"px";
        }
    });

    L.smartPopup = function (options, source) {
        return new L.SmartPopup(options, source);
    };


}).call(this);