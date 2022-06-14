<script>
   import Widget from "./Widget.svelte"

   import NameSegment from "./NameSegment.svelte"
   import VisionSegment from "./VisionSegment.svelte"
   import AliveSegment from "./AliveSegment.svelte"
   import DataSegment from "./DataSegment.svelte"
   import ProgressSegment from "./ProgressSegment.svelte"
   import HasItemSegment from "./HasItemSegment.svelte"
   import ItemIconSegment from "./ItemIconSegment.svelte"

   export let elementRoot;
   export let tokens;

   import { getContext } from 'svelte';
   const { application } = getContext('external');

   application.position.top = 80;
   application.position.left = 145;

   const items = ["Multiattack", "Spellcasting", "Sneak Attack"];
</script>

<svelte:options accessors={true}/>

<Widget bind:this={elementRoot}>
   {#if tokens && tokens.length > 0}
    {#each tokens as token}
    <item>
        <row>
	        <NameSegment bind:token/>
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
	        {#if token.document.actor.data.type == "npc"}
	            <AliveSegment bind:token/>
	            <VisionSegment bind:token/>
	        {/if}
	    </row>
	    {#if token.document.actor.data.type == "npc"}
            <row>
	            <span class="info-container">
	                CR: <DataSegment bind:token path="details.cr"/>
	            </span>

                <span class="features">
                    {#each items as item}
	                    <ItemIconSegment bind:token name={item}/>
	                {/each}
	            </span>
	        </row>
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

    .features {
        margin: 0 4px;
    }
</style>
