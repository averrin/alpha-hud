import WidgetManager from './view/WidgetManager.js';
import SelectedWidgetApp from './view/widgets/SelectedWidget.js';
import CharactersWidgetApp from './view/widgets/CharactersWidget.js';
import DirectorWidgetApp from './view/widgets/DirectorWidget.js';

import { initApi } from "./modules/api.js";
import { moduleId, SETTINGS } from "./constants.js";
import { initSettings, setting } from "./modules/settings.js";
import { logger } from "./modules/helpers.js";
import { initFoundry } from './modules/foundry.js';


const app = new WidgetManager();

Hooks.once('init', async () => {
  initFoundry();
  initSettings(app);
});

Hooks.on('getSceneControlButtons', (buttons) => {
  if (game.user.isGM) {
    const tokenButton = buttons.find(b => b.name == "token");
    if (tokenButton) {
      tokenButton.tools.push({
        name: "alpha-hud",
        title: "Toggle Alpha HUD",
        icon: "fas alpha-hud-icon",
        visible: game.user.isGm,
        onClick: () => {
          app.toggle();
        },
        toggle: true,
        active: setting(SETTINGS.SHOW)
      });
    }
  }
});

Hooks.once('ready', async () => {
  if (game.user.isGM) {
    initApi();

    app.add(new SelectedWidgetApp());
    app.add(new CharactersWidgetApp());
    if (globalThis.game.modules.get("director")?.active) {
      app.add(new DirectorWidgetApp());
    }
    await app.start();
    if (setting(SETTINGS.SHOW)) app.show();

    logger.info("Started!")
  } else {
    logger.warn("User mode is unsupported yet!")
  }
});
