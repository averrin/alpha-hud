<script>
    import { getContext } from 'svelte';
    export let token;
    export let player;
    function onIconClick(event) {
        if (targeted) {
            token.setTarget(false, {user: player, releaseOthers: false});
        } else {
            token.setTarget(player, {releaseOthers: !event.shiftKey});
        }
    }
    function iconAltClick(event) {
        if (event.which == 3) return globalThis.canvas.animatePan(({ x: token.center.x, y: token.center.y, scale: 1}));
        return null;
    }

   $: targeted = player.targets.has(token);
</script>

<button class="token-icon"
    class:targeted="{targeted}"
    on:click|preventDefault|stopPropagation={onIconClick}
    on:pointerdown|preventDefault|stopPropagation={iconAltClick}
    title={token.data.name}
>
    <div class="icon" style="background: url({token.data.img}) no-repeat; background-size: contain;"></div>
</button>

<style lang="scss">
    button.token-icon {
        width: 30px;
        height: 30px;
    }

    button.token-icon.targeted {
        border: 2px solid orange;
    }
    button {
        // width: 24px;
        height: 24px;
        padding: 2px;
        background: none;
        color: #eee;
        border: none;
        font-size: 24px;
        padding: 0;
        display: inline-flex;
        align-items: center
    }


    button:hover {
        cursor: pointer;
        border: none;
        box-shadow: none;
        color: #aaf;
    }
</style>
