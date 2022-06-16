<script>
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
   import WeightSegment from "../segments/WeightSegment.svelte"

   import ProgressValueSegment from "../segments/ProgressValueSegment.svelte"
   import DataProgressSegment from "../segments/DataProgressSegment.svelte"

   function isAlive(token) {
    return getProperty(token?.document?.actor.getRollData(), "attributes.hp.value") > 0;
   }

   export let token;
   const trackers = [
       {
            color:"#a122d5",
            label:"Mystic",
            name:"Mystic points",
       },
       {
            color:"#33ff77",
            label:"Test",
            name:"Test",
       },
   ];

   const hpColor = game.settings.get("alpha-hud", "color-hp");
   console.log(hpColor);
</script>

<svelte:options accessors={true}/>

<item>
    <row>
	    <div class="cell">
	        <NameSegment bind:token/>
        </div>
        <div class="divider"></div>
	    {#if getProperty(token?.document?.actor.getRollData(), "attributes.hp.max") > 0 }
	    <DataProgressSegment bind:token
	        path={"attributes.hp"}
	        color={hpColor}
	    />
        <div class="divider"></div>
	    {/if}
	    <div class="info-container cell">
            <ProgressValueSegment bind:token path="details.xp" label="xp" icon="icons/svg/upgrade.svg"/>
	    </div>
        <div class="divider"></div>
	    <CurrencySegment bind:token/>
        <div class="divider"></div>
	    <div class="info-container cell">
	        <WeightSegment bind:token/>
	    </div>
	</row>
	<row>
	    {#if token.document.data.flags["resource-icons"]}
	        <div>
	            <ResourceSegment bind:token iconIndex=1/>
	            <ResourceSegment bind:token iconIndex=2/>
	            <ResourceSegment bind:token iconIndex=3/>
	        </div>
	    {/if}
        <div class="divider"></div>

        {#each trackers as tracker}
            <TrackerSegment
                bind:token
                color={tracker.color}
                label={tracker.label}
                trackerName={tracker.name}
            />
        {/each}
	</row>
</item>

<style lang="scss">
    item {
        display: flex;
        flex-direction: column;
    }
    item:not(:last-child) {
        border-bottom: 1px solid #eeeeee55;
        padding-bottom: 6px;
        margin-bottom: 6px;
    }

    .cell {
     //   border-right: 3px solid #eeeeee55;
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

