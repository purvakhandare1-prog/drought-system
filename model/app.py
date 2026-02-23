import math
from flask import Flask, render_template

app = Flask(__name__)

# Base Station (Where tankers start)
BASE_STATION = {"name": "Central Depot", "lat": 19.00, "lng": 72.80}

villages = [
    {"id": 1, "name": "V-East", "pop": 1200, "rainfall_dev": -25, "groundwater": 45, "lat": 19.07, "lng": 72.87},
    {"id": 2, "name": "V-North", "pop": 800, "rainfall_dev": -10, "groundwater": 60, "lat": 19.12, "lng": 72.90},
    {"id": 3, "name": "V-Central", "pop": 2500, "rainfall_dev": -40, "groundwater": 20, "lat": 19.03, "lng": 72.85},
]

def get_distance(lat1, lon1, lat2, lon2):
    # Radius of the Earth in km
    R = 6371.0
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

@app.route('/')
def index():
    processed = []
    for v in villages:
        # 1. Stress Index Calculation
        v['stress_index'] = round((abs(v['rainfall_dev']) * 0.6) + ((100 - v['groundwater']) * 0.4), 2)
        # 2. Priority Logic
        v['priority'] = "High" if v['stress_index'] > 50 else "Medium"
        v['tankers_needed'] = max(1, round(v['pop'] / 500))
        # 3. Distance from Depot (for route optimization)
        v['dist'] = round(get_distance(BASE_STATION['lat'], BASE_STATION['lng'], v['lat'], v['lng']), 2)
        processed.append(v)
    
    # Sort: First by Priority, then by Shortest Distance
    optimized_route = sorted(processed, key=lambda x: (x['priority'] != 'High', x['dist']))
    
    return render_template('index.html', villages=optimized_route, base=BASE_STATION)

if __name__ == '__main__':
    app.run(debug=True)