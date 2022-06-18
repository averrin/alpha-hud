import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import CharactersWidget          from './CharactersWidget.svelte';
import WidgetApp          from '../Widget.js';
import { charactersStore, targetsStore }          from '../../modules/stores.js';
import { isLiving } from "../../modules/helpers.js";

export default class CharactersWidgetApp extends WidgetApp
{
    #HOOKS = [
        'updateToken',
        'updateActor',
        'targetToken',
        'createCombatant',
        'deleteCombatant',

        'canvasReady',
        'createToken',
        'deleteToken',
        'deleteActor',
    ];

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
               return {
                            settingStore: this.getPositionStore(),
                        };
            }
         }
      });
   }

    installHooks() {
      for (let hook of this.#HOOKS) {
          Hooks.on(hook, this.onUpdateTokens.bind(this));
      }
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
                .filter(t => t.document.actor.type === 'character' && isLiving(t));
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
        charactersStore.set(chars);
        targetsStore.set(game.user.targets);
    }
}
