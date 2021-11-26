import {Page, Router} from "@happysanta/router";

export const VIEW_MAIN = 'view_main';

export const PAGE_HOME = '/'
export const PAGE_SEARCH_RESULT = '/search_result'
export const PAGE_BOOK = '/book'

export const PANEL_HOME = 'panel_home'
export const PANEL_SEARCH_RESULT = 'panel_search_result'
export const PANEL_BOOK = 'panel_book'

const routes = {
    [PAGE_HOME]: new Page(PANEL_HOME, VIEW_MAIN),
    [PAGE_SEARCH_RESULT]: new Page(PANEL_SEARCH_RESULT, VIEW_MAIN),
    [PAGE_BOOK]: new Page(PANEL_BOOK, VIEW_MAIN),
}

export const router = new Router(routes)

router.start()