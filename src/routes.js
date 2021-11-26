import { Page, Router } from "@happysanta/router"

export const VIEW_MAIN = 'view_main';

export const PAGE_HOME = '/'
export const PANEL_HOME = 'panel_home'


const routes = {
    [PAGE_HOME]: new Page(PANEL_HOME, VIEW_MAIN)
}

export default route = new Router(routes)