## It is a free dialog with full screen mask

### How use ?

```JS
 const maskDialog = require('free-mask-dialog');
 let mask = new maskDialog({
     title:'This is title',
     content:'This is content',
 })
```

## API function

### show ()

---

show the dialog

eq：mask.show()

### hide ()

---

hide the dialog

eq：mask.hide()

### showBefore(cb)

---

call the cb function before show the dialog

### hideAfter(cb)

---

call the cb function after hide the dialog

## other option
---

### closeBtnEle [`String` | `Array`]
---

you can add the classname to emit close action

### bg [`Boolean`]
---

you can control the mask-bg show or hide

### title [`String`]
---

set the title for the dialog

### content [`String`]
---

set the content for the dialog

### z-index [`Number`]
---

set the class of the z-index for the dialog. when you setted the param —— z-index with the dialog will change the mask-bg's z-index

### width [`Number`|`String`]
---

set the dialog width
support the percentage

### height [`Number`|`String`]
---

set the dialog height
support the percentage

### closeBtn [`Boolean`]
---

set the closeBtn show or hide

### closeBtnEle [`String`]
---

control and add the element's class with this parameter in the close button 

### scroll [`Boolean`]
---

set the webpack cann't scroll. The defaults value is true

### canClose [`Boolean`]
---

if the value is true will emit dialog hide function when click the mask-bg

### style [`String`]
---

add the className for the mask_dialog_main. you can use it do anything. such as change the class with the dialog. the default value is `default`

### autoInitContent [`Boolean`]
---

auto refresh the dialog setting before emit show function.The default value is true. If the param value is false will jump over the render function

### btn [`Array`]
---

just only support `Array`

- content : the btn text
- url : the btn link
- cb : the btn click function
- target : open link method

such as:

```js
let mask = new maskDialog({
  title: "This is title",
  content: "This is content",
  btn: [
    {
      content: "btn 1",
      cb: () => {
        alert(2);
      }
    },
    {
      content: "btn 2",
      target: "_blank",
      url: "https://www.google.com"
    }
  ]
});
```

# 中文文档
```js
let mask = new maskDialog({
    'closeBtnEle':'.mask_dialog_close' //默认.mask_dialog_close [optional]
    'bg': Boolean //[optional]
    'title':String  
    'content':String  
    'z-index': Number //层级(number),设置的是 bg 的层级，联动会设置弹窗 [optional]
    'width': 200, //宽度：可传递各种单位，默认 100%
    'height': 300, //高度：可传递各种单位
    'closeBtn':Boolean, //关闭按钮,false 不显示  [optional]
    'scroll': Boolean //页面滚动：false 为不可滚动，默认为 true 可滚动 [optional]
    'canClose':Boolean //点击关闭：false 为不可以点击关闭，默认为 true 可点击关闭 [optional]
    'style': String //'类名，控制修改 class=mask_dialog_main 的 同级类,默认是 default,可以由此来控制对话框样式', [optional]
    'autoInitContent':false, //每次 show 都会重新，默认为 true,不启动传 false [optional]
});

mask.show(); // 显示提示框，传显示内容，一般为 STRING——DOM
mask.hide(); // 隐藏提示框
mask.showBefore(){}; //显示回调
mask.hideAfter(){}; //隐藏回调
```
