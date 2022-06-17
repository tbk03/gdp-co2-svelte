<script>
  import Standardplot from "./components/Standardplot.svelte";

  $: chartsDMS = {
    one: {width: 0, height: 0},
    two: {width: 0, height: 0}
  };
</script>

<main>

  <h1>Hello world!</h1>

  <div  class='chart-container' id='chart1'
        bind:offsetWidth={chartsDMS.one.width}
        bind:offsetHeight={chartsDMS.one.height}>

    <Standardplot w={chartsDMS.one.width} 
                  h={chartsDMS.one.height}
                  chartId={'chart1'}
                  plotNumber={1}/>
  </div>

  <h1>Hello world again!</h1>

  <div  class='chart-container' id='chart2'
        bind:offsetWidth={chartsDMS.two.width}
        bind:offsetHeight={chartsDMS.two.height}>
  <Standardplot w={chartsDMS.two.width} h={chartsDMS.two.height}
    maxGDP={10000}
    chartId={'chart2'}
    plotNumber={2}/>
  </div>
</main>

<style>

  #chart1, #chart2{
    /* to center */
		margin: auto; 
		display: flex;
		height: 65vh;
		max-height: 800px;
    min-width:600px;

		/* min-width: 600px; */
		max-width: 900px;
  }

  /* default from template below */

  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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

  h1 {
    color: #ff3e00;
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
