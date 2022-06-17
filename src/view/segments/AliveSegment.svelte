<script>
    import ToggleSegment from './ToggleSegment.svelte'
    import { getContext } from 'svelte';
    let token = getContext('token');

    function toggleVision() {
        if (token.document.actor.data.data.attributes.hp.value != 0) {
            token.document.actor.update({
                "data.attributes.hp.value": 0,
            });
        } else {
            token.document.actor.update({
                "data.attributes.hp.value": token.document.actor.data.data.attributes.hp.max,
            });
        }
    }
</script>

<ToggleSegment
    onClick={toggleVision}
    iconOn="url(icons/svg/skull.svg)"
    iconOff="url(icons/svg/heal.svg)"
    value={token.document.actor.data.data.attributes.hp.value == 0}
/>
