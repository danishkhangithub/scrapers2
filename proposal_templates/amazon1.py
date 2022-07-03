# packages
import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.selector import Selector
import json

# hummart spider class
class Amazonspider(scrapy.Spider):
    # scraper / spider name
    name = 'amazon_spider'

    base_url =  'https://www.amazon.com/s?k=shirts+winter&i=fashion-mens-intl-ship&ref=nb_sb_noss'

    headers = {
      'USER-AGENT' :  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36'
                    }
    params = {
        
        'page' : 1
                }
    page = 1

    # current page counter
    current_page = 1

    
    # custom settings
    custom_settings = {
        'FEED_FORMAT': 'csv',
        'FEED_URI': 'amazon1.csv',
        'CONCURRENT_REQUESTS_PER_DOMAIN': 1,
        'DOWNLOAD_DELAY': 2
       }

    
    # crawler's entry point
    def start_requests(self):
        # make HTTP request to base URL
        yield scrapy.Request(
            url=self.base_url,
            headers=self.headers,
            callback=self.parse_links
        )

    def parse_links(self, res):
        
        for link in res.css('div[class="sg-col-4-of-12 s-result-item s-asin sg-col-4-of-16 sg-col sg-col-4-of-20"]'):
            product_url = link.css('a::attr(href)').get()
            product_url = 'https://www.amazon.com/' + product_url  
            #print(product_url)      
        
            yield res.follow(
                        url=product_url,
                        headers=self.headers,
                        callback=self.parse_products
                             ) 
        
        next_page = res.css('ul[class="a-pagination"]').css('li[class="a-last"]').css('a::attr(href)').get()
        try:
          if res.css('ul[class="a-pagination"]').css('li[class="a-last"]').css('a::text').get() == 'Next':

             yield res.follow(
                        url=next_page,
                        headers=self.headers,
                        callback=self.parse_links
                    )
        
             self.page += 1
             print('\n\n',self.page,'\n\n') 
  
        except Exception as e:
            print('\n\nERROR during crawling next page:', e) 

        

    def parse_products(self, response):
        '''
        content = ''
        
        # open local HTML file
        with open('amazon2.html', 'r') as f:
            for line in f.read():
                content += line
        
        # init scrapy selector
        response = Selector(text=content)
        '''
        features = {
             'Name' : response.css('span[class= "a-size-large product-title-word-break"]::text')
                              .get()
                              .replace('\n',''),
           
             'Price' : response.css('span[class= "a-size-medium a-color-price priceBlockBuyingPriceString"]::text')
                              .get(),
             'Star_rating' : response.css('i[class= "a-icon a-icon-star a-star-4-5"]')
                                     .css('span[class="a-icon-alt"]::text')
                                     .get(),
             'Size' :   [item.strip() for item in response.css('span[class= "a-dropdown-container"]')
                                                          .css('select[name = "dropdown_selected_size_name"]')
                                                          .css('option::text').getall()[1:]],
             'Details'  : [item.strip() for item in response.css('div[class="a-section a-spacing-medium a-spacing-top-small"]')
                                                              .css('ul')
                                                              .css('li *::text')
                                                              .getall()],
             'Package Dimension' : response.css('li:nth-child(1) .a-text-bold+ span::text').get(),
             'Asin Number' :  response.xpath('//div/ul[@class="a-unordered-list a-nostyle a-vertical a-spacing-none detail-bullet-list"]/li[6]/span/span[2]/text()').get()
 

                

                   }

        yield features

if __name__ == '__main__':
    # run scraper
    process = CrawlerProcess()
    process.crawl(Amazonspider)
    process.start()
     #Amazonspider.parse_products(Amazonspider,'')
   
