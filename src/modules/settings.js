import { moduleId, SETTINGS } from '../constants.js';
import { foundry } from './foundry.js';
import { getDefaultSystemProvider, updateSystemProvider } from './api.js';

export let setting = key => {
  return game.settings.get(moduleId, key);
};

export async function migrateFromString(key) {
  try {
    let current = game.settings.get(moduleId, key);
    if (typeof current === "string" || current instanceof String) {
      current = JSON.parse(current);
      await game.settings.set(moduleId, key, current);
    }
    if (typeof current[0] === "string" || current[0] instanceof String) {
      current = JSON.parse(current[0]);
      if (Array.isArray(current)) {
        await game.settings.set(moduleId, key, current);
      }
    }
  } catch (error) {

  }
}

const debouncedReload = debounce(() => window.location.reload(), 100);
export function initSettings(app) {
  new globalThis.Ardittristan.ColorSetting(moduleId, SETTINGS.HP_COLOR, {
    name: "Healthbar color",
    hint: "",
    label: "Color Picker",
    restricted: false,
    defaultColor: "#ff0000ff",
    scope: "client",
    onChange: (value) => {
      app.updateConfig();
    }
  });

  foundry.settings.register(moduleId, SETTINGS.SHOW_SELECTED, {
    name: "Selected token widget",
    hint: "Show widget for selected tokens.",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: value => {
      app.updateConfig()
    }
  });

  foundry.settings.register(moduleId, SETTINGS.SHOW_CHARACTERS, {
    name: "Characters widget",
    hint: "Show widget for characters' tokens.",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: value => {
      app.updateConfig()
    }
  });

  foundry.settings.register(moduleId, SETTINGS.SHOW_RESOURCE_ICONS, {
    name: "Resource icons integration",
    hint: "Optional. Requires 'Resource Icons' module",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: value => {
      app.updateConfig()
    }
  });

  foundry.settings.register(moduleId, SETTINGS.SHOW_TRACKING, {
    name: "Tracking integration",
    hint: "Optional. Requires 'Crash's Tracking & Training' module. DnD5e only",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: value => {
      // app.updateConfig()
      debouncedReload();
    }
  });

  foundry.settings.register(moduleId, SETTINGS.TRACKERS, {
    name: "Trackers list",
    hint: "List of trackers to show in characters widget",
    scope: "client",
    config: true,
    type: Array,
    default: [
      {
        color: "#a122d5",
        label: "Mystic",
        name: "Mystic points",
      }],
    onChange: value => {
      app.updateConfig()
    }
  });
  migrateFromString(SETTINGS.TRACKERS);

  foundry.settings.register(moduleId, SETTINGS.SHOW_TARGETS, {
    name: "Target management",
    hint: "Show targeting controls",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: value => {
      // app.updateConfig()
      debouncedReload();
    }
  });

  foundry.settings.register(moduleId, SETTINGS.SHOW_MASS, {
    name: "Mass actions",
    hint: "Show mass actions buttons at the bottom of the characters widget",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: value => {
      debouncedReload();
    }
  });

  foundry.settings.register(moduleId, SETTINGS.SHOW_ACTIONS, {
    name: "Token Action HUD integration",
    hint: "Optional. Required 'Token Action HUD' module",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: value => {
      app.updateConfig()
    }
  });

  foundry.settings.register(moduleId, SETTINGS.ACTIONS_CATEGORY, {
    name: "Token Action HUD category",
    hint: "Category of actions to show",
    scope: "world",
    config: true,
    type: String,
    default: "Strikes",
    onChange: value => {
      app.updateConfig()
    }
  });

  foundry.settings.register(moduleId, SETTINGS.HIDE_SELECTED_HP, {
    name: "Hide health bar for selected",
    hint: "Useful with 'Always HP' module. Requires refresh.",
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
    onChange: value => {
      debouncedReload();
    }
  });

  foundry.settings.register(moduleId, SETTINGS.SHOW_NAME_NOTIFICATION, {
    name: "Show warning if token name != actor name",
    hint: "The warning sign in the name segment",
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
    onChange: value => {
      app.updateConfig()
    }
  });

  foundry.settings.register(moduleId, SETTINGS.ITEM_DETECT_LIST, {
    name: "Feature detect list",
    hint: "NPC's feature list for detection",
    scope: "world",
    config: true,
    type: Array,
    default: ["Multiattack", "Spellcasting", "Sneak Attack", "Parry"],
    onChange: value => {
      app.updateConfig()
    }
  });
  migrateFromString(SETTINGS.ITEM_DETECT_LIST);

  foundry.settings.register(moduleId, SETTINGS.ITEM_COUNT_LIST, {
    name: "Item count list",
    hint: "Characters's item list for counting",
    scope: "world",
    config: true,
    type: Array,
    default: ["Rations", "Torch", "Potion of Healing", "Potion of Greater Healing"],
    onChange: value => {
      app.updateConfig()
    }
  });
  migrateFromString(SETTINGS.ITEM_COUNT_LIST);



  foundry.settings.register(moduleId, SETTINGS.VE_INTEGRATION, {
    name: "Use Variant Encumberance weight tiers.",
    hint: "Optional. Requires 'Variant Encumberance' module. DnD5e only",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: value => {
      app.updateConfig()
    }
  });

  foundry.settings.register(moduleId, SETTINGS.SHOW_EXP, {
    name: "Show experience",
    hint: "Show experience in characters info",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: value => {
      app.updateConfig()
    }
  });

  foundry.settings.register(moduleId, SETTINGS.SHOW_ENC, {
    name: "Show encumbrance",
    hint: "Show encumbrance in characters info",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: value => {
      app.updateConfig()
    }
  });

  foundry.settings.register(moduleId, SETTINGS.SHOW_COINS, {
    name: "Show coins",
    hint: "Show coins in characters info",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: value => {
      app.updateConfig()
    }
  });

  foundry.settings.register(moduleId, SETTINGS.UI_SCALE, {
    name: 'UI scale',
    hint: 'If widgets are too big or too small for your display. Requires refresh.',
    config: true,
    type: Number,
    default: 1,
    onChange: value => {
      debouncedReload();
    },
    range: {
      min: 0.1,
      max: 2,
      step: 0.01
    }
  });

  foundry.settings.register(moduleId, SETTINGS.SHOW_DIRECTOR, {
    name: "Director widget",
    hint: "Show widget for Director's actions. Requires the Director module",
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
    onChange: value => {
      app.updateConfig()
    }
  });

  game.settings.register(moduleId, SETTINGS.RESOLUTION, {
    name: "Token image resolution",
    hint: "Higher is better quality but slower",
    scope: "world",
    config: true,
    range: {
      min: 10,
      max: 600,
      step: 5,
    },
    default: 50,
    type: Number,
    onChange: debouncedReload
  });

  foundry.settings.register(moduleId, SETTINGS.SYSTEM_PROVIDER, {
    scope: "world",
    config: false,
    type: String,
    default: getDefaultSystemProvider(),
    onChange: updateSystemProvider,
  });

  game.settings.register(moduleId, SETTINGS.SHOW, {
    scope: "client",
    config: false,
    type: Boolean,
    default: false,
  });
}
