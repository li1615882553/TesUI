import { Control, Component, VNode } from "tes-work";

//当前路由组件存储对象{ path : Component }
let routers = {};

/**
 * 路由监听事件对象，分为2部分
 * all array 存listenAll监听方法中注册的数组
 * path array 存listenPath监听方法中注册的hash路径名称和相应的回调方法
 */
let listenEvents: { all?: Array<(pathname?: string) => void>, path?: Array<{ path: string, callback: () => void }> } = {};

@Component
export class Router extends Control {
  protected render(): void {
    let { className, style } = this.props;
    return (
      <div className={className} style={style}>
        {this.$children}
      </div>
    )
  }
}

/*
 * 执行所有的路由事件
 * @parmas
 * path string 当前的hash路径
 */
function callListen(path) {
  if (listenEvents && listenEvents.all && listenEvents.all.length > 0) {
    let listenArr = listenEvents.all;
    for (let i = 0; i < listenArr.length; i++) {
      listenArr[i](path);
    }
  }
  if (listenEvents && listenEvents.path && listenEvents.path.length > 0) {
    let listenArr = listenEvents.path;
    for (let i = 0; i < listenArr.length; i++) {
      if (path === listenArr[i].path) {
        listenArr[i].callback();
      }
    }
  }
}

interface RouterProps {
  className?: string,
  style?: string,
  path: string,
  component: () => VNode | VNode
}
//路由监听路由并加载相应组件
@Component
export class Route extends Control<RouterProps> {
  renderItem: VNode;

  initRouter() {
    const { path, component } = this.props;
    if (routers[path]) {
      throw new Error(`router error:${path} has existed`);
    } else {
      routers[path] = component;
    }
    console.log(routers)
  }

  changeRouter() {
    let hash = window.location.hash.split('?')[0];
    let { path } = this.props;

    console.log(`hash: ${hash},  path: ${path}`)
    //当前路由是选中路由时加载当前组件
    if (hash === path && routers[hash]) {
      let renderItem;
      if (typeof routers[hash] === 'function') {
        renderItem = (routers[hash]())
      } else {
        renderItem = (routers[hash])
      }
      this.renderItem = renderItem;
      callListen(hash);
    } else {
      //当前路由非选中路由 清空当前组件
      this.renderItem = null;
    }
  }

  protected componentMounted(): void {
    this.initRouter();
    window.addEventListener("load", () => this.changeRouter(), false);
    window.addEventListener("hashchange", () => this.changeRouter(), false);
  }

  protected render() {
    //如果不使用 div 包裹,则props等内容无法实现
    return (
      <div>
        { this.renderItem }
      </div>
    )
  }
}

//路由跳转
export function dispatchRouter({ path = '', query = {} }) {
  let queryStr = [];
  for (let i in query) {
    queryStr.push(`${i}=${query[i]}`);
  }
  window.location.hash = `${path}${queryStr.length ? '?'+queryStr.join('&'): ''}`;
}

/**
 * 监听路由并触发回调事件
 * @params
 * path string 需要监听的路由
 * callback function 需要执行的回调
 */
export function listenPath(path, callback) {
  if (!listenEvents.path) {
    listenEvents.path = [];
  }
  listenEvents.path.push({ path, callback });
}

/**
 * 监听路由改变并触发所有回调事件(会将当前路由传出)
 * @params
 * callback function 需要执行的回调
 */
export function listenAll(callback) {
  if (!listenEvents.all) {
    listenEvents.all = [];
  }
  listenEvents.all.push(callback);
}