# import packages
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.selector import Selector
import csv
import json
import os
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.support import expected_conditions as EC
import time
import pandas as pd

class Edmunds(scrapy.Spider):
    name = 'edmunds'

    base_url = 'https://www.edmunds.com/cars-for-sale-by-owner/'

    # headers
    headers = {
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
    }

    pagenumber = 0

    cars = 0

    results = []

    file = 'cars1.xlsx'
    try:
       if (os.path.exists(file)) and (os.path.isfile(file)):
          os.remove(file)
       else:
          print('file not found')
    except OSError:
       pass
    # custom settings
    custom_settings = {
        'CONCURRENT_REQUEST_PER_DOMAIN': 6,
        'CONCURRENT_REQUESTS_PER_IP' : 6,
        'DOWNLOAD_DELAY': 1,
        'DOWNLOAD_TIMEOUT' : 10,
        'AUTO_THROTTLE' : False,


    }


    def __init__(self):
        self.url = 'https://www.edmunds.com/cars-for-sale-by-owner/'
        chrome_driver_path = '/home/danish-khan/scrapers/researchgate/chromedriver'
        chrome_options = Options()
        #chrome_options.add_argument('--headless')

        self.driver = webdriver.Chrome(
        executable_path=chrome_driver_path, options=chrome_options
        )

    def start_requests(self):
        yield scrapy.Request(
             url = self.base_url,
             headers = self.headers,
             callback = self.parse_pagination
        )

    def parse_pagination(self, response):
         try:
            # retrive in headless browser
            self.driver.get(self.base_url)

            zipcode = username = WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='zip']")))
            zipcode.send_keys(Keys.CONTROL + 'a')
            zipcode.send_keys(Keys.DELETE)
            zipcode.send_keys('10001')
            zipcode.click()
            time.sleep(2)

            response = Selector(text = self.driver.page_source)
            self.driver.close()

            total_pages = response.css('.text-gray-darker~ .font-weight-bold+ .text-gray-darker::text').get()

            for i in range(1, int(total_pages)):

                if i < 101:
                    self.pagenumber +=1
                    next_page = 'https://www.edmunds.com/inventory/srp.html?inventorytype=used%2Ccpo&wz=75&radius=50&pagenumber=' + str(i)
                    print('\nnext_page:',next_page)

                    yield scrapy.Request(
                      url = next_page,
                      headers = self.headers,
                      meta = {'pagenumber' : self.pagenumber},
                      callback = self.parse_links
                    )



         except Exception as e:
           #self.driver.close()
           print(e)

    def parse_links(self, response):

        pagenumber = response.meta.get('pagenumber')

        print('\npagenumber:', pagenumber)
        cars_links = response.css('a[class = "usurp-inventory-card-vdp-link"]::attr(href)').getall()

        df = pd.DataFrame(cars_links)

        pure_links = df.drop_duplicates(keep = "first")

        new_links = pure_links[0].to_list()

        new_links = ['https://www.edmunds.com' + i for i in new_links]

        print('\nlinks:', new_links)

        for link in new_links:
            print('\nlinks:',link)

            yield response.follow(
                 url = link,
                 headers = self.headers,
                 callback = self.parse_listing
            )




    def parse_listing(self,response):

#        content = ''
#
#        with open('cars.html', 'r') as f:
#           for line in f.read():
#               content += line
#
#        response = Selector(text = content)

        features = {
          'Name' : '',
          'Price' : '',
          'Vin Number' : '',
          'Vehicle Summary' : '',
          'Top features & Specs' : ''

        }

        try:
           features['Name'] = response.css('h1[class = "not-opaque text-black d-inline-block mb-0 size-24"]::text').get()

        except:
           features['Name'] = None

        try:
           features['Price'] = response.css('.col-6 .mb-0 span::text').get()
        except:
           features['Price'] = None

        try:
           features['Vin Number'] = response.css('span[class = "mr-1"] ').extract_first().split(':')[1].replace('<!-- -->', '').replace('</span>','').replace(' ','')

        except:
           features['Vin Number'] = None

        try:
           features['Vehicle Summary'] = ', '.join(response.css('.mb-1 .col::text').getall())
        except:
           features['Vehicle Summary'] = None

        try:
           features['Top features & Specs'] =  ', '.join(response.css('.pl-1.mb-0 .mb-0_5::text').getall())
        except:
           features['Top features & Specs'] = None



        print(json.dumps(features, indent = 2))
        self.results.append(features)
        headers = features.keys()

        with open('cars1.csv', 'w+', newline = '') as csv_file:
            writer = csv.DictWriter(csv_file, delimiter = ',', fieldnames = headers)
            writer.writeheader()
            writer.writerows(self.results)







# main driver
if __name__ == '__main__':
#  def crawl():
#       process = CrawlerProcess()
#       process.crawl(Edmunds)
#       process.start()
       #Edmunds.parse_listing(Edmunds, '')

       data = pd.read_csv('cars1.csv')
       data.to_excel('cars1.xlsx', index = None, header = True)


#  process = Process(target=crawl)
#  process.start()
#  print(process)
