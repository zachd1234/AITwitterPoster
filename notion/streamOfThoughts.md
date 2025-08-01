
Share learnings


can you see the diff? 


Agent on top of a file system is so powerful.



We found an insight that we think the rest of the AI for doing knowledge work does not see . And it’s a really power insight — we are using it internally and are just blown away with how good it is. Now we need to get this to market first. 


What’s the insight? It’s a little complicated but I can try to explain it to you if you want. 



The only ai agent that’s really worked so far is coding agent. Claude code is an extremely high performing ai agent. Other from coding, ai agents havent really been able to complete knowledge work effectively. So why is this? Well it’s because LLMs are trained on code so they’ve gotten really good. (Because coding has more deterministic feedback loops). But here is the insight. An ai coding agent is just ai agents that can read and write a file system. A codebase is a file system (you have the ui folder, and you have the backend folder, and within those there’s sub folders, ect). The best ai agents is just a special chatGPT with a couple tools that lets them navigate the file system to read stuff and then write to the file system and update files with new code or create new files. So what we are doing. Is turning knowledge work into a file system. then placing that same extremely powerful ai agent on top of a text based file system just like how the coding agents work. here is an example, say I wanted to send an investors update email . We have the folders — people, under people is family and the under family is a text file with the information about Dad all the information about Nathan, about mom. Then if you go out of that folder back up I have work folder with a file about my investor and what he is like and all our communications and all his tendencies. Then, back to the parent folder, email folder, inbox , send email. So all the agent does is drop a text file of the desired message into the send email folder and then we have syncing layer that translates whatever is written in the folder back into Gmail so it’s sends the email. So we have a whole syncing layer takes real world stuff and puts it into the file system and takes whatever the agent writes and puts it into real world. 


How does it look.


Opinionated file system that’s overridable.


/automations/
/investor_updates/
- schedule.txt
- [logic.md](http://logic.md/)  ← the assignment/prompt
- output/
- [2025-07.md](http://2025-07.md/)
- [2025-08.md](http://2025-08.md/)


/projects/
/sauna_ai/
- investor_notes.md
- automations/
/sauna_pitch_prep/


Then a section of the file system for creating custom automations. 


Ok cool. Now are we going to actually use Claude code? Could use open code. 


can you trigger open code asynchronously? Yes. It’s just software. If you can trigger it in ui, you can trigger it asnyrnously. Yes you can call Claude code via their SDK. 


The file system is going to live on the cloud. We will have an automations folder where all their automations will live. These automations will be trigger able by Cron, trigger from Saas, manual. Then the automation will be a packagable thing that can be shared to others when uploaded to our marketplace.  


Old software:


Store data, logic on data to do stuff, update and visualize data. 


Code is still needed as glue. 


Store data, logic on data to do stuff, update and visualize data.


File system storage, ai agent can do logic instead of code, ai agent can do crud on that data, ai agent can visualize data back to you.


All software can be turned into ai agent. Doesn’t mean all existing software businesses are screwed. Because some have legit data moats and such. But if you were to redesign any of their products from scratch, you wouldn’t need to write software.


But that’s not great. Maybe the right architecture is keep a relational DB then dynamically form the file structure based on the query. Boom 


Need for human intelligence is not going away. Ai will get smarter than us. But let’s not forget. The ultimate goal of ai is to improve humans lives. So humans will bring the desire. It is on us to figure out what we want. That is a cognitive task. Another thing is we actually live life , ai doesn’t. So for the foreseeable future, humans will provide context that ai can’t see. That’s another cognitive task. We provide the context , information of what should happen. i


In private equity money gets sucked out by partners so stock is misleading. sec regulates - only allows certain people to invest in risky things . So need 200k or 1 M net worth. Too complex for the dumb and they lose more than they win. You can get accredited by taking Series 65 exam. Regulation CF - started in 2016. Let’s people invest in private market. We funder, kickstart . Mercury - bank for startups. Cap at 5M because if not, you are basically going public so tons of regulation that would crush startups. Don’t give them a way out. But liquidity, easy way out. If you do regulated CF, you must disclose shit. You can’t market it -/ because you could sway investors to make bad choices. Reg D - no regulation.must raise from accredited investors. 


if it’s reasonable to assume that someone is doing a service that would expect money, then you have to tell them that you wouldn’t pay them or else you have to. Pedi taxi. Negotiate up front. Who does Reg A. Let a bunch of people onto cap table and do all that work. It’s for community startups. $75M / year. S1 to go public. 1-A for Reg A. Sarbanes Oxely is the reporting you have to do. Easier than IPO. One time round vs ongoing trading. Alternative trading system. — mini stock market for private companies that SEC approves. t zero - blockchain ATS. Start engine - let’s people trade Reg a . It’s not fully liquid. Reg D - way less reporting . Because accredited investors are considered to know what they are doing. There can be market versions of enforcing good reporting like account firms. Reg CF - turn users into loyal owners that are on your side. Get an army of people on your side — just by giving them a tiny bit. Reg D - get a few rich guys on your team but get thousand users is big too. You can also potentially raise at a higher price because retail investors (fans) might think your business is better than a professional analyst. Finally, you don’t have to give up board sears.  Founder sets price. But if people don’t buy you return it . So you the founder are perfectly incentivized to pick the market price. Genius. 


The silence of life is good. Life feels good. Bad thoughts but not acting on them is ok. 


Success as a founder is both how good you are and how much leverage you accumulated before you founded the company. 


My mind is caught up in myself. Instead of thinking about others. 


I want America to win because #1 I like my country but #2 it alligns with my individual incentives. I’ve spent a lot of time learning stuff that is only useful in america like American history, American laws, and if I had to move countries, then all that knowledge would no longer be useful,  


Inflation on titles in PE because they need to impress founders to get them to meet with each one . MD runs team to find and set up deals. MDs can write checks to a certain extent. Credit committee signs off on deals. MDs get bonuses. Don’t want to give an unpaid person a lot of purchasing power because they might take advantage of it. PE is just raise from LPs investor relations. Do deals. MDs that lead deals with teams of analysts. Credit commute that signs off. GPs  take a management fee and carry over a certain point. Gps take profit. Have a distribution system like Gps get it and give bonuses to those who helped or distribute carry to people in a nice system. Fund life. Host - make available to others by allowing it to listen to and respond to requests.


Focus on winning the current moment. Moment by moment. 


Ok. Planning ahead. 


Going to work tomorrow. what is my plan for work?


MVI.


Existing to do;


SOLACE optimizations (playlist, gets louder). 


Twitter - making it work. Making it good so that I use it. Cron posting, improve prompt. Engineer it until it’s really good. 


Hubert help. 


Helping Hubert / more learnjgn


Building agents more impact.


More impact because goal is to have wordware good word. I’m already learning a lot either way.


Be a founder that packages apps this week and allows people to npm install them. Clean up apps and then package them. 


Demo everything. Sync with people. 


So maybe I sync with Tamir and say: hey this week I was planning to clean up my alarm and the Twitter poster into modular apps that anyone can npm install onto their file system. And I also plan to make another agent. My question is : how far along are we on creating modular ways to install assignments on Ember? Would you like me to follow an existing framework or is there nothing and I can experiment with whatever I think is best 


The thing I fear most is my ignorance.


Balancing education and engaging in economy. 


So just be a continual learner — take action and dive into stuff follow curiosity .


Massive realization: 


in ambition and learning velocity,  I’m ready to start a billion dollar company.


But could I assemble a team of 5 of the best in the world right now?


Do I have deep understanding of the market 


Can I raise capital?


Most elite founders don’t have MBAs. MBA - used to 


But in network, and leverage.


Beware. Do not say. I get it. Do not think to yourself. I understand this. Instead say: “I have a basic mental model, let’s deepen it”


Carta - platform to manage equity , cap tables , valuations. Do models. Rolling fund - raise from LP quarterly like a subscription. 


venture deals. Notes:


How venture really works. Cap tables , term sheets, dynamics, how VCs think. Opaque to Everyone but the VCs. Unissued option pool happens pre money. Pre money vs post money unissued option pool. You need it to grow company. Creating option pool — you need it to grow. It is dilution that needs to happen. 10% unissued option pool. 


how can sauna get to market faster? and find PMF faster? what are my ideas? 


Burn excuses. Cap ex vs opex . If your burnin money building an asset, that’s fine because if the asset is growing in value by amount your burning it’s fine. But if you’re burning on user costs and subsidizing users, that’s a little worrying. You need to prove that costs will go down soon and the data + future LTV from lock in effects make it worth it. Unprofitable business- bad unit economics. Burning - good unit economics but spending on stuff. Unprofitable business - unit economics must flip.


Raising. If you have momentum, you can raise at higher amount. But might not need money. But if you think it’s not going to continue, raise at a higher. If you think continue, just wait. 


Syncing outward might make more sense to just send with API


Talking through all your ideas with ChatGPT makes learning fun and addicting because you get dopamine when the AI praises your thoughts with “Brilliant insight”


Post more think about it less 


Elevator pitching a girl. It’s tough. Because you want to ask for the instagram. But you can’t unless you make a solid connection. So you have to make that connection very fast in the elevator. So when you get off, the instagram ask is not out of the blue. Just like you don’t want to be that guy asking for LinkedIn after no connection, same for instagram and a girl. 


Cursor value chain. Tons of value to user. Value to supplier. But can’t capture enough so cursor loses. Consume vs create. Tons of supply. Deserves to be less supply. The most disintertimediated supplier wins. One who can supply for least. Software - one supplier can easily distribute to all. So fierce race to bottom. One that can price for the least wins.


Dear G thanks for x , Y and Z.


Tomorrow I’ll try to make you proud, 


Stream of consciousness. 


Apple script lets you automate the Mac itself. Developer usage =‘Mac more useful. Apple scripts can do file automation. Mail app. 


Dilution - pie. Accreitve vs dilutive. Accretive- value adding. Good and bad dilution depending on result but it’s a neutral event, 


Yeah, but there's also the mental thing of like, I want to own my thing, and that's why it feels like a negative event.


Increase valuation on value add. 


Wordware is going too general too early. Trying to do everything at once rather than building the wedge.


Writing specs is still too much work. 


Rather than people writing specs, do watch and learn mode. And eventually start taking action, 


Infra before PMF


Vague messaging. Too many things at once.


This ai for knowledge workers market is emerging though.


Just barely becoming not early. 


Knowledge work. Figuring out what hole to dig and digging hole. 


Figuring out what hole to dig is taking in inputs (research, prompt), and then making decisions.


Hold digging, communication to other people who need to hear it, coding, 


W


Lawyers are involved in deals. Make fun of lawyers. negotiation. Participating perferred, chicken stock.


Convertible debt. Venture debt. Venture firm structure. Letter of intent to acquire 


Time economics. Benefit vs amount of hours graph. Rarely linear. For a hourly job it is though. A lot of times the benefit vs amount of hours of work is very little at first then spikes up really fast once you reach a certain point. Certain points it may plateau. Take average slope. You need to spend time to get to the steep part.

Decision A + 643 life points. Decision B +653 life points. Possible points earned per hour = +50. thus Time to figure out  what decision is better = 400 life points. So spend 400 life points for the best decision. 243 ;life points that way. Vs picking random: 648 life points


j 