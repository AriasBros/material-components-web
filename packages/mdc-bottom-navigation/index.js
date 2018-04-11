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

import MDCComponent from '@material/base/component';
import {MDCBottomNavigationAction, MDCBottomNavigationActionFoundation} from './action/index';
import MDCBottomNavigationFoundation from './foundation';

class MDCBottomNavigation extends MDCComponent {
    //////////////////////
    //region Component API

    /**
     * @public
     * @param {Element} root
     * @return {MDCBottomNavigation}
     */
    static attachTo(root) {
        return new MDCBottomNavigation(root);
    }

    /**
     * @public
     * @return {MDCBottomNavigationAction[]}
     */
    get actions() {
        return this.actions_;
    }

    /**
     * @public
     * @return {MDCBottomNavigationAction}
     */
    get activeAction() {
        const activeIndex = this.foundation_.getActiveActionIndex();
        return this.actions[activeIndex];
    }

    /**
     * @public
     * @param {MDCBottomNavigationAction} action
     */
    set activeAction(action) {
        this.setActiveAction_(action, false);
    }

    /**
     * @public
     * @return {number}
     */
    get activeActionIndex() {
        return this.foundation_.getActiveActionIndex();
    }

    /**
     * @public
     * @param {number} index
     */
    set activeActionIndex(index) {
        this.setActiveActionIndex_(index, false);
    }

    /**
     * @public
     * @return {boolean}
     */
    get fixed() {
        return this.foundation_.isFixedStyle();
    }

    /**
     * @public
     * @param {boolean} fixed
     */
    set fixed(fixed) {
        let style = MDCBottomNavigationFoundation.cssClasses.SHIFTING;

        if (fixed) {
            style = MDCBottomNavigationFoundation.cssClasses.FIXED;
        }

        this.foundation_.setStyle(style);
    }

    /**
     * @public
     * @return {boolean}
     */
    get shifting() {
        return this.foundation_.isShiftingStyle();
    }

    /**
     * @public
     * @param {boolean} shifting
     */
    set shifting(shifting) {
        let style = MDCBottomNavigationFoundation.cssClasses.FIXED;

        if (shifting) {
            style = MDCBottomNavigationFoundation.cssClasses.SHIFTING;
        }

        this.foundation_.setStyle(style);
    }

    //endregion
    ///////////

    /**
     * @protected
     * @param actionFactory
     */
    initialize(actionFactory = (el) => new MDCBottomNavigationAction(el)) {
        this.actions_ = this.gatherActions_(actionFactory);

        this.actionSelectedHandler_ = ({detail}) => {
            const {action} = detail;
            this.setActiveAction_(action, true);
        };
    }

    /**
     * @public
     * @return {!F} foundation
     */
    getDefaultFoundation() {
        return new MDCBottomNavigationFoundation({
            hasClass: (className) => this.root_.classList.contains(className),
            addClass: (className) => this.root_.classList.add(className),
            removeClass: (className) => this.root_.classList.remove(className),

            bindOnMDCBottomNavigationActionSelectedEvent: () => this.listen(MDCBottomNavigationActionFoundation.strings.SELECTED_EVENT, this.actionSelectedHandler_),
            unbindOnMDCBottomNavigationActionSelectedEvent: () => this.unlisten(MDCBottomNavigationActionFoundation.strings.SELECTED_EVENT, this.actionSelectedHandler_),

            notifyChange: (evtData) => this.emit(MDCBottomNavigationFoundation.strings.CHANGE_EVENT, evtData),

            getNumberOfActions: () => this.actions.length,
            isActionActiveAtIndex: (index) => this.actions[index].isActive,
            setActionActiveAtIndex: (index, isActive = true) => {
                this.actions[index].isActive = isActive;
            },
        });
    }

    /**
     * @private
     * @param actionFactory
     */
    gatherActions_(actionFactory) {
        const actionElements = [].slice.call(this.root_.querySelectorAll(MDCBottomNavigationFoundation.strings.ACTION_SELECTOR));
        return actionElements.map((el) => actionFactory(el));
    }

    /**
     * @private
     * @param activeActionIndex
     * @param notifyChange
     */
    setActiveActionIndex_(activeActionIndex, notifyChange) {
        this.foundation_.switchToActionAtIndex(activeActionIndex, notifyChange);
    }

    /**
     * @private
     * @param activeAction
     * @param notifyChange
     */
    setActiveAction_(activeAction, notifyChange) {
        const indexOfAction = this.actions.indexOf(activeAction);

        if (indexOfAction < 0) {
            throw new Error('Invalid action component given as activeAction: Action not found within this component\'s action list');
        }

        this.setActiveActionIndex_(indexOfAction, notifyChange);
    }
}

export {MDCBottomNavigationFoundation, MDCBottomNavigation};
