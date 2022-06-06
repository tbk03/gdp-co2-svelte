<script>
  import Standardplot from "./components/Standardplot.svelte";

  $: chartsDMS = {
    one: {width: 0, height: 0}
  };
</script>

<main>

  <h1>Hello world!</h1>

  <div  class='chart-container' id='chart1'
        bind:offsetWidth={chartsDMS.one.width}
        bind:offsetHeight={chartsDMS.one.height}>

    <Standardplot w={chartsDMS.one.width} h={chartsDMS.one.height}/>
  </div>

  <h1>Hello world again!</h1>
</main>

<style>

  #chart1 {
    /* to center */
		margin: auto; 
		display: flex;
		height: 75vh;
		max-height: 800px;

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
