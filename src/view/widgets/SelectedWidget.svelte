<script>
    import Widget from "../Widget.svelte"
    import CharacterInfo from "../components/CharacterInfo.svelte"
    import NPCInfo from "../components/NPCInfo.svelte"
    import { onDestroy } from 'svelte';
    import { moduleId, SETTINGS} from "../../constants.js";
    import {actionsStore, tokensStore}          from '../../modules/stores.js';

    export let elementRoot;
    export let settingStore;
    let tokens;

    const unsubscribe = tokensStore.subscribe(value => {
	    tokens = value;
    });
    onDestroy(unsubscribe);

    const hideHP = globalThis.game.settings.get(moduleId, SETTINGS.HIDE_SELECTED_HP);
</script>

<svelte:options accessors={true}/>

<Widget bind:elementRoot settingStore={settingStore}>
    {#if tokens && tokens.length > 0}
        {#each tokens as token}
            {#if token.document.actor.data.type == "npc"}
                <NPCInfo token={token} hideHP={hideHP}/>
            {:else}
                <CharacterInfo token={token} hideHP={hideHP}/>
            {/if}
        {/each}
    {:else}
        <span>Please select a token</span>
    {/if}
</Widget>
