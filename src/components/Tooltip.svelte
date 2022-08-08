<script>
	// -------------------------------------------------------------------------------------------
	// 0. Setup - imports and variable declarations
	// -------------------------------------------------------------------------------------------
	// import libraries
	import { format } from "d3-format";

	// variable declarations
	export let event, currentPlotNumber, dms, scatterAttributes;
	export let chartId; // needed to identify the appropriate parent div

	let m = { x: 0, y: 0 }; // holds current mouse position
	let tt = { x: 0, y: 0 }; // hold tooltip top left position which is based on mouse
	let tooltipText = "";
	let xRatio, yRatio;
	let susCO2 = 2.3;

	// -------------------------------------------------------------------------------------------
	// 1. Functions calculating tooltip positions
	// -------------------------------------------------------------------------------------------

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

	// to keep tooltips within the bounds of the chart
	function adjustTooltipPos(mousePos) {
		xRatio = mousePos.x / dms.boundedWidth;
		yRatio = mousePos.y / dms.boundedHeight;
		return {
			x: xRatio > 0.7 ? (tt.x = mousePos.x - 250) : (tt.x = mousePos.x),
			y: yRatio > 0.8 ? (tt.y = mousePos.y - 250) : (tt.y = mousePos.y),
		};
	}

	// -------------------------------------------------------------------------------------------
	// 2. Functions for creating tooltip text
	// -------------------------------------------------------------------------------------------

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

	function createTooltipTextPlot5(attributes) {
		let change_in_co2 = Math.abs(attributes["data-change-in-co2"].value);
		let change_in_gdp = attributes["data-change-in-gdp"].value;

		let line1 =
			"<p class='tt-line data-country'>" +
			attributes["data-country"].value +
			"</p>";

		let line2 = `<p class='tt-line'>Between 2000 and 2014 GDP rose by <b>${change_in_gdp}%</b> and CO<sub>2</sub> emissions fell by <b>${change_in_co2}%</b>.</p>`;
		tooltipText = line1 + line2;
	}

	function createTooltipTextPlot6(attributes) {
		let line1 =
			"<p class='tt-line data-country'>" +
			attributes["data-country"].value +
			"</p>";
		tooltipText = line1;
	}
	// -------------------------------------------------------------------------------------------
	// 3. Update tooltip based on plot number and mouse position
	// -------------------------------------------------------------------------------------------

	let tooltipGen = [
		createTooltipTextPlot1,
		createTooltipTextPlot2,
		createTooltipTextPlot3,
		createTooltipTextPlot4,
		createTooltipTextPlot5,
		null,
		createTooltipTextPlot6,
	];

	$: {
		m = getAbsMousePos(event);
		tt = adjustTooltipPos(m);
		tooltipGen[currentPlotNumber - 1](scatterAttributes);
	}
</script>

<div class="tooltip" style="top:{tt.y}px; left:{tt.x}px;">
	{@html tooltipText}
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

	.tooltip {
		position: absolute;
		display: flex;
		flex-direction: column;
		max-height: 50vh;
		max-width: 250px;
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
		background-image: url("/images/postittexture.jpg");
		background-size: cover;
		background-blend-mode: hard-light;
		background-color: var(--greyLowEmp);
		color: var(--greyText);
		box-shadow: 1px 1px 6px var(--greyHighEmp);
	}
</style>
