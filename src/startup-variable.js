export function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

export const StartupVariable = {
    user_id: getQueryVariable('vk_user_id'),
    app_id: getQueryVariable('vk_app_id'),
    is_app_user: getQueryVariable('vk_is_app_user'),
    are_notifications_enabled: getQueryVariable('vk_are_notifications_enabled'),
    language: getQueryVariable('vk_language'),
    ref: getQueryVariable('vk_ref'),
    access_token_settings: getQueryVariable('vk_access_token_settings'),
    group_id: getQueryVariable('vk_group_id'),
    viewer_group_role: getQueryVariable('vk_viewer_group_role'),
    platform: getQueryVariable('vk_platform'),
    ts: getQueryVariable('vk_ts'),
    sign: getQueryVariable('sign'),
    access_token: getQueryVariable('access_token'),
}

