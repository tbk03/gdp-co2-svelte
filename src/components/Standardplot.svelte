<script>
    import { csv } from "d3-fetch";

    // let dataset;
    // csv("https://github.com/tbk03/gdp-co2-R/blob/main/data_out/gdp_co2_2015.csv")
    //     .then((d) => dataset = d);  
    
    let data;
    csv("./data/gdp_co2_2015.csv")
        .then((d) => data = d);
    $: console.log(data);
</script>