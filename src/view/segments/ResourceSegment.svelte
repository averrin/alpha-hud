<script>
    export let token;
    export let iconIndex;

    let bgColor = 'none';
    let border = 'none';
    let hasIcon = false;
    const flags = token.document.data.flags;
    let value = 0;
    let icon;
    if ("resource-icons" in flags) {
        hasIcon = flags["resource-icons"][`icon${iconIndex}`].resource != '';
        if (hasIcon) {
            const data = flags["resource-icons"][`icon${iconIndex}`];
            value = getProperty(token?.document?.actor.getRollData(), data.resource);
            icon = data.img;
            if (data.options.background.active) {
                bgColor = data.options.background.color;
            }
            if (data.options.tint.active && icon == "") {
                bgColor = data.options.tint.color;
            }
            if (data.options.border.active) {
                border = `1px solid ${data.options.border.color}`;
            }
        }
    }

</script>

{#if hasIcon}
    <div class="icon"
        style="background: url({icon}) no-repeat; background-size: contain; background-color: {bgColor}; border: {border};">
        {value.value}
    </div>
{/if}

<style lang="scss">
    .icon {
        width: 30px;
        height: 30px;
        border-radius: 4px;
        font-size: 20px;
        text-align: center;
        display: inline-flex;
        margin-left: 6px;
        align-items: center;
        justify-content: center;

        text-shadow: -1px -1px 8px rgb(22 22 22), -1px -1px 8px rgb(22 22 22), -1px -1px 8px rgb(22 22 22), -1px -1px 8px rgb(22 22 22);
    }
</style>
