export default class WidgetManager
{

    async renderWidgets() {
        for (const widget of this.widgets) {
            await widget.show();
        }
    }

    refreshWidgets() {
        for (const widget of this.widgets) {
            widget.refresh();
        }
    }

    onUpdateTokens()
    {
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
