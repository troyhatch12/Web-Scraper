Background
I subscribed to a workout program that was hosted through a site called teachable. I injured during the course of this workout program so I couldn't continue doing it, but I wanted to try to go through it again. So I wanted to keep the course without continuously paying the monthly payment. There was no good way for me to do this besides to download the lectures one by one and this would have taken hours. So I write this web scraper instead.

Captcha issues
I had to get around the captcha the site is using at the login page. It is a passive captcha so I didn't need to use a captcha solver service. I just had to do enough trickery to convince the site that my script was a human. I believe the most important part of this is using the slowMo option in the puppeteer chrome options. Also telling the site that I liked to inhale oxygen and expell carbon dioxide(thanks Thomas Frank).
I am using chrome for this instead of the chromium bundled with puppeteer because I found out that passive captcha doesn't typically trust chromium. So this was the first thing I tried. 
I also made it non-headless to increase my chances of seeming trustworthy. 
The captcha was a little inconsistent in catching me. It seemed like every so often when I ran the script it would fail the captcha. When this happened I would just change the millisecond value in the slowMo option by one, and it would pass captcha the next time. 

