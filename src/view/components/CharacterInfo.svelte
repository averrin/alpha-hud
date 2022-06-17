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
   import TokenIcon from '../segments/TokenIcon.svelte';

   import ProgressValueSegment from "../segments/ProgressValueSegment.svelte"
   import DataProgressSegment from "../segments/DataProgressSegment.svelte"
   import { setContext } from 'svelte';

   function isAlive(token) {
    return globalThis.getProperty(token?.document?.actor.getRollData(), "attributes.hp.value") > 0;
   }

   export let token;
   export let hideHP;
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
   const showRI = game.settings.get("alpha-hud", "show-resource-icons");
   const showTracking = game.settings.get("alpha-hud", "show-tracking");

   const showTargets = globalThis.game.settings.get("alpha-hud", "show-targets");

   let owner;
   const users = game.users.filter(u => u.character == token.document.actor);
   if (users.length > 0) {
       owner = users[0];
   }
   if (!owner) owner = globalThis.game.user;

   setContext("token", token);
</script>

<svelte:options accessors={true}/>

{#if token}
<item>
    <row>
	    <div class="cell">
	        <NameSegment/>
        </div>
        <div class="divider"></div>
	    {#if !hideHP && globalThis.getProperty(token?.document?.actor.getRollData(), "attributes.hp.max") > 0 }
	        <DataProgressSegment
	            path="attributes.hp"
	            color={hpColor}
	        />
            <div class="divider"></div>
	    {/if}
	    <div class="info-container cell">
            <ProgressValueSegment path="details.xp" label="xp" icon="icons/svg/upgrade.svg"/>
	    </div>
        <div class="divider"></div>
	    <CurrencySegment/>
        <div class="divider"></div>
	    <div class="info-container cell">
	        <WeightSegment/>
	    </div>
	</row>
	<row>
	    {#if showTargets && Array.from(owner.targets).length > 0}
	        <div class="target-icons">
            {#each Array.from(owner.targets) as target}
                <TokenIcon token={target} player={owner}/>
            {/each}
            </div>
            <div class="divider"></div>
	    {/if}
	    {#if showRI && token.document.data.flags["resource-icons"]}
	        <div class="resource-icons">
	            <ResourceSegment iconIndex=1/>
	            <ResourceSegment iconIndex=2/>
	            <ResourceSegment iconIndex=3/>
	        </div>
	    {/if}
        <div class="divider"></div>

        {#if showTracking}
            {#each trackers as tracker}
                <TrackerSegment
                    color={tracker.color}
                    label={tracker.label}
                    trackerName={tracker.name}
                />
            {/each}
	    {/if}
	</row>
</item>
{/if}

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
</style>

