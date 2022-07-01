# packages
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.selector import Selector
import urllib
import json
import csv
import datetime

# property scraper class
class ResidentialSale(scrapy.Spider):
    # scraper name
    name  = 'bcorporation'
    #url
    base_url = 'https://bcorporation.net/directory?page='
    page_no = 0
    # headers
    headers = {
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
    }
    
    # custom settings
    custom_settings = {
        'FEED_FORMAT': 'csv',
        'FEED_URI': 'bcorporation.csv',
        'CONCURRENT_REQUEST_PER_DOMAIN': 2,
        'DOWNLOAD_DELAY': 2
    }

    # general crawler
    def start_requests(self):
       for page in range(0,3):
            # initial HTTP request
            next_page = self.base_url + str(page)
            yield scrapy.Request(
                url=next_page,
                headers=self.headers,
               
                callback=self.parse_listing
            )
            #break
            self.page_no +=  1
            print(self.page_no)
    
    def  parse_listing(self, response):
         results = []
         
         content = ''
         with open('bcorportion.html', 'r' ) as f:
             for line in f.read():
                 content += line
         response = Selector(text=content)
         
         
         for name in response.css('div[class= "card__inner shadow card-shadow rounded bg--basewhite"]'):
             #company_links = name.css('a::attr(href)').get()
             #company_links = 'https://bcorporation.net/directory/reti-sp-a'  + company_links
             
             #print(company_links)
             #results.append(company_links)
             
             features = {
                'name' : name.css('a::attr(href)').get()
                #'name' : 'https://bcorporation.net/directory/reti-sp-a'  + company_links
               
             }
             features['name'] = 'https://bcorporation.net/'  + features['name']
             
             
             
             with open('schools_data.csv', 'w') as f:
                 writer = csv.DictWriter(f, fieldnames = features.keys())
                 
                
                 writer.writerow(features)
                
             
               
    
# main driver
if __name__ == '__main__':
#    # run scraper
#    process = CrawlerProcess()
#    process.crawl(ResidentialSale)
#    process.start()
#    
    ResidentialSale.parse_listing(ResidentialSale, '')
    
    
