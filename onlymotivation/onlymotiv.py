# packages
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.selector import Selector
import urllib
import os
import json
import datetime

# property scraper class
class ResidentialSale(scrapy.Spider):
    # scraper name
    name = 'therapists'
    base_url = 'https://onlymotivation4u.blogspot.com/search/label/Motivation' 
    
    # headers
    headers = {
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
    }
    try:
       os.remove('abx.csv')
    except OSError:
       pass   
    # custom settings
    custom_settings = {
        'CONCURRENT_REQUEST_PER_DOMAIN': 2,
        'DOWNLOAD_DELAY': 1
    }

    # general crawler
    def start_requests(self):
       
            # initial HTTP request
            yield scrapy.Request(
                url=self.base_url,
                headers=self.headers,
               
                callback=self.parse
            )
            
    def parse(self, response):
    
         #print(response.text)
         '''
         with open('res.html', 'w') as html:
             html.write(response.text)
         
         ''' 
         '''  
         content = ''
         with open('res.html', 'r' ) as f:
             for line in f.read():
                 content += line
         response = Selector(text=content)     
         '''
         for link in response.css('div[class="date-outer"]'):
            link = link.css('h2[class= "post-title entry-title"]').css('a::attr(href)')
            
            
            yield response.follow(
                url = link.get(),
                headers = self.headers,
                callback = self.parse_listing

            ) 
            #break
    def parse_listing(self, response):
             
         with open('res2.html', 'w') as html:
            html.write(response.text)
         
         
         
         
         '''
         with open('timeshighereducation.csv', 'a') as csv_file:
             writer = csv.DictWriter(csv_file, fieldnames=items.keys())
             writer.writerow(items)
         '''
      
      
# main driver
if __name__ == '__main__':
    # run scraper
#    process = CrawlerProcess()
#    process.crawl(ResidentialSale)
#    process.start()
    
     ResidentialSale.parse_listing(ResidentialSale, '')
    
    
