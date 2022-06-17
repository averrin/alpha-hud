<script>
   import Widget from "../Widget.svelte"
   import CharacterInfo from "../components/CharacterInfo.svelte"
   import NPCInfo from "../components/NPCInfo.svelte"

   export let elementRoot;
   export let tokens;
   export let settingStore;

   const hideHP = globalThis.game.settings.get("alpha-hud", "hide-selected-hp");
</script>

<svelte:options accessors={true}/>

<Widget bind:elementRoot settingStore={settingStore}>
    {#if tokens && tokens.length > 0}
        {#each tokens as token}
            {#if token.document.actor.data.type == "npc"}
                <NPCInfo bind:token hideHP={hideHP}/>
            {:else}
                <CharacterInfo bind:token hideHP={hideHP}/>
            {/if}
        {/each}
    {:else}
        <span>Please select a token</span>
    {/if}
</Widget>
