<script>
    import { onDestroy } from 'svelte';
    import { moduleId, SETTINGS} from "../../constants.js";
    import Widget from "../Widget.svelte"

    import CharacterInfo from "../components/CharacterInfo.svelte"
    import NPCInfo from "../components/NPCInfo.svelte"
    import MassActions from "../components/MassActions.svelte"

    export let elementRoot;
    export let tokens;
    export let store;
    export let hideHP;
    export let settingStore;
    export let widgetId;
    export let placeholderText;

    const showMass = globalThis.game.settings.get(moduleId, SETTINGS.SHOW_MASS);

    const unsubscribe = store.subscribe(value => {
        tokens = value;
    });
    onDestroy(unsubscribe);
</script>

<svelte:options accessors={true}/>

<Widget bind:elementRoot settingStore={settingStore} widgetId={widgetId}>
    {#if tokens && tokens.length > 0}
        {#each tokens as token}
            {#if token.document.actor.data.type == "npc"}
                <NPCInfo token={token} hideHP={hideHP}/>
            {:else}
                <CharacterInfo token={token} hideHP={hideHP}/>
            {/if}
        {/each}

        {#if showMass && tokens.length > 1}
            <MassActions tokens={tokens}/>
	    {/if}
    {:else}
        <div>{placeholderText}</div>
    {/if}
</Widget>
