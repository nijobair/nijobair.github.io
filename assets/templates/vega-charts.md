<div id="chart-01"></div>
<script type="text/javascript">
  async function run() {
    const container = document.getElementById('chart-01');
    const width = container.clientWidth - 40;
    const height = width / 2;
    const specs = '/vegaCharts/00_trial.json';
    const result = await vegaEmbed("#chart-01", specs, {
      actions: true,
      width: width,
      height: height
    });
    console.log(result);
  }
  document.addEventListener('DOMContentLoaded', run);
</script>

<!-- TO USE VEGA'S BUILT IN DATASETS -->

url: "https://cdn.jsdelivr.net/npm/vega-datasets@3.1.0/data/<dataset-name>.json"

Example:
```json
{
  "name": "world",
  "url": "https://cdn.jsdelivr.net/npm/vega-datasets@2/data/world-110m.json",
  "format": {
    "type": "topojson",
    "feature": "countries"
  },
  "transform": [
    {
      "type": "filter",
      "expr": "type !== 'albersUsa' || datum.id === 840"
    }
  ]
}
```