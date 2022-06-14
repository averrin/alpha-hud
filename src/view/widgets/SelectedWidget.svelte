<script>
   import Widget from "../Widget.svelte"

   import NameSegment from "../segments/NameSegment.svelte"
   import VisionSegment from "../segments/VisionSegment.svelte"
   import AliveSegment from "../segments/AliveSegment.svelte"
   import DataSegment from "../segments/DataSegment.svelte"
   import ProgressSegment from "../segments/ProgressSegment.svelte"
   import HasItemSegment from "../segments/HasItemSegment.svelte"
   import ItemIconSegment from "../segments/ItemIconSegment.svelte"
   import PileSegment from "../segments/PileSegment.svelte"

   export let elementRoot;
   export let tokens;

   import { getContext } from 'svelte';
   const { application } = getContext('external');

   application.position.top = 80;
   application.position.left = 145;

   const items = ["Multiattack", "Spellcasting", "Sneak Attack"];
   const hasPiles = typeof window.ItemPiles !== "undefined";

   function isAlive(token) {
    return getProperty(token?.document?.actor.getRollData(), "attributes.hp.value") > 0;
   }
</script>

<svelte:options accessors={true}/>

<Widget bind:this={elementRoot}>
   {#if tokens && tokens.length > 0}
    {#each tokens as token}
    <item>
        <row>
	        <NameSegment bind:token/>
	        {#if getProperty(token?.document?.actor.getRollData(), "attributes.hp.max") > 0 }
	            <ProgressSegment bind:token
	                value={getProperty(token?.document?.actor.getRollData(), "attributes.hp.value")}
	                max={getProperty(token?.document?.actor.getRollData(), "attributes.hp.max")}
	                color="red"
	            />
	            <span class="info-container">
	                <DataSegment bind:token path="attributes.hp.value"/>
	                /
	                <DataSegment bind:token path="attributes.hp.max"/>
	            </span>
	        {/if}
	        {#if token.document.actor.data.type == "npc"}
	            <AliveSegment bind:token/>
	            <VisionSegment bind:token/>
	            {#if hasPiles && !isAlive(token)}
	                <PileSegment bind:token/>
	            {/if}
	        {/if}
	    </row>
	    {#if token.document.actor.data.type == "npc"}
	        {#if isAlive(token)}
                <row>
	                <span class="info-container">
	                    CR: <DataSegment bind:token path="details.cr"/>
	                </span>

	                {#if token.document.actor.items.some(i => i.hasAttack)}
                        <span class="button-group">
                            {#each token.document.actor.items.filter(i => i.hasAttack) as item}
	                            <ItemIconSegment bind:token name={item.name}/>
	                        {/each}
	                    </span>
	                {/if}
	                {#if token.document.actor.items.some(i => items.indexOf(i.name) >= 0)}
                        <span> * </span>
                        <span class="button-group">
                            {#each items as item}
	                            <ItemIconSegment bind:token name={item}/>
	                        {/each}
	                    </span>
	                {/if}
	            </row>
	        {/if}
	    {/if}
    </item>
	{/each}
   {:else}
    <span>Please select a token</span>
   {/if}
</Widget>

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
</style>
