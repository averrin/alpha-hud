import MainApplication from './view/BasicApplication.js';
import SelectedWidgetApp from './view/widgets/SelectedWidget.js';
import CharactersWidgetApp from './view/widgets/CharactersWidget.js';

import { initApi } from "./modules/api.js";
import { initSettings } from "./modules/settings.js";
import { foundry, initFoundry } from './modules/foundry.js';
import { moduleId, HOOKS } from './constants.js';

const app = new MainApplication();
app.widgets = [];
Hooks.once('ready', async () => {
    initFoundry();
    if (foundry.user.isGM) {
        initSettings(app);
        initApi();

        app.widgets.push(new SelectedWidgetApp());
        app.widgets.push(new CharactersWidgetApp());
        await app.renderWidgets();
    }
});
for (let hook of HOOKS) {
    // Hooks.on(hook, debounce(app.onUpdateTokens.bind(app), 200));
}

Hooks.on("canvasInit", (canvas) => {
	Hooks.once("renderCombatTracker", app.onUpdateTokens.bind(app));
});
