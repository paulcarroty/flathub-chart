<script>
  import logo from "./assets/logo.svg";
</script>

<img src={logo} alt="Flathub Chart Logo" />

<h1>
  <span style="--i:1">F</span><span style="--i:2">l</span><span style="--i:3"
    >a</span
  ><span style="--i:4">t</span><span style="--i:5">h</span><span style="--i:6"
    >u</span
  ><span style="--i:7">b</span>
  <span style="--i:9">C</span><span style="--i:10">h</span><span style="--i:11"
    >a</span
  ><span style="--i:12">r</span><span style="--i:13">t</span>
</h1>

<p>
  The most popular <a href="https://flathub.org" target="_blank">Flathub</a> apps
  sorted by downloads with daily updates
</p>

<style>
  h1 {
    margin: 2rem auto 2.5rem;
    font-size: 4rem;
    font-weight: 300;
    line-height: 1.1;
    -webkit-box-reflect: below -2rem linear-gradient(transparent, rgba(0, 0, 0, 0.2));
  }

  span {
    display: inline-block;
    animation: wave 10s infinite;
    animation-delay: calc(3s * var(--i));
    background: -webkit-linear-gradient(
      -90deg,
      #ed008c 0%,
      #fff000 85%
    ) !important;
    -webkit-background-clip: text !important;
    background-clip: text;
    -webkit-text-fill-color: transparent !important;
    text-transform: uppercase;
  }

  @keyframes wave {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2rem);
    }
  }

  img {
    height: 16rem;
    width: 16rem;
  }

  p {
    color: #ffffff;
    max-width: 14rem;
    margin: 2rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1,
    span {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>
