<script>
   import Widget from "../Widget.svelte"

   import NameSegment from "../segments/NameSegment.svelte"
   import CurrencySegment from "../segments/CurrencySegment.svelte"
   import VisionSegment from "../segments/VisionSegment.svelte"
   import AliveSegment from "../segments/AliveSegment.svelte"
   import DataSegment from "../segments/DataSegment.svelte"
   import ProgressSegment from "../segments/ProgressSegment.svelte"
   import HasItemSegment from "../segments/HasItemSegment.svelte"
   import ItemIconSegment from "../segments/ItemIconSegment.svelte"
   import PileSegment from "../segments/PileSegment.svelte"
   import ResourceSegment from "../segments/ResourceSegment.svelte"
   import TrackerSegment from "../segments/TrackerSegment.svelte"

   import ProgressValueSegment from "../segments/ProgressValueSegment.svelte"

   export let elementRoot;
   export let tokens;

   $: characters = tokens ? tokens.filter(t => t.document.actor.type == 'character' && isLiving(t)).sort(function(a, b){
        if(a.document.actor.data.name < b.document.actor.data.name){
            return -1;
        }else if(a.document.actor.data.name > b.document.actor.data.name){
            return 1;
        }
        return 0;
    }) : [];

   import { getContext } from 'svelte';
   const { application } = getContext('external');

   application.position.top = 80;
   application.position.right = 20;

   function isAlive(token) {
    return getProperty(token?.document?.actor.getRollData(), "attributes.hp.value") > 0;
   }

   function isLiving(token) {
    return getProperty(token?.document?.actor.getRollData(), "attributes.hp.max") > 0;
   }
</script>

<svelte:options accessors={true}/>

<Widget bind:this={elementRoot}>
   {#if characters && characters.length > 0}
    {#each characters as token}
    <item>
        <row>
	        <div class="cell">
	            <NameSegment bind:token/>
            </div>
	        {#if getProperty(token?.document?.actor.getRollData(), "attributes.hp.max") > 0 }
	        <div class="cell">
	            <ProgressSegment bind:token
	                value={getProperty(token?.document?.actor.getRollData(), "attributes.hp.value")}
	                max={getProperty(token?.document?.actor.getRollData(), "attributes.hp.max")}
	                color="red"
	            />
	            <div class="info-container">
                    <ProgressValueSegment bind:token path="attributes.hp"/>
	            </div>
            </div>
	        {/if}
	        <div class="info-container cell">
                <ProgressValueSegment bind:token path="details.xp" label="xp"/>
	        </div>
	        <div class="cell">
	            <CurrencySegment bind:token/>
	        </div>
	        <div class="info-container cell">
                <ProgressValueSegment bind:token path="attributes.encumbrance" label="enc"/>
	        </div>
	    </row>
	    <row>
	        <div>
	            <ResourceSegment bind:token iconIndex=1/>
	            <ResourceSegment bind:token iconIndex=2/>
	            <ResourceSegment bind:token iconIndex=3/>
	        </div>

            <TrackerSegment bind:token color="#a122d5" label="Mystic" trackerName="Mystic points"/>
	    </row>
    </item>
	{/each}
   {:else}
    <div>Please place characters on the scene</div>
   {/if}
</Widget>

<style lang="scss">
    item {
        display: flex;
        flex-direction: column;
    }

    .cell {
        border-right: 3px solid #eeeeee55;
        padding: 0 4px;
    }

    row {
        display: flex;
        align-items: center;
        flex-direction: row;
        margin: 0;
        padding: 0;
        justify-content: space-between;
        width: 100%;
    }

    row div {
        display: flex;
        align-items: center;
    }

    .info-container {
        font-size: 18px !important;
        padding: 6px;
        white-space: nowrap;
    }

    .button-group {
        margin: 0 4px;
        white-space: nowrap;
    }
</style>
