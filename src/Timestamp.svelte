<script>
  let { time } = $props();
  const localtime = new Date(time.sync).toLocaleString();
</script>

<div id="timestamp">
  <p id="timeofsync">Latest sync - {localtime}</p>
</div>

<style>
  div#timestamp {
    height: 3.5rem;
    float: right;
  }

  p#timeofsync {
    font-size: 0.5rem;
    font-style: italic;
    color: #fff;
    text-align: right;
    margin: 0.5rem auto 0.5rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    p {
      max-width: none;
    }
  }
</style>
