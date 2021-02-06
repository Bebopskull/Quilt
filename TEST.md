-Test commit -May
-Test commit -sarahhhhhhhhhhhhhhhhhhhh


Work Process:

To work on a new branch (please do):
git checkout -b newBranch
git pull

-do code-

git add.
git commit -m "message"

git pull origin master (if someone has done changes)
-solve any conflicts and git add git commit again

git push origin newBranch

Once the branch is error free:
git checkout master  
>referring to local master

git merge newBranch TO MERGE your local branch to your local master

git push origin master to merge your local master with the remote master.

--DELETING A BRANCH (locally)
1) get out of the branch 
git checkout master
2) delete the branch locally
git branch --delete newbranch

--DELETING A BRANCH (on github)
1) git push origin --delete newbranch


** PROGRESS  
Day 1:   
GROUP:   
Settled on an option based on preferences and learning points  
compiled several user stories  
Spent some time doing up an ERD over zoom  
Wireframe on figma  
Assistance Request w Rohit  

DAY 2:  
GROUP:  
Settled on an app name  
Helped each other to push sample commits into remote master via branches  
Sarah - Did up base .sql migrations and sample seeds  
Ed - Worked on layout of each widget  
May - Organised skeleton (shifted some code around, added relevant js files) 



