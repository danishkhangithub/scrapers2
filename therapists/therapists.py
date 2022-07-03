# packages
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.selector import Selector
import urllib
import json
import datetime
import pandas as pd
import mysql.connector


mydb = mysql.connector.connect(
host="localhost",
user="danish-khan",
password="12345",
db='incidecoder'
   )
cur = mydb.cursor()

#create table
#cur.execute("""DROP TABLE IF EXISTS Products""")
#
#cur.execute(''' CREATE TABLE IF NOT EXISTS Products
#               (Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
#                first_name varchar(100),
#                last_name VARCHAR(100),
#                phone_no int)
#                ''')
#


# property scraper class
class ResidentialSale(scrapy.Spider):
    # scraper name
    name = 'therapist'
    results = []
    base_url = 'https://www.psychologytoday.com/us/therapists/ca/santa-monica?sid=601d766365c33'
    # headers
    headers = {
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
    }
    page_index = 0
    params = {
       'rec_next' : '',
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
                url=self.base_url,
                headers=self.headers,
               
                callback=self.parse_pagination
            )
            #break
    def parse_pagination(self, response):
    
        yield res.follow(url=self.base_url,
                         headers=self.headers,
                         callback=self.parse_listing)
    
        try:  
            # extract number of total pages
            total_pages = 11
            
        except:
            total_pages = 1   
        self.params['rec_next'] = self.page_index    
        self.page_index += 21
        
        next_page = self.base_url + urllib.parse.urlencode(self.params['rec_next'])
        
        if int(self.page_index/21) >= int(total_pages):
           pass
            
    def parse_listing(self, response):
        
        mydb = mysql.connector.connect(
        host="localhost",
        user="danish-khan",
        password="12345",
        db='incidecoder'
           )
        cur = mydb.cursor()

    
        #create table
        cur.execute("""DROP TABLE IF EXISTS Products""")

        cur.execute(''' CREATE TABLE IF NOT EXISTS Products
               (Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                first_name varchar(255),
                last_name VARCHAR(100),
                phone_no text)
                ''')

        results = []
        content = ''
        with open('therapists.html', 'r' ) as f:
             for line in f.read():
                 content += line
        res = Selector(text=content)
        
        for card in res.css('div[class="row"]'):
           features = {
            'first_name' :   ''.join([fname.split()[0]  for fname in card.css('a').css('span[itemprop = "name"]::text').getall()]),
            
            'last_name' :    ''.join([fname.split()[-1]  for fname in card.css('a').css('span[itemprop = "name"]::text').getall()]),
                                 
            'phone_no' :    ''.join([card.strip('\n').replace('( )', '')
                               .replace('  ','') for card in card.css('div[class="result-phone hidden-xs-down"]::text').getall()])

           }
             
           
           
           results.append(features)
       
        #print(results, '\n')    
           
        profile_details = pd.DataFrame(results)
        #print(profile_details)
        for row in profile_details.itertuples():
            
           cur.execute('''INSERT INTO Products
                (first_name,
                last_name,
                phone_no
                )
                VALUES
                ("%s","%s",%s)''', 
                (row.first_name,
                row.last_name,
                row.phone_no
                 ) )

        mydb.commit()
        
        print('complete.')
        
     
                             

mydb.close()
         
           
    
# main driver
if __name__ == '__main__':
    # run scraper
#    process = CrawlerProcess()
#    process.crawl(ResidentialSale)
#    process.start()
    
     ResidentialSale.parse_listing(ResidentialSale, '')
    
    
