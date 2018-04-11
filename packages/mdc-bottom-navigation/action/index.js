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
import {MDCRipple} from '@material/ripple/index';

import {cssClasses} from './constants';
import MDCBottomNavigationActionFoundation from './foundation';

export {MDCBottomNavigationActionFoundation};

export class MDCBottomNavigationAction extends MDCComponent {
  //////////////////////
  //region Component API
  /**
   * @public
   * @param {Element} root
   * @return {MDCBottomNavigationAction}
   */
  static attachTo(root) {
    return new MDCBottomNavigationAction(root);
  }

  /**
   * @public
   * @return {boolean}
   */
  get isActive() {
    return this.foundation_.isActive();
  }

  /**
   * @public
   * @param {boolean} isActive
   */
  set isActive(isActive) {
    this.foundation_.setActive(isActive);
  }

  /**
   * @public
   * @return {boolean}
   */
  get preventDefaultOnClick() {
    return this.foundation_.preventsDefaultOnClick();
  }

  /**
   * @public
   * @param {boolean} preventDefaultOnClick
   */
  set preventDefaultOnClick(preventDefaultOnClick) {
    this.foundation_.setPreventDefaultOnClick(preventDefaultOnClick);
  }

  //endregion
  ///////////

  /**
   * @public
   * @param args
   */
  constructor(...args) {
    super(...args);
    this.ripple_ = MDCRipple.attachTo(this.root_);
  }

  /**
   * @public
   */
  destroy() {
    this.ripple_.destroy();
    super.destroy();
  }

  /**
   * @public
   * @return {!F} foundation
   */
  getDefaultFoundation() {
    return new MDCBottomNavigationActionFoundation({
      addClass: (className) => this.root_.classList.add(className),
      removeClass: (className) => this.root_.classList.remove(className),
      registerInteractionHandler: (type, handler) => this.root_.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.root_.removeEventListener(type, handler),
      notifySelected: () => this.emit(MDCBottomNavigationActionFoundation.strings.SELECTED_EVENT, {action: this}, true),
    });
  }

  /**
   * @protected
   */
  initialSyncWithDOM() {
    this.isActive = this.root_.classList.contains(cssClasses.ACTIVE);
  }
}
