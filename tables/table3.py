import scrapy 
# packages
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.selector import Selector
import json
import csv

# scraper class
class TableData(scrapy.Spider):
    # scraper name
    name = 'table_data'
    
    # start urls
    start_urls = ['https://www.capfriendly.com/teams/hurricanes/aav']
    results = []
    def parse(self, res):
#        Content = []
#        with open('table1.html', 'r') as f:
#            for line in f.read():
#                Content += line
#        res = Selector(text=Content)

        heads =  [t.strip('(-)').replace('(', '').strip(' -') 
              for t in res.css('table[id="team"]').css('tbody')[0].css('tr')[0].css('td::text').getall() ]
        
        rows =  [t.css('td   ::text').getall()  for t in res.css('table[id="team"]').css('tbody')[0].css('tr')[1:]]

        self.results.append(str(rows))
        #print(rows)
        with open('data1.csv', 'w') as f:
             writer = csv.writer(f)
             writer.writerow(heads)
             writer.writerows(rows)
                






if __name__ == '__main__':
    # run scraper
    process = CrawlerProcess()
    process.crawl(TableData)
    process.start()
    #TableData.parse(TableData, '')

