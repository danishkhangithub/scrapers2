# packages
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.selector import Selector
import urllib
import os
import json
import csv
import datetime

# property scraper class
class ResidentialSale(scrapy.Spider):
    # scraper name
    name = 'therapists'
    
    base_url = 'https://clutch.co/agencies/digital?page='
    
    # headers
    headers = {
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
    }
    try:
       os.remove('clutchco1.csv')
    except OSError:
       pass   
    # custom settings
    custom_settings = {
        'FEED_FORMAT': 'csv',
        'FEED_URI': 'clutchco1.csv',
        'CONCURRENT_REQUEST_PER_DOMAIN': 2,
        'DOWNLOAD_DELAY': 2
    }

    # general crawler
    def start_requests(self):
         for page in range(0,2):
            # generate next page URL
            next_page = self.base_url + str(page)
            
            # crawl next page URL
            yield scrapy.Request(url=next_page, headers=self.headers, callback=self.parse_links)
    
     
    def parse_links(self, response): 
         '''
         content = ''
         with open('clutchco1.html', 'r' ) as f:
             for line in f.read():
                 content += line
         response = Selector(text=content) 
         '''
         links =  response.css('div[class = "company_info__wrap"]')
         links = links.css('a::attr(href)').getall()
         
         for link in links:
               yield response.follow(url=link, headers=self.headers, callback=self.parse_listing)
               
       
       
            
    def parse_listing(self, response):   
         '''     
         content = ''
         with open('clutchco1.html', 'r' ) as f:
             for line in f.read():
                 content += line
         response = Selector(text=content)  
         
         ''' 
         features = {
                'Name' :  response.css('span[class="location-name"]::text').get().strip(),
                'Phone' : response.css('li[class="quick-menu-details"]').css('a::text').get().strip(),
                'Ratings' : response.css('span[class="rating"]::text').get().strip()
 
         }
             
         #with open('clutchco1.csv', 'a') as csv_file:
         #      writerows(features)
         yield features  
         
      
            
# main driver
if __name__ == '__main__':
    # run scraper
    process = CrawlerProcess()
    process.crawl(ResidentialSale)
    process.start()
    
    #ResidentialSale.parse_links(ResidentialSale, '')
    
    
