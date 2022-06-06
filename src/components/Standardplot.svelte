<script>

    // -------------------------------------------------------------------------------------------    
    // 0. Setup - imports and variable declarations
    // ------------------------------------------------------------------------------------------- 
    // import libraries
    import { onMount } from 'svelte';

    import { csv } from "d3-fetch";
    import { 	scaleLinear,
				scaleSqrt   } from "d3-scale";
    import {    extent      } from "d3-array";

    // import components
    
    // import scripts
	import move from "../scripts/move";
	import expandScale from "../scripts/expandScale.js";

    // variable declarations

    // -------------------------------------------------------------------------------------------    
    // 1. Access and parse data
    // ------------------------------------------------------------------------------------------- 

    import data from "../data/gdp_co2_2015.json"

    // alternative approach using csv in public folder but required ansyncronous processing
    // the import is more straight forward
    // onMount(async () => {
	// 	// await csv("./data/gdp_co2_2015.csv")
    //     //     .then((d) => data = d);

    //     const res = await fetch("./data/gdp_co2_2015.json");
    //     data = await res.json(); 
    //     console.log(data);
    // })

    
    // -------------------------------------------------------------------------------------------
	// 2. Create accessor functions
    // -------------------------------------------------------------------------------------------

    let accessX = (d) => d.gdp_per_capita;
    let accessY = (d) => d.annual_co2_emissions_per_capita;
    let accessSize = (d) => d.population_historical_estimates;

    // -------------------------------------------------------------------------------------------
	// 3. Define chart structure
	// -------------------------------------------------------------------------------------------
	export let w = 600;			// bound to offsetWidth
	export let h = 600;          // bound to offsetHeight
	let dms = {}; 

	$: dms = {
		width: w,
		height: h,
		marginTop: 20,
		marginBottom: 50,
		marginLeft: 50,
		marginRight: 20
	};

	$: dms.boundedWidth = dms.width - dms.marginLeft - dms.marginRight;
	$: dms.boundedHeight = dms.height - dms.marginTop - dms.marginBottom;

    // -------------------------------------------------------------------------------------------
	// 4. Create scales
	// -------------------------------------------------------------------------------------------

	$: scaleX = scaleLinear()
				.domain(expandScale(extent(data, accessX), 0.1, 0.05))
				.range([0, dms.boundedWidth]);

	$: scaleY = scaleLinear()
				.domain(expandScale(extent(data, accessY), 0.1, 0.05))
				.range([dms.boundedHeight, 0]);
	
	$: scaleSize = scaleSqrt()
					.domain(extent(data, accessSize))
					.range([dms.boundedWidth / 200, dms.boundedWidth / 50]);

	// -------------------------------------------------------------------------------------------
	// 5. Create chart specification object (to pass to other components - axis etc)
	// -------------------------------------------------------------------------------------------

	$: scales = {	x: scaleX, 
					y: scaleY, 
					size: scaleSize	};
	
	let accessors = {	x: accessX, 
						y: accessY, 
						size: accessSize 	};

	$: chartSpecification = {	scales: scales, 
								data: data, 
								accessors: accessors,
								dms: dms	};					

</script>

<svg width="{dms.width}" height="{dms.height}">
	<g style = "{move(dms.marginLeft, dms.marginTop)}">
		{#each data as d}
			<circle
				cx = {scaleX(accessX(d))}
				cy = {scaleY(accessY(d))}
				r = {scaleSize(accessSize(d))}/>
		{/each}
	</g>
</svg>