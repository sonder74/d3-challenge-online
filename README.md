# D3 Challenge (Grade: A+)
 
### Table of Contents:

 1. [Project Goals](#project-goals)
 2. [Tools and Solutions](#tools-and-solutions)
 3. [Outcomes and Lessons Learned](#outcomes-and-lessons-learned)
 4. [Website Screenshot](#website-screenshot)
 5. [Coding Screenshots](#coding-screenshots)
   

## Project Goals
With this project, I was introduced to <a href="https://en.wikipedia.org/wiki/D3.js">D3</a>, a challenging method of using JavaScript to render scalable vector graphics (SVGs) inside web browsers. I was given a set of healthcare data and tasked with creating a webpage showcasing an interactive, multidimensional chart that allows users to customize their own visualizations of the information.

## Tools and Solutions
After receiving classroom instruction on the uses of HTML and CSS, I had to learn to utilize <a href="https://getbootstrap.com/">Bootstrap</a>, an open-source CSS framework that can speed up the web-design process and make finished sites responsive to the devices accessing them. I also had to return to both <a href="https://www.python.org/">Python</a> and <a href="https://pandas.pydata.org/">Pandas</a> in order to generate <a href="https://sonder74.github.io/latitude/data">a dynamic table</a> embedded in my site's final page</a>.

## Outcomes and Lessons Learned
After some practice, I became more familiar and comfortable with Bootstrap's coding structure, and generating new web pages became much easier. My finished site contains pop-up visualizations, a navigation-bar dropdown menu, a dynamic HTML table, and more. It is currently hosted by GitHub Pages <a href="https://sonder74.github.io/latitude/">here</a>.

## Website Screenshot
![latitude](screenshots/latitude_screenshot.png)

## Coding Screenshots
![navbar](screenshots/navbar_screenshot.png)
<br><br>
![html_table](screenshots/html_table_screenshot.png)



# D3 Homework - Data Journalism and D3

![Newsroom](https://media.giphy.com/media/v2xIous7mnEYg/giphy.gif)

## Background

Welcome to the newsroom! You've just accepted a data visualization position for a major metro paper. You're tasked with analyzing the current trends shaping people's lives, as well as creating charts, graphs, and interactive elements to help readers understand your findings.

The editor wants to run a series of feature stories about the health risks facing particular demographics. She's counting on you to sniff out the first story idea by sifting through information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System.

The data set included with the assignment is based on 2014 ACS 1-year estimates: [https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml](https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml), but you are free to investigate a different data set. The current data set incldes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."

### Before You Begin

1. Create a new repository for this project called `D3-challenge`. **Do not add this homework to an existing repository**.

2. Clone the new repository to your computer.

3. Inside your local git repository, create a directory for the D3 challenge. Use the folder name to correspond to the challenge: **D3_data_journalism**.

4. This homeworks utilizes both **html** and **Javascript** so be sure to add all the necessary files. These will be the main files to run for analysis.

5. Push the above changes to GitHub or GitLab.

## Your Task

### Core Assignment: D3 Dabbler (Required Assignment)

![4-scatter](Images/4-scatter.jpg)

You need to create a scatter plot between two of the data variables such as `Healthcare vs. Poverty` or `Smokers vs. Age`.

Using the D3 techniques we taught you in class, create a scatter plot that represents each state with circle elements. You'll code this graphic in the `app.js` file of your homework directory—make sure you pull in the data from `data.csv` by using the `d3.csv` function. Your scatter plot should ultimately appear like the image at the top of this section.

* Include state abbreviations in the circles.

* Create and situate your axes and labels to the left and bottom of the chart.

* Note: You'll need to use `python -m http.server` to run the visualization. This will host the page at `localhost:8000` in your web browser.

- - -

### Bonus: Impress the Boss (Optional Assignment)

Why make a static graphic when D3 lets you interact with your data?

![7-animated-scatter](Images/7-animated-scatter.gif)

#### 1. More Data, More Dynamics

You're going to include more demographics and more risk factors. Place additional labels in your scatter plot and give them click events so that your users can decide which data to display. Animate the transitions for your circles' locations as well as the range of your axes. Do this for two risk factors for each axis. Or, for an extreme challenge, create three for each axis.

* Hint: Try binding all of the CSV data to your circles. This will let you easily determine their x or y values when you click the labels.

#### 2. Incorporate d3-tip

While the ticks on the axes allow us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. Enter tooltips: developers can implement these in their D3 graphics to reveal a specific element's data when the user hovers their cursor over the element. Add tooltips to your circles and display each tooltip with the data that the user has selected. Use the `d3-tip.js` plugin developed by [Justin Palmer](https://github.com/Caged)—we've already included this plugin in your assignment directory.

![8-tooltip](Images/8-tooltip.gif)

* Check out [David Gotz's example](https://bl.ocks.org/davegotz/bd54b56723c154d25eedde6504d30ad7) to see how you should implement tooltips with d3-tip.

- - -

### Assessment

Your final product will be assessed on the following metrics:

* Creation of a **new** repository on GitHub called `D3-Challenge` (note the kebab-case). Do not add to an already existing repo.

* Completion of all steps in the core assignment


