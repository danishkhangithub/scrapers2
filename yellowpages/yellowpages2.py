from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.support import expected_conditions as EC
import time
import sys




url = 'https://www.yellowpages.com.au/'

chrome_driver_path = '/home/danish-khan/scrapers/researchgate/chromedriver'

chrome_options = Options()
#chrome_options.add_argument('--headless')

webdriver = webdriver.Chrome(
  executable_path=chrome_driver_path, options=chrome_options
)


with webdriver as driver:
    # Set timeout time 
    wait = WebDriverWait(driver, 5)

    # retrive url in headless browser
    driver.get(url)
    time.sleep(10)
    frames = driver.find_elements_by_tag_name('iframe')
    driver.switch_to.frame(frames[0]);
    #time.sleep(5)
    
    #click on checkbox to activate recaptcha
    driver.find_element_by_class_name("recaptcha-checkbox-border").click()
    time.sleep(5)
    #switch to recaptcha audio control frame
    driver.switch_to.default_content()
    time.sleep(5)
    frames = driver.find_element_by_xpath('html/body/div[3]/div[4]').find_elements_by_tag_name('iframe')
    time.sleep(2)
    driver.switch_to.frame(frames[0])
    time.sleep(5)
    driver.find_element_by_css_selector('button[class="rc-button goog-inline-block rc-button-audio"]').click()
    driver.switch_to.default_content()
    frames= driver.find_elements_by_tag_name("iframe")
    driver.switch_to.frame(frames[-1])
    time.sleep(5)
    #driver.close()
    
 
 
 
 
 
