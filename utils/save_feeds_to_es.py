
from elasticsearch import Elasticsearch
es = Elasticsearch()

def parseFile():
	line_number = 0
	failed = 0
	with open("/home/mandeep/Downloads/feeds.csv") as feeds:
		for line in feeds:
			line_number += 1
			try:
				line = line.replace('"', '')
				id,title,address,link,subscribers = line.split(",")
				document = {
					"id": id,
					"title": title,
					"address": address,
					"link": link,
					"subscribers": subscribers
				}
				es.index(index="feeds", doc_type="feeds", body=document)
			except:
				failed += 1
	print line_number, failed
	
if __name__ == "__main__":
	parseFile()