<script>
   export let elementRoot;
    import { getContext } from 'svelte';
    import {
          applyPosition,
          draggable } from '@typhonjs-fvtt/runtime/svelte/action';

    const { application } = getContext('external');
    const position = application.position;
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

        font-size: 24px;
        color: #eee;
        text-shadow: -1px -1px 1px rgb(52 52 52), -1px -1px 1px rgb(52 52 52), -1px -1px 1px rgb(52 52 52), -1px -1px 1px rgb(52 52 52);

        background-color: #00000066;
        border-radius: 8px;
        padding: 8px;
    }
</style>
