<script>
    import { logger } from "../../modules/helpers.js";
    export let tokens;

    function selectAll() {
        if (event.which == 1) {
            tokens.forEach(c => c.control({releaseOthers: false}))
        } else if (event.which == 3) {
            tokens.forEach(c => c.release())
        }
    }

    function targetAll() {
        if (event.which == 1) {
            tokens.forEach(c => c.setTarget(game.user, {releaseOthers: false}))
        } else if (event.which == 3) {
            tokens.forEach(c => c.setTarget(false, {releaseOthers: true, user: game.user}))
        }
    }

    function toCombat() {
        if (event.which == 1) {
            tokens.forEach(c => !c.document.inCombat && c.toggleCombat())
        } else if (event.which == 3) {
            tokens.forEach(c => c.document.inCombat && c.toggleCombat())
        }
    }

    function assignXP() {
        globalThis.game.MonksTokenBar.assignXP(tokens);
    }
    function requestRoll() {
        globalThis.game.MonksTokenBar.requestRoll(tokens);
    }

    let hasTB;
    $: hasTB = typeof globalThis.game.MonksTokenBar !== "undefined";
    $: logger.info(hasTB)
</script>

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

    {#if hasTB}
        <div class="divider"></div>

    <button class="icon sq"
        on:pointerdown|preventDefault|stopPropagation={assignXP}
        title="Assign XP"
    >
        <i class="fas fa-book-medical"></i>
    </button>

    <button class="icon sq"
        on:pointerdown|preventDefault|stopPropagation={requestRoll}
        title="Assign XP"
    >
        <div class="icon" style="background-image: url(icons/svg/d20.svg)"></div>
    </button>
    {/if}
</row>
