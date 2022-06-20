export const moduleId = "alpha-hud";

// import { foundry } from '../modules/foundry.js';
// import { moduleId, SETTINGS } from '../constants.js';

export const SETTINGS = {
    HP_COLOR: "color-hp",
    SHOW_SELECTED: "show-selected",
    SHOW_CHARACTERS: "show-characters",
    SHOW_RESOURCE_ICONS: "show-resource-icons",
    SHOW_TRACKING: "show-tracking",
    SHOW_TARGETS: "show-targets",
    SHOW_ACTIONS: "show-actions",
    ACTIONS_CATEGORY: "actions-category",
    HIDE_SELECTED_HP: "hide-selected-hp",
    SHOW_NAME_NOTIFICATION: "show-name-notification",
    ITEM_DETECT_LIST: "item-detector-list",
    SYSTEM_PROVIDER: "systemProvider",
    TRACKERS: "trackers",
    VE_INTEGRATION: "ve-integration",
    UI_SCALE: "ui-scale",
    SHOW_MASS: "show-mass",
    ITEM_COUNT_LIST: "item-count-list",
    SHOW: "show",

    SHOW_PREFIX: "show",
    POSITION_PREFIX: "widget-position",
};

export const HOOKS = [
    'controlToken',
    'updateToken',
    'updateActor',
    'targetToken',

    'canvasReady',
    'createToken',
    'deleteToken',
    'deleteActor',
    // 'renderTokenActionHUD',
];
