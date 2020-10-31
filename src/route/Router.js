import _ from '../utils/index'

// 路由

export default class Router {
    constructor(options) {
        this.init(options)
    }
    init(config) {
        var self = this;
        this.routes = config ? config.routes : {}
        this.routerMap = config ? config.routes : this.routerMap
        this.routerViewId = config ? config.routerViewId : this.routerViewId
        this.stackPages = config ? config.stackPages : this.stackPages
        var name = document.querySelector('#routerView').getAttribute('data-animationName')
        if (name) {
            this.animationName = name
        }
        this.animationName = config ? config.animationName : this.animationName

        if (!this.routerMap.length) {
            var selector = this.routerViewId + " .page"
            var pages = document.querySelectorAll(selector)
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                var hash = page.getAttribute('data-hash')
                var name = hash.substr(1)
                var item = {
                    path: hash,
                    name: name,
                    callback: _.closure(name)
                }
                this.routerMap.push(item)
            }
        }

        this.map()

        // 初始化跳转方法
        window.linkTo = (path) => {
            console.log('path :', path)
            if (path.indexOf("?") !== -1) {
                window.location.hash = path + '&key=' + _.genKey()
            } else {
                window.location.hash = path + '?key=' + _.genKey()
            }
        }

        //页面首次加载 匹配路由
        window.addEventListener('load', (event) => {
            // console.log('load', event);
            self.historyChange(event)
        }, false)

        //路由切换
        window.addEventListener('hashchange', (event) => {
            // console.log('hashchange', event);
            self.historyChange(event)
        }, false)

    }
    // 路由历史纪录变化
    historyChange(event) {
        var currentHash = _.getParamsUrl();
        var nameStr = "router-" + (this.routerViewId) + "-history"
        this.history = window.sessionStorage[nameStr] ? JSON.parse(window.sessionStorage[nameStr]) : []

        var back = false,
            refresh = false,
            forward = false,
            index = 0,
            len = this.history.length;

        for (var i = 0; i < len; i++) {
            var h = this.history[i];
            if (h.hash === currentHash.path && h.key === currentHash.query.key) {
                index = i
                if (i === len - 1) {
                    refresh = true
                } else {
                    back = true
                }
                break;
            } else {
                forward = true
            }
        }
        if (back) {
            this.historyFlag = 'back'
            this.history.length = index + 1
        } else if (refresh) {
            this.historyFlag = 'refresh'
        } else {
            this.historyFlag = 'forward'
            var item = {
                key: currentHash.query.key,
                hash: currentHash.path,
                query: currentHash.query
            }
            this.history.push(item)
        }
        console.log('historyFlag :', this.historyFlag)
        // console.log('history :', this.history)
        if (!this.stackPages) {
            this.historyFlag = 'forward'
        }
        window.sessionStorage[nameStr] = JSON.stringify(this.history)
        this.urlChange()
    }
    // 切换页面
    changeView(currentHash) {
        var pages = document.getElementsByClassName('page')
        var previousPage = document.getElementsByClassName('current')[0]
        var currentPage = null
        var currHash = null
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            var hash = page.getAttribute('data-hash')
            page.setAttribute('class', "page")
            if (hash === currentHash.path) {
                currHash = hash
                currentPage = page
            }
        }
        var enterName = 'enter-' + this.animationName
        var leaveName = 'leave-' + this.animationName
        if (this.historyFlag === 'back') {
            _.addClass(currentPage, 'current')
            if (previousPage) {
                _.addClass(previousPage, leaveName)
            }
            setTimeout(() => {
                if (previousPage) {
                    _.removeClass(previousPage, leaveName)
                }
            }, 250);
        } else if (this.historyFlag === 'forward' || this.historyFlag === 'refresh') {
            if (previousPage) {
                _.addClass(previousPage, "current")
            }
            _.addClass(currentPage, enterName)
            setTimeout(() => {
                if (previousPage) {
                    _.removeClass(previousPage, "current")
                }
                _.removeClass(currentPage, enterName)
                _.addClass(currentPage, 'current')
            }, 350);
            // 前进和刷新都执行回调 与 初始滚动位置为 0
            currentPage.scrollTop = 0
            this.routes[currHash].callback ? this.routes[currHash].callback(currentHash) : null
        }
        this.afterFun ? this.afterFun(currentHash) : null
    }
    //路由处理
    urlChange() {
        var currentHash = _.getParamsUrl() || {
            query: {
                key: ''
            },
            path: ''
        };
        if (this.routes[currentHash.path]) {
            var self = this;
            if (this.beforeFun) {
                this.beforeFun({
                    to: {
                        path: currentHash.path,
                        query: currentHash.query
                    },
                    next() {
                        self.changeView(currentHash)
                    }
                })
            } else {
                this.changeView(currentHash)
            }
        } else {
            //不存在的地址,重定向到默认页面
            location.hash = this.redirectRoute
        }
    }
    //路由注册
    map() {
        for (var i = 0; i < this.routerMap.length; i++) {
            var route = this.routerMap[i]
            if (route.name === "redirect") {
                this.redirectRoute = route.path
            } else {
                this.redirectRoute = this.routerMap[0].path
            }
            var newPath = route.path
            var path = newPath.replace(/\s*/g, ""); //过滤空格
            this.routes[path] = {
                callback: route.callback, //回调
            }
        }
    }
    //切换之前的钩子
    beforeEach(callback) {
        if (Object.prototype.toString.call(callback) === '[object Function]') {
            this.beforeFun = callback;
        } else {
            console.trace('路由切换前钩子函数不正确')
        }
    }
    //切换成功之后的钩子
    afterEach(callback) {
        if (Object.prototype.toString.call(callback) === '[object Function]') {
            this.afterFun = callback;
        } else {
            console.trace('路由切换后回调函数不正确')
        }
    }

}

// window.Router = Router;
// window.router = new Router();