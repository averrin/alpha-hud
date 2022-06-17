import { SvelteApplication }  from '@typhonjs-fvtt/runtime/svelte/application';

import { TJSGameSettings }    from '@typhonjs-fvtt/runtime/svelte/store';

const id = "abstract";
export default class WidgetApp extends SvelteApplication
{
   #gameSettings = new TJSGameSettings();

   constructor(options)
   {
      super(options);
      this.widgetId = options.widgetId;

      this.#gameSettings.register({
         moduleId: 'alpha-hud',
         key: `widget-position-${options.widgetId}`,
         options: {
            scope: 'client',
            config: false,
            default: {},
            type: Object
         }
      });

      this.enabled = game.settings.get('alpha-hud', `show-${options.widgetId}`);
      try
      {
         // Attempt to parse session storage item and set to Position.
         this.position = game.settings.get('alpha-hud', `widget-position-${options.widgetId}`);
      }
      catch (err) { 
        console.warn("cannot read saved position")
    }
   }

    getPositionStore() {
        return this.#gameSettings.getStore(`widget-position-${this.widgetId}`);
    }


    async refresh() {
        this.enabled = game.settings.get('alpha-hud', `show-${this.widgetId}`);
        if (this.enabled) await this.render(true);
        else await this.close();
    }
    show() {
        this.enabled = game.settings.get('alpha-hud', `show-${this.widgetId}`);
        if (this.enabled) this.render(true);
    }

    setSystem(provider) {
        console.log(`!!!!! set system: ${provider}`);
        this.system = provider;
        this.svelte.applicationShell.system = this.system;
    }
}