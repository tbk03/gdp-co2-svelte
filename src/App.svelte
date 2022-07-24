<script>
  import Standardplot from "./components/Standardplot.svelte";
  import Annotation from "./components/Annotation.svelte";

  // $: chartsDMS = {
  //   one: {width: 0, height: 0},
  //   two: {width: 0, height: 0},
  //   three: {width: 0, height: 0},
  //   four: {width: 0, height: 0}
  // };

  $: w = 0;
  $: h = 0;

  let plotNum = 1;
  let handleClickB1 = () => (plotNum = 1);
  let handleClickB2 = () => (plotNum = 2);
  let handleClickB3 = () => (plotNum = 3);
  let handleClickB4 = () => (plotNum = 4);
  let handleClickB5 = () => (plotNum = 5);
  let handleClickB6 = () => (plotNum = 6);
  let handleClickB7 = () => (plotNum = 7);
</script>

<main>
  <div class="story-container">
  <h1>Creative constraints for data visualisation</h1>

  <button on:click={handleClickB1}>plot 1</button>
  <button on:click={handleClickB2}>plot 2</button>
  <button on:click={handleClickB3}>plot 3</button>
  <button on:click={handleClickB4}>plot 4</button>
  <button on:click={handleClickB5}>plot 5</button>
  <button on:click={handleClickB6}>plot 6</button>
  <button on:click={handleClickB7}>plot 7</button>
  <div
    class="chart-container"
    id="1"
    bind:offsetWidth={w}
    bind:offsetHeight={h}
  >
    <Standardplot {w} {h} chartId={"1"} plotNumber={plotNum} />
  </div>

  <h2>Why creative constraints in data visualisation practice?</h2>
  <h2>
    What could creative constraints look like in data visualisation practice?
  </h2>
  <h2>What you need to know about the chart I chose to work with?</h2>

  <div class="chart-container" id="p1">
    <Standardplot {w} {h} chartId={"p1"} plotNumber={1} />
  </div>
  <h2>A data perspective: what the constraints encouraged me to do?</h2>
  <h3>Add context</h3>
  <div class="chart-container" id="p2">
    <Standardplot {w} {h} chartId={"p2"} plotNumber={2} />
  </div>
  <h3>View the data at a different scale</h3>
  <div class="chart-container" id="p3">
    <Standardplot {w} {h} chartId={"p3"} plotNumber={3} />
  </div>
  <h3>Look for interesting subgroups</h3>
  <button>Top 20 Fossil Fuel Producers</button>
  <button>Growth decoupling from emissions</button>
  <div class="chart-container" id="p4">
    <Standardplot {w} {h} chartId={"p4"} plotNumber={4} />
  </div>
  <h3>Do some statistical modelling</h3>
  <button>Developing economies</button>
  <button>Developed economies</button>
  <div class="chart-container" id="p6">
    <Standardplot {w} {h} chartId={"p6"} plotNumber={6} />
  </div>
  <h2>A design perspective: what the constraints encouraged me to do?</h2>
  <h3>Think differently about greys</h3>
  <h3>Thinking differently about texture</h3>
  <Annotation
			leftPos={0}
			topPos={0}
			marginAdj={""}
			annotationText="The 20 countries with the highest total fossil fuel production (coal, gas and oil combined) in 2015 are shown in black. Hover over the black circles for more details. "
			theme="oil"
		/>
  <h2>If you want to try out using constraints in your own practice?</h2>
</div>

  <!-- <div  class='chart-container' id='chart2'
        bind:offsetWidth={chartsDMS.two.width}
        bind:offsetHeight={chartsDMS.two.height}>
  <Standardplot w={chartsDMS.two.width} h={chartsDMS.two.height}
    maxGDP={10000}
    chartId={'chart2'}
    plotNumber={2}/>
  </div>

  <h1>Hello world again!</h1>

  <div  class='chart-container' id='chart3'
        bind:offsetWidth={chartsDMS.three.width}
        bind:offsetHeight={chartsDMS.three.height}>
  <Standardplot w={chartsDMS.three.width} h={chartsDMS.three.height}
    chartId={'chart3'}
    plotNumber={3}/>
  </div>

  <h1>Hello world again!</h1>

  <div  class='chart-container' id='chart4'
        bind:offsetWidth={chartsDMS.four.width}
        bind:offsetHeight={chartsDMS.four.height}>
  <Standardplot w={chartsDMS.four.width} h={chartsDMS.four.height}
    chartId={'chart4'}
    plotNumber={4}/>
  </div> -->
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

  .chart-container {
    /* to center */
    margin: auto;
    display: flex;
    height: 65vh;
    max-height: 800px;
    min-width: 600px;

    /* min-width: 600px; */
    max-width: 900px;
  }

  .story-container {
    max-width: 900px;
    margin: auto;
  }

  /* default from template below */

  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  /* img {
    height: 16rem;
    width: 16rem;
  } */

  h1, h2, h3 {
    font-family: "Poppins", sans-serif;
  }

  h2{
    font-size: 2rem;
    text-align: left;
  }

  h3 {
    font-size: 1.5rem;
    text-align: left;
  }

  h1 {
    color: black;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  /* p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  } */

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    /* p {
      max-width: none;
    } */
  }
</style>
