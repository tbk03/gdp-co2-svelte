<script>
    export let start, end, colour, strokeWidth, opacity;
    export let marginAdj;
</script>

<g class="arrow" style="top:0px; left:0px;{marginAdj}">

        <defs>
            <!-- arrowhead marker definition -->
            <!-- from: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker -->
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
                markerWidth="5" markerHeight="5"
                orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={colour}/>
            </marker>
        </defs>

        <line   x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
                stroke={colour}
                marker-end="url(#arrow)"
                stroke-width={strokeWidth}
                opacity={opacity}/>
</g>

<style>
    .arrow{
        position: absolute;
        z-index: 0;
    }
</style>