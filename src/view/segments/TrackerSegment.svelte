<script>
   import ProgressSegment from "../segments/ProgressSegment.svelte"
    import { getContext } from 'svelte';
    let token = getContext('token');

    export let label = "";
    export let color = "";
    export let trackerName;

    const hasTrackers = typeof window.CrashTNT !== 'undefined';

    let tracker = null;
    if (hasTrackers) {
        let trackers = window.CrashTNT.getActivitiesForActor(token.document.actor.data.name);
        if (trackers) {
            trackers = trackers.filter(t => t.name == trackerName);
            if (trackers.length > 0) {
                tracker = trackers[0];
            }
        }
    }

    function increase(){
        tracker.progress++;
        window.CrashTNT.updateActivityProgress(token.document.actor.data.name, trackerName, tracker.progress);
        Hooks.call("updateActor", token.document.actor, {});
    }
    function decrease(){
        tracker.progress--;
        window.CrashTNT.updateActivityProgress(token.document.actor.data.name, trackerName, tracker.progress);
        Hooks.call("updateActor", token.document.actor, {});
    }
</script>


{#if tracker}
<div class="tracker-segment">
    {#if label != ""}
    {label}:&nbsp; 
    {/if}
    <button
        on:click|preventDefault|stopPropagation={decrease}
        on:pointerdown|preventDefault|stopPropagation={()=>null}
        >
        <div class="icon" style="background: url(icons/svg/down.svg) no-repeat; background-size: contain;"></div>
    </button>
    <ProgressSegment
	    value={tracker.progress}
	    max={tracker.completionAt}
	    color={color}
    />
    <button
        on:click|preventDefault|stopPropagation={increase}
        on:pointerdown|preventDefault|stopPropagation={()=>null}
        >
        <div class="icon" style="background: url(icons/svg/up.svg) no-repeat; background-size: contain;"></div>
    </button>
</div>
{/if}

<style lang="scss">

    .info-container {
        font-size: 18px !important;
        padding: 6px;
        white-space: nowrap;
    }

    .tracker-segment {
        display: flex;
        align-items: center;
        flex-direction: row;
    }

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
