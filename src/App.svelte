<script>
  import Standardplot from "./components/Standardplot.svelte";
  import AnnotationDesign from "./components/AnnotationDesign.svelte";
  import TitleBar from "./components/TitleBar.svelte";
  import FooterBar from "./components/FooterBar.svelte";

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

  // handling switching user interaction for switching between charts
  // 'Look for interesting subgroups' section
  let groupsPlotNum = 4;
  let handleFossilFuel = () => (groupsPlotNum = 4);
  let handleDecoupling = () => (groupsPlotNum = 5);

  // 'Do some statistical modelling' section
  let modellingPlotNum = 6;
  let handleDeveloping = () => (modellingPlotNum = 6);
  let handleDeveloped = () => (modellingPlotNum = 7);
</script>

<main>
  <div class="story-container">
    <h1>Creative constraints for data visualisation</h1>

    <!-- <button on:click={handleClickB1}>plot 1</button>
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
    </div> -->

    <div class="section container">
      <br />
      <p>
        One of the biggest of the challenges data visualisation designers face
        is the almost limitless range possible directions in which they could
        take a project. They are making a constant stream of decisions, both
        small and large. Decisions which ultimately come to define the finished
        visualisations.
      </p>
      <p>
        When making data visualisations my head is constantly full of questions
        and decision points. Does this colour look right with the other colours?
        Have I picked the wrong chart type, maybe another would be better? Are
        these lines to wide or the points too big? And, so on …
      </p>
      <p>
        Recently, I was thinking about how I face similar challenges when
        writing and producing music. The challenge of the unbounded space of
        possibilities and questions. One of the strategies I have used to help
        with in a musical context is setting myself arbitrary creative
        constraints. For example, can I make a track using only one synthesiser.
      </p>
      <p>
        I started using these constraints having been inspired by a <a
          href="https://makingmusic.ableton.com/arbitrary-constraints"
          >chapter written by Dennis DeSantis</a
        > in ’74 Creative Strategies of Electronic Music Producers’. A from Igor
        Stravinsky used in the chapter really stuck with me. I reproduce the quote
        here because I think beautifully encapsulates the essence of an idea that
        is very applicable to data visualisation design practice.
      </p>
      <p class="indented-section">
        <i
          >“My freedom thus consists in my moving about within the narrow frame
          that I have assigned to myself for each one of my undertakings. I
          shall go even further: my freedom will be so much the greater and more
          meaningful the more narrowly I limit my field of action and the more I
          surround myself with obstacles. Whatever diminishes constraint
          diminishes strength. The more constraints one imposes, the more one
          frees oneself of the claims that shackle the spirit”.</i
        > <br /><br /><b>Igor Stravinsky, Poetics of Music</b>
      </p>
      <br />
    </div>

    <div class="section container">
      <h2>
        What could creative constraints look like in data visualisation
        practice?
      </h2>
      <p>
        Coming back to data visualisation, after that short musical detour. In
        this article, explore what creative constraints for data visualisation
        look like in practice. I do this by working through an example of how I
        used constraints to shape my own work. Hopefully, this will give you a
        sense of what you might gain from working with creative constraints from
        time to time.
      </p>
      <p>So, here are the arbitrary creative constraints I set myself:</p>
      <ol>
        <li>
          Pick a simple chart relatively well-known chart that you know well.
        </li>
        <li>
          Create alternative versions of the chart which presents an alternative
          perspective on the data that you haven’t seen before.
        </li>
        <li>
          Don’t use any colour in the alternative versions of the chart, just
          work in greyscale.
        </li>
      </ol>
      <br />
    </div>
    <h2>What you need to know about the chart I chose to work with?</h2>

    <!-- PLOT 1 -->
    <div class="section container">
      <TitleBar>
        <div slot="title">
          To the surprise of pretty much no one, higher income countries tend to
          have higher carbon emissions.
        </div>
      </TitleBar>

      <div
        class="chart-container"
        id="p1"
        bind:offsetWidth={w}
        bind:offsetHeight={h}
      >
        <Standardplot {w} {h} chartId={"p1"} plotNumber={1} />
      </div>

      <FooterBar>
        <div slot="footer">
          <b>Source:</b>
          <a href="https://ourworldindata.org/grapher/co2-emissions-vs-gdp"
            >Our World in Data</a
          >
        </div>
      </FooterBar>

      <p>
        The chart I chose (shown above) is part of wide ranging and hotly
        contested debates around the following question: is unbounded economic
        growth compatibility with ongoing climate stability? If there is a
        strong, positive relationship between the size of a country’s economy
        and the amount of CO2 emitted, then there is a big problem. A world full
        of perpetually growing economies could lead to perpetually grow carbon
        emission and climate impacts.
      </p>
      <p>
        Each point in the scatterplot is a country and the size of the point is
        defined by the population of the country. On the x axis we see the GDP
        per capita. This is often used as a fairly crude proxy measure for the
        quality of life, based on the at least partial flawed assumption that
        people with higher income are having a better life. Meanwhile on the y
        axis we see CO2 emissions per capita. This is of interest in it’s own
        right, but it can also be used as a proxy for the overall environmental
        damage caused by the average person in a given country.
      </p>
      <p>
        The classic argument made by economists is focuses on the differences by
        countries in the early phases of economic development (up to somewhere
        between $10,000 and $25,000 gdp per capita depending on the perspective
        taken) and ‘fully’ economically developed countries. The argument goes
        something like this.
      </p>
      <ul>
        <li>
          During the early phases of economic development, there is a strong,
          positive relationship between quality of life (remember gdp per capita
          is used as a proxy) and carbon emissions.
        </li>
        <li>
          However, after an economy had ‘fully’ developed the impact of each
          unit of a countries economic activity should then fall. In other
          words, after a certain point in the economic development of a country,
          it should become greener and cleaner as it rebalances away from heavy
          industry toward service industries.
        </li>
      </ul>
      <br />
    </div>

    <div class="section container">
      <h2>A data perspective: what the constraints encouraged me to do?</h2>
      <p>
        I’ll come to how the constraints encouraged me to be more creative in
        the design and aesthetics of my versions of the chart later on. First, I
        wanted to talk about how the constraints encouraged me to more creative
        when working with the data itself. Working within the constraints
        ‘forced my hand’ a little. To think in more detail about the stories
        that could be told with the data. To explore in more depth potential
        connections that occurred to me.
      </p>
    </div>

    <div class="section container">
      <h3>Adding more context to the chart</h3>
      <p>
        The graph is often presented, as at the start of this article, with a
        crucial piece of context missing. What level of emissions of CO2 per
        capita is compatible will keeping climate change impacts (in some sense)
        in check. Without this context the graph provides no sense of the scale
        of the decarbonisation challenge that we face.
      </p>
      <p>
        So, my first alternative version of the graph, brings in this key
        context. One of the most thought-provoking recent estimates, is that per
        capita carbon emissions need to fall to 2.3 tonnes per year by 2030.
        This would be to keep global heating to 1.5 C above pre-industrial
        levels. This estimate comes from research commissioned by Oxfam. It was
        conducted by two leading research institutes: (1) the Stockholm
        Environment Institute and, (2) the Institute for European Environmental
        Policy.
      </p>
      <p>
        Hovering over the points in the graph below, you can a real sense of
        where richer countries are at in the process of decarbonisation. For
        example, per capita emission in say Australia and the United States
        would need to fall by 86% in around only 8 years to reach sustainable
        levels.
      </p>
      <br />

      <TitleBar>
        <div slot="title">
          Adding critical context transforms the message conveyed by the chart
        </div>
        <div slot="subtitle">
          The scale of the carbon emission reduction challenge faced by many
          countries is laid bare
        </div>
      </TitleBar>
      <div class="chart-container" id="p2">
        <Standardplot {w} {h} chartId={"p2"} plotNumber={2} />
      </div>
      <FooterBar>
        <div slot="footer">
          <b>Additional data:</b>
          <a
            href="https://oxfamilibrary.openrepository.com/bitstream/handle/10546/621305/bn-carbon-inequality-2030-051121-en.pdf;jsessionid=1BE3FACE9EADBE7145E74FEE0A93C371?sequence=1"
            >Oxfam, the Stockholm Environment Institute, and the Institute for
            European Environmental Policy.</a
          >
        </div>
      </FooterBar>
    </div>

    <div class="section container">

      <h3>View the data at a different scale</h3>

      <div class="chart-container" id="p3">
        <Standardplot {w} {h} chartId={"p3"} plotNumber={3} />
      </div>
    </div>

    <div class="section container">
      <h3>Look for interesting subgroups</h3>

      <button on:click={handleFossilFuel}>Top 20 Fossil Fuel Producers</button>
      <button on:click={handleDecoupling}>Growth decoupling from emissions</button>


      <div class="chart-container" id="p4">
        <Standardplot {w} {h} chartId={"p4"} plotNumber={groupsPlotNum} />
      </div>
      <br/>
    </div>

    <h3>Do some statistical modelling</h3>
    <button on:click={handleDeveloping}>Developing economies</button>
    <button on:click={handleDeveloped}>Developed economies</button>
    <div class="chart-container" id="p6">
      <Standardplot {w} {h} chartId={"p6"} plotNumber={modellingPlotNum} />
    </div>
    <h2>A design perspective: what the constraints encouraged me to do?</h2>
    <h3>Think differently about greys</h3>
    <div class="image-container">
      <img
        src="./images/plot-svg.jpg"
        alt="gridlines showing different greys"
        width={(3 * w) / 4}
      />
      <img
        src="./images/plot-svg-simp-grid.jpg"
        alt="gridlines showing different greys"
        width={(3 * w) / 4}
      />
    </div>
    <h3>Thinking differently about texture</h3>
    <div class="annotation-display">
      <AnnotationDesign
        leftPos={0}
        topPos={0}
        marginAdj={""}
        annotationText="<b>Oil background</b>"
        theme="oil"
      />
      <AnnotationDesign
        leftPos={0}
        topPos={0}
        marginAdj={""}
        annotationText="<b>Light paper background</b>"
        theme="light"
      />
      <AnnotationDesign
        leftPos={0}
        topPos={0}
        marginAdj={""}
        annotationText="<b>Dark paper background</b>"
        theme="dark"
      />
    </div>
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
    max-height: 700px;
    min-width: 600px;

    /* min-width: 600px; */
    max-width: 900px;
  }

  .story-container {
    max-width: 900px;
    margin: auto;
  }

  .annotation-display {
    display: flex;
    justify-content: space-between;
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

  h1,
  h2,
  h3 {
    font-family: "Poppins", sans-serif;
  }

  h2 {
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

  p {
    font-size: 1.2rem;
    margin: 1rem auto;
    line-height: 1.35;
    text-align: left;
  }

  li {
    font-size: 1.2rem;
    margin: 1rem auto;
    line-height: 1.2;
    text-align: left;
  }

  .indented-section {
    margin-left: 4rem;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    /* p {
      max-width: none;
    } */
  }
</style>
