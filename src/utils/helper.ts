//保存localStorage
export function set(key: string, value?: any, days?: [string, Number]) {
    // 设置过期原则
    if (!value) {
        localStorage.removeItem(key);
    } else {
        let Days: any = days || 7; // 默认保留7天
        let exp = new Date();
        localStorage[key] = JSON.stringify({
            value,
            expires: exp.getTime() + Days * 24 * 60 * 60 * 1000,
        });
    }
}

//取出localStorage
export function get(name: string) {
    try {
        let o = JSON.parse(localStorage[name]);
        if (!o || o.expires < Date.now()) {
            return null;
        } else {
            return o.value;
        }
    } catch (e) {
        // 兼容其他localstorage
        return localStorage[name];
    } finally {

    }
}

