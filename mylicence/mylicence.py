# packages
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.selector import Selector
import urllib
import json
import datetime

# property scraper class
class ResidentialSale(scrapy.Spider):
    # scraper name
    name = 'therapists'
    
    base_url = 'https://mylicense.in.gov/EVerification/SearchResults.aspx'
    # headers
    headers = {
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
    }
    
    # custom settings
    custom_settings = {
        'CONCURRENT_REQUEST_PER_DOMAIN': 2,
        'DOWNLOAD_DELAY': 1
    }

    # general crawler
    def start_requests(self):
       
            # initial HTTP request
            yield scrapy.Request(
                url= self.base_url,
                headers=self.headers,
               
                callback=self.parse_listing
            )
            #break
#            content = ''
#            with open('SearchResults.html', 'r' ) as f:
#                 for line in f.read():
#                     content += line
#            response = Selector(text=content)     
#            print(response)
            
    def parse_listing(self, response):
#            content = ''
#            with open('SearchResults.html', 'r' ) as f:
#                 for line in f.read():
#                     content += line
#            response = Selector(text=content)     
            for link in response.css('td[class = "datagrid"]'):
                 print(link.css('tbody > tr > td ').css('a[id = "datagrid_results__ctl3_name"]::text').getall())  
    
# main driver
if __name__ == '__main__':
    # run scraper
    process = CrawlerProcess()
    process.crawl(ResidentialSale)
    process.start()
    
    #ResidentialSale.parse_listing(ResidentialSale, '')
    
    
