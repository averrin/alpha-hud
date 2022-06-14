import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import CharactersWidget          from './CharactersWidget.svelte';

export default class CharactersWidgetApp extends SvelteApplication
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
            class: CharactersWidget,
            target: document.body,
            props: {
                tokens: null,
            }
         }
      });
   }

    onUpdateTokens()
    {
        this.svelte.applicationShell.tokens = canvas.tokens.ownedTokens;
    }
}
