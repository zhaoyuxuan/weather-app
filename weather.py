import requests,json
from datetime import datetime
from dateutil import tz

cityname = "edmonton"
Api = 'http://api.openweathermap.org/data/2.5/forecast?q='+cityname+'&APPID=27fe580edf919569d85245294e9ae834'
r = requests.get(Api);

d = json.loads(r.text)

print(len(d),d.keys())

min_temp = d["list"][0]["main"]["temp_min"]
max_temp = d["list"][0]["main"]["temp_max"]

min_temp1 = d["list"][1]["main"]["temp_min"]
max_temp1 = d["list"][1]["main"]["temp_max"]
print(min_temp1,min_temp,len(d["list"]))
print(d["list"])


from_zone = tz.gettz('UTC')
to_zone = tz.gettz('America/Edmonton')

# METHOD 2: Auto-detect zones:
from_zone = tz.tzutc()
to_zone = tz.tzlocal()

# utc = datetime.utcnow()

# Tell the datetime object that it's in UTC time zone since 
# datetime objects are 'naive' by default
utc = utc.replace(tzinfo=from_zone)

# Convert time zone
central = utc.astimezone(to_zone)

