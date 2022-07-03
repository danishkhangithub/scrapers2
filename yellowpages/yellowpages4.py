from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.support import expected_conditions as EC
import time
import sys


base_url = "https://www.g2.com/categories/pricing"
chrome_driver_path = '/home/danish-khan/scrapers/researchgate/chromedriver'

chrome_options = Options()
#chrome_options.add_argument('--headless')

webdriver = webdriver.Chrome(
  executable_path=chrome_driver_path, options=chrome_options
)


with webdriver as driver:
    # Set timeout time 
    wait = WebDriverWait(driver, 10)

    # retrive url in headless browser
    driver.get(base_url)
    time.sleep(10)
    #print(driver.page_source)
    
    #print(driver.get_cookies())
    driver.delete_all_cookies()
    driver.refresh()
    time.sleep(10)
    link = driver.find_element_by_xpath('//div[@class="product-listing__product-name"]/a').get_attribute('href')
    driver.get(link)
    driver.delete_all_cookies()
    driver.get(link)
    
    # must close the driver after task finished
    driver.close()
