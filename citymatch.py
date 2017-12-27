import csv,json

outputdic = {}

with open("city.csv", "r", encoding = "ISO-8859-1") as f:
    reader = csv.reader(f)
    for row in reader:
    	infoList = row[0].split()
    	cityid = infoList[0]
    	country = infoList[-1]

    	infoList.pop(0)
    	infoList.pop(-1)
    	infoList.pop(-1)
    	infoList.pop(-1)
    	cityname = " ".join(infoList)

    	outputdic[cityid] = cityname+","+country


with open('citydata.json', 'w') as outfile:
    json.dump(outputdic, outfile)



    	











    