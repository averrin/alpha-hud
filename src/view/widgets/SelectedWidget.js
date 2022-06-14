import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import SelectedWidget          from './SelectedWidget.svelte';

export default class SelectedWidgetApp extends SvelteApplication
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

         svelte: {
            class: SelectedWidget,
            target: document.body,
            props: {
                tokens: null,
            }
         }
      });
   }

    onUpdateTokens()
    {
        this.svelte.applicationShell.tokens = canvas.tokens.controlled;
    }
}
