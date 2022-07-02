from Tkinter import *
window = Tk()
from usa_states import *

window.title('light_scraper')
window.geometry('800x500')
window.resizable('true','true')

textfield = Entry(window,width = 50, text = "Enter the subject")
textfield.pack()
#mybutton = Label(window, text = "Search")
#mybutton.pack()
def search(self):
   mylabel = Label(root, text = usa_states.summary(textfield.get()))
   mylabel.pack()
mybutton = Label(window, text = "Search", command = Search)
mybutton.pack()
window.mainloop()
