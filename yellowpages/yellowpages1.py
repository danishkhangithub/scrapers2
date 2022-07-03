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
    base_url = 'https://www.yellowpages.com.au/search/listings?clue=schools&locationClue=Melbourne+-+Bayside+Suburbs%2C+VIC&lat=&lon='
    # headers
    headers = {
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
        "cookie": "yellow-guid=42f70846-6d3b-465d-8dba-81756f39e82e; _vwo_uuid_v2=DBD499308AA475849D7C6B9570465F1D2|2cb90309d76fdefbd168bf00fc3a3012; _hjTLDTest=1; _hjid=b7afa0f1-faa3-42fd-b10e-a8d2553f0f59; _vis_opt_s=1%7C; _vis_opt_test_cookie=1; _vwo_uuid=DBD499308AA475849D7C6B9570465F1D2; _vwo_ds=3%3Aa_0%2Ct_0%3A0%241612601960%3A40.45234792%3A%3A%3A3_0%2C2_0%3A0; _gcl_au=1.1.1838506270.1612601964; s_ecid=MCMID%7C27199280733805148951507569081805474051; AMCVS_8412403D53AC3D7E0A490D4C%40AdobeOrg=1; s_cc=true; _wingify_pc_uuid=babc2516c3404c39bed07e8871118c69; AMCV_8412403D53AC3D7E0A490D4C%40AdobeOrg=1585540135%7CMCIDTS%7C18665%7CMCMID%7C27199280733805148951507569081805474051%7CMCAID%7CNONE%7CMCOPTOUT-1612609164s%7CNONE%7CMCAAMLH-1613206764%7C3%7CMCAAMB-1613206764%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI%7CMCSYNCSOP%7C411-18672%7CvVersion%7C4.4.0; wingify_donot_track_actions=0; clue=Schools; locationClue=Melbourne%20-%20Bayside%20Suburbs%2C%20VIC; _awl=3.1612602028.0.4-f9d3a113-04cdfb15c0625a7622d9d3c6d4caac19-6763652d6575726f70652d7765737431-601e5aac-1; _sdsat_Postcode=; s_sq=%5B%5BB%5D%5D; _vwo_sn=0%3A5; JSESSIONID=5756786F29B5E4ACDF7819527C39AAC7"
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
               
                callback=self.parse_listing
            )
            
    def parse_listing(self, response):
            print(response.text)       
            #break
            '''
             content = ''
             with open('bcorportion.html', 'r' ) as f:
             for line in f.read():
                 content += line
             response = Selector(text=content)     
             ''' 
# main driver
if __name__ == '__main__':
    # run scraper
    process = CrawlerProcess()
    process.crawl(ResidentialSale)
    process.start()
    
    #ResidentialSale.parse_listing(ResidentialSale, '')
    
    
