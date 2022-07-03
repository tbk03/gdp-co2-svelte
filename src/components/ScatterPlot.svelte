<script>
	import { fade } from "svelte/transition";
    import { cubicInOut } from 'svelte/easing';
    import { createEventDispatcher } from "svelte";


    export let cs, clipPath, scatterAnnimateClass, scatterPointHoverClass, colourScale, showTT;
    console.log("In ScatterPlot", cs);

    const dispatch = createEventDispatcher();

    let mouseOver = function(event){
        if (this.attributes["data-showtt"].value == "true") {
            dispatch('message', {   event: event,
                                    attributes: this.attributes,
                                    showTT: true});
        }
    }

    let mouseLeave = function(event){
        dispatch('message', {   event: event,
                                    attributes: this.attributes,
                                    showTT: false});
    }

    let mouseMove = function(event){
        if (this.attributes["data-showtt"].value == "true") {
            dispatch('message', {   event: event,
                                    attributes: this.attributes,
                                    showTT: true});
        }
    }

</script>

{#each cs.data as d}
    <circle
        class="{scatterAnnimateClass} {scatterPointHoverClass(d)}"

        cx={cs.scales.x(cs.accessors.x(d))}
        cy={cs.scales.y(cs.accessors.y(d))}
        r={cs.scales.size(cs.accessors.size(d))}
        fill={colourScale(d)}
        opacity="0.7"

        clip-path={clipPath}
        
        data-x={cs.accessors.x(d)}
        data-y={cs.accessors.y(d)}
        data-country={cs.accessors.country(d)}
        data-population={cs.accessors.size(d)}
        data-showtt="true"
        data-ff-prod={d.total_ff_prod}
        data-showTT={showTT(d)}

        in:fade="{{duration: 5000,
        easing: cubicInOut,
        delay: 1000}}"
        out:fade="{{duration: 1000,
        easing: cubicInOut}}"

        on:mouseover={mouseOver}
        on:mouseleave={mouseLeave}
        on:focus={mouseOver}
        on:mousemove={mouseMove}
    />

{/each}

<style>
    .scatter-point {
		transition: fill 1s ease, stroke-width 1s ease, stroke 1s ease;
        z-index: 20;
		/* -webkit-mask-image: url(paper_texture.png);
        mask-image: url(paper_texture.png); */
	}
	.scatter-point-animated {
		transition: fill 1s ease, stroke-width 1s ease, stroke 1s ease, cx 5s, cy 5s;
		/* -webkit-mask-image: url(paper_texture.png);
        mask-image: url(paper_texture.png); */
	}

	/* neater than using this.setAttribute() in mouse handlers */
	.scatter-point-light-bg:hover {
		fill: white;
		stroke: black;
		stroke-width: 1.25;
		filter: drop-shadow(0 0 0.2rem black);
	}

	.scatter-point-dark-bg:hover {
		fill: black;
		stroke: white;
		stroke-width: 1.25;
		filter: drop-shadow(0 0 0.2rem black);
	}
</style>