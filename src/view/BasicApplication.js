export default class WidgetManager
{

    async renderWidgets() {
        for (const widget of this.widgets) {
            await widget.show();
            widget.installHooks();
        }
    }

    refreshWidgets() {
        for (const widget of this.widgets) {
            widget.refresh();
        }
    }

    onUpdateTokens()
    {
        // this.refreshWidgets();
        for (const widget of this.widgets) {
            widget.onUpdateTokens();
        }
    }

    updateConfig() {
        this.refreshWidgets();
    }

    setSystem(provider) {
        for (const widget of this.widgets) {
            widget.setSystem(provider);
        }
    }
}
