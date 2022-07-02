# packages
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.selector import Selector
import json
import urllib
import datetime
import re


# sold houses class
class soldhouses(scrapy.Spider):
    # scraper name
  
    # headers
    headers = {
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36'
    }

   

    
    def parse_links(self, res):

        content = ''
        with open('flikr.html', 'r' ) as f:
             for line in f.read():
                 content += line
        res = Selector(text=content)
        photos = [script for script in res.css('script[class="modelExport"]::text').getall()][0].split('modelExport:')[-1]
        photos = photos.split('spaceId: 792600541')[-1]
        
        #photos = re.search(r'(main.*)(.*)', photos)
        
        photos = photos.split('auth: auth,')[0].strip()
        photos2 = photos.strip()
        photos2 = photos2.replace(',','')
        for i  in photos2: 
          if isinstance(i, list):
            print(i['model'])
        #print(json.loads(photos2)[0])

# main driver
if __name__ == '__main__':
    # run scrapers
    #process = CrawlerProcess()
    #process.crawl(soldhouses)
    #process.start()
    
    soldhouses.parse_links(soldhouses,'')

