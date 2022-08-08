<script>
  /**
   * Creates the article on Creative Constraints in 'Data Visualisation'
   */

  // ---------------------------------------------------------------------
  // import components
  // ---------------------------------------------------------------------

  // plot components
  import Standardplot from "./components/Standardplot.svelte";
  import TitleBar from "./components/TitleBar.svelte";
  import FooterBar from "./components/FooterBar.svelte";

  // other components
  import AnnotationDesign from "./components/AnnotationDesign.svelte";

  // ---------------------------------------------------------------------
  // update width of charts and other components based on browser width
  // ---------------------------------------------------------------------
  $: w = 0; // max-width set in css
  $: h = 0; // max-height set in css

  // ---------------------------------------------------------------------
  // handling switching user interaction for switching between charts
  // ---------------------------------------------------------------------

  // 'Look for interesting subgroups' section
  let groupsPlotNum = 4;
  let handleFossilFuel = () => (groupsPlotNum = 4);
  let handleDecoupling = () => (groupsPlotNum = 5);

  // 'Do some statistical modelling' section
  let modellingPlotNum = 6;
  let handleDeveloping = () => (modellingPlotNum = 6);
  let handleDeveloped = () => (modellingPlotNum = 7);

  // ---------------------------------------------------------------------
  // in case I want to go back to clicker / scrolly telling ---------------
  // ---------------------------------------------------------------------
  // $: chartsDMS = {
  //   one: {width: 0, height: 0},
  //   two: {width: 0, height: 0},
  //   three: {width: 0, height: 0},
  //   four: {width: 0, height: 0}
  // };

  // let plotNum = 1;
  // let handleClickB1 = () => (plotNum = 1);
  // let handleClickB2 = () => (plotNum = 2);
  // let handleClickB3 = () => (plotNum = 3);
  // let handleClickB4 = () => (plotNum = 4);
  // let handleClickB5 = () => (plotNum = 5);
  // let handleClickB6 = () => (plotNum = 6);
  // let handleClickB7 = () => (plotNum = 7);
</script>

<main>
  <div class="story-container">
    <div class="image-container">
      <img
        src="/images/creative_constraints.jpg"
        alt="gridlines showing different greys"
        width={w}
      />
      <h1 class="title-on-image">
        Creative constraints for data visualisation
      </h1>
    </div>

    <h3>By Chris Martin</h3>

    <!-- -------------------------------------------------------------------- -->
    <!-- Introduction -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
      <br />
      <p>
        One of the biggest challenges data visualisation designers face is the
        unbounded space of the possible. There are just so many possible ways
        any given dataset could be visualised.
      </p>
      <p>
        When making data visualisations my head is constantly full of questions.
        Am I framing this in the ‘right’ way? Does this colour look right with
        the others? Have I picked the wrong chart type, maybe another would be
        better? Are these lines too wide or the points too big? And, so on …
      </p>
      <p>
        Recently, I was thinking about how I face similar challenges when
        writing and producing music. The challenge of an unbounded space of
        possibilities. One of the strategies I have used to help me in a musical
        context is setting myself arbitrary creative constraints. For example, I
        might limit myself to using only one synthesiser on a track.
      </p>
      <p>
        I started using constraints like this having been inspired by a <a
          href="https://makingmusic.ableton.com/arbitrary-constraints"
          >chapter written by Dennis DeSantis</a
        > in ’74 Creative Strategies for Electronic Music Producers’. A quote from
        Igor Stravinsky in the chapter really stuck with me. It beautifully encapsulates
        the essence of an idea that I think is very much transferable to data visualisation
        design.
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

    <!-- -------------------------------------------------------------------- -->
    <!-- My experiment -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
      <h2>
        Experimenting with creative constraints in my own data visualisation
        practice
      </h2>
      <br />
      <p>
        I started to wonder what using creative constraints in data
        visualisation would look like in practice. So, I decided to create
        myself a little experiment based on a couple of creative constraints:
      </p>
      <ul>
        <li>
          Pick a simple chart that you know well and remake it in ways you
          haven’t seen before.
        </li>
        <li>Don’t use any colour, just work in greyscale.</li>
      </ul>
      <p>
        In the rest of this visual essay I will try to give you a sense of how
        my experiment went and what I learnt from it. I hope this will encourage
        you to consider using creative constraints in your own practice from
        time to time.
      </p>
      <p>Here is the chart I chose to remake.</p>
      <br />
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
      <br />
      <p>
        As you read on, it will probably be helpful to remember three things
        about the chart.
      </p>
      <ul>
        <li>
          Each point in the scatterplot is a country and the size of the point
          is defined by the population of the country.
        </li>
        <li>
          On the x axis we see GDP per capita. This is used as an indicator of
          the quality of life of a ‘typical’ person in a given country. Based on
          the, at least partially, flawed assumption that the higher someone’s
          income the better their quality of life.
        </li>
        <li>
          On the y axis we see CO2 emissions per capita. This is of interest in
          its own right. It can also be used as an indicator of the overall
          environmental damage caused by the ‘typical’ person in a given
          country.
        </li>
      </ul>

      <br />
    </div>

    <!-- -------------------------------------------------------------------- -->
    <!-- AESTHETICS  -->
    <!-- -------------------------------------------------------------------- -->

    <div class="section-container">
      <h2>Looking beyond the data when thinking about aesthetics</h2>
      <br />
      <p>
        I found that working without colour made it more challenging to create
        contrasts between the data and non-data elements of a chart. The
        non-data elements being things like the axis, the axis labels and ticks,
        and reference grid lines.
      </p>
      <p>
        Normally, and without thinking about it, I would create these contrasts
        by using colour for data elements and greys for non-data elements.
        Working within my greyscale constraint meant I had to think harder than
        normal about how to de-emphasise the non-data elements in my chart. I
        wanted the non-data elements to sit comfortably in the background, while
        the data elements remained in the foreground as the focus of the
        reader’s attention.
      </p>
      <p>
        I started thinking through in detail how much visual emphasis I wanted
        to give to each element of the chart. In the end, I thought of each
        element as having a visual emphasis rating between one and five (five
        being the most visual emphasis).
      </p>

      <table>
        <thead>
          <tr>
            <th>Visual Emphasis</th>
            <th>Chart components</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>5. Maximum</td>
            <td>Data points</td>
          </tr>
          <tr>
            <td>4. High</td>
            <td>Annotations</td>
          </tr>
          <tr>
            <td>3. Medium</td>
            <td>Axis lines and labels</td>
          </tr>
          <tr>
            <td>2. Low</td>
            <td>Major gridlines and axis ticks</td>
          </tr>
          <tr>
            <td>1. Minimum</td>
            <td>Minor gridlines and axis ticks</td>
          </tr>
        </tbody>
      </table>
      <br />
      <p>
        As you can see in the table above, rather than giving all non data
        elements the same emphasis, I gave some a minimal or low emphasis. In
        practice, this meant that I used darker and lighter shades of grey,
        stroke width, and stroke length to create subtle contrasts between
        different non-data elements of the chart. Here is the result.
      </p>

      <div class="image-container">
        <img
          src="./images/plot-background-emphasis.jpg"
          alt="gridlines showing different greys"
          width={w}
        />
      </div>

      <p>
        While it was time consuming to think through the aesthetics of the
        non-data elements in this level of detail, it did come with a
        longer-term pay off. I now have a consistent and reusable non-data
        background layer, which hopefully will give my charts a more distinct
        visual identity.
      </p>
      <br/>
    </div>

    <!-- -------------------------------------------------------------------- -->
    <!-- TEXTURES  -->
    <!-- -------------------------------------------------------------------- -->

    <div class="section-container">
      <h2>Using textures which connect to the topic of the chart</h2>
      <p>...</p>

      <br />

      <div class="chart-container" id="p2">
        <Standardplot {w} {h} chartId={"p2"} plotNumber={4} />
      </div>

      <FooterBar>
        <div slot="footer">
          <b>Additional data:</b> Fossil fuel producers -
          <a
            href="https://ourworldindata.org/fossil-fuels#coal-production-how-much-do-countries-produce"
            >Our World in Data</a
          >; Decoupling economies -
          <a
            href="https://www.wri.org/insights/roads-decoupling-21-countries-are-reducing-carbon-emissions-while-growing-gdp"
            >World Resources Institute</a
          >.
        </div>
      </FooterBar>
    </div>

    <!-- -------------------------------------------------------------------- -->
    <!-- A data perspective: view a differnt scale -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
      <h2>Thinking deeply about embedding context into a chart</h2>
      <p>...</p>

      <br />

      <div class="chart-container" id="p3">
        <Standardplot {w} {h} chartId={"p3"} plotNumber={2} />
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

      <div class="chart-container" id="p4">
        <Standardplot {w} {h} chartId={"p4"} plotNumber={3} />
      </div>

      <br />
    </div>

    <!-- -------------------------------------------------------------------- -->
    <!-- A data perspective: statisitcal modelling -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
      <h2>Feeling free to use statistical techniques to enhance a chart</h2>

      <p>...</p>

      <br />

      <button on:click={handleDeveloping} class="chart-button"
        >Developing economies</button
      >
      <button on:click={handleDeveloped} class="chart-button"
        >Developed economies</button
      >

      <div class="chart-container" id="p6">
        <Standardplot {w} {h} chartId={"p6"} plotNumber={modellingPlotNum} />
      </div>
      <br />
    </div>

    <!-- -------------------------------------------------------------------- -->
    <!-- Conclusion / the end -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
      <h2>
        Using creative constraints in your own data visualisation practice
      </h2>
      <p>...</p>

      <table>
        <thead>
          <tr>
            <th>Aspect of data visualisation practice</th>
            <th>Ideas for creative constraints</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>5. Maximum</td>
            <td>Data points</td>
          </tr>
        </tbody>
      </table>

      <p>
        Do <a href="mailto:chrisjmartin03@gmail.com">get in touch</a> if reading
        about my experience of using creative constraints sparked off any ideas for
        you. It would be great to hear from you.
      </p>
    </div>
  </div>

  <!-- -------------------------------------------------------------------- -->
  <!-- KEEP FOR POTENTIAL USE LATER -->
  <!-- -------------------------------------------------------------------- -->
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
  /* --------------------------------------------------------------------------
  Setup 
  -------------------------------------------------------------------------- */
  @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  /* --------------------------------------------------------------------------
  Style containers 
  -------------------------------------------------------------------------- */

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  .chart-container {
    /* to center */
    margin: auto;
    display: flex;
    height: 65vh;
    max-height: 700px;
    min-width: 600px;
    max-width: 900px;
  }

  .story-container {
    max-width: 900px;
    margin: auto;
  }

  .indented-section {
    margin-left: 4rem;
  }

  .annotation-display {
    display: flex;
    justify-content: space-between;
  }

  .image-container {
    margin: 3%;
    position: relative;
    margin: auto;
    text-align: center;
  }

  /* --------------------------------------------------------------------------
  Style text 
  -------------------------------------------------------------------------- */
  h1,
  h2,
  h3,
  p,
  li {
    font-family: "Poppins", sans-serif;
    color: #404040;
  }

  h2 {
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: solid 1px #737373;
  }

  h1 {
    color: white;
    text-transform: uppercase;
    font-size: 3rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
    font-weight: bold;
  }

  h2 {
    font-size: 1.8rem;
    text-align: left;
    line-height: 1.3;
  }

  h3 {
    font-size: 1.4rem;
    text-align: left;
  }

  p {
    font-size: 1.1rem;
    margin: 1rem auto;
    line-height: 1.35;
    text-align: left;
  }

  li {
    font-size: 1.1rem;
    margin: 1rem auto;
    line-height: 1.2;
    text-align: left;
  }

  .title-on-image {
    position: absolute;
    margin: auto;
    top: 50px;
    left: 0px;
    /* background-color: black;
    padding-top: 30px;
    padding-bottom: 30px; */
  }

  /* --------------------------------------------------------------------------
  Style tables
  -------------------------------------------------------------------------- */
  thead,
  tbody {
    font-family: "Lato", sans-serif;
    text-align: left;
    color: #404040;
  }

  thead {
    font-size: 1.2rem;
    font-weight: bold;
    border-bottom: solid 2px #737373;
  }

  th {
    border-bottom: solid 1px #737373;
  }

  tbody {
    font-size: 1.1rem;
  }
  th,
  td {
    padding: 15px;
    width: 20%;
  }

  /* --------------------------------------------------------------------------
  Style user interaction components 
  -------------------------------------------------------------------------- */
  .chart-button {
    margin-bottom: 1.5rem;
  }

  /* --------------------------------------------------------------------------
  From default template
  -------------------------------------------------------------------------- */
  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }
</style>
