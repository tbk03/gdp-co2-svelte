<script>
    import { fade } from "svelte/transition";

    export let start, end, colour, strokeWidth, opacity;
    export let marginAdj;

    // create a unique ide for each marker head
    // to ensure they have the correct colour
    let markerID = String(Math.floor(Math.random() * 1e9));
    let markerIDString = `url(#${markerID})`
    
</script>

<g class="arrow" style="top:0px; left:0px;{marginAdj}"
    in:fade="{{ delay: 5000, duration: 2500 }}"
    out:fade="{{ duration: 1500 }}">

        <defs>
            <!-- arrowhead marker definition -->
            <!-- from: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker -->
            <marker id={markerID} viewBox="0 0 10 10" refX="5" refY="5"
                markerWidth="5" markerHeight="5"
                orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" stroke={colour} fill={colour}/>
            </marker>
        </defs>

        <line   x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
                stroke={colour}
                marker-end={markerIDString}
                stroke-width={strokeWidth}
                opacity={opacity}/>
</g>

<style>
    .arrow{
        position: absolute;
        z-index: 0;
    }
</style>