import MainApplication from './view/BasicApplication.js';
import SelectedWidgetApp from './view/widgets/SelectedWidget.js';
import CharactersWidgetApp from './view/widgets/CharactersWidget.js';

import { availableSystemProviders, initApi, currentSystemProvider, getDefaultSystemProvider, updateSystemProvider } from "./modules/api.js";

const moduleId = "alpha-hud";
const app = new MainApplication();
app.widgets = [];
Hooks.once('ready', async () => {
    if (game.user.isGM) {

        new window.Ardittristan.ColorSetting(moduleId, "color-hp", {
            name: "Healthbar color",
            hint: "",
            label: "Color Picker",
            restricted: false,
            defaultColor: "#ff0000ff",
            scope: "client",
            onChange: (value) => {}
        });

        game.settings.register(moduleId, "show-selected", {
          name: "Selected widget",
          hint: "Show widget for selected tokens.",
          scope: "client",
          config: true,
          type: Boolean,
          default: true,
          onChange: value => {
            app.updateConfig()
          }
        });

        game.settings.register(moduleId, "show-characters", {
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

        game.settings.register(moduleId, "show-resource-icons", {
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

        game.settings.register(moduleId, "show-tracking", {
          name: "Tracking integration",
          hint: "Optional. Requires 'Crash's Tracking & Training' module",
          scope: "client",
          config: true,
          type: Boolean,
          default: true,
          onChange: value => {
            app.updateConfig()
          }
        });

        game.settings.register(moduleId, "show-targets", {
          name: "Target management",
          hint: "Show targeting controls",
          scope: "client",
          config: true,
          type: Boolean,
          default: true,
          onChange: value => {
            app.updateConfig()
          }
        });

        game.settings.register(moduleId, "hide-selected-hp", {
          name: "Hide health bar for selected",
          hint: "Useful with 'Always HP' module",
          scope: "client",
          config: true,
          type: Boolean,
          default: false,
          onChange: value => {
            app.updateConfig()
          }
        });

    game.settings.register(moduleId, "systemProvider", {
		scope: "world",
		config: false,
		type: String,
		default: getDefaultSystemProvider(),
		onChange: updateSystemProvider,
	});

        initApi();

        app.widgets.push(new SelectedWidgetApp());
        app.widgets.push(new CharactersWidgetApp());
        await app.renderWidgets();
    }
});
Hooks.on('controlToken', app.onUpdateTokens.bind(app));
Hooks.on('updateToken', app.onUpdateTokens.bind(app));
Hooks.on('updateActor', app.onUpdateTokens.bind(app));
Hooks.on('canvasReady', app.onUpdateTokens.bind(app));
Hooks.on('createToken', app.onUpdateTokens.bind(app));
Hooks.on('deleteToken', app.onUpdateTokens.bind(app));
Hooks.on('deleteActor', app.onUpdateTokens.bind(app));
Hooks.on('targetToken', app.updateConfig.bind(app));

Hooks.on("canvasInit", (canvas) => {
	Hooks.once("renderCombatTracker", app.onUpdateTokens.bind(app));
});
