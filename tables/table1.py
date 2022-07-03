import requests
from bs4 import BeautifulSoup
import csv



url = 'https://bsaonline.com/ASSG_AdvancedSearch/AdvancedSearchResults?Agricultural=false&Commercial=false&Residential=true&Industrial=false&TimberCutover=false&Developmental=false&AdvancedPropClassSearch=False&uid=128&SaleDateRange=6%2F28%2F2020-12%2F28%2F2020&PriceRange=0-0&AreaRange=0-0&YearBuiltRange=0-0&BedRange=0-0&BathRange=0-0&SearchOrigin=1&DetailResultsGrid-size=50&DetailResultsGrid-page=1'

response = requests.get(url)

content = BeautifulSoup(response.text, 'lxml') 


headers = []

body = []

tables = content.find_all('table')

tables2 = tables[5]


table_method2 = content.find('table', {
                                          'style': 'font-size:11px',
                                          'cellspacing': 0
                                      })
theads = table_method2.find('thead')


tbody = table_method2.find('tbody')

#rows
rows = tbody.find_all('tr', {'class' :'site-search-row'})

col = [[col.text.strip('\n') for col in row.find_all('td')[1:]] for row in rows]
print(type(col))

#headings
rows2 = theads.find('tr')

col2 = rows2.find_all('th',{'class':'t-header'})

col3 = [col.text for col in rows2.find_all('span', {'class':'t-link'})]




#with open('data1.csv', 'w') as f:
#     writer = csv.writer(f)
#     writer.writerow(col3)
#     writer.writerows(col)



