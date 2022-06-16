<script>
    export let token;

    function onClick() {
        token.document.actor.sheet.render(true);
    }
    function onRClick() {
    }
    function altClick(event) {
        if (event.which == 3) return canvas.animatePan(({ x: token.center.x, y: token.center.y, scale: 1}));
        if (event.which == 2) return token.document.sheet.render(true);
        return null;
    }
</script>

<span class="name-segment">
    <button
        on:click|preventDefault|stopPropagation={onClick}
        on:pointerdown|preventDefault|stopPropagation={(event)=>altClick(event)}
        >
        {token?.data?.name}
        {#if token?.data?.name != token?.document?.actor?.name}
            <i class="fas fa-exclamation-triangle"></i>
        {/if}
    </button>

</span>


<style lang="scss">
    .icon {
        width: 100%;
        height: 100%;
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
    }
    button:hover {
        cursor: pointer;
        border: none;
        box-shadow: none;
        color: #aaf;
    }
</style>
