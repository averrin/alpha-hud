import MainApplication from './view/BasicApplication.js';
import SelectedWidgetApp from './view/widgets/SelectedWidget.js';
import CharactersWidgetApp from './view/widgets/CharactersWidget.js';

const moduleId = "alpha-hud";
const app = new MainApplication();
Hooks.once('ready', () => {
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

        app.widgets = [];
        app.widgets.push(new SelectedWidgetApp());
        app.widgets.push(new CharactersWidgetApp());
        app.renderWidgets();
    }
});
Hooks.on('controlToken', app.onUpdateTokens.bind(app));
Hooks.on('updateToken', app.onUpdateTokens.bind(app));
Hooks.on('updateActor', app.onUpdateTokens.bind(app));
Hooks.on('renderApplication', app.onUpdateTokens.bind(app));
