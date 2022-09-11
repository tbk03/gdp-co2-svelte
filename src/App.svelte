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
  let buttonSelectedDeveloping = "chart-button-selected";
  let buttonSelectedDeveloped = "chart-button-not-selected";
  let handleDeveloping = () => {
    modellingPlotNum = 6;
    buttonSelectedDeveloping = "chart-button-selected";
    buttonSelectedDeveloped = "chart-button-not-selected";
  };
  let handleDeveloped = () => {(modellingPlotNum = 7);
    buttonSelectedDeveloping = "chart-button-not-selected";
    buttonSelectedDeveloped = "chart-button-selected";
  }

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

    <h3>Chris Martin - August 2022</h3>

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
        > <br /><br /><b>Igor Stravinsky, Poetics of Music.</b>
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
        being the maximum visual emphasis).
      </p>

      <table style="width:60%">
        <thead>
          <tr>
            <th style="width:30%">Visual Emphasis</th>
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
      <br />
    </div>

    <!-- -------------------------------------------------------------------- -->
    <!-- TEXTURES  -->
    <!-- -------------------------------------------------------------------- -->

    <div class="section-container">
      <h2>Using textures which connect to the topic of the chart</h2>
      <p>
        As I worked without colour, I also gravitated towards using textures to
        add visual interest to my charts, and to enhance the overall design
        aesthetic. I focused on adding textured backgrounds to annotations and
        tooltips.. Going through iterations of various chart versions enabled me
        to quickly experiment with different texture options. Discarding those
        options that didn’t work without much concern, as I hadn’t invested much
        time or energy in them.
      </p>
      <p>
        Initially, I experimented a lot with different paper based textures.
        Here, I was just thinking about subtly enhancing the visual appearance
        of the chart. While making a version of the chart that highlighted the
        top 20 fossil fuel producing countries, I stumbled on an alternative
        approach.
      </p>
      <p>
        I started thinking about how the textures could connect to the theme of
        the chart. This led me to creating a crude oil textured background for
        annotations. Oil is probably the fossil fuel people most commonly think
        of in the context of climate change. The dark liquid texture also worked
        well as a backdrop to the annotation text. The chart below shows this
        texture in the context.
      </p>

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
          >
        </div>
      </FooterBar>
      <br />
      <p>
        Over the last year or so, I have built a habit where I try to align the
        meanings and associations of colours with the message of a chart. Maybe
        it should have been obvious, but I had never considered doing something
        similar with texture. It was only working with my ‘no colour’ constraint
        that I made this connection. It is something I definitely want to carry
        though into my future work.
      </p>
      <br />
    </div>

    <!-- -------------------------------------------------------------------- -->
    <!-- CONTEXT -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
      <h2>Thinking deeply about embedding context into a chart</h2>
      <br />
      <p>
        When working normally, I would think about the different chart options
        that could be used with the data at hand. As well as how to use several
        potentially complementary charts together. Being constrained to work
        with just one chart (a scatter chart) made me think more deeply about
        how I embedded context into the chart. I couldn’t fall back on adding
        more charts to create a story with the data.
      </p>
      <p>
        As I worked through various iterations of the chart, I realised a
        crucial piece of context was missing. What level of annual CO<sub>2</sub> emissions
        per capita is compatible with keeping climate change impacts (in some
        sense) in check? Without this context the graph provides no sense of the
        scale of the decarbonisation challenge that we collectively face. So, I
        did some research and identified a recent and credible estimate of a
        sustainable level of annual carbon emissions per person (2.3 tonnes
        CO<sub>2</sub>e).
      </p>
      <p>
        I went through several iterations of creating charts that integrated
        this additional context. These included adding a simple horizontal line,
        and visually representing countries above and below the 2.3 tonnes
        threshold in different ways.
      </p>
      <p>
        It took me a bit of time to realise that I actually needed two versions
        of the chart to explain the importance of the 2.3 tonnes threshold. One
        which showed the countries where carbon emissions need to fall, and by
        how much. A second which shows the other side of the story, the
        countries where emissions could rise to a sustainable level as their
        economies grow. The two charts I settled on are shown below.
      </p>

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
      <br />
      <br />
      <br />
      <div class="chart-container" id="p4">
        <Standardplot {w} {h} chartId={"p4"} plotNumber={3} />
      </div>
      <br />
      <p>
        Reflecting on the process of creating these charts, I recognised that I
        often feel a pressure to find the one ‘best’ way to show the data. A
        single way that conveys a clear and unambiguous message. Working within
        the constraints freed me up from this pressure, and helped me to
        communicate a more nuanced message through two versions of the same
        chart. The primary difference between the two charts is just the axis
        extents, but this gives two very different views of the data.
      </p>

      <br />
    </div>

    <!-- -------------------------------------------------------------------- -->
    <!-- STATS -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
      <h2>Feeling free to use statistical techniques to enhance a chart</h2>

      <p>
        Working with only one chart also encouraged me to do some statistical
        modelling. I have some background in statistics, but I generally avoid
        using statistical modelling within my data visualisations. This is for
        two reasons: (1) I think I won’t have enough time to do ‘proper’
        modelling; and, (2) I worry about how to communicate modelling in an
        accessible way.
      </p>
      <p>
        Having exhausted other options within the creative constraints, I was
        left with the option of doing some statistics. This absence of
        alternatives helped me to overcome my mental barriers, and actually get
        on with doing some modelling with fewer concerns.
      </p>
      <p>
        I started by doing some research about how in theory, a country's carbon
        emissions should change as its economy grows. The next step was to
        experiment with a few different models (using R). In essence, these
        models described the trajectory a country should theoretically take
        across the graph as its economy grows.
      </p>
      <p>
        Then it was a case of thinking through how to visually explain the
        model, and its implications, in a way that is accessible for people
        without a statistical background. I’m not sure I got the whole way with
        this last step. Take a look at the chart below and see what you think.
        You can change between two views of the model and the data using the
        buttons above the chart.
      </p>

      <br />

      <button on:click={handleDeveloping} class="chart-button {buttonSelectedDeveloping}"
        >Developing economies</button
      >
      <button on:click={handleDeveloped} class="chart-button {buttonSelectedDeveloped}"
        >Developed economies</button
      >

      <div class="chart-container" id="p6">
        <Standardplot {w} {h} chartId={"p6"} plotNumber={modellingPlotNum} />
      </div>
      <br />
      <p>
        It felt like I learnt something really important from producing this
        last version of the chart. <i
          >'Your statistics and modelling do not need to be peer-reviewed
          academic research quality to enhance a data visualisation'</i
        >. I definitely plan to put this on a post it note above my desk, so I
        don’t get stuck and completely avoid using stats and modelling.
      </p>
      <br />
    </div>

    <!-- -------------------------------------------------------------------- -->
    <!-- Conclusion / the end -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
      <h2>
        Using creative constraints in your own data visualisation practice
      </h2>
      <br />
      <p>
        I hope that reading about my experiences has piqued your interest in
        using creative constraints in your own data visualisation practice. The
        biggest things I got out of my experiment with creative constraints
        were:
      </p>
      <ul>
        <li>
          A way to focus my personal projects, which have tended to sprawl in
          the past!
        </li>
        <li>
          A great approach to use when learning new tools and technologies. In
          this case, working with the constraints helped me to focus on learning
          the basics of visualising data using Svelte and D3.
        </li>
        <li>
          A much needed reminder that you often have to work through the obvious
          ideas for visualising a dataset. Before you then get to the more
          innovative, potentially higher impact ideas.
        </li>
        <li>
          Some really helpful design ideas that I can reuse as I develop a
          consistent visual identity for my work.
        </li>
      </ul>

      <p>
        There are so many different creative constraints you could set for
        yourself in your own experiments. As a starting point, here are just a
        few ideas for some different aspects of data visualisation practice.
      </p>

      <table style="width:90%">
        <thead>
          <tr>
            <th style="width:30%">Aspect of data visualisation practice</th>
            <th style="width:60%">Ideas for creative constraints</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Use of colour.</td>
            <td
              >Use only colours found in a photo related to the topic of your
              chart.</td
            >
          </tr>
          <tr>
            <td>Use of shape.</td>
            <td
              >Make a chart without any circles or open lines, only use squares
              and rectangles.</td
            >
          </tr>
          <tr>
            <td>Use of scale.</td>
            <td
              >Make a chart which uses only logarithmic scales, and explain
              these to the reader. Find a dataset where it makes sense to do
              this.</td
            >
          </tr>
          <tr>
            <td>Non-data elements of the chart (axis, gridlines etc.).</td>
            <td
              >Remake a version of one of your previous charts, but without an
              axis.</td
            >
          </tr>
          <tr>
            <td>Choice of chart.</td>
            <td
              >Show the same dataset using as many different chart types as
              possible. Make sure to include chart types you don’t think will
              work.</td
            >
          </tr>
          <tr>
            <td>Analysis and statistics.</td>
            <td
              >Apply an analytical technique you haven’t used before, and
              integrate the findings into a chart. Remember you don’t need to
              master the technique to use it in your experiment.</td
            >
          </tr>
          <tr>
            <td>Technologies.</td>
            <td
              >Only use one tool (e.g. Datawrapper, Figma …) to create a chart.
              Or, maybe just use a pen and paper to hand-draw a chart.</td
            >
          </tr>
        </tbody>
      </table>
      <br />
      <p>
        Do <a href="mailto:chrisjmartin03@gmail.com">get in touch</a> if reading
        about my experience of using creative constraints sparked off any ideas for
        you. Or, if you try any of the ideas above. It would be great to hear from
        you, and see where you get to with your own experiments.
      </p>
      <br />
    </div>
    <div class="section-container last-element">
      <h3>Acknowledgements</h3>
      <ul>
        <li>
          The pattern at the top of the page was produced with code adapted from <a
            href="https://art-from-code.netlify.app/day-2/session-2/#mosaica"
            >Art from Code</a
          > by Danielle Navarro.
        </li>
        <li>
          The photograph of oil used in the annotation background texture was
          taken by <a href="https://unsplash.com/photos/zbai2Y1GBIw"
            >Tom Barrett</a
          >.
        </li>
        <li>
          Feedback and ideas throughout the development and writing process from
          the <a href="https://www.elevatedataviz.com/">Elevate Data Viz</a> community.
        </li>
      </ul>
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
    height: 700px;
    /* max-height: 700px;
    min-height: 500px; */
    min-width: 700px;
    max-width: 900px;
  }

  .story-container {
    max-width: 900px;
    margin: auto;
    padding-left: 70px;
    padding-right: 70px;
    padding-top:50px;
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
    line-height: 1.1;
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

  .last-element {
    padding-bottom: 300px;
  }

  /* --------------------------------------------------------------------------
  Style tables
  -------------------------------------------------------------------------- */
  table {
    margin-left: auto;
    margin-right: auto;
  }

  thead,
  tbody {
    font-family: "Lato", sans-serif;
    text-align: left;
    color: #404040;
    vertical-align: baseline;
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
  }

  /* --------------------------------------------------------------------------
  Style user interaction components 
  -------------------------------------------------------------------------- */
  .chart-button {
    font-family: "Lato", sans-serif;
    margin-bottom: 1.5rem;
    background-color: #404040;
    padding: 10px;
    font-weight: bold;
    transition-duration: 1s;
  }

  .chart-button-selected {
    background-color: white; /* Green */
    color: #404040;
  }

  .chart-button-not-selected {
    color: white;
    border: 1px solid #404040;
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
