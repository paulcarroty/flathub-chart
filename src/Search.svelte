<script>
  export let dStat, wStat, mStat, yStat;
  let keyword = '', appId = '';
  const searchApp = (app) => {
    if (app.toString().length < 3 || typeof app != "string") return "";
    let res = "";

    const fullstat = [
      { area: dStat, descr: "Daily stats" },
      { area: wStat, descr: "Weekly stats" },
      { area: mStat, descr: "Monthly stats" },
      { area: yStat, descr: "Yearly stats" },
    ];

    for (let stat of fullstat) {
      let search = Object.keys(stat.area).find((e) =>
        e.toLowerCase().includes(app.toLowerCase())
      );

      appId = search ?? "";

      search
        ? (res =
            res +
            `${stat.descr}: ${stat.area[search]} downloads and position ${
              Object.keys(stat.area).indexOf(search) + 1
            }<br/> `)
        : "";
    }
    return `Found: <span style="display: inline-block;
      background: linear-gradient(45deg, #ff6b35, #f7931e, #ffcc02);
      background-size: 200% 200%;
      color: #B91C1C;
      font-weight: bold;
      padding: 4px 8px;
      border-radius: 6px;
      text-shadow: 0 1px 2px rgba(0,0,0,0.3);
      box-shadow: 0 2px 8px rgba(255,107,53,0.4);
      border: 1px solid rgba(255,255,255,0.2);">${appId}</span><br/>${res}`;
  };

  $: result = searchApp(keyword);
</script>

<div id="search">
  <input type="text" bind:value={keyword} placeholder="🔎 Type to search..." />

  <p id="search_result">{@html result}</p>
</div>

<style>
  div#search {
    margin: auto;
  }

  p#search_result {
    color: #fa5f55;
    margin: 0.5rem auto 0 auto;
    line-height: 1.35;
    text-align: justify-all;
  }

  input {
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    padding-left: 6px;
  }

  input:focus {
    border: 3px solid #ff3e00 !important;
  }

  @media (min-width: 480px) {
    p {
      max-width: none;
    }
  }
</style>
