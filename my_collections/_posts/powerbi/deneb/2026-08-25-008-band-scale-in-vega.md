---
category: powerbi
tags: ["Power BI", "Vega", "Deneb"]
label: "Vega · Tutorial"
read_time: "~8 min"
vega: true
title: "Deneb & Vega - 07: Band Scales in Details"
image: /assets/images/posts/powerbi/001-title.jpeg
excerpt: ""
---

# Introduction



<div id="chart-01" class="has-caption" data-caption="Chart: Band scale properties"></div>
<script type="text/javascript">
  async function run() {
    const container = document.getElementById('chart-01');
    const width = container.clientWidth - 40;
    const height = width * 9 / 16;
    const specs = '/vegaCharts/008-01-band-scale.json';
    const result = await vegaEmbed("#chart-01", specs, {
      actions: true,
      width: width,
      height: height
    });
    console.log(result);
  }
  document.addEventListener('DOMContentLoaded', run);
</script>