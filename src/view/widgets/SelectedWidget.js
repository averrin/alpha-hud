import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import SelectedWidget          from './SelectedWidget.svelte';
import WidgetApp          from '../Widget.js';

export default class SelectedWidgetApp extends WidgetApp
{

   constructor(options)
   {
      super({widgetId: "selected"});
    }
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
        zIndex: 95,

         svelte: {
            class: SelectedWidget,
            target: document.body,
            props: function()
            {
               return { settingStore: this.getPositionStore(), tokens: null, system: null };
            }
         }
      });
   }

    async refresh() {
        await super.refresh();
        if (!this.svelte.applicationShell) return;
        this.svelte.applicationShell.tokens = [];
        setTimeout(this.onUpdateTokens.bind(this), 0);
    }
    onUpdateTokens()
    {
        if(!this.enabled) return;
        this.svelte.applicationShell.tokens = canvas.tokens.controlled;
        this.svelte.applicationShell.system = this.system;
    }
}
