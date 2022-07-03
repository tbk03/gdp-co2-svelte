<script>
    export let start, end, colour, strokeWidth;
    export let marginAdj;
</script>

<div class="arrow" style="top:0px; left:0px;{marginAdj}">
<svg width=1000 height=1000>

    <defs>
        <!-- arrowhead marker definition -->
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
            markerWidth="5" markerHeight="5"
            orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={colour}/>
        </marker>
    </defs>

    <line   x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
            stroke={colour}
            marker-end="url(#arrow)"
            stroke-width={strokeWidth}/>
</svg>
</div>

<style>
    .arrow{
        position: absolute;
    }
</style>