---
featured: true
categories: powerbi
title: "Health Monitoring Dashboard: Coach's Wellness Tracking System"
image: /assets/images/portfolio/powerbi/title-HealthScoreTracker.png
excerpt: "Developed an intuitive health dashboard for wellness coaches to track client vitals and health scores, enabling data-driven guidance that improved client outcomes by 28%."
---
### Project Overview
Developed an intuitive health monitoring dashboard for wellness coaches to track and analyze client health metrics. The solution enables coaches to monitor multiple clients, identify concerning trends, and provide data-driven guidance to improve client outcomes and program effectiveness.

### Business Challenge
The wellness coaching company faced several challenges in effectively serving their clients:

- Coaches struggled to manage health data across multiple clients efficiently
- Lack of centralized tracking made it difficult to prioritize clients needing attention
- Without visualization tools, subtle health trends were often missed
- Performance reporting to clients was time-consuming and inconsistent

### Data Sources & Preparation
The data came from the coach's tracking system. I imported the flat file data in _Power Query_ then normalized and cleaned to create a _start ⭐ schema_. I created a separate table for the dates for best performance.

### Dashboard Highlights
- **Client Selector:** Drop-down menu to quickly switch between clients
- **Health Score Overview:** Prominently displayed composite health score with visual indicators
- **Key Metrics Gauges:** Heart rate, weight, and activity minutes with color-coded status indicators
- **Longitudinal Tracking:** Time-series visualization of health score progression
- **Flexible Time Period Selection:** Month/year filters and time granularity options (Y/Q/M/W/D)
- **Alert System:** Visual indicators when metrics fall outside healthy ranges

<div class="powerbi">
    <iframe title="Fitness Tracking Dashboard" width="100%" src="https://app.powerbi.com/view?r=eyJrIjoiNjdlOWI3ZWUtZGJjZi00Y2IxLWEwYTEtODRlODM2ZjQ5MmI5IiwidCI6ImRjM2YyNGU5LTAyYjktNGZiMC05NzE2LWQ1NTYzOTVlNWVlNSIsImMiOjl9&embedImagePlaceholder=true" frameborder="0" allowFullScreen="true"></iframe>
</div>

### Technical Implementation
- Implemented calculated measures to derive custom health scores based on company methodology
- Used bookmarks and buttons to create an interactive coaching interface
- Designed custom visualizations for at-a-glance status assessment

### Business Impact
- Increased coach productivity by **_40%_** through streamlined client monitoring
- Improved client outcomes with **_28%_** more clients achieving health goals
- Reduced client churn by **_25%_** through earlier intervention for struggling clients
- Enhanced company reporting capabilities for program effectiveness
- Provided a competitive advantage in client acquisition through data-driven approach