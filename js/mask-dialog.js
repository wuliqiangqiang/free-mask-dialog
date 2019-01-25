'use strict';
import '../css/mask-dialog-css.css';

const $ = require('jquery');
const $maskArr = {}; //保存页面多个mask对象
const maskArr = {}; //保存页面多个mask对象

// 防止version一致的解决方案
let globalIndex = 0;

class api {
  constructor(opts = {}) {
    this.constructor._default.call(this);
    for (let key in opts) {
      this[key] = opts[key];
    }
    this.init();
  }

  init() {
    globalIndex++;

    let version = this.version = +new Date();
    version = this.version += globalIndex.toString();

    //载体
    let slotDom = `<div class="mask_dialog${version}" style="display: none;"></div>`;
    let $slotDom = this.MaskDialogEle = $(slotDom);

    //内容
    let alertSlot = `<div class="mask_dialog_main ${this.style}" data-version="${version}"></div>`;
    let $alertSlot = this.MaskDialogContent = $(alertSlot);

    //按钮
    let mask_dialog_btn = `<div class="mask_dialog_btn_contain"></div>`;
    let $mask_dialog_btn = this.MaskDialogButton = $(mask_dialog_btn);

    this.render();
    $('body').append(this.MaskDialogEle);

    //设置事件
    this.constructor._otherBind.call(this);

    this['MaskDialog' + version] = $slotDom;
    $maskArr[version] = this['MaskDialog' + version];    //保存对象
    maskArr[version] = this;    //保存对象
  }

  render() {
    //设置内容样式
    this.constructor._setContentClass.call(this);

    //关闭按钮显示与否
    this.constructor._setCloseButton.call(this);

    //设置背景是否可以点击关闭
    this.constructor._bgCanClose.call(this);

    //设置标题
    this.constructor._setTitle.call(this, this.title);

    //设置内容
    this.constructor._setContent.call(this, this.content);

    //设置背景
    this.constructor._setBg.call(this, this.bg);

    //设置页面滚动
    this.constructor._setScroll.call(this);

    //设置按钮
    this.constructor._setButton.call(this);

    this.MaskDialogEle.html('');
    this.MaskDialogEle.append(this.MaskBackground);
    this.MaskDialogEle.append(this.MaskDialogContent);
  }

  show() {
    this.showBindEven && this.showBindEven();
    this.autoInitContent && this.render();
    this.MaskDialogEle.show();
    return this;
  }

  showBefore(cb) {
    this.showBindEven = cb;
    return this;
  }

  hideAfter(cb) {
    this.hideBindEven = cb;
    return this;
  }

  hide(version) {
    let _version = version ? version : this.version;
    this['MaskDialog' + _version].hide();
    $('html').css('overflow', 'auto')
    this.hideBindEven && this.hideBindEven();
    return this;
  }

  static _default() {
    this.bg = true;         //背景遮罩
    this.width = 'auto';    //默认弹窗宽度，不传默认为tmpl本身宽度
    this.height = 'auto';   //默认弹窗高度，不传默认为tmpl本身高度
    this.title = false;     //默认没有标题
    this.content = false;   //默认没有内容
    this['z-index'] = 100;      //默认弹窗的层级为100
    this.canClose = false;   //默认点击背景可以关闭全部，false为不可以点击关闭
    this.scroll = false;     //默认页面禁止滚动，true为可以滚动
    this.style = 'default';        //样式列表，针对弹窗DOM
    this.btn = [];     //按钮数组
    this.autoInitContent = true;   //自动初始化content
    this.closeBtn = true;
    this.closeBtnEle = '.mask_dialog_close';
  }

  static _bgCanClose() {
    $(document).on('click', '.J-mask-dialog-bg', function (e) {
      let _this_version = $(this).data('version');
      if (!maskArr[_this_version].canClose) return;
      maskArr[_this_version].hide();
      e.stopImmediatePropagation();
      return false;
    })
  }

  static _setCloseButton() {
    this.MaskDialogContent.find('.mask_dialog_close').remove();
    if (this.closeBtn) {
      this.MaskDialogContent.append(`<div class="mask_dialog_close"></div>`);
    }
  }

  static _setTitle() {
    this.MaskDialogContent.find('.mask_dialog_title').remove();
    if (this.title && this.title.length) {
      this.MaskDialogContent.append(`<div class="mask_dialog_title">${this.title}</div>`);
    }
  }

  static _setContent() {
    this.MaskDialogContent.find('.mask_dialog_content').remove();
    if (this.content && this.content.length) {
      this.MaskDialogContent.append(`<div class="mask_dialog_content">${this.content}</div>`);
    }
  }

  static _setBg() {
    let content_z_index = this.MaskDialogContent.css('z-index') - 1;
    this.MaskDialogEle.find('.mask_dialog_bg').remove();
    if (this.bg) {
      this.MaskBackground = `<div class="mask_dialog_bg J-mask-dialog-bg" style="z-index: ${content_z_index}" data-version="${this.version}"></div>`;
    } else {
      this.MaskBackground = '';
    }
  }

  static _setButton() {
    if (Array.isArray(this.btn) && this.btn.length > 0) {
      let btnDom = '';
      this.btn.map(v => {
        btnDom += `<a class="mask_dialog_btn_item" href="${v.url ? v.url : 'javascript:;'}" target="${v.target ? v.target : '_self'}" data-cb="${v.cb ? '1' : '0'}">${v.content}</a>`;
      });
      this.MaskDialogButton.html(btnDom);
      this.MaskDialogContent.find('.mask_dialog_btn_contain').remove();
      this.MaskDialogContent.append(this.MaskDialogButton);
    }
  }

  static _setContentClass() {
    let c_opt_obj = {
      'z-index': this['z-index'] ? this['z-index'] : 100,
      'width': this.width,
      'height': this.height,
    };
    let classList = '';
    for (let key in c_opt_obj) {
      if ((Number.isFinite(c_opt_obj[key]) || c_opt_obj[key].indexOf('%') > -1) && key !== 'z-index') {
        let unit = this.constructor._getUnit.call(this, c_opt_obj[key]);
        let num = this.constructor._getNum.call(this, c_opt_obj[key]);
        c_opt_obj[key] = num + unit;
      }
      if (c_opt_obj[key]) {
        classList += key + ':' + c_opt_obj[key] + ';'
      }
    }
    return this.MaskDialogContent.attr('style', classList);
  }

  static _setScroll() {
    this.scroll ? $('html').css('overflow', 'hidden') : $('html').css('overflow', 'auto');
  }

  //获取单位
  static _getUnit(str) {
    return (str + '').indexOf('%') > -1 ? '%' : 'px';
  }

  //获取数值
  static _getNum(str) {
    return Number.parseFloat(str);
  }


  static _otherBind() {
    //关闭按钮
    if (Array.isArray(this.closeBtnEle)) {
      this.closeBtnEle.push('.mask_dialog_close');
      this.closeBtnEle.map((v) => {
        handleCloseEvent(v);
      })
    } else if (typeof this.closeBtnEle === 'string') {
      if (this.closeBtnEle !== '.mask_dialog_close') {
        this.closeBtnEle = [this.closeBtnEle, '.mask_dialog_close'];
        this.closeBtnEle.map((v) => {
          handleCloseEvent(v);
        })
      } else {
        handleCloseEvent(this.closeBtnEle);
      }
    }
    function handleCloseEvent(ele) {
      $(document).on('click', ele, function (e) {
        let version = $(this).parents('.mask_dialog_main').data('version');
        maskArr[version].hide();
        e.stopImmediatePropagation();
      });
    }

    //点击按钮
    $(document).on('click', '.mask_dialog_btn_contain .mask_dialog_btn_item', function () {
      let version = $(this).parents('.mask_dialog_main').data('version');
      let _index = $(this).index();
      let cb = $(this).data('cb');
      if (+cb) {
        let cb = maskArr[version].btn[_index].cb;
        cb && cb();
        return false;
      }
    })
  }
}

module.exports = api;