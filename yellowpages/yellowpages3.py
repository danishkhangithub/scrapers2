from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.support import expected_conditions as EC
import time
import sys



#login_url = 'https://www.researchgate.net/login'
base_url = "https://www.yellowpages.com.au/"
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
    
    #print(driver.page_source)
    driver.refresh()
    driver.get_cookies()
    # must close the driver after task finished
    driver.close()
