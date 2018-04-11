/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import MDCFoundation from '@material/base/foundation';
import {cssClasses, strings} from './constants';

export default class MDCBottomNavigationFoundation extends MDCFoundation {
    static get cssClasses() {
        return cssClasses;
    }

    static get strings() {
        return strings;
    }

    static get defaultAdapter() {
        return {
            hasClass: (/* className: string */) => false,
            addClass: (/* className: string */) => {},
            removeClass: (/* className: string */) => {},

            bindOnMDCBottomNavigationActionSelectedEvent: () => {},
            unbindOnMDCBottomNavigationActionSelectedEvent: () => {},

            notifyChange: (/* evtData: {activeActionIndex: number} */) => {},

            getNumberOfActions: () => /* number */ 0,
            isActionActiveAtIndex: (/* index: number */) => /* boolean */ false,
            setActionActiveAtIndex: (/* index: number, isActive: true */) => {},
        };
    }

    constructor(adapter) {
        super(Object.assign(MDCBottomNavigationFoundation.defaultAdapter, adapter));
    }

    init() {
        this.adapter_.addClass(cssClasses.UPGRADED);
        this.adapter_.bindOnMDCBottomNavigationActionSelectedEvent();

        const activeActionIndex = this.findActiveActionIndex_();

        if (activeActionIndex >= 0) {
            this.activeActionIndex_ = activeActionIndex;
        }
    }

    destroy() {
        this.adapter_.removeClass(cssClasses.UPGRADED);
        this.adapter_.unbindOnMDCBottomNavigationActionSelectedEvent();
    }

    switchToActionAtIndex(index, shouldNotify) {
        if (index === this.activeActionIndex_) {
            return;
        }

        if (index < 0 || index >= this.adapter_.getNumberOfActions()) {
            throw new Error(`Out of bounds index specified for action: ${index}`);
        }

        const prevActiveIndex = this.activeActionIndex_;
        this.activeActionIndex_ = index;

        requestAnimationFrame(() => {
            if (prevActiveIndex >= 0) {
                this.adapter_.setActionActiveAtIndex(prevActiveIndex, false);
            }

            this.adapter_.setActionActiveAtIndex(this.activeActionIndex_);

            if (shouldNotify) {
                this.adapter_.notifyChange({ activeActionIndex: this.activeActionIndex_ });
            }
        });
    }

    ///////////////////////
    //region Foundation API

    getActiveActionIndex() {
        return this.findActiveActionIndex_();
    }

    /**
     * @public
     * @param {string} style
     */
    setStyle(style) {
        if (style !== cssClasses.FIXED && style !== cssClasses.SHIFTING) {
            throw new Error(`Invalid style specified: ${style}`);
        }

        this.adapter_.removeClass(cssClasses.FIXED);
        this.adapter_.removeClass(cssClasses.SHIFTING);
        this.adapter_.addClass(style);
    }

    /**
     * @public
     * @return {string}
     */
    getStyle() {
        if (this.adapter_.hasClass(cssClasses.FIXED)) {
            return cssClasses.FIXED;
        } else {
            return cssClasses.SHIFTING;
        }
    }

    /**
     * @public
     * @return {boolean}
     */
    isFixedStyle() {
        return this.adapter_.hasClass(cssClasses.FIXED);
    }

    /**
     * @public
     * @return {boolean}
     */
    isShiftingStyle() {
        return this.adapter_.hasClass(cssClasses.SHIFTING);
    }

    //endregion
    ///////////

    findActiveActionIndex_() {
        let activeActionIndex = -1;

        this.forEachActionIndex_((index) => {
            if (this.adapter_.isActionActiveAtIndex(index)) {
                activeActionIndex = index;
                return true;
            }
        });

        return activeActionIndex;
    }

    forEachActionIndex_(iterator) {
        const numberOfActions = this.adapter_.getNumberOfActions();

        for (let index = 0; index < numberOfActions; index++) {
            const shouldBreak = iterator(index);

            if (shouldBreak) {
                break;
            }
        }
    }
}
