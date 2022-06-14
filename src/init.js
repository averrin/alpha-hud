import MainApplication from './view/BasicApplication.js';
import SelectedWidgetApp from './view/widgets/SelectedWidget.js';
import CharactersWidgetApp from './view/widgets/CharactersWidget.js';

const app = new MainApplication();
Hooks.once('ready', () => {
    if (game.user.isGM) {
        app.widgets = [new SelectedWidgetApp(), new CharactersWidgetApp()];
        app.renderWidgets();
    }
});
Hooks.on('controlToken', app.onUpdateTokens.bind(app));
Hooks.on('updateToken', app.onUpdateTokens.bind(app));
Hooks.on('updateActor', app.onUpdateTokens.bind(app));
