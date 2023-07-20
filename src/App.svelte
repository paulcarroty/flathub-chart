<script>
  import dailyStat from "./assets/daily.json";
  import weeklyStat from "./assets/weekly.json";
  import monthlyStat from "./assets/monthly.json";
  import yearlyStat from "./assets/yearly.json";
  import time from "./assets/timestamp.json";
  import Title from "./Title.svelte";
  import Search from "./Search.svelte";
  import Timestamp from "./Timestamp.svelte";
  import ChartView from "./ChartView.svelte";
  import ChartBar from "./ChartBar.svelte";
  import Footer from "./Footer.svelte";

  const chartDataGen = (data) => {
    return {
      labels: Object.keys(data).slice(0, 40),
      datasets: [
        {
          label: "Downloads",
          data: Object.values(data).slice(0, 40),
          backgroundColor: [
            "gold",
            "silver",
            "#FF5733",
            "maroon",
            "red",
            "purple",
            "fuchsia",
            "green",
            "lime",
            "olive",
            "yellow",
            "navy",
            "blue",
            "teal",
            "aqua",
            "antiquewhite",
            "aquamarine",
            "beige",
            "bisque",
            "blanchedalmond",
            "blueviolet",
            "burlywood",
            "cadetblue",
            "chartreuse",
            "chocolate",
            "coral",
            "cornflowerblue",
            "crimson",
            "cyan",
            "darkcyan",
            "darkblue",
            "darkgoldenrod",
            "darkkhaki",
            "darkmagenta",
            "darkorange",
            "darkorchid",
            "darksalmon",
            "darkseagreen",
            "darkturquoise",
            "darkviolet",
            "deeppink",
          ],
          borderWidth: 0,
          borderRadius: 5,
          inflateAmount: -1,
        },
      ],
    };
  };
  const chartOptions = {
    layout: {
      padding: {
        left: 0,
        right: 150,
        top: 0,
        bottom: 0,
      },
    },
    scales: {
      x: {
        ticks: { display: false },
        grid: { display: false },
      },
      y: {
        ticks: { display: false },
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          footer: function (tooltipItem) {
            return "Position: " + (Number(tooltipItem[0].dataIndex) + 1);
          },
        },
      },
    },
    title: { display: false },
    responsive: true,
  };
</script>

<main>
  <Title />
  <Search
    dStat={dailyStat}
    wStat={weeklyStat}
    mStat={monthlyStat}
    yStat={yearlyStat}
  />

  <Timestamp {time} />

  <ChartView title="Daily Top 40" stats={dailyStat} color="#ff7f50" />
  <ChartBar data={chartDataGen(dailyStat)} options={chartOptions} />

  <ChartView title="Weekly Top 40" stats={weeklyStat} color="#ff8c00" />
  <ChartBar data={chartDataGen(weeklyStat)} options={chartOptions} />

  <ChartView title="Monthly Top 40" stats={monthlyStat} color="#e2725b" />
  <ChartBar data={chartDataGen(monthlyStat)} options={chartOptions} />

  <ChartView title="Yearly Top 40" stats={yearlyStat} color="#ffbf00" />
  <ChartBar data={chartDataGen(yearlyStat)} options={chartOptions} />

  <Footer />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background: #19162fff;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  :global(a) {
    color: #66d3fa;
  }

  :global(a:hover) {
    color: #fff;
    margin: 0 -0.2rem;
    padding: 0 0.2rem;
    box-shadow: inset 500px 0 0 0 #2565ae;
    transition: color 1s ease-in-out, box-shadow 1s ease-in-out;
  }
</style>
