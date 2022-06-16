import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import SelectedWidgetApp          from './widgets/SelectedWidget.js';

export default class MainApplication extends SvelteApplication
{
   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */
   static get defaultOptions()
   {
      return foundry.utils.mergeObject(super.defaultOptions, {
         width: 'auto',
         height: 'auto',
         resizable: false,
         minimizable: false,
         headerButtonNoClose: true,
         popOut: false,
      });
   }

    renderWidgets() {
        if (!this.widgets) return;
        for (const widget of this.widgets) {
            widget.show();
        }
    }

    onUpdateTokens()
    {
        if (!this.widgets) return;
        for (const widget of this.widgets) {
            widget.onUpdateTokens();
        }
    }

    updateConfig() {
        if (!this.widgets) return;
        for (const widget of this.widgets) {
            if (widget.enabled) {
                widget.close();
            }
        }
        this.renderWidgets();
    }
}
