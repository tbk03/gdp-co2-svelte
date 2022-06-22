<script>
	// -------------------------------------------------------------------------------------------
	// 0. Setup - imports and variable declarations
	// -------------------------------------------------------------------------------------------
	// import libraries

	import { scaleLinear, scaleSqrt, scaleSymlog } from "d3-scale";
	import { extent } from "d3-array";
	import { format } from "d3-format";
	import { tidy, filter, max, summarize, arrange, desc } from "@tidyjs/tidy";
	import { fade } from "svelte/transition";

	// import components
	import AxisXCont from "./AxisXCont.svelte";
	import AxisYCont from "./AxisYCont.svelte";
	import SizeLegend from "./SizeLegend.svelte";

	// import scripts
	import move from "../scripts/move";
	import expandScale from "../scripts/expandScale.js";

	// variable declarations

	// -------------------------------------------------------------------------------------------
	// 1. Access and parse data
	// -------------------------------------------------------------------------------------------

	import dataset from "../data/gdp_co2_2015.json";
	import Annotation from "./Annotation.svelte";

	// order so smaller circles appear near the front
	let data = tidy(
		dataset,
		arrange([desc("population_historical_estimates")])
	);

	// get the maximum gdp per capital as the default
	// export let maxGDP = tidy(dataset,
	// 						summarize({gdp_per_capita: max('gdp_per_capita')})
	// 						)[0].gdp_per_capita; // get result as single number
	// 											// rather than array of objects

	// data = tidy(dataset, filter((d) => d.gdp_per_capita <= maxGDP));

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
	let accessCountry = (d) => d.entity;

	// -------------------------------------------------------------------------------------------
	// 3. Define chart structure
	// -------------------------------------------------------------------------------------------
	export let w = 600; // bound to offsetWidth
	export let h = 600; // bound to offsetHeight
	let dms = {};

	$: dms = {
		width: w,
		height: h,
		marginTop: 50,
		marginBottom: 100,
		marginLeft: 50,
		marginRight: 20,
	};

	$: dms.boundedWidth = dms.width - dms.marginLeft - dms.marginRight;
	$: dms.boundedHeight = dms.height - dms.marginTop - dms.marginBottom;

	// -------------------------------------------------------------------------------------------
	// 4. Create scales
	// -------------------------------------------------------------------------------------------

	$: extentsX = expandScale(extent(data, accessX), 0, 0.05);
	$: extentsY = expandScale(extent(data, accessY), 0, 0.05);

	$: scaleX = scaleLinear().domain(extentsX).range([0, dms.boundedWidth]);

	$: scaleY = scaleLinear().domain(extentsY).range([dms.boundedHeight, 0]);

	$: scaleSize = scaleSqrt()
		.domain(extent(data, accessSize))
		.range([dms.boundedWidth / 150, dms.boundedWidth / 40]);

	// -------------------------------------------------------------------------------------------
	// 5. Create chart specification object (to pass to other components - axis etc)
	// -------------------------------------------------------------------------------------------

	$: scales = { x: scaleX, y: scaleY, size: scaleSize };

	let accessors = { x: accessX, y: accessY, size: accessSize };

	$: chartSpecification = {
		scales: scales,
		data: data,
		accessors: accessors,
		dms: dms,
	};

	// -------------------------------------------------------------------------------------------
	// 6. Add tooltips
	// -------------------------------------------------------------------------------------------

	export let chartId; // need to identify the appropriate parent div
	let m = { x: 0, y: 0 }; // holds current mouse position
	let tt = { x: 0, y: 0 }; // hold tooltip top left position which is based on mouse
	let tooltipText = "";
	let showTooltip = false;
	let xRatio;
	let yRatio;
	let susCO2 = 2.3;

	// (0, 0) is the top, left corner of the chart-container div in App.svelte
	function getAbsMousePos(event) {
		let chartBounds = document
			.getElementById(chartId)
			.getBoundingClientRect();

		return {
			x: event.clientX - chartBounds.x,
			y: event.clientY - chartBounds.y,
		};
	}

	function createTooltipTextPlot1(attributes) {
		let line1 =
			"<p class='tt-line data-country'>" +
			attributes["data-country"].value +
			"</p>";
		let line2 =
			"<p class='tt-line'> Each year for each of the <b>" +
			format(",")(attributes["data-population"].value) +
			"</b> people: </p>";
		let line3 =
			"<p class='tt-line'><b>$" +
			format(",")(attributes["data-x"].value) +
			"</b> added to GDP</p>";
		let line4 =
			"<p class='tt-line'><b>" +
			format(".3r")(attributes["data-y"].value) +
			"</b> tonnes CO<sub>2</sub> emitted</p>";
		tooltipText = line1 + line2 + line3 + line4;
	}

	function createTooltipTextPlot2(attributes) {
		let currentCO2 = attributes["data-y"].value;
		let fallRequired = format(".3r")(currentCO2 - susCO2);
		let percentFallRequired = format(".2r")(
			(1 - susCO2 / currentCO2) * 100
		);

		let line1 =
			"<p class='tt-line data-country'>" +
			attributes["data-country"].value +
			"</p>";

		let line2 = `<p class='tt-line'>To reach a sustainable level emissions would <b>need to fall by ${fallRequired} tonnes CO<sub>2</sub> per capita</b>.</p>`;
		let line3 = `<p class='tt-line'>That would be <b>a reduction of ${percentFallRequired}%</b>.</p>`;
		tooltipText = line1 + line2 + line3;
	}

	function createTooltipTextPlot3(attributes) {
		let currentCO2 = attributes["data-y"].value;
		let couldRiseBy = format(".2r")(susCO2 - currentCO2);
		let percentRisePos = format(".2r")(
			((susCO2 - currentCO2) / currentCO2) * 100
		);

		let line1 =
			"<p class='tt-line data-country'>" +
			attributes["data-country"].value +
			"</p>";

		let line2 = `<p class='tt-line'>Before reaching a maximum sustainable level emissions could <b>rise by ${couldRiseBy} tonnes CO<sub>2</sub> per capita</b>.</p>`;
		let line3 = `<p class='tt-line'>That would be <b>a rise of ${percentRisePos}%</b>.</p>`;
		tooltipText = line1 + line2 + line3;
	}

	function createTooltipTextPlot4(attributes) {
		let total_ff_prod = format(".4r")(attributes["data-ff-prod"].value);

		let line1 =
			"<p class='tt-line data-country'>" +
			attributes["data-country"].value +
			"</p>";

		let line2 = `<p class='tt-line'>In 2015 produced a total of ${total_ff_prod} TWh of fossil fuels (combined coal, gas and oil).</p>`;
		// let line3 = `<p class='tt-line'>That would be <b>a rise of ${percentRisePos}%</b>.</p>`;
		tooltipText = line1 + line2;
	}

	// to keep tooltips within the bounds of the chart
	function adjustTooltipPos(mousePos) {
		xRatio = mousePos.x / dms.boundedWidth;
		yRatio = mousePos.y / dms.boundedHeight;
		return {
			x: xRatio > 0.7 ? (tt.x = mousePos.x - 250) : (tt.x = mousePos.x),
			y: yRatio > 0.8 ? (tt.y = mousePos.y - 250) : (tt.y = mousePos.y),
		};
	}

	function mouseOver(event) {
		// to allow tooltips to show only on selected points
		if (this.attributes["data-showtt"].value == "true") {
			m = getAbsMousePos(event);
			tt = adjustTooltipPos(m);
			showTooltip = true;
			createTooltipText(this.attributes);
		}
	}

	function mouseLeave(event) {
		showTooltip = false;
	}

	function mouseMove(event) {
		// to allow tooltips to show only on selected points
		if (this.attributes["data-showtt"].value == "true") {
			m = getAbsMousePos(event);
			tt = adjustTooltipPos(m);
			showTooltip = true;
		}
	}

	// -------------------------------------------------------------------------------------------
	// 8. Customising the versions of the charts
	// -------------------------------------------------------------------------------------------
	export let plotNumber = 1;
	let showLegend = false;
	let showSustainable = false;
	let colourScale;
	let basePointColour = "#002DFE";
	let scatterPointHoverClass = "scatter-point-light-bg";
	let showAnnoP2 = false;
	let showAnnoP3 = false;
	let showAnnoP4 = false;
	let createTooltipText;
	let showTT;

	function setupPlot1() {
		// show elements specific to the chart
		showLegend = true;

		// customise tooltips based on the data
		colourScale = (d) => "black";

		// customise tooltips based on the data
		scatterPointHoverClass = (d) => "scatter-point-light-bg";
		createTooltipText = createTooltipTextPlot1;
		showTT = (d) => true;
	}

	function setupPlot2() {
		// show elements specific to the chart
		showSustainable = true; // black background rectangle
		showAnnoP2 = true;

		// conditional colouring of scatter points based on the data
		colourScale = (d) => (d.is_sustainable ? "black" : "white");

		// customise tooltips based on the data
		scatterPointHoverClass = (d) =>
			d.is_sustainable
				? "scatter-point-no-hover"
				: "scatter-point-dark-bg";
		createTooltipText = createTooltipTextPlot2;
		showTT = (d) => (d.is_sustainable ? false : true);
	}

	function setupPlot3() {
		// filter down data to focus on countries with sustainable C02 emissions
		data = tidy(
			dataset,
			filter((d) => d.gdp_per_capita <= 20000)
		);
		data = tidy(
			dataset,
			filter((d) => accessY(d) <= 3.5)
		);

		// show elements specific to the chart
		showSustainable = true; // black background rectangle
		showAnnoP3 = true;

		// conditional colouring of scatter points based on the data
		colourScale = (d) => (d.is_sustainable ? "black" : "white");

		// customise tooltips so that:
		// * only countries with sustainable emission have tooltips;
		// * and, tooltips work with the background colour.
		scatterPointHoverClass = (d) =>
			d.is_sustainable
				? "scatter-point-light-bg"
				: "scatter-point-no-hover";
		createTooltipText = createTooltipTextPlot3;
		showTT = (d) => (d.is_sustainable ? true : false);
	}

	function setupPlot4() {
		// reorder to plot the top 20 producers on top of other countries
		data = tidy(
			data,
			arrange(["top20_producer", desc("population_historical_estimates")])
		);

		// show elements specific to the chart
		showAnnoP4 = true;

		// customise tooltips based on the data
		colourScale = (d) => (d.top20_producer ? "black" : "#bfbfbf");

		// customise tooltips based on the data
		scatterPointHoverClass = (d) =>
			d.top20_producer
				? "scatter-point-light-bg"
				: "scatter-point-no-hover";
		createTooltipText = createTooltipTextPlot4;
		showTT = (d) => (d.top20_producer ? true : false);
	}

	// setup plot based on plot number
	switch (plotNumber) {
		case 1:
			setupPlot1();
			break;
		case 2:
			setupPlot2();
			break;
		case 3:
			setupPlot3();
			break;
		case 4:
			setupPlot4();
			break;
	}
</script>

<!-- <img x="0" y="0" src="./images/paper_texture.png"> -->
<div class="interactive-chart">
	<!-- Background rectangle: Plots 2 and 3 -->
	<!-- +/- 10 is to dodge the axis label -->
	{#if showSustainable}
		<div
			style="width: {dms.boundedWidth}px; 
				left: {dms.marginLeft}px;
				top: {dms.marginTop + 10}px;
				height: {scaleY(2.3) - 10}px;"
			class="sus-rect"
		/>
	{/if}

	<!-- the chart (all svg elements) -->
	<svg width={dms.width} height={dms.height}>
		<!-- axis -->
		<g style={move(dms.marginLeft, dms.height - dms.marginBottom)}>
			<AxisXCont {chartSpecification} />
		</g>
		<g style={move(dms.marginLeft, dms.marginTop)}>
			<AxisYCont {chartSpecification} />
		</g>

		<!-- scatter points -->
		<!-- the blue I have been using "#002DFE" -->
		<g style={move(dms.marginLeft, dms.marginTop)}>
			{#each data as d}
				<circle
					class="scatter-point {scatterPointHoverClass(d)}"
					cx={scaleX(accessX(d))}
					cy={scaleY(accessY(d))}
					r={scaleSize(accessSize(d))}
					opacity="0.7"
					fill={colourScale(d)}
					clip-path="url(#axis-cutoff)"
					on:mouseover={mouseOver}
					on:mouseleave={mouseLeave}
					on:focus={mouseOver}
					on:mousemove={mouseMove}
					data-x={accessX(d)}
					data-y={accessY(d)}
					data-country={accessCountry(d)}
					data-population={accessSize(d)}
					data-showTT={showTT(d)}
					data-ff-prod={d.total_ff_prod}
				/>
			{/each}
		</g>

		<!-- clip circles falling outside the axis -->
		<clipPath id="axis-cutoff">
			<rect width={dms.boundedWidth} height={dms.boundedHeight} />
		</clipPath>
	</svg>

	<!-- the tooltip (html elements) -->
	{#if showTooltip}
		<div class="tooltip" style="top:{tt.y}px; left:{tt.x}px;">
			{@html tooltipText}
		</div>
	{/if}

	<!-- x axis label -->
	<div
		class="axis-label"
		style="top:{dms.height - 70}px; right:{dms.marginRight}px;"
	>
		<p><b>GDP per capita</b></p>
		<p style="font-size: 14px;">2011 USD adjusted for inflation</p>
	</div>

	<!-- y axis label -->
	<div
		class="axis-label"
		style="top:{dms.marginTop - 50}px; left:{dms.marginLeft - 15}px;"
	>
		<p><b>Carbon emissions per capita</b></p>
		<p style="font-size: 14px;">Tonnes of CO<sub>2</sub> per year</p>
	</div>

	<!-- Size Legend: shown in plot 1 -->
	{#if showLegend}
		<SizeLegend
			leftPos={scaleX(1.1e5)}
			topPos={scaleY(25)}
			{scaleSize}
			width={dms.width}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
		/>
	{/if}

	<!-- Annotation: shown in plot 2 -->
	{#if showAnnoP2}
		<Annotation
			leftPos={scaleX(1.1e5)}
			topPos={scaleY(25)}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
			annotationText="Countries with per capita CO<sub>2</sub> emissions above a sustainable level (2.3 tonnes) are shown as white against the dark background."
			theme="light"
		/>

		<Annotation
			leftPos={scaleX(1.1e5)}
			topPos={scaleY(12.5)}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
			annotationText="Hover over the white points for more details."
			theme="light"
		/>
	{/if}

	<!-- Annotation: shown in plot 3 -->
	{#if showAnnoP3}
		<Annotation
			leftPos={scaleX(800)}
			topPos={scaleY(3)}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
			annotationText="Hover over the black points below for more details."
			theme="light"
		/>

		<Annotation
			leftPos={scaleX(1.5e4)}
			topPos={scaleY(1.9)}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
			annotationText="<b>Uruguay</b> has the highest GDP per capita of any country with sustainable carbon emissions (i.e. emissions below 2.3 tonnes CO<sub>2</sub> per capita)."
		/>
	{/if}

	<!-- Annotation: shown in plot 4 -->
	{#if showAnnoP4}
		<Annotation
			leftPos={scaleX(1.1e5)}
			topPos={scaleY(30)}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
			annotationText="The 20 countries with the highest total fossil fuel production (coal, gas and oil combined) in 2015 are shown in black. Hover over the black circles for more details. "
			theme="oil"
		/>

		<Annotation
			leftPos={scaleX(0.9e5)}
			topPos={scaleY(12)}
			marginAdj={move(dms.marginLeft, dms.marginTop)}
			annotationText="<b>Norway</b> is an outlier amongst the major fossil fuel producing countries. It has high GDP per capita and relatively low carbon emissions per capita."
			theme="oil"
		/>
	{/if}
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

	:root {
		--greyText: #333333;
		--greyMaxEmp: #666666;
		--greyHighEmp: #737373;
		--greyMidEmp: #8c8c8c;
		--greyLowEmp: #bfbfbf;
		--greyMinEmp: #e5e5e5;
	}

	.sus-rect {
		z-index: -1;
		background: url("./images/postittexture.jpg"),
			linear-gradient(black, var(--greyMidEmp));
		background-size: cover;
		background-blend-mode: darken;
	}

	.sus-rect,
	.tooltip,
	.interactive-chart,
	.axis-label {
		position: absolute;
	}

	.interactive-chart {
		z-index: 0;
		box-shadow: 4px 4px 8px var(--greyMaxEmp);
		background-color: #fbfbf8;
		background-image: url("./images/background-texture.jpg");
		background-blend-mode: lighten;
	}

	.axis-label {
		max-width: 300px;
		text-align: right;
		line-height: 20%;
		flex-direction: column;
		font-family: "Lato", sans-serif;
		font-size: 20px;
		color: var(--greyText);
		text-anchor: end;
	}

	.tooltip {
		display: flex;
		flex-direction: column;
		max-height: 50vh;
		max-width: 200px;
		border: 1px solid var(--greyLowEmp);
		font-size: 16px;
		color: var(--greyText);
		/* transform: translate(-100%, -200%); */
		padding: 1px;
		z-index: 15;
		font-family: "Lato", sans-serif;
		border-radius: 7.5px;
		text-align: left;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 5px;
		padding-bottom: 20px;
		line-height: 1.25;
		background-image: url("./images/postittexture.jpg");
		background-size: cover;
		background-blend-mode: hard-light;
		background-color: var(--greyLowEmp);
		color: var(--greyText);
		box-shadow: 1px 1px 6px var(--greyHighEmp);
	}

	div :global(.tt-line) {
		margin: 0.5em;
	}

	/* styling html within tooltipString  
	which is created in the script and inserted into the html layer*/
	div :global(.data-country) {
		font-size: 24px;
		font-weight: bold;
	}

	.scatter-point {
		transition: fill 1s ease, stroke-width 1s ease, stroke 1s ease;
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
