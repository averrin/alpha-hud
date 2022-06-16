<script>
   export let elementRoot;
    import { getContext } from 'svelte';
    import {
          applyPosition,
          draggable } from '@typhonjs-fvtt/runtime/svelte/action';

    const { application } = getContext('external');
    const position = application.position;
    export let settingStore;
   const storePosition = foundry.utils.debounce((data) => $settingStore = data, 500);
   $: storePosition($position);

   function toggleCollapsed() {
       console.log("fire");
       position.update(p => p.width = 100);
   }
</script>

<svelte:options accessors={true}/>

<div class="widget" bind:this={elementRoot}
    use:applyPosition={position}
    use:draggable={{position}}>
    <slot></slot>
</div>

<style lang="scss">
    .widget {
        position: absolute;
        border-left: 6px #eee solid;
        padding-left: 6px;

        font-size: 18px;
        color: #eee;
        text-shadow: -1px -1px 1px rgb(52 52 52), -1px -1px 1px rgb(52 52 52), -1px -1px 1px rgb(52 52 52), -1px -1px 1px rgb(52 52 52);

        background-color: #00000066;
        border-radius: 8px;
        padding: 8px;
    }

    :global(.divider):not(:last-child):not(:first-child) {
        border: 1px solid #eeeeee55;
        height: 14px;
        border-radius: 6px;
        margin: 0 4px;
    }

    :global(.icon) {
        height: 24px;
        width: 24px;
        display: inline-flex;
        background-size: contain;
        margin-right: 6px;
    }
</style>
