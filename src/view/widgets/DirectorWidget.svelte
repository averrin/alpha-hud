<svelte:options accessors={true} />

<script>
   import { onDestroy } from "svelte";
   import { moduleId, SETTINGS } from "../../constants.js";
   import { logger } from "../../modules/helpers.js";
   import Widget from "../Widget.svelte";
   import FaPlay from "svelte-icons/fa/FaPlay.svelte";
   import { loadIcon } from "iconify-icon";

   function contrastColor(color) {
      if (!color || color == "") return "#eeeeeeff";
      const pRed = 0.299;
      const pGreen = 0.587;
      const pBlue = 0.114;
      const rgb = foundry.utils.hexToRGB(parseInt(color.slice(1).substring(0, 6), 16));

      const contrast = Math.sqrt(pRed * rgb[0] ** 2 + pGreen * rgb[1] ** 2 + pBlue * rgb[2] ** 2);
      return contrast > 0.5 ? "#232323ff" : "#eeeeeeff";
   }

   export let elementRoot;
   export let settingStore;
   export let widgetId;
   export let actions;

   let currentActions;
   const unsub = actions.subscribe((a) => (currentActions = a));
   currentActions.filter((a) => a.icon).forEach((a) => loadIcon(a.icon));
   onDestroy(unsub);

   function run(e, action) {
      Director.runAction(action.id);
   }
</script>

<Widget bind:elementRoot {settingStore} {widgetId}>
   <div class="ui-flex ui-flex row ui-gap-2">
      {#each currentActions as item (item.id)}
         <button
            class="ui-btn ui-btn-square"
            on:pointerdown|preventDefault|stopPropagation={() => null}
            on:click={(e) => run(e, item)}
            style:background-color={item.color}
            style:color={contrastColor(item.color)}
            class:!ui-p-[8px]={!item.icon}
            title={item.name}
         >
            {#if item.icon}
               <iconify-icon style:font-size="2rem" icon={item.icon} style:color={contrastColor(item.color)} />
            {:else}
               <FaPlay />
            {/if}
         </button>
      {/each}
   </div>
</Widget>
