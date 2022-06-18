import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import SelectedWidget          from './SelectedWidget.svelte';
import WidgetApp          from '../Widget.js';
import {actionsStore, tokensStore, targetsStore}          from '../../modules/stores.js';
import { moduleId, SETTINGS} from "../../constants.js";

export default class SelectedWidgetApp extends WidgetApp
{

    #HOOKS = [
        'controlToken',
        'updateToken',
        'updateActor',
        'targetToken',
        'createCombatant',
        'deleteCombatant',
    ];
   constructor(options)
   {
      super({widgetId: "selected"});
    }

    installHooks() {
      Hooks.on('renderTokenActionHUD', (_, __, data) => {
          this.onUpdateActions(data.actions);
      });
      for (let hook of this.#HOOKS) {
          Hooks.on(hook, this.onUpdateTokens.bind(this));
      }
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
               return {
                settingStore: this.getPositionStore(),
                targets: null,
                actons: null,
               };
            }
         }
      });
   }

    async refresh() {
        await super.refresh();
        if (!this.svelte.applicationShell) return;
        setTimeout(this.onUpdateTokens.bind(this), 0);
    }

    onUpdateTokens()
    {
        if(!this.enabled || !this.svelte.applicationShell) return;
        tokensStore.set(canvas.tokens.controlled);
        const showTargets = globalThis.game.settings.get(moduleId, SETTINGS.SHOW_TARGETS);
        if (showTargets) targetsStore.set(game.user.targets);
    }
    onUpdateActions(actions) {
        const showActions = typeof game.tokenActionHUD !== 'undefined' && game.settings.get(moduleId, SETTINGS.SHOW_ACTIONS);
        if(!this.enabled || !showActions || !this.svelte.applicationShell) return;
        actionsStore.set(actions);
        this.onUpdateTokens();
    }
}
