<script>
    export let onClick;

    export let iconOn;
    export let iconOff;

    export let value;

</script>

<span class="toggle-segment">
    <button
        on:click|preventDefault|stopPropagation={onClick}
        on:pointerdown|preventDefault|stopPropagation={()=>null}
        >
    {#if value}
        <div class="icon" style="background: {iconOn} no-repeat; background-size: contain;"></div>
    {:else}
        <div class="icon" style="background: {iconOff} no-repeat; background-size: contain;"></div>
    {/if}
    </button>
</span>

<style lang="scss">
    .icon {
        width: 100%;
        height: 100%;
    }
    button {
        width: 24px;
        height: 24px;
        padding: 2px;
        background: none;
        color: #eee;
        border: none;
        font-size: 20px;
        padding: 0;
    }
</style>
