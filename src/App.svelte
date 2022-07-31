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
    <h1>Creative constraints for data visualisation</h1>

    <!-- -------------------------------------------------------------------- -->
    <!-- Introduction -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
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

    <!-- -------------------------------------------------------------------- -->
    <!-- Creative Constraints in Data Visualisation -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
      <h2>
        What could creative constraints look like in data visualisation
        practice?
      </h2>
      <p>
        Coming back to data visualisation, after that short musical detour. In
        this article, I explore what creative constraints for data visualisation
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

    <!-- -------------------------------------------------------------------- -->
    <!-- The chart that I chose -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
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

    <!-- -------------------------------------------------------------------- -->
    <!-- A data perspective -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
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

    <!-- -------------------------------------------------------------------- -->
    <!-- A data perspective: adding context -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
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

    <!-- -------------------------------------------------------------------- -->
    <!-- A data perspective: view a differnt scale -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
      <h3>Viewing the data at a different scale</h3>
      <p>
        The first version of the chart (above) puts the emphasis on countries
        where emissions need to fall. So, primarily wealthy countries across
        Europe, North America, the Middle East etc. This got me pondering how by
        defaulting to displaying a plot at the full extents of the data, I am
        guided towards telling certain stories. Working within the constraints
        gave me the freedom to side-step one of my default ways of working.
      </p>
      <p>
        So, in the version of the chart below I focussed in on a subset of the
        data. Providing a view on where there is scope for some countries to
        increase their emissions as their economies grow. For example, per
        capita emission in India could grow by 33% before hitting the 2.3 tonnes
        per year per capita threshold. For me, just zooming on one part of the
        chart provides a totally different view and communicates a very
        different message.
      </p>
      <br />

      <TitleBar>
        <div slot="title">
          Viewing some the data opens up the opportunity to tell a different
          story
        </div>
        <div slot="subtitle">
          There remain many countries where carbon emissions could grow
          sustainability as the economy grows
        </div>
      </TitleBar>

      <div class="chart-container" id="p3">
        <Standardplot {w} {h} chartId={"p3"} plotNumber={3} />
      </div>

      <br />
    </div>

    <!-- -------------------------------------------------------------------- -->
    <!-- A data perspective: subgroups -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
      <h3>Picking out subgroups within the data</h3>
      <p>
        Working within the constraints, made me to think a lot harder about
        which groups of countries would be potentially interesting to highlight.
        Typically, the graph is presented with the colour of point showing the
        continent that the country sits within. So, thinking beyond that
        geographic angle, and having explored the data a bit by this point two
        group of countries really interested me. You can choose which groups of
        countries you view using the buttons above the chart.
      </p>
      <p>
        First, countries which produce a lot of fossil fuels. In the version of
        the graph below the top 20 fossil fuel producing countries (oil, gas and
        coal combined) are shown in black. This emphasises that major fossil
        fuel producers have relatively high emissions compared to other
        countries. In other words, that ready local access to fossil fuels can
        enable high carbon lifestyles.
      </p>
      <p>
        Secondly, I was interested in countries which are decoupling. That is
        countries where the economy is growing and carbon emissions are falling.
        This puts decoupling countries on the trajectory to the ‘ideal’ state of
        high levels of income and low carbon emissions. Highlighting the
        decoupling countries in black shows that they relatively low emissions
        (given their levels of income).
      </p>
      <p>
        Switching between the major fossil fuel producers and decoupling
        countries, shows up that the United States is unique in appearing both
        groups. This is the type of unexpected insight shows the value of
        working within the constraints, I would have been unlikely to make this
        connection otherwise.
      </p>
      <br />

      <TitleBar>
        <div slot="title">
          Looking beyond the obvious subgroups can help make interesting
          connections
        </div>
        <div slot="subtitle">
          It is appears challenging for major fossil fuel producers to decouple
          economic growth from carbon emissions
        </div>
      </TitleBar>

      <button on:click={handleFossilFuel} class="chart-button"
        >Top Fossil Fuel Producers</button
      >
      <button on:click={handleDecoupling} class="chart-button"
        >Decoupling economies</button
      >
      <div class="chart-container" id="p4">
        <Standardplot {w} {h} chartId={"p4"} plotNumber={groupsPlotNum} />
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

      <br />
    </div>

    <!-- -------------------------------------------------------------------- -->
    <!-- A data perspective: statisitcal modelling -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
      <h3>Do some statistical modelling</h3>

      <p>
        The last big thing, on the data side, that the constraints encouraged me
        to do was some statistical modelling. I think that having a background
        in research and statistics generally puts me off doing statistical
        modelling to include within data visualisations. This is for two
        reasons: (1) I think I won’t have enough time to do ‘proper’ modelling,
        and; (2) I worry about how to communicate the modelling in an accessible
        way. So, it was cool that the constraints freed me up a bit from those
        concerns to use statistical modelling in an illustrative way.
      </p>
      <p>
        I decided I would use some modelling to highlight the richer countries
        that have considerably higher emissions than would be expected. This is
        based on the idea from economic theory that after a certain point in a
        countries development emission growth should slow down.
      </p>
      <p>
        In the chart below, first you can see a line which represent the typical
        trajectory of countries with a developing economy (up to $25,000). I
        won’t go into the details here, other than to say it is just a pretty
        basic linear model. You can think of this trajectory as a theoretical
        worst case.
      </p>
      <p>
        Then if you click the ‘Developed Economies’ button, you can see the what
        it would look like if this early-phase development trajectory continued
        (i.e. growth in emissions did not slow down once an economy was
        developed). Just seven countries sit above this trajectory.
      </p>
      <br />

      <TitleBar>
        <div slot="title">
          Your stats and modelling do not need to be peer-review academic
          research quality to enhance a data visualisation
        </div>
        <div slot="subtitle">
          Only a handful of countries with developed economies have higher
          carbon emissions than the theoretical worst-case scenario
        </div>
      </TitleBar>

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
    <!-- A design perspective -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
      <h2>A design perspective: what the constraints encouraged me to do?</h2>
      <p>
        I came to data visualisation from a scientific research background. So,
        I am always on the look out for ways to develop my design skills. But I
        am simultaneously overwhelmed by both how much there is to learn in the
        world of design, and where I have started from (i.e. no design
        background). Working within the creative constraint really helped me to
        focus on exploring a couple of aspects of data visualisation design in
        detail. The things that really caught my attention, during the project,
        where the possibilities for me to think differently about using greys
        and textures.
      </p>
      <br />
    </div>

    <!-- -------------------------------------------------------------------- -->
    <!-- A design perspective: greys -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
      <h3>Thinking differently about greys</h3>
      <p>
        Working initially in greyscale, and only adding colour at the end, is
        the types of advice often seen in data visualisation books. This is for
        various reasons including: working with colour can very difficult and
        time consuming; and, working without colour should in theory encourage a
        minimal and clear design approach. I had always failed to heed this
        advice though; I find it just too tempting to explore how colour could
        enhance a data visualisation.
      </p>
      <p>
        Restricting myself to greyscale proved really helpful for me, not only
        did it take away a potential distraction. It also, as in the quote at
        the start of the article, gave me the freedom to explore aspects of
        chart design I had not considered before. For example, I explored how
        alternating lighter and darker greys in the gridlines behind the plot
        (see below).
      </p>

      <div class="image-container">
        <img
          src="./images/plot-svg.jpg"
          alt="gridlines showing different greys"
          width={(3 * w) / 4}
        />

        <p>
          This helped make the grid less visual imposing, pushing the grid
          further in the background and leaving more emphasis on the data points
          themselves. Just for comparison, here is a slightly more imposing
          version grid with all the lines the same darker grey.
        </p>
        <img
          src="./images/plot-svg-simp-grid.jpg"
          alt="gridlines showing different greys"
          width={(3 * w) / 4}
        />
      </div>
    </div>

    <!-- -------------------------------------------------------------------- -->
    <!-- A design perspective: texture -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
      <h3>Thinking differently about texture</h3>
      <p>
        Again, without a colour palette to procrastinate over, I was freed up to
        explore how texture could be used to enhance the appearance of my
        charts. The constraints gave me the chance to learn how to use images to
        add texture using html and css. I tried to apply textures to different
        chart elements to provide subtle contrasts, which did not distract the
        reader attention from the data itself. It would never have occurred to
        me to put textured background on annotations, being constrained and not
        able to use colour drove me to think of this.
      </p>
      <p>
        Perhaps, mostly usefully for me, in the context as my development as
        data visualisation designer, the constraints inspired me to connect the
        textures used to subject matter of the graph. I was really pleased with
        the version of the graph showing the top fossil fuel producing
        countries, where the background of the annotations a texture based on
        photo of a pool of oil.
      </p>
      <br />
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
        <br />
        <br />
      </div>
    </div>

    <!-- -------------------------------------------------------------------- -->
    <!-- Conclusion / the end -->
    <!-- -------------------------------------------------------------------- -->
    <div class="section-container">
      <h2>If you want to try out using constraints in your own practice?</h2>
      <p>
        I hope that in this reading about my experience has been shown you that
        there might be some value to exploring using creative constraints in
        your own data visualisation practice. The big things I got out of this
        exercise for my own practice were:
      </p>
      <ul>
        <li>
          A way to focus my personal projects, which have in the past tended to
          sprawl in the past.
        </li>
        <li>
          A great approach to use when learning new tools and technologies. In
          this case the constraints really allowed me to focus on learning the
          basics of visualising data using Svelte and D3.
        </li>
        <li>
          A much need reminder that you often have to work through the obvious
          ideas for visualising a dataset, before you get to the more innovative
          potentially higher impact ideas.
        </li>
        <li>
          Some really helpful design ideas which I can reuse as I continue
          developing a consistent visual identity for my data visualisation
          work.
        </li>
      </ul>
      <p>
        If you don’t have time to go all in on the creative constraints in the
        form of a specific personal project (like the one I’ve written about
        above), here are a few ideas.
      </p>
      <ul>
        <li>
          Create the first draft of a chart in greyscale. I was sceptical too,
          but found it worth trying and will do this again.
        </li>
        <li>
          Sketch out multiple possible versions of chart, thinking about things
          like adding context and what different views of the data could be
          created by cropping the axis.
        </li>
        <li>
          Think about what statistical modelling might help you understand the
          data better. Even if you don’t have time to actually do the modelling
          it might help you think differently about the data itself. If stats is
          outside you skillset, ask some else what might be interesting from
          statistical modelling perspective.
        </li>
      </ul>
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

  /* --------------------------------------------------------------------------
  Style text 
  -------------------------------------------------------------------------- */
  h1,
  h2,
  h3 {
    font-family: "Poppins", sans-serif;
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

  h2 {
    font-size: 2rem;
    text-align: left;
  }

  h3 {
    font-size: 1.5rem;
    text-align: left;
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
