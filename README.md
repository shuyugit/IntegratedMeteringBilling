IntegratedMeteringBilling
技术栈：D2admin+vue+element

下载依赖：npm i
启动：npm run dev

下载依赖后找到 node_modules\lib-flexible\flexible.js
修改
        ```function refreshRem(){
            var width = docEl.getBoundingClientRect().width;
            if (width / dpr > 540) {
                width = 540 * dpr;    //将本行540修改为width;
            }
            var rem = width / 10;
            docEl.style.fontSize = rem + 'px';
            flexible.rem = win.rem = rem;
        }```
