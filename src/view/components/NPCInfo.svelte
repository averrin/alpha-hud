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
   import CurrencySegment from "../segments/CurrencySegment.svelte"

   export let token;

   const items = ["Multiattack", "Spellcasting", "Sneak Attack"];
   const hasPiles = typeof window.ItemPiles !== "undefined";

   function isAlive(token) {
    return getProperty(token?.document?.actor.getRollData(), "attributes.hp.value") > 0;
   }

   const hpColor = game.settings.get("alpha-hud", "color-hp");
</script>

<svelte:options accessors={true}/>

<item>
    <row>
	    <NameSegment bind:token/>
        <div class="divider"></div>
	    {#if getProperty(token?.document?.actor.getRollData(), "attributes.hp.max") > 0 }
	        <DataProgressSegment bind:token
	            path={"attributes.hp"}
	            color={hpColor}
	        />
	    {/if}
        <div class="divider"></div>
	    <AliveSegment bind:token/>
	    <VisionSegment bind:token/>
	    {#if hasPiles && !isAlive(token)}
	        <PileSegment bind:token/>
	    {/if}
	</row>
    <row>
	{#if isAlive(token)}
	        <span class="info-container">
	            CR: <DataSegment bind:token path="details.cr"/>
	        </span>
            <div class="divider"></div>

	        {#if token.document.actor.items.some(i => i.hasAttack)}
                <span class="button-group">
                    {#each token.document.actor.items.filter(i => i.hasAttack) as item}
	                    <ItemIconSegment bind:token name={item.name}/>
	                {/each}
	            </span>
	        {:else}
                <div class="icon" style="background: url(icons/svg/cancel.svg) no-repeat; background-size: contain;"></div>
	        {/if}
	        {#if token.document.actor.items.some(i => items.indexOf(i.name) >= 0)}
                <span> * </span>
                <span class="button-group">
                    {#each items as item}
	                    <ItemIconSegment bind:token name={item}/>
	                {/each}
	            </span>
	        {/if}
	{:else}
	    <div class="cell">
	        <CurrencySegment bind:token/>
	    </div>
	{/if}
	</row>
    </item>

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

