<script>
   export let elementRoot;
   import '../styles/widgets.scss';
    import {moduleId, SETTINGS} from '../constants.js';
    import {
          applyPosition,
          draggable } from '@typhonjs-fvtt/runtime/svelte/action';

    import { getContext } from 'svelte';
    const { application } = getContext('external');
    const position = application.position;
    position.scale = game.settings.get(moduleId, SETTINGS.UI_SCALE);
    export let settingStore;
    export let widgetId;
   const storePosition = foundry.utils.debounce((data) => $settingStore = data, 500);
   $: storePosition($position);
</script>

<svelte:options accessors={true}/>

<div class="alpha-widget"
    id={widgetId}
    bind:this={elementRoot}
    use:applyPosition={position}
    use:draggable={{position}}>
    <slot></slot>
</div>
