<script>
   import NameSegment from "../segments/NameSegment.svelte"
   import VisionSegment from "../segments/VisionSegment.svelte"
   import AliveSegment from "../segments/AliveSegment.svelte"
   import DataSegment from "../segments/DataSegment.svelte"
   import ProgressSegment from "../segments/ProgressSegment.svelte"
   import HasItemSegment from "../segments/HasItemSegment.svelte"
   import ItemIconSegment from "../segments/ItemIconSegment.svelte"
   import PileSegment from "../segments/PileSegment.svelte"
   import ProgressValueSegment from "../segments/ProgressValueSegment.svelte"
   import DataProgressSegment from "../segments/DataProgressSegment.svelte"
   import TokenIcon from '../segments/TokenIcon.svelte';
   import CurrencySegment from "../segments/CurrencySegment.svelte"

   import { setContext } from 'svelte';

   export let hideHP;
   export let token;
   setContext("token", token);

   const items = ["Multiattack", "Spellcasting", "Sneak Attack"];
   const hasPiles = typeof window.ItemPiles !== "undefined";

   function isAlive(token) {
    return getProperty(token?.document?.actor.getRollData(), "attributes.hp.value") > 0;
   }

   const hpColor = game.settings.get("alpha-hud", "color-hp");

   const showTargets = globalThis.game.settings.get("alpha-hud", "show-targets");

   let owner = globalThis.game.user;

   setContext("token", token);
</script>

<svelte:options accessors={true}/>

{#if token}
<item>
    <row>
	    <NameSegment/>
        <div class="divider"></div>
	    {#if !hideHP && getProperty(token?.document?.actor.getRollData(), "attributes.hp.max") > 0 }
	        <DataProgressSegment
	            path={"attributes.hp"}
	            color={hpColor}
	        />
            <div class="divider"></div>
	    {/if}
	    <AliveSegment/>
	    <VisionSegment/>
	    {#if hasPiles && !isAlive(token)}
	        <PileSegment/>
	    {/if}
	</row>
    <row>
	{#if isAlive(token)}
	        <span class="info-container">
	            CR: <DataSegment path="details.cr"/>
	        </span>
            <div class="divider"></div>

	        {#if token.document.actor.items.some(i => i.hasAttack)}
                <span class="button-group">
                    {#each token.document.actor.items.filter(i => i.hasAttack) as item}
	                    <ItemIconSegment name={item.name}/>
	                {/each}
	            </span>
	        {:else}
                <div class="icon" style="background: url(icons/svg/cancel.svg) no-repeat; background-size: contain;"></div>
	        {/if}
	        {#if token.document.actor.items.some(i => items.indexOf(i.name) >= 0)}
                <span> * </span>
                <span class="button-group">
                    {#each items as item}
	                    <ItemIconSegment name={item}/>
	                {/each}
	            </span>
                <div class="divider"></div>
	        {/if}
	        {#if showTargets && Array.from(owner.targets).length > 0}
	            <div class="target-icons">
                {#each Array.from(owner.targets) as target}
                    <TokenIcon token={target} player={owner}/>
                {/each}
                </div>
                <div class="divider"></div>
	        {/if}
	{:else}
	    <div class="cell">
	        <CurrencySegment/>
	    </div>
	{/if}
	</row>
</item>
{/if}

<style lang="scss">
    item {
        display: flex;
        flex-direction: column;
    }

    row {
        display: flex;
        align-items: center;
        flex-direction: row;
        margin: 0;
        padding: 0;
    }

    .info-container {
        font-size: 18px !important;
        padding: 6px;
    }

    .button-group {
        margin: 0 4px;
    }

    .icon {
        border-radius: 4px;
        width: 30px;
        height: 30px;
        padding: 0;
        margin-right: 6px;
    }
</style>

