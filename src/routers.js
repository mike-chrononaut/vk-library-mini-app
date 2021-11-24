import { Page, Router } from '@happysanta/router';

export const VIEW_MAIN = 'view_main';

export const PAGE_HOME = '/';
export const PAGE_SEARCH_RESULTS = '/search-results';
export const PAGE_BOOK = '/book';
export const PAGE_FAVORITES = '/favorites';
export const PAGE_SUBSCRIPTIONS = '/subscriptions';

export const PANEL_HOME = 'panel_home';
export const PANEL_SEARCH_RESULTS = 'panel_search_results';
export const PANEL_BOOK = 'panel_book';
export const PANEL_FAVORITES = 'panel_favorites';
export const PANEL_SUBSCRIPTIONS = 'panel_subscriptions';

export const AUTH_MODAL_CARD = 'auth_modal_card';
export const CONFIRM_EXIT_MODAL_CARD = 'confirm_exit_modal_card';

const routes = {
    [PAGE_HOME]: new Page(PANEL_HOME, VIEW_MAIN),
    [PAGE_SEARCH_RESULTS]: new Page(PANEL_SEARCH_RESULTS, VIEW_MAIN),
    [PAGE_BOOK]: new Page(PANEL_BOOK, VIEW_MAIN),
    [PAGE_FAVORITES]: new Page(PANEL_FAVORITES, VIEW_MAIN),
    [PAGE_SUBSCRIPTIONS]: new Page(PANEL_SUBSCRIPTIONS, VIEW_MAIN)
};

export const router = new Router(routes);

router.start();