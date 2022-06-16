<script>
   import Widget from "../Widget.svelte"
   import CharacterInfo from "../components/CharacterInfo.svelte"
   import NPCInfo from "../components/NPCInfo.svelte"

   export let elementRoot;
   export let tokens;
   export let settingStore;

</script>

<svelte:options accessors={true}/>

<Widget bind:this={elementRoot} settingStore={settingStore}>
    {#if tokens && tokens.length > 0}
        {#each tokens as token}
            {#if token.document.actor.data.type == "npc"}
                <NPCInfo bind:token/>
            {:else}
                <CharacterInfo bind:token/>
            {/if}
        {/each}
    {:else}
        <span>Please select a token</span>
    {/if}
</Widget>
