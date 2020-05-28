/*
向local中存储数据的工具模块
1. 向外暴露一个函数(功能)
   只有一个功能需要暴露
2. 向外暴露一个对象(包含多个功能)
   有多个功能需要暴露
 */
const NAME_KEY = 'name_key'
export default {
  readName (){
    // return JSON.parse(localStorage.getItem(NAME_KEY) || '')
    return localStorage.getItem(NAME_KEY) || '';
  },
  saveName (username) {
    localStorage.setItem(NAME_KEY, username);
  }
}

/*
export function xxx() {

}

export function yyy () {

}*/
