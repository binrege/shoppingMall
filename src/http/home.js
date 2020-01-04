import { request } from '../http/index';

export function getHomeData() {
    return request({
        url: "/recomend",
    })
}