<script>
  import { Bar } from "svelte-chartjs";
  import {
    Chart,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  } from "chart.js";

  Chart.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  );
  export let data;
  export let options;
</script>

<div class="bar">
  <Bar {data} {options} />
</div>

<style>
  .bar {
    width: 80%;
    margin: auto;
    transform: translateX(75px);
  }

  @media only screen and (max-width: 720px) {
    .bar {
      width: 200%;
      transform: translateX(-1rem);
    }
  }
</style>
