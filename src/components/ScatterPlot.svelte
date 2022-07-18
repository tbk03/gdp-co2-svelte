<script>
	import { fade } from "svelte/transition";
    import { cubicInOut } from 'svelte/easing';
    import { createEventDispatcher } from "svelte";


    export let cs, clipPath, scatterAnnimateClass, scatterPointHoverClass, colourScale, showTT, scatterLayerSelector;
    console.log("In ScatterPlot", scatterLayerSelector);

    const dispatch = createEventDispatcher();

    // https://www.fabiofranchino.com/log/bring-to-front-and-restore-an-svg-element-with-d3/

    let mouseOver = function(event){
        if (this.attributes["data-showtt"].value == "true") {
            dispatch('message', {   event: event,
                                    attributes: this.attributes,
                                    showTT: true});
            // this.parentNode.appendChild(this);
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

<!-- background layer -->
{#each cs.data as d}

    {#if scatterLayerSelector(d) == "layer0"}
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
            data-change-in-CO2={d.change_in_co2}
            data-change-in-gdp={d.change_in_gdp}

            in:fade="{{duration: 1000,
            easing: cubicInOut,
            delay: 1000}}"
            out:fade="{{duration: 1000,
                delay: 2000,
            easing: cubicInOut}}"

            on:mouseover={mouseOver}
            on:mouseleave={mouseLeave}
            on:focus={mouseOver}
            on:mousemove={mouseMove}
        />
    {/if}
{/each}

<!-- emphasis layer -->
{#each cs.data as d}
    {#if scatterLayerSelector(d) == "layer1"}
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
            data-change-in-CO2={d.change_in_co2}
            data-change-in-gdp={d.change_in_gdp}

            in:fade="{{duration: 1000,
            easing: cubicInOut}}"
            out:fade="{{duration: 1000,
            easing: cubicInOut}}"

            on:mouseover={mouseOver}
            on:mouseleave={mouseLeave}
            on:focus={mouseOver}
            on:mousemove={mouseMove}
        />
    {/if}
{/each}

<use href=".layer1" />

<style>
    .scatter-point {
		transition: fill 1s ease, stroke-width 1s ease, stroke 1s ease;
		/* -webkit-mask-image: url(paper_texture.png);
        mask-image: url(paper_texture.png); */
        z-index: 20;
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