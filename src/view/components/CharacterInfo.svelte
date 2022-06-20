<script>
    import {matchTrackers, hasResourceIcons, isAlive, findItems} from '../../modules/helpers.js';
    import {moduleId, SETTINGS} from '../../constants.js';
    import {foundry} from '../../modules/foundry.js';
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
    import CombatSegment from "../segments/CombatSegment.svelte"
    import AmmoSegment from "../segments/AmmoSegment.svelte"
    import ItemCountSegment from '../segments/ItemCountSegment.svelte'

    import ProgressValueSegment from "../segments/ProgressValueSegment.svelte"
    import DataProgressSegment from "../segments/DataProgressSegment.svelte"
    import { setContext, onDestroy } from 'svelte';
    import { writable } from 'svelte/store';
    import { targetsStore }          from '../../modules/stores.js';

    export let token;
    let owner;
    const tokenStore = writable(token);
    setContext("token", tokenStore);
    $: {
        tokenStore.set(token);
    }

    const users = game.users.filter(u => u.character == token.document.actor);
    if (users.length > 0) {
       owner = users[0];
    }
    //if (!owner) owner = foundry.user;

    let targets = [];
    const unsubscribe = targetsStore.subscribe(value => {
	    if(owner) targets = Array.from(owner.targets);
    });
    onDestroy(unsubscribe);

    export let hideHP;

    const hpColor = game.settings.get(moduleId, SETTINGS.HP_COLOR);

    const showTargets = foundry.settings.get(moduleId, SETTINGS.SHOW_TARGETS);


    const trackers = matchTrackers(token);

    const itemsToFind = JSON.parse(globalThis.game.settings.get(moduleId, SETTINGS.ITEM_COUNT_LIST));
    $: items = findItems(token, itemsToFind);
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
	    <WeightSegment/>
	</row>
	<row>
	    {#if isAlive(token)}
	        <CombatSegment/>
	        <AmmoSegment/>
            <div class="divider"></div>
	    {/if}

        {#each items as item, i}
	        <ItemCountSegment item={item}/>
            <div class="divider"></div>
	    {/each}
	    {#if hasResourceIcons(token)}
	        <div class="resource-icons">
	            <ResourceSegment iconIndex=1/>
	            <ResourceSegment iconIndex=2/>
	            <ResourceSegment iconIndex=3/>
	        </div>
	    {/if}

        {#if trackers.length > 0}
	        {#if hasResourceIcons(token)}
                <div class="divider"></div>
            {/if}
        <row style="padding-left: 12px; flex-direction: row-reverse">
            {#each trackers as tracker, i}
                <TrackerSegment
                    color={tracker.color}
                    label={tracker.label}
                    trackerName={tracker.name}
                />
                {#if i != trackers.length - 1}
                <div class="divider"></div>
                {/if}
            {/each}
        </row>
	    {/if}
	</row>
	{#if showTargets && targets.length > 0}
	<row>
	    <div class="target-icons">
	        <span>Targets:&nbsp;</span>
            {#each targets as target}
                <TokenIcon token={target} player={owner}/>
            {/each}
        </div>
	</row>
	{/if}
</item>
{/if}

<style lang="scss">
    item:not(:last-child) {
        border-bottom: 1px solid #eeeeee55;
        padding-bottom: 6px;
        margin-bottom: 6px;
    }

    row div {
        display: flex;
        align-items: center;
    }
</style>

