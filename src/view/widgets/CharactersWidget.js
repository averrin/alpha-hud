import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import CharactersWidget          from './CharactersWidget.svelte';
import WidgetApp          from '../Widget.js';

export default class CharactersWidgetApp extends WidgetApp
{
   constructor(options)
   {
      super({widgetId: "characters"});
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
            class: CharactersWidget,
            target: document.body,
            props: function()
            {
               return { settingStore: this.getPositionStore(), characters: null, system: null };
            }
         }
      });
   }

   isLiving(token) {
    return getProperty(token?.document?.actor.getRollData(), "attributes.hp.max") > 0;
   }

    async refresh() {
        await super.refresh();
        if (!this.svelte.applicationShell) return;
        this.svelte.applicationShell.characters = [];
        setTimeout(this.onUpdateTokens.bind(this), 0);
    }

    onUpdateTokens()
    {
        if(!this.enabled) return;
        const chars = canvas.tokens.ownedTokens
                .filter(t => t.document.actor.type === 'character' && this.isLiving(t));
        chars.sort(
            (a, b) => {
                if (a.id < b.id) {
                    return -1;
                } else if (a.id > b.id) {
                    return 1;
                }
                return 0;
            }
        );
        this.svelte.applicationShell.characters = chars;
        this.svelte.applicationShell.system = this.system;
    }
}
