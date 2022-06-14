<script>
    import ToggleSegment from './ToggleSegment.svelte'

    export let token;

    function toggleVision() {
        token.document.update({vision: !token.document.data.vision});
    }
</script>

<ToggleSegment
    onClick={toggleVision}
    iconOff="url(icons/svg/blind.svg)"
    iconOn="url(icons/svg/eye.svg)"
    value={token.document.data.vision}
/>
