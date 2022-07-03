<script>
    import { fade } from "svelte/transition";
    export let text, topPos, leftPos, marginAdj;    
</script>

<div    class="annotation-plain-text"
        style="top:{topPos}px; left:{leftPos}px; color: white; {marginAdj}"
        in:fade="{{ duration: 5000 }}"
        out:fade="{{ duration: 1500 }}">

    <div>{@html text}</div>
</div>

<style>
    .annotation-plain-text {
        position:absolute;
        padding: 14px;
        display: flex;
        flex-direction: column;
        z-index: 14;
        font-family: "Lato", sans-serif;
        text-align: left;
        font-size: 20px;
        max-width: 225px;
    }
</style>