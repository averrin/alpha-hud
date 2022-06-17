<script>
   export let elementRoot;
   import '../styles/widgets.scss';
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
