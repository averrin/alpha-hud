<script>
    import TokenIcon from './TokenIcon.svelte';
    import { getContext } from 'svelte';
    let token = getContext('token');

    function onClick() {
        token.document.actor.sheet.render(true);
    }
    function altClick(event) {
        // if (event.which == 3) return globalThis.canvas.animatePan(({ x: token.center.x, y: token.center.y, scale: 1}));
        if (event.which == 3) return token.document.sheet.render(true);
        return null;
    }
   const showIcons = globalThis.game.settings.get("alpha-hud", "show-targets");

   let owner;
   const users = game.users.filter(u => u.character == token.document.actor);
   if (users.length > 0) {
       owner = users[0];
   }
</script>

<span class="name-segment">
    {#if showIcons}
        <TokenIcon token={token} player={globalThis.game.user}/>
    {/if}
    <button
        on:click|preventDefault|stopPropagation={onClick}
        on:pointerdown|preventDefault|stopPropagation={altClick}
        >
        {#if owner}
        <div class="marker"
            style:background={owner ? owner.data.color : ''}
            ></div>
        {/if}
        {token?.data?.name}
        {#if token?.data?.name != token?.document?.actor?.name}
            <i class="fas fa-exclamation-triangle"></i>
        {/if}
    </button>

</span>


<style lang="scss">
    .marker {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: inline-flex;
        margin-right: 4px;
    }
    .name-segment {
        flex-direction: row;
        display: flex;
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
