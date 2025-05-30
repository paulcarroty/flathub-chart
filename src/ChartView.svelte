<script>
  let { title, stats, color } = $props();
  let fullsize = $state(false);
  const increment = () => {
    fullsize = !fullsize;
  };
  let chartItems = $derived(fullsize
    ? stats
    : Object.fromEntries(Object.entries(stats).slice(0, 40)));
</script>

<h3 style="--theme-color: {color};">{title}</h3>

<ul class="applist">
  {#each Object.entries(chartItems) as app, i}
    <li
      style="padding-left: {i % 20 < 10
        ? (i % 20) * 5
        : (20 - (i % 20)) * 5}px;"
    >
      <span class="chart-number"
        >{@html i == 0
          ? '<span style="background-color: #CFB53B;">' +
            (i + 1) +
            "<sup>st</sup> " +
            "</span>"
          : i == 1
          ? '<span style="background-color: silver;">' +
            (i + 1) +
            "<sup>nd</sup> " +
            "</span>"
          : i == 2
          ? '<span style="background-color: #924931;">' +
            (i + 1) +
            "<sup>rd</sup> " +
            "</span>"
          : i + 1 + "<sup>th<sup> "}</span
      > <span class="appname">{app[0]} </span><span class="downloads">
        {app[1]}</span
      >
    </li>
  {/each}
</ul>

<button onclick={increment}>
  {fullsize ? "⬆️" : "⬇️"}
</button>
<p style="font-style: italic;">
  Applications in chart: {Object.keys(stats).length}
</p>

<style>
  p {
    color: #ffffff;
  }

  h3 {
    color: var(--theme-color);
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 300;
    line-height: 1.1;
    margin: 4rem auto auto auto;
    white-space: nowrap;
  }

  button {
    font-family: inherit;
    font-size: inherit;
    padding: 0.1em 0.1em;
    color: #ff3e00;
    background-color: rgba(23, 168, 244, 255);
    border-radius: 50%;
    border: 2px solid rgba(255, 62, 0, 0);
    outline: none;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }

  button:focus {
    border: 2px solid #ff3e00;
  }

  button:active {
    background-color: rgba(2, 133, 203, 255);
  }

  .applist > li {
    list-style: none;
  }

  li {
    white-space: nowrap;
    margin: 0.5rem auto 0.5rem 15%;
    text-align: justify;
  }

  span.chart-number {
    background-color: #ffffff;
  }

  span.appname {
    color: #ffffff;
    background-color: #0057b7;
  }

  span.downloads {
    color: black;
    background-color: #ffdd00;
  }

  @media (min-width: 480px) {
    p {
      max-width: none;
    }
  }
</style>
