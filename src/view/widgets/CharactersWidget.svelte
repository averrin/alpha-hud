<script>
    import { onDestroy } from 'svelte';
    import { charactersStore }          from '../../modules/stores.js';
    import { moduleId, SETTINGS} from "../../constants.js";
    import Widget from "../Widget.svelte"

    import CharacterInfo from "../components/CharacterInfo.svelte"

    export let elementRoot;
    export let characters;
    export let settingStore;

    const showMass = globalThis.game.settings.get(moduleId, SETTINGS.SHOW_MASS);

    const unsubscribe = charactersStore.subscribe(value => {
        characters = value;
    });
    onDestroy(unsubscribe);

    function selectAll() {
        if (event.which == 1) {
            characters.forEach(c => c.control({releaseOthers: false}))
        } else if (event.which == 3) {
            characters.forEach(c => c.release())
        }
    }

    function targetAll() {
        if (event.which == 1) {
            characters.forEach(c => c.setTarget(game.user, {releaseOthers: false}))
        } else if (event.which == 3) {
            characters.forEach(c => c.setTarget(false, {releaseOthers: true, user: game.user}))
        }
    }

    function toCombat() {
        if (event.which == 1) {
            characters.forEach(c => !c.document.inCombat && c.toggleCombat())
        } else if (event.which == 3) {
            characters.forEach(c => c.document.inCombat && c.toggleCombat())
        }
    }
</script>

<svelte:options accessors={true}/>

<Widget bind:elementRoot settingStore={settingStore}>
    {#if characters && characters.length > 0}
        {#each characters as token}
            <CharacterInfo bind:token/>
        {/each}

        {#if showMass}
	        <row style="justify-content: start">
                <button class="icon sq"
                    on:pointerdown|preventDefault|stopPropagation={selectAll}
                    title="Select all | Realise all"
                >
                    <i class="fas fa-expand"></i>
                </button>

                <button class="icon sq"
                    on:pointerdown|preventDefault|stopPropagation={targetAll}
                    title="Target all | Untarget all"
                >
                    <i class="fas fa-bullseye"></i>
                </button>

                <button class="itemicon-segment icon sq"
                    on:pointerdown|preventDefault|stopPropagation={toCombat}
                    title="To combat | From combat"
                >
                    <div class="icon" style="background-image: url(icons/svg/combat.svg)"></div>
                </button>
	        </row>
	    {/if}
    {:else}
        <div>Please place characters on the scene</div>
    {/if}
</Widget>
