<script>
   import Widget from "../Widget.svelte"

   import CharacterInfo from "../components/CharacterInfo.svelte"

   export let elementRoot;
   export let characters;
   export let settingStore;
</script>

<svelte:options accessors={true}/>

<Widget bind:elementRoot settingStore={settingStore}>
    {#if characters && characters.length > 0}
        {#each characters as token}
            <CharacterInfo bind:token/>
        {/each}
    {:else}
        <div>Please place characters on the scene</div>
    {/if}
</Widget>
