# packages
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.selector import Selector
import json
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
cur.execute("""DROP TABLE IF EXISTS Products""")

cur.execute(''' CREATE TABLE IF NOT EXISTS Products
               (Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                brand varchar(255),
                title VARCHAR(255),
                photo varchar(255),
                ingredients blob)
                ''')


# hummart spider class
class incidecoderspider(scrapy.Spider):
    # scraper / spider name
    name = 'incidecoder_spider'

    base_url =  'https://incidecoder.com/search?query=cream'

    headers = {
      'USER-AGENT' :  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36'
                    }

     # custom settings
    custom_settings = {
        #'CONCURRENT_REQUESTS_PER_DOMAIN': 1,
        #'DOWNLOAD_DELAY': 2
       }


    def start_requests(self):
       
        yield scrapy.Request(url = self.base_url, headers = self.headers, callback = self.parse)
 
    def parse(self, res):
     
        p_links = res.css('div[class="search-content"]').css('div[class="paddingbl"]').css('a::attr(href)').get()
        p_links = 'https://incidecoder.com/' + p_links
        #for i in p_links:
        #    p_links = 'https://incidecoder.com/' + i
        #    print(p_links, '\n')
    
        for link in p_links:
          yield res.follow(url=link, headers=self.headers, callback = self.parse_listings)
        
    def parse_listings(self, response): 
        
        '''
        import mysql.connector
        mydb = mysql.connector.connect(
        host="localhost",
        user="danish-khan",
        password="12345",
        db='incidecoder'
           )
        cur = mydb.cursor()
        
        
        content = ''
        with open('incidec1.html', 'r' ) as f:
             for line in f.read():
                 content += line
        response = Selector(text=content)
        '''
        brand = response.css('div[class="fs21"]').css('span').css('a::text').get()
        title = response.css('div[class="klavikab lilac"]').css('span::text').get()
        photo = response.css('div[class="image imgborder"]').css('picture').css('img::attr(src)').get()
        ingredients = response.css('div[id="ingredlist-short"]').css('div').css('a::text').getall()
         
      


        t = (brand,title, photo, ingredients)
        cur.execute('''INSERT INTO Products
        (brand,
        title,
        photo, 
        ingredients)
        values("%s","%s","%s","%s")''' %
        ( brand, 
        title,
        photo,
        ingredients
         )
         ) 
        
        mydb.commit()
        print('complete.')
        # read from database
        cur.execute('SELECT * FROM Products')
        results2 = cur.fetchall()
        print(results2)
        data = pd.read_sql_query("SELECT * FROM Products",mydb)
        
        print(data.head())
        mydb.close()
        
        
            
        
        
        
        
     


if __name__ == '__main__':
    # run scraper
    process = CrawlerProcess()
    process.crawl(incidecoderspider)
    process.start()
    #incidecoderspider.parse_listings(incidecoderspider,'')
