<script>
    export let token;
    export let name;

    const items = token?.document?.actor?.items.filter(i => i.name == name)
    const hasItem = items.length > 0;
    let item;
    if (hasItem) {
        item = items[0];
    }
    function onClick() {
        item.roll();
    }
</script>

{#if hasItem}
    <button class="itemicon-segment"
        on:click|preventDefault|stopPropagation={onClick}
        on:pointerdown|preventDefault|stopPropagation={()=>null}
        title={item.data.name}
    >
        <div class="icon" style="background: url({item.data.img}) no-repeat; background-size: contain;"></div>
    </button>
{/if}

<style lang="scss">
    .icon {
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }
    button {
        width: 30px;
        height: 30px;
        background: none;
        border: none;
        font-size: 20px;
        padding: 0;
    }
</style>
