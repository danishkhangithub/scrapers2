import requests
from bs4 import BeautifulSoup
import json
import re
import csv

url = 'https://www.capfriendly.com/teams/hurricanes/aav'

response = requests.get(url)

content = BeautifulSoup(response.text, 'lxml')

table = content.find('table', {'class': 'tbl fixed'})

tbody = table.find_all('tbody')[0]

rows = tbody.find_all('tr')

cols = [
        [ col.text.strip('\n') 
          for col in  
          row.find_all('td')
        ]
          for row in 
          rows
        ]
#init raw data 
raw_data = []



for col in cols:
    raw_data.append(col)
print(raw_data)

with open('data1.csv', 'w') as f:
         writer = csv.writer(f)
         writer.writerows(raw_data)


