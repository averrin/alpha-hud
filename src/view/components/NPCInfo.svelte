<svelte:options accessors={true} />

<script>
   import { moduleId, SETTINGS } from "../../constants.js";
   import { isAlive } from "../../modules/helpers.js";

   import NameSegment from "../segments/NameSegment.svelte";
   import VisionSegment from "../segments/VisionSegment.svelte";
   import VisibilitySegment from "../segments/VisibilitySegment.svelte";
   import AliveSegment from "../segments/AliveSegment.svelte";
   import CombatSegment from "../segments/CombatSegment.svelte";
   import ItemIconSegment from "../segments/ItemIconSegment.svelte";
   import PileSegment from "../segments/PileSegment.svelte";
   import DataProgressSegment from "../segments/DataProgressSegment.svelte";
   import TokenIcon from "../segments/TokenIcon.svelte";
   import CurrencySegment from "../segments/CurrencySegment.svelte";
   import NPCLevelSegment from "../segments/NPCLevelSegment.svelte";
   import ActionsSegment from "../segments/ActionsSegment.svelte";

   import { setContext, onDestroy } from "svelte";
   import { writable } from "svelte/store";
   import { targetsStore } from "../../modules/stores.js";

   const itemsToFind = globalThis.game.settings.get(moduleId, SETTINGS.ITEM_DETECT_LIST);
   const hasPiles = typeof window.ItemPiles !== "undefined";
   const hpColor = game.settings.get(moduleId, SETTINGS.HP_COLOR);
   const showTargets = globalThis.game.settings.get(moduleId, SETTINGS.SHOW_TARGETS);
   const showActions = typeof game.tokenActionHUD !== "undefined" && game.settings.get(moduleId, SETTINGS.SHOW_ACTIONS);

   let targets;
   const unsubscribe = targetsStore.subscribe((value) => {
      targets = Array.from(value);
   });
   onDestroy(unsubscribe);

   export let hideHP;
   export let token;
   let onlySelected;
   let tags;
   const tokenStore = writable(token);
   setContext("token", tokenStore);
   $: tokenStore.set(token);
   $: items = token?.document?.actor?.items.filter((i) => itemsToFind.some((itf) => itf == i.name));
   $: onlySelected = globalThis.canvas.tokens.controlled.length == 1;
   $: if (globalThis.Tagger) tags = Tagger.getTags(token).filter((t) => t != "");
   let tagColors = {};
   if (globalThis.Director) {
      tagColors = globalThis.game.settings.get("director", "tag-colors");
   }

   let owner = globalThis.game.user;

   function contrastColor(color) {
      if (!color || color == "") return "#000000";
      const pRed = 0.299;
      const pGreen = 0.587;
      const pBlue = 0.114;
      const rgb = foundry.utils.hexToRGB(parseInt(color.slice(1), 16));

      const contrast = Math.sqrt(pRed * rgb[0] ** 2 + pGreen * rgb[1] ** 2 + pBlue * rgb[2] ** 2);

      return contrast > 1 ? "#000000" : "#ffffff";
   }
</script>

{#if token}
   <item>
      <row>
         <NameSegment />
         <div class="divider" />
         {#if !hideHP && globalThis.getProperty(token?.document?.actor.getRollData(), "attributes.hp.max") > 0}
            <DataProgressSegment path={"attributes.hp"} color={hpColor} />
            <div class="divider" />
         {/if}
         <div>
            <AliveSegment />
            {#if isAlive(token)}
               <VisionSegment />
               <VisibilitySegment />
               <CombatSegment />
            {/if}
            {#if hasPiles && !isAlive(token)}
               <PileSegment />
            {/if}
         </div>
      </row>
      <row>
         {#if isAlive(token)}
            <NPCLevelSegment />
            {#if (showActions && onlySelected) || items.length > 0}
               <div class="divider" />
            {/if}
            {#if showActions && onlySelected}
               <ActionsSegment />
            {/if}
            {#if items.length > 0}
               {#if showActions && onlySelected}
                  <span> * </span>
               {/if}
               <span class="button-group">
                  {#each items as item}
                     <ItemIconSegment {item} />
                  {/each}
               </span>
            {/if}
            {#if showTargets && targets.length > 0}
               {#if (showActions && onlySelected) || items.length > 0}
                  <div class="divider" />
               {/if}
               <div class="target-icons">
                  {#each targets as target}
                     <TokenIcon token={target} player={owner} />
                  {/each}
               </div>
               <div class="divider" />
            {/if}
         {:else}
            <div class="cell">
               <CurrencySegment />
            </div>
         {/if}
      </row>
      {#if tags}
         {#if tags.length > 0}
            <row class="tags-row">
               <div>
                  {#each tags as tag}
                     <span
                        class="tag"
                        style:background-color={tagColors[tag]}
                        style:color={contrastColor(tagColors[tag])}>{tag}</span
                     >
                  {/each}
               </div>
            </row>
         {/if}
      {/if}
   </item>
{/if}

<style lang="scss">
   .button-group {
      margin: 0 4px;
   }
   .tag {
      margin-right: 4px;
      padding: 2px 8px;
      border-radius: 6px;
      background-color: #eee;
      color: #232323;
      text-shadow: none !important;
   }
   .tags-row {
      height: 32px;
   }
</style>
